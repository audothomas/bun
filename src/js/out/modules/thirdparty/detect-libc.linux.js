(()=>{"use strict";var {module}=$_BunCommonJSModule_$;var family = function() {
  return Promise.resolve(familySync());
}, familySync = function() {
  return GLIBC;
}, versionAsync = function() {
  return Promise.resolve(version());
}, version = function() {
  return "2.29";
}, isNonGlibcLinuxSync = function() {
  return !1;
}, isNonGlibcLinux = function() {
  return Promise.resolve(isNonGlibcLinuxSync());
}, GLIBC = "glibc", MUSL = "musl";
module.exports = {
  GLIBC,
  MUSL,
  family,
  familySync,
  isNonGlibcLinux,
  isNonGlibcLinuxSync,
  version,
  versionAsync
};
})()