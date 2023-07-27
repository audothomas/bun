import fs from "fs";
import path from "path";
import { sliceSourceCode } from "./builtin-parser";
import { cap, fmtCPPString, readdirRecursive, resolveSyncOrNull } from "./helpers";

let start = performance.now();
function mark(log: string) {
  const now = performance.now();
  console.log(`${log} (${(now - start).toFixed(0)}ms)`);
  start = now;
}

const BASE = path.join(import.meta.dir, "../");
const TMP = path.join(BASE, "out/tmp");

const moduleList = ["bun", "node", "thirdparty", "internal"]
  .flatMap(dir => readdirRecursive(path.join(BASE, dir)))
  .filter(file => file.endsWith(".js") || (file.endsWith(".ts") && !file.endsWith(".d.ts")))
  .map(file => file.slice(BASE.length))
  .sort();

const internalRegistry = new Map();

// Build Registry
for (let i = 0; i < moduleList.length; i++) {
  const prefix = moduleList[i].startsWith("node/") ? "node:" : moduleList[i].startsWith("bun:") ? "bun/" : undefined;
  if (prefix) {
    const id = prefix + moduleList[i].slice(prefix.length).replaceAll(".", "/").slice(0, -3);
    internalRegistry.set(id, i);
  }
}

const nativeModules = {
  "node:buffer": 1024,
  "node:process": 1025,
  "bun:events_native": 1026, // native version of EventEmitter used for streams
  "node:string_decoder": 1027,
  "node:module": 1028,
  "node:tty": 1029,
  "node:util/types": 1030,
  "node:constants": 1031,
  "bun:jsc": 1032,
};

mark("Scan internal registry");

// Preprocess builtins
const bundledEntryPoints: string[] = [];
for (let i = 0; i < moduleList.length; i++) {
  try {
    const input = fs.readFileSync(path.join(BASE, moduleList[i]), "utf8");
    const processed = sliceSourceCode("{" + input.replace(/export\s*{\s*}\s*;/g, ""), true, specifier => {
      // this one is deprecated
      if (specifier === "$shared") specifier = "./internal/shared.ts";

      const directMatch = internalRegistry.get(specifier);
      if (directMatch) return `__intrinsic__requireId(${directMatch}/*${specifier}*/)`;

      // TODO: remove this and assign native modules to their own IDs
      if (specifier in nativeModules) return `__intrinsic__requireBuiltin("${specifier}")`;

      const relativeMatch =
        resolveSyncOrNull(specifier, path.join(BASE, path.dirname(moduleList[i]))) ??
        resolveSyncOrNull(specifier, BASE);

      if (relativeMatch) {
        const found = moduleList.indexOf(path.relative(BASE, relativeMatch));
        if (found === -1) {
          throw new Error(
            `Builtin Bundler: "${specifier}" cannot be imported here because it doesn't get a module ID. Only files in "src/js" besides "src/js/builtins" can be used here.`,
          );
        }
        return `__intrinsic__requireId(${found}/*${path.relative(BASE, relativeMatch)}*/)`;
      }

      throw new Error(
        `Builtin Bundler: Could not resolve "${specifier}" in ${moduleList[i]}. These cannot be relative.`,
      );
    });
    let fileToTranspile = `// @ts-nocheck
// GENERATED TEMP FILE - DO NOT EDIT
// Sourced from TODO

$$capture_start$$(function() {
${processed.result.slice(1)}
return __intrinsic__exports;
}).$$capture_end$$;`;

    // Attempt to optimize "$exports = ..." to a variableless return
    // otherwise, declare $exports so it works.
    let exportOptimization = false;
    fileToTranspile = fileToTranspile.replace(
      /__intrinsic__exports\s*=\s*(.*|.*\{[^\}]*}|.*\([^\)]*\));\n\s*return __intrinsic__exports;/g,
      (_, a) => {
        exportOptimization = true;
        return "return " + a + ";";
      },
    );
    if (!exportOptimization) {
      fileToTranspile = fileToTranspile
        .replaceAll("__intrinsic__exports", "$")
        .replace("$$capture_start$$(function() {", "$$$$capture_start$$$$(function() {var $;");
    }
    const outputPath = path.join(TMP, moduleList[i].slice(0, -3) + ".ts");
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, fileToTranspile);
    bundledEntryPoints.push(outputPath);
  } catch (error) {
    console.error(error);
    console.error(`While processing: ${moduleList[i]}`);
    process.exit(1);
  }
}

mark("Preprocess modules");

const permutations = {
  "linux": {
    define: {
      "process.platform": '"linux"',
    },
  },
  "mac": {
    define: {
      "process.platform": '"darwin"',
    },
  },
  "win": {
    define: {
      "process.platform": '"win32"',
    },
  },
};

const bundled = await Bun.build({
  entrypoints: bundledEntryPoints,
  minify: { syntax: true, whitespace: true },
  root: TMP,
});
if (!bundled.success) {
  console.error(bundled.logs);
  process.exit(1);
}

mark("Bundle modules");

const bundledOutputs = new Map();

