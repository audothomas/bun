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

// src/js/out/tmp/node/diagnostics_channel.ts
var require_diagnostics_channel = __commonJS(() => {
  var channel = function() {
    throwNotImplemented2("node:diagnostics_channel", 2688);
  }, hasSubscribers = function() {
    throwNotImplemented2("node:diagnostics_channel", 2688);
  }, subscribe = function() {
    throwNotImplemented2("node:diagnostics_channel", 2688);
  }, unsubscribe = function() {
    throwNotImplemented2("node:diagnostics_channel", 2688);
  }, { hideFromStack: hideFromStack2, throwNotImplemented: throwNotImplemented2 } = (init_shared(), __toCommonJS(exports_shared));

  class Channel {
    constructor(name) {
      throwNotImplemented2("node:diagnostics_channel", 2688);
    }
  }
  $_BunCommonJSModule_$.module.exports = {
    channel,
    hasSubscribers,
    subscribe,
    unsubscribe,
    Channel
  };
  hideFromStack2([channel, hasSubscribers, subscribe, unsubscribe, Channel]);
});
export default require_diagnostics_channel();
