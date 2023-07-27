#include "InternalModuleRegistry.h"

#include "ZigGlobalObject.h"
#include "JavaScriptCore/BuiltinUtils.h"
#include "JavaScriptCore/JSFunction.h"
#include "JavaScriptCore/LazyProperty.h"
#include "JavaScriptCore/LazyPropertyInlines.h"
#include "JavaScriptCore/VMTrapsInlines.h"

#include "InternalModuleRegistryConstants.h"

namespace Bun {

#define INTERNAL_MODULE_REGISTRY_GENERATE(init, SOURCE)                                                            \
    SourceCode source = JSC::makeSource(SOURCE, {});                                                               \
                                                                                                                   \
    JSFunction* func                                                                                               \
        = JSFunction::create(                                                                                      \
            init.vm,                                                                                               \
            createBuiltinExecutable(                                                                               \
                init.vm, source,                                                                                   \
                Identifier::fromString(init.vm, "require"_s),                                                      \
                ImplementationVisibility::Public,                                                                  \
                ConstructorKind::None,                                                                             \
                ConstructAbility::CannotConstruct)                                                                 \
                ->link(init.vm, nullptr, source),                                                                  \
            static_cast<JSC::JSGlobalObject*>(init.owner));                                                        \
                                                                                                                   \
    JSC::MarkedArgumentBuffer argList;                                                                             \
    JSValue result = JSC::call(init.owner, func, JSC::getCallData(func), init.owner, JSC::MarkedArgumentBuffer()); \
    ASSERT(result.isCell());                                                                                       \
    init.set(result.asCell());

InternalModuleRegistry InternalModuleRegistry::create()
{
    InternalModuleRegistry registry;
#include "../../../src/js/out/InternalModuleRegistry+initInternalModules.h"
    return registry;
}

JSValue InternalModuleRegistry::get(JSGlobalObject* globalObject, ModuleID id)
{
    return m_internalModule[id].get(globalObject);
}

JSValue InternalModuleRegistry::get(JSGlobalObject* globalObject, unsigned id)
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

#undef INTERNAL_MODULE_REGISTRY_GENERATE
