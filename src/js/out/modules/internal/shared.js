<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> c21e64a6c (not done yet but this is how far i am)
(function () {"use strict";
  class NotImplementedError extends Error {
    code;
    constructor(feature, issue) {
      super(feature + " is not yet implemented in Bun." + (issue ? " Track the status & thumbs up the issue: https://github.com/oven-sh/bun/issues/" + issue : ""));
      this.name = "NotImplementedError", this.code = "ERR_NOT_IMPLEMENTED", hideFromStack(NotImplementedError);
    }
  }
  function throwNotImplemented(feature, issue) {
    throw hideFromStack(throwNotImplemented), new NotImplementedError(feature, issue);
  }
  function hideFromStack(...fns) {
    for (let fn of fns)
      Object.defineProperty(fn, "name", {
        value: "::bunternal::"
      });
  }
  return {
    NotImplementedError,
    throwNotImplemented,
    hideFromStack
  };
})
<<<<<<< HEAD
=======
(function (){"use strict";class NotImplementedError extends Error{code;constructor(feature,issue){super(feature+" is not yet implemented in Bun."+(issue?" Track the status & thumbs up the issue: https://github.com/oven-sh/bun/issues/"+issue:""));this.name="NotImplementedError",this.code="ERR_NOT_IMPLEMENTED",hideFromStack(NotImplementedError)}}function throwNotImplemented(feature,issue){throw hideFromStack(throwNotImplemented),new NotImplementedError(feature,issue)}function hideFromStack(...fns){for(let fn of fns)Object.defineProperty(fn,"name",{value:"::bunternal::"})}return{NotImplementedError,throwNotImplemented,hideFromStack}})
>>>>>>> b105f9932 (not done but work)
=======
>>>>>>> c21e64a6c (not done yet but this is how far i am)
