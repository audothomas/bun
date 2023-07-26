#include "_NativeModule.h"

namespace Zig {
using namespace WebCore;

DEFINE_NATIVE_MODULE(NativeEvents)
{
    INIT_NATIVE_MODULE(1);
    put(JSC::Identifier::fromString(vm, "EventEmitter"_s), WebCore::JSEventEmitter::getConstructor(vm, globalObject));
    putNativeFn(JSC::Identifier::fromString(vm, "getEventListeners"_s), Events_functionGetEventListeners);

    //   exportNames.append(JSC::Identifier::fromString(vm, "listenerCount"_s));
    //   exportValues.append(JSC::JSFunction::create(
    //       vm, lexicalGlobalObject, 0, MAKE_STATIC_STRING_IMPL("listenerCount"),
    //       Events_functionListenerCount, ImplementationVisibility::Public));
    //   exportNames.append(JSC::Identifier::fromString(vm, "once"_s));
    //   exportValues.append(JSC::JSFunction::create(
    //       vm, lexicalGlobalObject, 0, MAKE_STATIC_STRING_IMPL("once"),
    //       Events_functionOnce, ImplementationVisibility::Public));
    //   exportNames.append(JSC::Identifier::fromString(vm, "on"_s));
    //   exportValues.append(JSC::JSFunction::create(
    //       vm, lexicalGlobalObject, 0, MAKE_STATIC_STRING_IMPL("on"),
    //       Events_functionOn, ImplementationVisibility::Public));
    //   exportNames.append(
    //       JSC::Identifier::fromString(vm, "captureRejectionSymbol"_s));
    //   exportValues.append(Symbol::create(
    //       vm, vm.symbolRegistry().symbolForKey("nodejs.rejection"_s)));
    RETURN_NATIVE_MODULE();
}

} // namespace Zig
