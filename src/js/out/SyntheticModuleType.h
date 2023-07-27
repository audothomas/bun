enum SyntheticModuleType : uint64_t {
    JavaScript = 0,
    PackageJSONTypeModule = 1,
    Wasm = 2,
    ObjectModule = 3,
    File = 4,
    ESM = 5,

    // ooh deprecated scary oooh scary boo
    Buffer = 1025,
    Process = 1024,
    NativeEvents = 1026,
    StringDecoder = 1027,
    NodeModule = 1028,
    TTY = 1029,
    NodeUtilTypes = 1030,
    Constants = 1031,
    BunJSC = 1032,

    // Built in modules are loaded through InternalModuleRegistry by numerical ID.
    // In this enum are represented as `(1 << 9) & id`
    InternalModuleRegistryFlag = 1 << 9,
    BunFFI = 512,
    BunSqlite = 513,
    InternalShared = 514,
    NodeAssert = 515,
    NodeAssertStrict = 516,
    NodeAsyncHooks = 517,
    NodeChildProcess = 518,
    NodeCluster = 519,
    NodeCrypto = 520,
    NodeDgram = 521,
    NodeDiagnosticsChannel = 522,
    NodeDNS = 523,
    NodeDNSPromises = 524,
    NodeEvents = 525,
    NodeFS = 526,
    NodeFSPromises = 527,
    NodeHttp = 528,
    NodeHttp2 = 529,
    NodeHttps = 530,
    NodeInspector = 531,
    NodeNet = 532,
    NodeOS = 533,
    NodePathPosix = 534,
    NodePath = 535,
    NodePathWin32 = 536,
    NodePerfHooks = 537,
    NodeReadline = 538,
    NodeReadlinePromises = 539,
    NodeRepl = 540,
    NodeStreamConsumers = 541,
    NodeStream = 542,
    NodeStreamPromises = 543,
    NodeStreamWeb = 544,
    NodeTimers = 545,
    NodeTimersPromises = 546,
    NodeTLS = 547,
    NodeTraceEvents = 548,
    NodeUrl = 549,
    NodeUtil = 550,
    NodeV8 = 551,
    NodeVM = 552,
    NodeWasi = 553,
    NodeZlib = 554,
    ThirdpartyDepd = 555,
    ThirdpartyDetectLibc = 556,
    ThirdpartyDetectLibcLinux = 557,
    ThirdpartyUndici = 558,
    ThirdpartyWS = 559,
    
    // Native modules are loaded ... TODO, but we'll use 1024 and up
    NodeBuffer = 1024,
    NodeProcess = 1025,
    BunEventsNative = 1026,
    NodeStringDecoder = 1027,
    NodeModule = 1028,
    NodeTty = 1029,
    NodeUtilTypes = 1030,
    NodeConstants = 1031,
    BunJSC = 1032,

};

#define BUN_FOREACH_NATIVE_MODULE_NAME(macro) \
    macro(NodeBuffer, 1024) \
    macro(NodeProcess, 1025) \
    macro(BunEventsNative, 1026) \
    macro(NodeStringDecoder, 1027) \
    macro(NodeModule, 1028) \
    macro(NodeTty, 1029) \
    macro(NodeUtilTypes, 1030) \
    macro(NodeConstants, 1031) \
    macro(BunJSC, 1032) \
