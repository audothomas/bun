pub const ResolvedSourceTag = enum(u32) {
    // Predefined
    javascript = 0,
    package_json_type_module = 1,
    wasm = 2,
    object = 3,
    file = 4,
    esm = 5,

    // Built in modules are loaded through InternalModuleRegistry by numerical ID.
    // In this enum are represented as `(1 << 9) & id`
    @"bun:ffi" = 512,
    @"bun:sqlite" = 513,
    @"internal:shared" = 514,
    @"node:assert" = 515,
    @"node:assert/strict" = 516,
    @"node:async_hooks" = 517,
    @"node:child_process" = 518,
    @"node:cluster" = 519,
    @"node:crypto" = 520,
    @"node:dgram" = 521,
    @"node:diagnostics_channel" = 522,
    @"node:dns" = 523,
    @"node:dns/promises" = 524,
    @"node:events" = 525,
    @"node:fs" = 526,
    @"node:fs/promises" = 527,
    @"node:http" = 528,
    @"node:http2" = 529,
    @"node:https" = 530,
    @"node:inspector" = 531,
    @"node:net" = 532,
    @"node:os" = 533,
    @"node:path/posix" = 534,
    @"node:path" = 535,
    @"node:path/win32" = 536,
    @"node:perf_hooks" = 537,
    @"node:readline" = 538,
    @"node:readline/promises" = 539,
    @"node:repl" = 540,
    @"node:stream/consumers" = 541,
    @"node:stream" = 542,
    @"node:stream/promises" = 543,
    @"node:stream/web" = 544,
    @"node:timers" = 545,
    @"node:timers/promises" = 546,
    @"node:tls" = 547,
    @"node:trace_events" = 548,
    @"node:url" = 549,
    @"node:util" = 550,
    @"node:v8" = 551,
    @"node:vm" = 552,
    @"node:wasi" = 553,
    @"node:zlib" = 554,
    @"depd" = 555,
    @"detect-libc" = 556,
    @"detect-libc/linux" = 557,
    @"undici" = 558,
    @"ws" = 559,
    // Native modules run through the same system, but with different underlying initializers.
    // They also have bit 10 set to differentiate them from JS builtins.
    @"bun:jsc" = 1584,
    @"node:buffer" = 1585,
    @"node:constants" = 1586,
    @"node:module" = 1587,
    @"node:process" = 1588,
    @"node:string_decoder" = 1589,
    @"node:tty" = 1590,
    @"node:util/types" = 1591,
};