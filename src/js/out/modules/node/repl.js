"use strict";var __defProp = Object.defineProperty;
var { getOwnPropertyNames: __getOwnPropNames, getOwnPropertyDescriptor: __getOwnPropDesc } = Object, __hasOwnProp = Object.prototype.hasOwnProperty;
var __toCommonJS = (from) => {
  const moduleCache = __toCommonJS.moduleCache ??= new WeakMap;
  var cached = moduleCache.get(from);
  if (cached)
    return cached;
  var to = __defProp({}, "__esModule", { value: !0 }), desc = { enumerable: !1 };
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key))
        __defProp(to, key, {
          get: () => from[key],
          enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
  }
  return moduleCache.set(from, to), to;
};
var __commonJS = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {
      get: all[name],
      enumerable: !0,
      configurable: !0,
      set: (newValue) => all[name] = () => newValue
    });
};
var __esm = (fn, res) => () => (fn && (res = fn(fn = 0)), res);

// src/js/shared.ts
var exports_shared = {};
__export(exports_shared, {
  throwNotImplemented: () => {
    {
      return throwNotImplemented;
    }
  },
  hideFromStack: () => {
    {
      return hideFromStack;
    }
  },
  NotImplementedError: () => {
    {
      return NotImplementedError;
    }
  }
});
function throwNotImplemented(feature, issue) {
  throw hideFromStack(throwNotImplemented), new NotImplementedError(feature, issue);
}
function hideFromStack(...fns) {
  for (let fn of fns)
    Object.defineProperty(fn, "name", {
      value: "::bunternal::"
    });
}

class NotImplementedError extends Error {
  code;
  constructor(feature, issue) {
    super(feature + " is not yet implemented in Bun." + (issue ? " Track the status & thumbs up the issue: https://github.com/oven-sh/bun/issues/" + issue : ""));
    this.name = "NotImplementedError", this.code = "ERR_NOT_IMPLEMENTED", hideFromStack(NotImplementedError);
  }
}
var init_shared = __esm(() => {
});

// src/js/out/tmp/node/repl.ts
var require_repl = __commonJS(() => {
  var { throwNotImplemented: throwNotImplemented2 } = (init_shared(), __toCommonJS(exports_shared));
  $_BunCommonJSModule_$.module.exports = {
    [Symbol.for("CommonJS")]: 0,
    lines: [],
    context: globalThis,
    historyIndex: -1,
    cursor: 0,
    historySize: 1000,
    removeHistoryDuplicates: !1,
    crlfDelay: 100,
    completer: () => {
      throwNotImplemented2("node:repl");
    },
    history: [],
    _initialPrompt: "> ",
    terminal: !0,
    input: new Proxy({}, {
      get() {
        throwNotImplemented2("node:repl");
      },
      has: () => !1,
      ownKeys: () => [],
      getOwnPropertyDescriptor: () => {
        return;
      },
      set() {
        throwNotImplemented2("node:repl");
      }
    }),
    line: "",
    eval: () => {
      throwNotImplemented2("node:repl");
    },
    isCompletionEnabled: !0,
    escapeCodeTimeout: 500,
    tabSize: 8,
    breakEvalOnSigint: !0,
    useGlobal: !0,
    underscoreAssigned: !1,
    last: void 0,
    _domain: void 0,
    allowBlockingCompletions: !1,
    useColors: !0,
    output: new Proxy({}, {
      get() {
        throwNotImplemented2("node:repl");
      },
      has: () => !1,
      ownKeys: () => [],
      getOwnPropertyDescriptor: () => {
        return;
      },
      set() {
        throwNotImplemented2("node:repl");
      }
    })
  };
});
export default require_repl();
