(function () {"use strict";
  var $;
  const { hideFromStack, throwNotImplemented } = @requireId(2);
  function createSocket() {
    throwNotImplemented("node:dgram createSocket", 1630);
  }
  function Socket() {
    throwNotImplemented("node:dgram Socket", 1630);
  }
  function _createSocketHandle() {
    throwNotImplemented("node:dgram _createSocketHandle", 1630);
  }
  return $ = {
    createSocket,
    Socket,
    _createSocketHandle
  }, hideFromStack(createSocket, Socket, _createSocketHandle), $;
})
