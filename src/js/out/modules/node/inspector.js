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

// src/js/out/tmp/node/inspector.ts
var open = function() {
  throwNotImplemented2("node:inspector open", 2445);
}, close = function() {
  throwNotImplemented2("node:inspector close", 2445);
}, url = function() {
  throwNotImplemented2("node:inspector url", 2445);
}, waitForDebugger = function() {
  throwNotImplemented2("node:inspector waitForDebugger", 2445);
}, { hideFromStack: hideFromStack2, throwNotImplemented: throwNotImplemented2 } = exports_shared, EventEmitter = module.require("node:events");

class Session extends EventEmitter {
  constructor() {
    super();
    throwNotImplemented2("node:inspector Session", 2445);
  }
}
var console = {
  ...globalThis.console,
  context: {
    console: globalThis.console
  }
};
module.exports = {
  console,
  open,
  close,
  url,
  waitForDebugger,
  Session
};
hideFromStack2(open, close, url, waitForDebugger, Session.prototype.constructor);
})()