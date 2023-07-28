(function () {"use strict";
  const EventEmitter = @requireId(13), { throwNotImplemented } = @requireId(2);
  var SCHED_NONE = 0, SCHED_RR = 1, Worker, schedulingPolicy = 2;

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
      throwNotImplemented("node:cluster Worker", 2428);
    };
    setupPrimary() {
      throwNotImplemented("node:cluster", 2428);
    }
    setupMaster() {
      throwNotImplemented("node:cluster", 2428);
    }
    fork() {
      throwNotImplemented("node:cluster", 2428);
    }
    disconnect() {
      throwNotImplemented("node:cluster", 2428);
    }
  }
  return new Cluster;
})
