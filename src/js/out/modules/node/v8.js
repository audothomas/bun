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

// src/js/out/tmp/node/v8.ts
var notimpl = function(message) {
  throwNotImplemented2("node:v8 " + message);
}, cachedDataVersionTag = function() {
  notimpl("cachedDataVersionTag");
}, getHeapSnapshot = function() {
  notimpl("getHeapSnapshot");
}, getHeapStatistics = function() {
  notimpl("getHeapStatistics");
}, getHeapSpaceStatistics = function() {
  notimpl("getHeapSpaceStatistics");
}, getHeapCodeStatistics = function() {
  notimpl("getHeapCodeStatistics");
}, setFlagsFromString = function() {
  notimpl("setFlagsFromString");
}, deserialize = function(value) {
  return jsc.deserialize(value);
}, takeCoverage = function() {
  notimpl("takeCoverage");
}, stopCoverage = function() {
  notimpl("stopCoverage");
}, serialize = function(arg1) {
  return jsc.serialize(arg1, { binaryType: "nodebuffer" });
}, writeHeapSnapshot = function() {
  notimpl("writeHeapSnapshot");
}, setHeapSnapshotNearHeapLimit = function() {
  notimpl("setHeapSnapshotNearHeapLimit");
}, { hideFromStack: hideFromStack2, throwNotImplemented: throwNotImplemented2 } = exports_shared, jsc = module.require("bun:jsc");

class Deserializer {
  constructor() {
    notimpl("Deserializer");
  }
}

class Serializer {
  constructor() {
    notimpl("Serializer");
  }
}

class DefaultDeserializer extends Deserializer {
  constructor() {
    super(...arguments);
  }
}

class DefaultSerializer extends Serializer {
  constructor() {
    super(...arguments);
  }
}

class GCProfiler {
  constructor() {
    notimpl("GCProfiler");
  }
}
var promiseHooks = {
  createHook: () => {
    notimpl("createHook");
  },
  onInit: () => {
    notimpl("onInit");
  },
  onBefore: () => {
    notimpl("onBefore");
  },
  onAfter: () => {
    notimpl("onAfter");
  },
  onSettled: () => {
    notimpl("onSettled");
  }
}, startupSnapshot = {
  addDeserializeCallback: () => notimpl("addDeserializeCallback"),
  addSerializeCallback: () => notimpl("addSerializeCallback"),
  setDeserializeMainFunction: () => notimpl("setDeserializeMainFunction"),
  isBuildingSnapshot: () => notimpl("isBuildingSnapshot")
};
module.exports = {
  cachedDataVersionTag,
  getHeapSnapshot,
  getHeapStatistics,
  getHeapSpaceStatistics,
  getHeapCodeStatistics,
  setFlagsFromString,
  deserialize,
  takeCoverage,
  stopCoverage,
  serialize,
  writeHeapSnapshot,
  setHeapSnapshotNearHeapLimit,
  promiseHooks,
  startupSnapshot,
  Deserializer,
  Serializer
};
hideFromStack2(notimpl, cachedDataVersionTag, getHeapSnapshot, getHeapStatistics, getHeapSpaceStatistics, getHeapCodeStatistics, setFlagsFromString, deserialize, takeCoverage, stopCoverage, serialize, writeHeapSnapshot, setHeapSnapshotNearHeapLimit, Deserializer, Serializer, DefaultDeserializer, DefaultSerializer, GCProfiler);
})()