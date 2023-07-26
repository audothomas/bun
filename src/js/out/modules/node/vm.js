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

// src/js/out/tmp/node/vm.ts
var runInContext = function(code, context, options) {
  return new Script(code, options).runInContext(context);
}, compileFunction = function() {
  throwNotImplemented2("node:vm compileFunction");
}, measureMemory = function() {
  throwNotImplemented2("node:vm measureMemory");
}, { throwNotImplemented: throwNotImplemented2 } = exports_shared, vm = globalThis[Symbol.for("Bun.lazy")]("vm"), { createContext, isContext, Script, runInNewContext, runInThisContext } = vm;

class Module {
  constructor() {
    throwNotImplemented2("node:vm Module");
  }
}

class SourceTextModule {
  constructor() {
    throwNotImplemented2("node:vm Module");
  }
}

class SyntheticModule {
  constructor() {
    throwNotImplemented2("node:vm Module");
  }
}
module.exports = {
  createContext,
  runInContext,
  runInNewContext,
  runInThisContext,
  isContext,
  compileFunction,
  measureMemory,
  Script,
  Module,
  SourceTextModule,
  SyntheticModule
};
})()