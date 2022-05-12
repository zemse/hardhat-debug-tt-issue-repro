# Reproduction for debug_traceTransaction issue

This issue is reproducible on Arbitrum and Optimism. For mainnet txs the script seems to work.

```
% npx hardhat run scripts/sample-script.js

TypeError: Cannot read property 'negative' of undefined
    at BN.cmp (/Users/sohamzemse/Workspace/smart-contract-projects/issue-repro/node_modules/ethereumjs-util/node_modules/bn.js/lib/bn.js:2869:36)
    at BN.lt (/Users/sohamzemse/Workspace/smart-contract-projects/issue-repro/node_modules/ethereumjs-util/node_modules/bn.js/lib/bn.js:2919:17)
    at VM._runTx (/Users/sohamzemse/Workspace/smart-contract-projects/issue-repro/node_modules/@ethereumjs/vm/src/runTx.ts:298:22)
    at processTicksAndRejections (node:internal/process/task_queues:96:5)
    at VM.runTx (/Users/sohamzemse/Workspace/smart-contract-projects/issue-repro/node_modules/@ethereumjs/vm/src/runTx.ts:204:20)
    at /Users/sohamzemse/Workspace/smart-contract-projects/issue-repro/node_modules/hardhat/src/internal/hardhat-network/provider/node.ts:1387:15
    at VMDebugTracer.trace (/Users/sohamzemse/Workspace/smart-contract-projects/issue-repro/node_modules/hardhat/src/internal/hardhat-network/stack-traces/vm-debug-tracer.ts:76:7)
    at HardhatNode._runInBlockContext (/Users/sohamzemse/Workspace/smart-contract-projects/issue-repro/node_modules/hardhat/src/internal/hardhat-network/provider/node.ts:2136:14)
    at HardhatNetworkProvider.request (/Users/sohamzemse/Workspace/smart-contract-projects/issue-repro/node_modules/hardhat/src/internal/hardhat-network/provider/provider.ts:118:18)
    at main (/Users/sohamzemse/Workspace/smart-contract-projects/issue-repro/scripts/sample-script.js:27:24)
```
