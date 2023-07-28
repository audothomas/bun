(function () {"use strict";
  class Tracing {
    enabled = !1;
    categories = "";
  }
  function ERR_INVALID_ARG_TYPE(name, type, value) {
    const err = @makeTypeError(`The "${name}" argument must be of type ${type}. Received ${value}`);
    return err.code = "ERR_INVALID_ARG_TYPE", err;
  }
  function createTracing(opts) {
    if (typeof opts !== "object" || opts == null)
      throw new ERR_INVALID_ARG_TYPE("options", "Object", opts);
    return new Tracing(opts);
  }
  function getEnabledCategories() {
    return "";
  }
  return {
    createTracing,
    getEnabledCategories
  };
})
