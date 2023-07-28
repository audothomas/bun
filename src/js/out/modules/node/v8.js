(function () {"use strict";
  var $;
  const { hideFromStack, throwNotImplemented } = @requireId(2), jsc = @requireBuiltin(1032);
  function notimpl(message) {
    throwNotImplemented("node:v8 " + message);
  }

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
  function cachedDataVersionTag() {
    notimpl("cachedDataVersionTag");
  }
  function getHeapSnapshot() {
    notimpl("getHeapSnapshot");
  }
  function getHeapStatistics() {
    notimpl("getHeapStatistics");
  }
  function getHeapSpaceStatistics() {
    notimpl("getHeapSpaceStatistics");
  }
  function getHeapCodeStatistics() {
    notimpl("getHeapCodeStatistics");
  }
  function setFlagsFromString() {
    notimpl("setFlagsFromString");
  }
  function deserialize(value) {
    return jsc.deserialize(value);
  }
  function takeCoverage() {
    notimpl("takeCoverage");
  }
  function stopCoverage() {
    notimpl("stopCoverage");
  }
  function serialize(arg1) {
    return jsc.serialize(arg1, { binaryType: "nodebuffer" });
  }
  function writeHeapSnapshot() {
    notimpl("writeHeapSnapshot");
  }
  function setHeapSnapshotNearHeapLimit() {
    notimpl("setHeapSnapshotNearHeapLimit");
  }
  return $ = {
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
    promiseHooks: {
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
    },
    startupSnapshot: {
      addDeserializeCallback: () => notimpl("addDeserializeCallback"),
      addSerializeCallback: () => notimpl("addSerializeCallback"),
      setDeserializeMainFunction: () => notimpl("setDeserializeMainFunction"),
      isBuildingSnapshot: () => notimpl("isBuildingSnapshot")
    },
    Deserializer,
    Serializer
  }, hideFromStack(notimpl, cachedDataVersionTag, getHeapSnapshot, getHeapStatistics, getHeapSpaceStatistics, getHeapCodeStatistics, setFlagsFromString, deserialize, takeCoverage, stopCoverage, serialize, writeHeapSnapshot, setHeapSnapshotNearHeapLimit, Deserializer, Serializer, DefaultDeserializer, DefaultSerializer, GCProfiler), $;
})
