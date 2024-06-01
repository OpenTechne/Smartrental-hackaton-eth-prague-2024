import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request) {
  try {
    const body = await request.json();
    const { agreement } = body;

    if (!agreement) {
      return NextResponse.json(
        { message: "Missing agreement parameter" },
        { status: 400 }
      );
    }

    const msg = await anthropic.messages.create({
      model: "claude-3-opus-20240229",
      max_tokens: 4000,
      temperature: 0,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `You are an expert in writing complex smart contracts in Solidity language. You have a lot of experience in writing complex smart contracts and you create very high quality smart contracts that are gas optimized and ready to be compiled.\n\n<tasks>\n- Carefully ready the lease agreement inside <agreement></agreement> and try to understand all its parts, provisions and obligations. \n- Try to create the smart contract (without comments) in a complex way so it all of its parts, provisions and obligations. \n- Try to name constructor paramaters as much self-describing as possible \n- Always output just the contract as a string with no additional formatting or text\n \n- If you generate something else than a smart contract e. g. a text describing it you will be penalised</tasks>\n\n<agreement${agreement}</agreement>\n\n Contract: \n// SPDX-License-Identifier: MIT`,
            },
          ],
        },
      ],
    });
    const contract = msg.content[0].text;

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

    return NextResponse.json({ bytecode, abi }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error while generating", error: error.message },
      { status: 500 }
    );
  }
}
