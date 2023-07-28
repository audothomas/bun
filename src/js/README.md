# JS Modules

**TLDR**: If anything here changes, re-run `make js`. If you add/remove files, `make regenerate-bindings`.

- `./node` contains all `node:*` modules
- `./bun` contains all `bun:*` modules
- `./thirdparty` contains npm modules we replace like `ws`
- `./internal` contains modules that aren't assigned to the module resolver

Each `.ts`/`.js` file above is assigned a numeric id at compile time and inlined into an array of lazily initialized modules. `require` is replaced with `$requireId(id)` which allows these modules to import each other in a way that skips the module resolver. Being written in a syncronous format also makes this faster than ESM. All calls to `require` must be statically known.

## Builtins Syntax

Within these files, the `$` prefix on variables can be used to access private property names as well as JSC intrinsics.

```ts
// Many globals have private versions which are impossible for the user to
// tamper with. Though, these global variables are auto-prefixed by the bundler.
const hello = $Array.from(...);

// Similar situation with prototype values. These aren't autoprefixed since it depends on type.
something.$then(...);
map.$set(...);

// Internal variables we define
$requireMap.$has("elysia");

// JSC engine intrinsics. These usually translate directly to bytecode instructions.
const arr = $newArrayWithSize(5);
// A side effect of this is that using an intrinsic incorrectly like
// this will fail to parse and cause a segfault.
console.log($getInternalField)
```

V8 has a [similar feature](https://v8.dev/blog/embedded-builtins) to this syntax (they use `%` instead)

## Builtin Modules

In module files, instead of using `module.exports`, use the `$exports` variable. Due to the internal implementation, these must be `JSCell` types (function / object).

```ts
$exports = {
  hello: 2,
  world: 3,
};

// This is needed to make TS happy. It is removed during bundling.
export {};
```

To actually wire up one of these modules to the resolver, that is done separately in `module_resolver.zig`. Maybe in the future we can do codegen for it.

## Builtin Functions

`./functions` contains isolated functions. Each function within is bundled separately, meaning you may not use global variables, non-type `import`s, and even directly referencing the other functions in these files. `require` is still resolved the same way it does in the modules.

In function files, these are accessible in C++ by using `<file><function>CodeGenerator(vm)`, for example:

```cpp
object->putDirectBuiltinFunction(
  vm,
  globalObject,
  identifier,
  // ReadableStream.ts, `function readableStreamToJSON()`
  // This returns a FunctionExecutable* (extends JSCell*, but not JSFunction*).
  readableStreamReadableStreamToJSONCodeGenerator(vm),
  JSC::PropertyAttribute::Function | JSC::PropertyAttribute::DontDelete | 0
);
```

## Building

Run `make js` to bundle all the builtins. The output is placed in `src/js/out/{modules,functions}/`, where these files are loaded dynamically by `bun-debug` (an exact filepath is inlined into the binary pointing at where you cloned bun, so moving the binary to another machine may not work). In a release build, these get minified and inlined into the binary (Please commit those generated headers).

If you change the list of files or functions, you will have to run `make regenerate-bindings`, but otherwise any change can be done with just `make js`.

## Notes on how the build process works

_This isn't really required knowledge to use it, but a rough overview of how ./\_codegen/\* works_

The build process is built on top of Bun's bundler. The first step is scanning all modules and assigning each a numerical ID. The order is determined by an A-Z sort.

The `$` for private names is actually a lie, and in JSC it actually uses `@`; though that is a syntax error in regular JS/TS, so we opted for better IDE support. So first we have to pre-process the files to spot all instances of `$` at the start of an identifier and we convert it to `__intrinsic__`. We also scan for `require(string)` and replace it with `$requireId(n)` after resolving it to the integer id, which is defined in `./functions/Module.ts`. `$exports = ...;` is transformed into `return ...;`, however this transform is a little more complicated that a string replace because it supports `doSomething($exports)` and other cases.

The preprocessor is smart enough to not replace `$` in strings, comments, regex, etc. However, it is not a real JS parser and instead a recursive regex-based nightmare, so may hit some edge cases. Yell at Dave if it breaks.

The module is then printed like:

```ts
// @ts-nocheck
$$capture_start$$(function () {
  const path = __intrinsic__requireId(23);
  // user code is pasted here
  return {
    cool: path,
  };
}).$$capture_end$$;
```

This capture thing is used to extract the function declaration afterwards, this is more useful in the functions case where functions can have arguments, or be async functions.

After bundling, the inner part is extracted, and then `__intrinsic__` is replaced to `@`.

These can then be inlined into C++ headers and loaded with `createBuiltin`. This is done in `InternalModuleRegistry.cpp`.
