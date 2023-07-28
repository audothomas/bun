(function () {"use strict";
  function family() {
    return Promise.resolve(familySync());
  }
  function familySync() {
    return null;
  }
  const GLIBC = "glibc", MUSL = "musl";
  function versionAsync() {
    return Promise.resolve(version());
  }
  function version() {
    return null;
  }
  function isNonGlibcLinuxSync() {
    return !1;
  }
  function isNonGlibcLinux() {
    return Promise.resolve(isNonGlibcLinuxSync());
  }
  return {
    GLIBC,
    MUSL,
    family,
    familySync,
    isNonGlibcLinux,
    isNonGlibcLinuxSync,
    version,
    versionAsync
  };
})
