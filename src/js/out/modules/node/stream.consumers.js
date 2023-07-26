(()=>{"use strict";var {module}=$_BunCommonJSModule_$;var { Bun } = globalThis[Symbol.for("Bun.lazy")]("primordials"), arrayBuffer = Bun.readableStreamToArrayBuffer, text = Bun.readableStreamToText, json = (stream) => Bun.readableStreamToText(stream).then(JSON.parse), buffer = async (readableStream) => {
  return new Buffer(await arrayBuffer(readableStream));
}, blob = Bun.readableStreamToBlob;
module.exports = {
  arrayBuffer,
  text,
  json,
  buffer,
  blob
};
})()