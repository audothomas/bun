// Hardcoded module "node:timers"
// This implementation isn't 100% correct
// Ref/unref does not impact whether the process is kept alive
$exports = {
  setTimeout,
  clearTimeout,
  setInterval,
  setImmediate,
  clearInterval,
  clearImmediate,
};

export {};
