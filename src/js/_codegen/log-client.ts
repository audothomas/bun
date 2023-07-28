// This is the implementation for $debug
export function createLogClient(filepath: string, publicName: string) {
  return `
let $log = function init(...args) {
  const env = @Bun.env;
  const allow = (
    (env.BUN_DEBUG_ALL && env.BUN_DEBUG_ALL !== '0')
    || (env.BUN_DEBUG_${filepath
      .replace(/^.*?:/, "")
      .split(/[-_./]/g)
      .join("_")
      .toUpperCase()})
  );
  if(!allow) $log = () => {};
  else {
    $log = (...args) => {
      // warn goes to stderr without colorizing
      console.warn(Bun.enableANSIColors ? '\\x1b[90m[${publicName}]\\x1b[0m' : '[${publicName}]', ...args);
    };
    $log(...args);
  }
}
`;
}
