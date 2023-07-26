#pragma once
#include "JSBuffer.h"
#include "ZigGlobalObject.h"
#include "JavaScriptCore/JSGlobalObject.h"
#include "JavaScriptCore/ObjectConstructor.h"

// These modules are implemented in native code as a function which writes ESM export key+value pairs.
// The following macros help simplify the implementation of these functions.

// To add a new native module
//   1. Find `ResolvedSource.Tag` inside of `exports.zig`, and add a new tag for the module.
//   2. Add a case to `module_loader.zig` that resolevs the import.
//   3. Add that tag to BUN_FOREACH_NATIVE_MODULE_NAME
//   4. Add DEFINE_NATIVE_MODULE(name) somewhere. Check other instances for what can be used, as
//      well as the actual declaration below to see how it works.
//      - INIT_NATIVE_MODULE(n) is called with the number of exports
//      - put(id, jsvalue) adds an export
//      - putNativeFn(id, nativefn) lets you quickly add from `JSC_DEFINE_HOST_FUNCTION`
//      - NATIVE_MODULE_FINISH() do asserts and finalize everything.

// If you decide to not use INIT_NATIVE_MODULE. make sure the first property given is the default export

#define BUN_FOREACH_NATIVE_MODULE_NAME(macro) \
    macro(Buffer, 1025) \
    macro(Process, 1024) \
    macro(NativeEvents, 1026) \
    macro(StringDecoder, 1027) \
    macro(NodeModule, 1028) \
    macro(TTY, 1029) \
    macro(NodeUtilTypes, 1030) \
    macro(Constants, 1031) \
    macro(BunJSC, 1032) \

//

#if ASSERT_ENABLED

// This function is a lie. It doesnt return, but rather it performs an assertion that what you
// passed to INIT_NATIVE_MODULE is indeed correct.
#define RETURN_NATIVE_MODULE() \
  ASSERT_WITH_MESSAGE(numberOfActualExportNames == passedNumberOfExportNames, "NATIVE_MODULE_START() was given the incorrect value.");

#define __NATIVE_MODULE_ASSERT_DECL \
  int numberOfActualExportNames = 0; \
  int passedNumberOfExportNames = numberOfExportNames; \
#define __NATIVE_MODULE_ASSERT_INCR numberOfActualExportNames++;

#else

#define RETURN_NATIVE_MODULE() ;
#define __NATIVE_MODULE_ASSERT_INCR ;
#define __NATIVE_MODULE_ASSERT_DECL ;

#endif

#define DEFINE_NATIVE_MODULE(name)                                      \
  inline void generateNativeModule_##name(JSC::JSGlobalObject* lexicalGlobalObject, \
    JSC::Identifier moduleKey, \
    Vector<JSC::Identifier, 4>& exportNames, \
    JSC::MarkedArgumentBuffer& exportValues)

#define INIT_NATIVE_MODULE(numberOfExportNames) \
  Zig::GlobalObject* globalObject = reinterpret_cast<Zig::GlobalObject*>(lexicalGlobalObject); \
  JSC::VM &vm = globalObject->vm(); \
  JSC::JSObject *defaultObject = JSC::constructEmptyObject(globalObject, globalObject->objectPrototype(), numberOfExportNames); \
  __NATIVE_MODULE_ASSERT_DECL \
  auto put = [&](JSC::Identifier name, JSC::JSValue value) { \
    defaultObject->putDirect(vm, name, value); \
    exportNames.append(name); \
    exportValues.append(value); \
    __NATIVE_MODULE_ASSERT_INCR \
  }; \
  auto putNativeFn = [&](JSC::Identifier name, JSC::NativeFunction ptr) { \
    JSC::JSFunction* value = JSC::JSFunction::create(vm, globalObject, 1, name.string(), ptr, JSC::ImplementationVisibility::Public, JSC::NoIntrinsic, ptr); \
    defaultObject->putDirect(vm, name, value); \
    exportNames.append(name); \
    exportValues.append(value); \
    __NATIVE_MODULE_ASSERT_INCR \
  }; \
  exportNames.reserveCapacity(numberOfExportNames + 1); \
  exportValues.ensureCapacity(numberOfExportNames + 1); \
  exportNames.append(vm.propertyNames->defaultKeyword); \
  exportValues.append(defaultObject); \
  while(0){}

namespace Zig {

#define DECLARE_NATIVE_MODULE(name, _) DEFINE_NATIVE_MODULE(name);
BUN_FOREACH_NATIVE_MODULE_NAME(DECLARE_NATIVE_MODULE)
#undef DECLARE_NATIVE_MODULE

} // namespace Zig
