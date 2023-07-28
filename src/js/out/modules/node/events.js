(function () {"use strict";
  const { throwNotImplemented } = @requireId(2), SymbolFor = Symbol.for, kCapture = Symbol("kCapture"), kErrorMonitor = SymbolFor("events.errorMonitor"), kMaxEventTargetListeners = Symbol("events.maxEventTargetListeners"), kMaxEventTargetListenersWarned = Symbol("events.maxEventTargetListenersWarned"), kWatermarkData = SymbolFor("nodejs.watermarkData"), kRejection = SymbolFor("nodejs.rejection"), captureRejectionSymbol = SymbolFor("nodejs.rejection"), ArrayPrototypeSlice = Array.prototype.slice;
  var defaultMaxListeners = 10;
  const EventEmitter = function EventEmitter(opts) {
    if (this._events === void 0 || this._events === this.__proto__._events)
      this._events = { __proto__: null }, this._eventsCount = 0;
    if (this._maxListeners ??= void 0, this[kCapture] = opts?.captureRejections ? Boolean(opts?.captureRejections) : EventEmitterPrototype[kCapture])
      this.emit = emitWithRejectionCapture;
  }, EventEmitterPrototype = EventEmitter.prototype = {};
  return EventEmitterPrototype._events = void 0, EventEmitterPrototype._eventsCount = 0, EventEmitterPrototype._maxListeners = void 0, EventEmitterPrototype.setMaxListeners = function setMaxListeners(n) {
    return validateNumber(n, "setMaxListeners", 0), this._maxListeners = n, this;
  }, EventEmitterPrototype.getMaxListeners = function getMaxListeners() {
    return this._maxListeners ?? defaultMaxListeners;
  }, EventEmitter;
})
