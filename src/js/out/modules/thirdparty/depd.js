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

// src/js/out/tmp/thirdparty/depd.js
var require_depd = __commonJS((exports, module) => {
  var wrapfunction = function(fn, message) {
    if (typeof fn !== "function")
      throw new TypeError("argument fn must be a function");
    return fn;
  }, wrapproperty = function(obj, prop, message) {
    if (!obj || typeof obj !== "object" && typeof obj !== "function")
      throw new TypeError("argument obj must be object");
    var descriptor = Object.getOwnPropertyDescriptor(obj, prop);
    if (!descriptor)
      throw new TypeError("must call property on owner object");
    if (!descriptor.configurable)
      throw new TypeError("property must be configurable");
  };
  module.exports = function depd(namespace) {
    if (!namespace)
      throw new TypeError("argument namespace is required");
    function deprecate(message) {
    }
    return deprecate._file = void 0, deprecate._ignored = !0, deprecate._namespace = namespace, deprecate._traced = !1, deprecate._warned = Object.create(null), deprecate.function = wrapfunction, deprecate.property = wrapproperty, deprecate;
  };
});
export default require_depd();
