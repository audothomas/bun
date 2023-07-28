#pragma once
#include "root.h"
#include "JavaScriptCore/JSInternalFieldObjectImpl.h"
#include "JavaScriptCore/JSInternalFieldObjectImplInlines.h"
#include "../../../src/js/out/InternalModuleRegistry+numberOfModules.h"

namespace Bun {
using namespace JSC;

class InternalModuleRegistry : public JSInternalFieldObjectImpl<BUN_INTERNAL_MODULE_COUNT> {
protected:
    template<typename Visitor>
    void visitImpl(Visitor& visitor);

    LazyProperty<JSGlobalObject, JSCell> m_internalModule[BUN_INTERNAL_MODULE_COUNT];

public:
    static InternalModuleRegistry create();

    enum ModuleID {
#include "../../../src/js/out/InternalModuleRegistry+enum.h"
    };

    // This is like `require` but for internal modules present in `src/js/*`
    JSCell* get(JSGlobalObject* globalObject, ModuleID id);
    JSCell* get(JSGlobalObject* globalObject, unsigned id);
    // This is the js version of InternalModuleRegistry::get
    static JSC_DECLARE_HOST_FUNCTION(jsRequireId);

    void visit(AbstractSlotVisitor& visitor);
    void visit(SlotVisitor& visitor);
};

} // namespace Bun
