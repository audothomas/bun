(function () {"use strict";
  const { throwNotImplemented } = @requireId(2), vm = globalThis[globalThis.Symbol.for('Bun.lazy')]("vm"), { createContext, isContext, Script, runInNewContext, runInThisContext } = vm;
  function runInContext(code, context, options) {
    return new Script(code, options).runInContext(context);
  }
  function compileFunction() {
    throwNotImplemented("node:vm compileFunction");
  }
  function measureMemory() {
    throwNotImplemented("node:vm measureMemory");
  }

  class Module {
    constructor() {
      throwNotImplemented("node:vm Module");
    }
  }

  class SourceTextModule {
    constructor() {
      throwNotImplemented("node:vm Module");
    }
  }

  class SyntheticModule {
    constructor() {
      throwNotImplemented("node:vm Module");
    }
  }
  return {
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
})
