#include "InternalModuleRegistry.h"

#include "ZigGlobalObject.h"
#include "JavaScriptCore/BuiltinUtils.h"
#include "JavaScriptCore/JSFunction.h"
#include "JavaScriptCore/LazyProperty.h"
#include "JavaScriptCore/LazyPropertyInlines.h"
#include "JavaScriptCore/VMTrapsInlines.h"

#include "InternalModuleRegistryConstants.h"

namespace Bun {

#define INTERNAL_MODULE_REGISTRY_GENERATE_(init, SOURCE)    \
    SourceCode source = JSC::makeSource(SOURCE, {});        \
                                                            \
    JSFunction* func                                        \
        = JSFunction::create(                               \
            init.vm,                                        \
            createBuiltinExecutable(                        \
                init.vm, source,                            \
                Identifier(),                               \
                ImplementationVisibility::Public,           \
                ConstructorKind::None,                      \
                ConstructAbility::CannotConstruct)          \
                ->link(init.vm, nullptr, source),           \
            static_cast<JSC::JSGlobalObject*>(init.owner)); \
                                                            \
    JSC::MarkedArgumentBuffer argList;                      \
                                                            \
    auto scope = DECLARE_CATCH_SCOPE(init.vm);              \
                                                            \
    JSValue result = JSC::call(                             \
        init.owner,                                         \
        func,                                               \
        JSC::getCallData(func),                             \
        init.owner, JSC::MarkedArgumentBuffer());           \
                                                            \
    if (UNLIKELY(scope.exception())) {                      \
        init.set(scope.exception());                        \
    } else {                                                \
        init.set(result.asCell());                          \
    }

#if BUN_DEBUG
void initializeInternalModuleFromDisk(
    const JSC::LazyProperty<JSC::JSGlobalObject, JSC::JSCell>::Initializer& init,
    WTF::String moduleId,
    WTF::String file)
{
    if (auto contents = WTF::FileSystemImpl::readEntireFile(file)) {
        auto string = WTF::String::fromUTF8(contents.value());
        INTERNAL_MODULE_REGISTRY_GENERATE_(init, string);
    } else {
        printf("\n"
               "FileNotFound: \"%s\".\n"
               "\n"
               "error: bun-debug failed to load bundled version of \"%s\" (was it deleted?)\n"
               "\n"
               "In the development build of Bun, all JavaScript code is loaded from disk to\n"
               "allow to allow a faster iteration cycle. You can run `make js` to regenerate\n"
               "these files. This should have automatically happened when you ran `make dev`\n"
               "\n",
            file.utf8().data(),
            moduleId.utf8().data());
        abort();
    }
}
#define INTERNAL_MODULE_REGISTRY_GENERATE(init, moduleId, filename, SOURCE) \
    initializeInternalModuleFromDisk(init, moduleId, filename)
#else
#define INTERNAL_MODULE_REGISTRY_GENERATE(init, moduleId, filename, SOURCE) \
    INTERNAL_MODULE_REGISTRY_GENERATE_(init, SOURCE)
#endif

InternalModuleRegistry InternalModuleRegistry::create()
{
    InternalModuleRegistry registry;
#include "../../../src/js/out/InternalModuleRegistry+initInternalModules.h"
    return registry;
}

JSCell* InternalModuleRegistry::get(JSGlobalObject* globalObject, ModuleID id)
{
    return m_internalModule[id].get(globalObject);
}

JSCell* InternalModuleRegistry::get(JSGlobalObject* globalObject, unsigned id)
{
    return m_internalModule[id].get(globalObject);
}

template<typename Visitor>
void InternalModuleRegistry::visitImpl(Visitor& visitor)
{
#include "../../../src/js/out/InternalModuleRegistry+visitImpl.h"
}

void InternalModuleRegistry::visit(AbstractSlotVisitor& visitor)
{
    this->visitImpl(visitor);
}
void InternalModuleRegistry::visit(SlotVisitor& visitor)
{
    this->visitImpl(visitor);
}

JSC_DEFINE_HOST_FUNCTION(InternalModuleRegistry::jsRequireId, (JSGlobalObject * lexicalGlobalObject, CallFrame* callframe))
{
    auto id = callframe->argument(0).toUInt32(lexicalGlobalObject);
    auto module = static_cast<Zig::GlobalObject*>(lexicalGlobalObject)->internalModuleRegistry.get(lexicalGlobalObject, id);
    return JSValue::encode(module);
}

} // namespace Bun

#undef INTERNAL_MODULE_REGISTRY_GENERATE_
#undef INTERNAL_MODULE_REGISTRY_GENERATE
