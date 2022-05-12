// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const ethers = require("ethers");

async function main() {
  // arbitrum
  const rpc =
    "https://arb-mainnet.g.alchemy.com/v2/X9IiwzX8uzcX734EFoO9SjKeyMOXaOcN"; // temporary api key

  const hash =
    "0x245f91f625acb4b98809e146a6942e34dca23562ab79254e292f0d8254eb9caa"; // random tx hash from etherscan

  // optimism
  // const rpc =
  //   "https://opt-mainnet.g.alchemy.com/v2/X9IiwzX8uzcX734EFoO9SjKeyMOXaOcN"; // temporary api key

  // // random tx hash from arbiscan
  // const hash =
  //   "0xc717d16f65d483412383ed235ce11862f996742ec03e9bc0135b0bc4567ea008"; // random tx hash from etherscan

  const provider = new ethers.providers.JsonRpcProvider(rpc);
  const txFromRpc = await provider.getTransaction(hash);

  await hre.network.provider.send("hardhat_reset", [
    {
      forking: {
        jsonRpcUrl: rpc,
        blockNumber: txFromRpc.blockNumber,
      },
    },
  ]);

  // this line errors
  const trace = await hre.network.provider.send("debug_traceTransaction", [
    hash,
  ]);

  // TypeError: Cannot read property 'negative' of undefined
  //   at BN.cmp (/Users/sohamzemse/Workspace/smart-contract-projects/issue-repro/node_modules/@ethereumjs/tx/node_modules/bn.js/lib/bn.js:2869:36)
  //   at BN.lt (/Users/sohamzemse/Workspace/smart-contract-projects/issue-repro/node_modules/@ethereumjs/tx/node_modules/bn.js/lib/bn.js:2919:17)
  //   at VM._runTx (/Users/sohamzemse/Workspace/smart-contract-projects/issue-repro/node_modules/@ethereumjs/vm/src/runTx.ts:298:22)
  //   at processTicksAndRejections (node:internal/process/task_queues:96:5)
  //   at VM.runTx (/Users/sohamzemse/Workspace/smart-contract-projects/issue-repro/node_modules/@ethereumjs/vm/src/runTx.ts:204:20)
  //   at /Users/sohamzemse/Workspace/smart-contract-projects/issue-repro/node_modules/hardhat/src/internal/hardhat-network/provider/node.ts:1387:15
  //   at VMDebugTracer.trace (/Users/sohamzemse/Workspace/smart-contract-projects/issue-repro/node_modules/hardhat/src/internal/hardhat-network/stack-traces/vm-debug-tracer.ts:76:7)
  //   at HardhatNode._runInBlockContext (/Users/sohamzemse/Workspace/smart-contract-projects/issue-repro/node_modules/hardhat/src/internal/hardhat-network/provider/node.ts:2136:14)
  //   at HardhatNetworkProvider.request (/Users/sohamzemse/Workspace/smart-contract-projects/issue-repro/node_modules/hardhat/src/internal/hardhat-network/provider/provider.ts:118:18)
  //   at main (/Users/sohamzemse/Workspace/smart-contract-projects/issue-repro/scripts/sample-script.js:37:17)

  console.log(trace);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
