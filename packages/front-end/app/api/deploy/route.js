import { NextResponse } from "next/server";
import { SUPPORTED_CHAINS } from "./../../constants";

import {
  createWalletClient,
  http,
  publicActions,
  encodeAbiParameters,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";

export async function POST(request) {
  try {
    const body = await request.json();
    const { chainName, contract, constructorArguments } = body;

    if (!chainName || !contract) {
      return NextResponse.json(
        { message: "Missing chainName or contract parameter" },
        { status: 400 }
      );
    }
    if (!SUPPORTED_CHAINS.map((chain) => chain.name).includes(chainName)) {
      return NextResponse.json(
        { message: "Unsupported chain" },
        { status: 400 }
      );
    }
    let chain;
    for (const _chain of SUPPORTED_CHAINS) {
      if (_chain.name === chainName) {
        chain = _chain;
      }
    }

    // Compile
    var solc = require("solc");
    var compilerInput = {
      language: "Solidity",
      sources: {
        source: {
          content: contract,
        },
      },
      settings: {
        outputSelection: {
          "*": {
            "*": ["*"],
          },
        },
      },
    };
    const output = JSON.parse(solc.compile(JSON.stringify(compilerInput)));
    if (Object.keys(output.contracts.source).length === 0) {
      return NextResponse.json(
        { message: "Error while compiling" },
        { status: 500 }
      );
    }
    const bytecode =
      output.contracts.source[Object.keys(output.contracts.source)[0]].evm
        .bytecode.object;
    const abi =
      output.contracts.source[Object.keys(output.contracts.source)[0]].abi;

    // Init Wallet client
    const account = privateKeyToAccount(process.env.BE_ACCOUNT_PK);
    const client = createWalletClient({
      account,
      chain: chain,
      transport: http(),
    }).extend(publicActions);

    // Deploy
    const hash = await client.deployContract({
      abi,
      bytecode: bytecode,
      args: constructorArguments,
    });
    const receipt = await client.waitForTransactionReceipt({ hash });

    if (receipt.status !== "success") {
      return NextResponse.json(
        { message: "Error when broadcasting deployment transaction" },
        { status: 400 }
      );
    }

    // If chain has block explorer generate links
    let linkToBlockExplorer = hash;
    let linkToContract = "";

    if ("blockExplorers" in chain) {
      linkToBlockExplorer = `${chain.blockExplorers.default.url}/tx/${hash}`;
      linkToContract = `${chain.blockExplorers.default.url}/address/${receipt.contractAddress}`;

      // Verify contract
      // Search constructor abi in the abi
      // let constructorInputs = [];
      // for (const _function of abi) {
      //   if (_function.type === "constructor") {
      //     constructorInputs = _function.inputs;
      //   }
      // }
      // const constructorArgs = encodeAbiParameters(
      //   constructorInputs,
      //   constructorArguments
      // );
      // const verificationResponse = await fetch(
      //   `${chain.blockExplorers.default.apiUrl}
      //     ?module=contract
      //     &action=verifysourcecode
      //     &apikey=${process.env.ETHERSCAN_API_TOKEN}
      //     &chainId=${chain.id}
      //     &sourceCode=${compilerInput}
      //     &constructorArguments=${constructorArgs}
      //     &contractaddress=${receipt.contractAddress}
      //     &compilerversion=v0.8.19+commit.7dd6d404
      //     &contractname=contracts/source:${
      //       Object.keys(output.contracts.source)[0]
      //     }
      //     `,
      //   { method: "POST" }
      // );
    }

    return NextResponse.json(
      {
        message: "Contract deployed successfully",
        data: {
          hash: hash,
          linkToBlockExplorer: linkToBlockExplorer,
          linkToContract: linkToContract,
          contractAddress: receipt.contractAddress,
          abi: abi,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error while generating", error: error.message },
      { status: 500 }
    );
  }
}
