(()=>{"use strict";var {module}=$_BunCommonJSModule_$;var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {
      get: all[name],
      enumerable: !0,
      configurable: !0,
      set: (newValue) => all[name] = () => newValue
    });
};

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

// src/js/out/tmp/node/repl.ts
var { throwNotImplemented: throwNotImplemented2 } = exports_shared;
module.exports = {
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
})()