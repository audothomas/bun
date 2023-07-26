// Hardcoded module "bun:jsc"
var exports = $lazy("bun:jsc") as any;
exports.describe = exports.jscDescribe;
exports.describeArray = exports.jscDescribeArray;
exports.setTimezone = exports.setTimeZone;
module.exports = exports;
