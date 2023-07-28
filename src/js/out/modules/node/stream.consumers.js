(function () {"use strict";
  const { readableStreamToArrayBuffer: arrayBuffer, readableStreamToText: text } = Bun, json = (stream) => Bun.readableStreamToText(stream).then(JSON.parse), buffer = async (readableStream) => {
    return new Buffer(await arrayBuffer(readableStream));
  }, blob = Bun.readableStreamToBlob;
  return {
    arrayBuffer,
    text,
    json,
    buffer,
    blob
  };
})
