"use strict";var request = function(input, options, cb) {
  if (input && typeof input === "object" && !(input instanceof URL))
    input.protocol ??= "https:";
  else if (typeof options === "object")
    options.protocol ??= "https:";
  return http.request(input, options, cb);
}, get = function(input, options, cb) {
  const req = request(input, options, cb);
  return req.end(), req;
}, http = $_BunCommonJSModule_$.require("node:http");
$_BunCommonJSModule_$.module.exports = {
  ...http,
  get,
  request
};
