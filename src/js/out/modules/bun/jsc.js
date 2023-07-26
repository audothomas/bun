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

// src/js/out/tmp/bun/jsc.ts
var require_jsc = __commonJS((exports) => {
  var exports = globalThis[Symbol.for("Bun.lazy")]("bun:jsc");
  exports.describe = exports.jscDescribe;
  exports.describeArray = exports.jscDescribeArray;
  exports.setTimezone = exports.setTimeZone;
  $_BunCommonJSModule_$.module.exports = exports;
});
export default require_jsc();
