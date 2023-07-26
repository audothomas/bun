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

// src/js/out/tmp/node/diagnostics_channel.ts
var channel = function() {
  throwNotImplemented2("node:diagnostics_channel", 2688);
}, hasSubscribers = function() {
  throwNotImplemented2("node:diagnostics_channel", 2688);
}, subscribe = function() {
  throwNotImplemented2("node:diagnostics_channel", 2688);
}, unsubscribe = function() {
  throwNotImplemented2("node:diagnostics_channel", 2688);
}, { hideFromStack: hideFromStack2, throwNotImplemented: throwNotImplemented2 } = exports_shared;

class Channel {
  constructor(name) {
    throwNotImplemented2("node:diagnostics_channel", 2688);
  }
}
module.exports = {
  channel,
  hasSubscribers,
  subscribe,
  unsubscribe,
  Channel
};
hideFromStack2([channel, hasSubscribers, subscribe, unsubscribe, Channel]);
})()