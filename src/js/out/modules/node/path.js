(()=>{"use strict";var {module}=$_BunCommonJSModule_$;var bound = function(obj) {
  const toNamespacedPath = obj.toNamespacedPath.bind(obj);
  return {
    resolve: obj.resolve.bind(obj),
    normalize: obj.normalize.bind(obj),
    isAbsolute: obj.isAbsolute.bind(obj),
    join: obj.join.bind(obj),
    relative: obj.relative.bind(obj),
    toNamespacedPath,
    dirname: obj.dirname.bind(obj),
    basename: obj.basename.bind(obj),
    extname: obj.extname.bind(obj),
    format: obj.format.bind(obj),
    parse: obj.parse.bind(obj),
    sep: obj.sep,
    delimiter: obj.delimiter,
    win32: void 0,
    posix: void 0,
    _makeLong: toNamespacedPath
  };
}, posix = bound(Bun._Path(!1)), win32 = bound(Bun._Path(!0));
posix.win32 = win32.win32 = win32;
posix.posix = win32.posix = posix;
module.exports = process.platform === "win32" ? win32 : posix;
})()