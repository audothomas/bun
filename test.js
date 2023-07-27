//
const x = $vm.createBuiltin("(function (x) { return @requireId(x); })");
console.log(x(30));
