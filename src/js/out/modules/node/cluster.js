(()=>{"use strict";var {module}=$_BunCommonJSModule_$;var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {
      get: all[name],
      enumerable: !0,
      configurable: !0,
      set: (newValue) => all[name] = () => newValue
    });
};

// src/js/shared.ts
var exports_shared = {};
__export(exports_shared, {
  throwNotImplemented: () => {
    {
      return throwNotImplemented;
    }
  },
  hideFromStack: () => {
    {
      return hideFromStack;
    }
  },
  NotImplementedError: () => {
    {
      return NotImplementedError;
    }
  }
});
function throwNotImplemented(feature, issue) {
  throw hideFromStack(throwNotImplemented), new NotImplementedError(feature, issue);
}
function hideFromStack(...fns) {
  for (let fn of fns)
    Object.defineProperty(fn, "name", {
      value: "::bunternal::"
    });
}

class NotImplementedError extends Error {
  code;
  constructor(feature, issue) {
    super(feature + " is not yet implemented in Bun." + (issue ? " Track the status & thumbs up the issue: https://github.com/oven-sh/bun/issues/" + issue : ""));
    this.name = "NotImplementedError", this.code = "ERR_NOT_IMPLEMENTED", hideFromStack(NotImplementedError);
  }
}

// src/js/out/tmp/node/cluster.ts
var EventEmitter = module.require("node:events"), { throwNotImplemented: throwNotImplemented2 } = exports_shared;
class Cluster extends EventEmitter {
  constructor() {
    super(...arguments);
  }
  isWorker = !1;
  isPrimary = !0;
  isMaster = !0;
  workers = {};
  settings = {};
  SCHED_NONE = 1;
  SCHED_RR = 2;
  schedulingPolicy = 2;
  Worker = function Worker() {
    throwNotImplemented2("node:cluster Worker", 2428);
  };
  setupPrimary() {
    throwNotImplemented2("node:cluster", 2428);
  }
  setupMaster() {
    throwNotImplemented2("node:cluster", 2428);
  }
  fork() {
    throwNotImplemented2("node:cluster", 2428);
  }
  disconnect() {
    throwNotImplemented2("node:cluster", 2428);
  }
}
module.exports = new Cluster;
})()