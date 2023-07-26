<<<<<<< HEAD
var s=(z)=>{return import.meta.require(z)};function N(z,B={}){if(z instanceof URL)throw new TypeError("Watch URLs are not supported yet");else if(Buffer.isBuffer(z))z=z.toString();else if(typeof z!=="string")throw new TypeError("Expected path to be a string or Buffer");let C=null;if(typeof B==="string")B={encoding:B};const G=M(),H=S.watch(z,B||{},(D,A)=>{if(G.push({eventType:D,filename:A}),C){const I=C;C=null,I()}});return{[Symbol.asyncIterator](){let D=!1;return{async next(){while(!D){let A;while(A=G.shift()){if(A.eventType==="close")return D=!0,{value:void 0,done:!0};if(A.eventType==="error")throw D=!0,A.filename;return{value:A,done:!1}}const{promise:I,resolve:L}=Promise.withResolvers();C=L,await I}return{value:void 0,done:!0}},return(){if(!D){if(H.close(),D=!0,C){const A=C;C=null,A()}}return{value:void 0,done:!0}}}}}}var{createFIFO:M}=globalThis[Symbol.for("Bun.lazy")]("primordials"),S=Bun.fs(),K="::bunternal::",J={[K]:(z)=>{return async function(...B){return await 1,z.apply(S,B)}}}[K],P=J(S.accessSync),Q=J(S.appendFileSync),U=J(S.closeSync),V=J(S.copyFileSync),X=J(S.existsSync),Y=J(S.chownSync),Z=J(S.chmodSync),_=J(S.fchmodSync),$=J(S.fchownSync),q=J(S.fstatSync),O=J(S.fsyncSync),g=J(S.ftruncateSync),T=J(S.futimesSync),W=J(S.lchmodSync),j=J(S.lchownSync),k=J(S.linkSync),E=S.lstat.bind(S),h=J(S.mkdirSync),w=J(S.mkdtempSync),x=J(S.openSync),F=J(S.readSync),R=J(S.writeSync),b=S.readdir.bind(S),u=S.readFile.bind(S),d=J(S.writeFileSync),c=J(S.readlinkSync),v=J(S.realpathSync),a=J(S.renameSync),y=S.stat.bind(S),l=J(S.symlinkSync),p=J(S.truncateSync),m=J(S.unlinkSync),n=J(S.utimesSync),t=J(S.lutimesSync),r=J(S.rmSync),o=J(S.rmdirSync),f=(z,B,C)=>{return new Promise((G,H)=>{try{var D=S.writevSync(z,B,C)}catch(A){H(A);return}G({bytesWritten:D,buffers:B})})},i=(z,B,C)=>{return new Promise((G,H)=>{try{var D=S.readvSync(z,B,C)}catch(A){H(A);return}G({bytesRead:D,buffers:B})})},SS={access:P,appendFile:Q,close:U,copyFile:V,exists:X,chown:Y,chmod:Z,fchmod:_,fchown:$,fstat:q,fsync:O,ftruncate:g,futimes:T,lchmod:W,lchown:j,link:k,lstat:E,mkdir:h,mkdtemp:w,open:x,read:F,write:R,readdir:b,readFile:u,writeFile:d,readlink:c,realpath:v,rename:a,stat:y,symlink:l,truncate:p,unlink:m,utimes:n,lutimes:t,rm:r,rmdir:o,watch:N,writev:f,readv:i,constants,[Symbol.for("CommonJS")]:0};export{f as writev,d as writeFile,R as write,N as watch,n as utimes,m as unlink,p as truncate,l as symlink,y as stat,o as rmdir,r as rm,a as rename,v as realpath,i as readv,c as readlink,b as readdir,u as readFile,F as read,x as open,w as mkdtemp,h as mkdir,t as lutimes,E as lstat,k as link,j as lchown,W as lchmod,T as futimes,g as ftruncate,O as fsync,q as fstat,$ as fchown,_ as fchmod,X as exists,SS as default,V as copyFile,U as close,Y as chown,Z as chmod,Q as appendFile,P as access};
=======
"use strict";var watch = function(filename, options = {}) {
  const events = [];
  if (filename instanceof URL)
    throw new TypeError("Watch URLs are not supported yet");
  else if (Buffer.isBuffer(filename))
    filename = filename.toString();
  else if (typeof filename !== "string")
    throw new TypeError("Expected path to be a string or Buffer");
  let nextEventResolve = null;
  if (typeof options === "string")
    options = { encoding: options };
  return fs.watch(filename, options || {}, (eventType, filename2) => {
    if (events.push({ eventType, filename: filename2 }), nextEventResolve) {
      const resolve = nextEventResolve;
      nextEventResolve = null, resolve();
    }
  }), {
    async* [Symbol.asyncIterator]() {
      let closed = !1;
      while (!closed) {
        while (events.length) {
          let event = events.shift();
          if (event.eventType === "close") {
            closed = !0;
            break;
          }
          if (event.eventType === "error")
            throw closed = !0, event.filename;
          yield event;
        }
        await new Promise((resolve) => nextEventResolve = resolve);
      }
    }
  };
}, fs = Bun.fs(), notrace = "::bunternal::", promisify = {
  [notrace]: (fsFunction) => {
    var func = {
      [notrace]: function(resolve, reject, args) {
        var result;
        try {
          result = fsFunction.apply(fs, args), args = void 0;
        } catch (err) {
          args = void 0, reject(err);
          return;
        }
        resolve(result);
      }
    }[notrace];
    return async function(...args) {
      return await new Promise((resolve, reject) => {
        process.nextTick(func, resolve, reject, args);
      });
    };
  }
}[notrace];
$_BunCommonJSModule_$.module.exports = {
  access: promisify(fs.accessSync),
  appendFile: promisify(fs.appendFileSync),
  close: promisify(fs.closeSync),
  copyFile: promisify(fs.copyFileSync),
  exists: promisify(fs.existsSync),
  chown: promisify(fs.chownSync),
  chmod: promisify(fs.chmodSync),
  fchmod: promisify(fs.fchmodSync),
  fchown: promisify(fs.fchownSync),
  fstat: promisify(fs.fstatSync),
  fsync: promisify(fs.fsyncSync),
  ftruncate: promisify(fs.ftruncateSync),
  futimes: promisify(fs.futimesSync),
  lchmod: promisify(fs.lchmodSync),
  lchown: promisify(fs.lchownSync),
  link: promisify(fs.linkSync),
  lstat: promisify(fs.lstatSync),
  mkdir: promisify(fs.mkdirSync),
  mkdtemp: promisify(fs.mkdtempSync),
  open: promisify(fs.openSync),
  read: promisify(fs.readSync),
  write: promisify(fs.writeSync),
  readdir: promisify(fs.readdirSync),
  readFile: promisify(fs.readFileSync),
  writeFile: promisify(fs.writeFileSync),
  readlink: promisify(fs.readlinkSync),
  realpath: promisify(fs.realpathSync),
  rename: promisify(fs.renameSync),
  stat: promisify(fs.statSync),
  symlink: promisify(fs.symlinkSync),
  truncate: promisify(fs.truncateSync),
  unlink: promisify(fs.unlinkSync),
  utimes: promisify(fs.utimesSync),
  lutimes: promisify(fs.lutimesSync),
  rm: promisify(fs.rmSync),
  rmdir: promisify(fs.rmdirSync),
  writev: (fd, buffers, position) => {
    return new Promise((resolve, reject) => {
      try {
        var bytesWritten = fs.writevSync(fd, buffers, position);
      } catch (err) {
        reject(err);
        return;
      }
      resolve({
        bytesWritten,
        buffers
      });
    });
  },
  readv: (fd, buffers, position) => {
    return new Promise((resolve, reject) => {
      try {
        var bytesRead = fs.readvSync(fd, buffers, position);
      } catch (err) {
        reject(err);
        return;
      }
      resolve({
        bytesRead,
        buffers
      });
    });
  },
  constants,
  watch
};
>>>>>>> 0678fef5a (sadffdsa)