for (const file of bundled.outputs) {
  const output = await file.text();
  const captured = output.match(/\$\$capture_start\$\$([\s\S]+)\.\$\$capture_end\$\$/)![1];
  const finalReplacement =
    captured
      .replace(/function\s*\(.*?\)\s*{/, '$&"use strict";')
      .replace(/^\((async )?function\(/, "($1function (")
      .replace(/__intrinsic__lazy\(/g, "globalThis[globalThis.Symbol.for('Bun.lazy')](")
      .replace(/__intrinsic__/g, "@") + "\n";
  const outputPath = path.join(BASE, "out/modules", file.path);
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, finalReplacement);
  bundledOutputs.set(file.path.replace(".js", ""), finalReplacement);
}

mark("Postprocesss modules");

function idToEnumName(id: string) {
  return id
    .replace(/\.[mc]?[tj]s$/, "")
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .split(" ")
    .map(x => (["jsc", "ffi", "vm", "tls", "os", "ws", "fs", "dns"].includes(x) ? x.toUpperCase() : cap(x)))
    .join("");
}

function idToPublicSpecifierOrEnumName(id: string) {
  id = id.replace(/\.[mc]?[tj]s$/, "");
  if (id.startsWith("node/")) {
    return "node:" + id.slice(5).replaceAll(".", "/");
  } else if (id.startsWith("bun/")) {
    return "bun:" + id.slice(4).replaceAll(".", "/");
  } else if (id.startsWith("thirdparty/")) {
    return id.slice(11).replaceAll(".", "/");
  }
  return idToEnumName(id);
}

fs.writeFileSync(
  path.join(BASE, "out/InternalModuleRegistry+numberOfModules.h"),
  `#define BUN_INTERNAL_MODULE_COUNT ${moduleList.length}\n`,
);

fs.writeFileSync(
  path.join(BASE, "out/InternalModuleRegistry+initInternalModules.h"),
  moduleList
    .map((id, n) => {
      return `registry.m_internalModule[${n}].initLater([](const JSC::LazyProperty<JSC::JSGlobalObject, JSC::JSCell>::Initializer& init) {
    INTERNAL_MODULE_REGISTRY_GENERATE(init, InternalModuleRegistryConstants::${idToEnumName(id)}Code);
});
`;
    })
    .join(""),
);

fs.writeFileSync(
  path.join(BASE, "out/InternalModuleRegistry+enum.h"),
  moduleList
    .map((id, n) => {
      return `${idToEnumName(id)} = ${n},`;
    })
    .join("\n") + "\n",
);

fs.writeFileSync(
  path.join(BASE, "out/InternalModuleRegistry+visitImpl.h"),
  moduleList
    .map((id, n) => {
      return `m_internalModule[${n}].visit(visitor);`;
    })
    .join("\n") + "\n",
);

fs.writeFileSync(
  path.join(BASE, "out/InternalModuleRegistryConstants.h"),
  `#pragma once

namespace Bun {
namespace InternalModuleRegistryConstants {

${moduleList
  .map(
    (id, n) =>
      `static constexpr ASCIILiteral ${idToEnumName(id)}Code = ${fmtCPPString(bundledOutputs.get(id.slice(0, -3)))}_s;`,
  )
  .join("\n")}

}
}`,
);

fs.writeFileSync(
  path.join(BASE, "out/ResolvedSourceTag.zig"),
  `pub const ResolvedSourceTag = enum(u64) {
    // Predefined
    javascript = 0,
    package_json_type_module = 1,
    wasm = 2,
    object = 3,
    file = 4,
    esm = 5,

    // Built in modules are loaded through InternalModuleRegistry by numerical ID.
    // In this enum are represented as \`(1 << 9) & id\`
${moduleList.map((id, n) => `    @"${idToPublicSpecifierOrEnumName(id)}" = ${(1 << 9) | n},`).join("\n")}
    
    // Native modules are loaded ... TODO, but we'll use 1024 and up
${Object.entries(nativeModules)
  .map(([id, n]) => `    @"${id}" = ${n},`)
  .join("\n")}
};
`,
);

fs.writeFileSync(
  path.join(BASE, "out/SyntheticModuleType.h"),
  `enum SyntheticModuleType : uint64_t {
    JavaScript = 0,
    PackageJSONTypeModule = 1,
    Wasm = 2,
    ObjectModule = 3,
    File = 4,
    ESM = 5,

    // ooh deprecated scary oooh scary boo
    Buffer = 1025,
    Process = 1024,
    NativeEvents = 1026,
    StringDecoder = 1027,
    NodeModule = 1028,
    TTY = 1029,
    NodeUtilTypes = 1030,
    Constants = 1031,
    BunJSC = 1032,

    // Built in modules are loaded through InternalModuleRegistry by numerical ID.
    // In this enum are represented as \`(1 << 9) & id\`
    InternalModuleRegistryFlag = 1 << 9,
${moduleList.map((id, n) => `    ${idToEnumName(id)} = ${(1 << 9) | n},`).join("\n")}
    
    // Native modules are loaded ... TODO, but we'll use 1024 and up
${Object.entries(nativeModules)
  .map(([id, n]) => `    ${idToEnumName(id)} = ${n},`)
  .join("\n")}
};

#define BUN_FOREACH_NATIVE_MODULE_NAME(macro) \\
${Object.entries(nativeModules)
  .map(([id, n]) => `    macro(${idToEnumName(id)}, ${n}) \\`)
  .join("\n")}
`,
);

mark("Generate Code");
