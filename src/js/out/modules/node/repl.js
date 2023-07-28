(function () {"use strict";
  var $;
  const { throwNotImplemented } = @requireId(2);
  function REPLServer() {
    throwNotImplemented("node:repl REPLServer");
  }
  function Recoverable() {
    throwNotImplemented("node:repl Recoverable");
  }
  var REPL_MODE_SLOPPY = 0, REPL_MODE_STRICT = 1;
  function start() {
    throwNotImplemented("node:repl");
  }
  return $ = {
    lines: [],
    context: globalThis,
    historyIndex: -1,
    cursor: 0,
    historySize: 1000,
    removeHistoryDuplicates: !1,
    crlfDelay: 100,
    completer: () => {
      throwNotImplemented("node:repl");
    },
    history: [],
    _initialPrompt: "> ",
    terminal: !0,
    input: new Proxy({}, {
      get() {
        throwNotImplemented("node:repl");
      },
      has: () => !1,
      ownKeys: () => [],
      getOwnPropertyDescriptor: () => {
        return;
      },
      set() {
        throwNotImplemented("node:repl");
      }
    }),
    line: "",
    eval: () => {
      throwNotImplemented("node:repl");
    },
    isCompletionEnabled: !0,
    escapeCodeTimeout: 500,
    tabSize: 8,
    breakEvalOnSigint: !0,
    useGlobal: !0,
    underscoreAssigned: !1,
    last: void 0,
    _domain: void 0,
    allowBlockingCompletions: !1,
    useColors: !0,
    output: new Proxy({}, {
      get() {
        throwNotImplemented("node:repl");
      },
      has: () => !1,
      ownKeys: () => [],
      getOwnPropertyDescriptor: () => {
        return;
      },
      set() {
        throwNotImplemented("node:repl");
      }
    })
  }, $;
})
