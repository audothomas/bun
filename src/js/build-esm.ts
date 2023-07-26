import fs from "fs";
import path from "path";

const OUT_DIR = path.join(import.meta.dir, "out/");
const TMP_DIR = path.join(import.meta.dir, "out/tmp");

// Because we do not load sourcemaps, we are not enabling identifiers + whitespace
// minification on all files, just on the ones without logic or were already bundled
const minifyList = [
  "node/assert.js",
  "node/assert.strict.js",
  "node/stream.js",
  "node/crypto.js",
  "node/assert.js",
  "node/assert.strict.js",
  "node/fs.promises.ts",
  "node/path.js",
  "node/path.posix.js",
  "node/path.win32.js",
  "node/stream.promises.js",
  "node/stream.consumers.js",
  "node/stream.web.js",
  "node/url.js",
  "node/zlib.js",
];

if (fs.existsSync(OUT_DIR + "/modules")) {
  fs.rmSync(OUT_DIR + "/modules", { recursive: true });
}
if (fs.existsSync(OUT_DIR + "/modules_dev")) {
  fs.rmSync(OUT_DIR + "/modules_dev", { recursive: true });
}

function readdirRecursive(root: string): string[] {
  const files = fs.readdirSync(root, { withFileTypes: true });
  return files.flatMap(file => {
    const fullPath = path.join(root, file.name);
    return file.isDirectory() ? readdirRecursive(fullPath) : fullPath;
  });
}

let preprocessorError = false;
const entrypoints = ["./bun", "./node", "./thirdparty"]
  .flatMap(dir => readdirRecursive(path.join(import.meta.dir, dir)))
  .filter(file => file.endsWith(".js") || (file.endsWith(".ts") && !file.endsWith(".d.ts")))
  .map(file => {
    const base = path.relative(import.meta.dir, file);
    fs.mkdirSync(path.join(TMP_DIR, path.dirname(base)), { recursive: true });
    var usesRequire = 0;
    var contents = fs.readFileSync(file, "utf8");

    if (!contents.match(/export\s*{\s*}/)) {
      console.warn(`[warn] Should add "export {};" to ${file} to make the ts lang server not complain.`);

      fs.writeFileSync(file, contents + "\n\nexport {};\n");
    }

    contents = contents
      .replace(/require\(["']([^"']+)["']\)/g, (str, specifier) => {
        if (specifier === "$shared") return str;
        if (specifier.startsWith(".")) {
          console.error(`Do not use relative requires here: ${file}`);
          preprocessorError = true;
        }
        if (!specifier.startsWith("node:") && !specifier.startsWith("bun:")) {
          console.error(
            `Only imports that are allowed in builtin modules are node:*, bun:*, and "$shared". Found "${specifier}" in ${file}`,
          );
          preprocessorError = true;
          return "";
        }
        usesRequire++;
        return '$$REQUIRE$$("' + specifier + '")';
      })
      .replace(/([\b\s^])module.exports\b/g, "$1$_BunCommonJSModule_$.module.exports");

    var nonStringCode = contents.replace(/"[^"]*"|'[^']*'|`[^`]*`/g, "").replace(/\/\/.*?\n/g, "");
    var match;
    if ((match = nonStringCode.match(/export\s+(function|default|const|var|{)/))) {
      preprocessorError = true;
      console.error(`Do not use ESM exports in "${file}" (found "${match[0]}")`);
    }
    if ((match = nonStringCode.match(/[\b\s^]import\b\s*\./))) {
      preprocessorError = true;
      console.error(`Do not use import.meta in "${file}". It does not exist at runtime for builtin modules.`);
    } else if ((match = nonStringCode.match(/[\b\s^]import\b\s*[^(]/))) {
      preprocessorError = true;
      console.error(`Do not use ESM imports in "${file}". Use require() instead.`);
    }

    if (!nonStringCode.includes("module.exports")) {
      preprocessorError = true;
      console.error(`Expected "${file}" to have a module.exports`);
    }

    if (usesRequire > 1) {
      contents = `var $$REQUIRE$$=$_BunCommonJSModule_$.require;${contents}`;
    } else {
      contents = contents.replace(/\$\$REQUIRE\$\$/g, "$_BunCommonJSModule_$.require");
    }

    if (!preprocessorError) fs.writeFileSync(path.join(TMP_DIR, base), contents);

    return path.join(TMP_DIR, base);
  });

if (preprocessorError) process.exit(1);

fs.writeFileSync(
  path.join(TMP_DIR, "tsconfig.json"),
  JSON.stringify({
    "compilerOptions": {
      "paths": {
        "$shared": ["../../shared.ts"],
      },
    },
  }),
);

const opts = {
  target: "bun",
  naming: {
    entry: "[dir]/[name].[ext]",
  },
  root: TMP_DIR,
  define: {
    "$lazy": "$$BUN_LAZY$$",
  },
} as const;

const productionOpts = {
  ...opts,
  define: {
    ...opts.define,
    "IS_BUN_DEVELOPMENT": "false",
  },
};

const devOpts = {
  ...opts,
  define: {
    ...opts.define,
    "IS_BUN_DEVELOPMENT": "true",
  },
};

const build_prod_minified = await Bun.build({
  entrypoints: entrypoints.filter(file => minifyList.includes(file.slice(TMP_DIR.length + 1))),
  minify: true,
  ...productionOpts,
});

const build_prod_unminified = await Bun.build({
  entrypoints: entrypoints.filter(file => !minifyList.includes(file.slice(TMP_DIR + 1))),
  minify: { syntax: true },
  ...productionOpts,
});

const build_dev = await Bun.build({
  entrypoints: entrypoints,
  minify: { syntax: false },
  sourcemap: "external",
  ...devOpts,
});

for (const [build, outdir] of [
  [build_dev, path.join(OUT_DIR, "modules_dev")],
  [build_prod_minified, path.join(OUT_DIR, "modules")],
  [build_prod_unminified, path.join(OUT_DIR, "modules")],
] as const) {
  if (!build.success) {
    console.error("Build failed");
    throw new AggregateError(build.logs);
  }

  if (build.logs.length) {
    console.log("Build has warnings:");
    for (const log of build.logs) {
      console.log(log);
    }
  }

  for (const output of build.outputs) {
    fs.mkdirSync(path.join(outdir, path.dirname(output.path)), { recursive: true });

    if (output.kind === "entry-point" || output.kind === "chunk") {
      const transformedOutput =
        '"use strict";' +
        (await output.text())
          .replace(/^(\/\/.*?\n)+/g, "")
          .replace(/\$\$BUN_LAZY\$\$/g, 'globalThis[Symbol.for("Bun.lazy")]');

      if (transformedOutput.includes("$bundleError")) {
        // attempt to find the string that was passed to $bundleError
        const match = transformedOutput.match(/(?<=\$bundleError\(")(?:[^"\\]|\\.)*?(?="\))/);
        console.error(`Build ${output.path} $bundleError: ${match?.[0] ?? "unknown"}`);
        console.error(`DCE should have removed this function call, but it was not.`);
        process.exit(1);
      }

      Bun.write(path.join(outdir, output.path), transformedOutput);
    } else {
      Bun.write(path.join(outdir, output.path), output);
    }
  }
}

console.log(`Bundled esm modules in ${performance.now().toFixed(2)}ms`);
