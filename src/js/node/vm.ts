// Hardcoded module "node:vm"
const { throwNotImplemented } = require("$shared");

const vm = $lazy("vm");

const { createContext, isContext, Script, runInNewContext, runInThisContext } = vm;

function runInContext(code, context, options) {
  return new Script(code, options).runInContext(context);
}

function compileFunction() {
  throwNotImplemented("node:vm compileFunction", 401);
}
function measureMemory() {
  throwNotImplemented("node:vm measureMemory", 401);
}

$exports = {
  createContext,
  runInContext,
  runInNewContext,
  runInThisContext,
  isContext,
  compileFunction,
  measureMemory,
  Script,
};

export {};
