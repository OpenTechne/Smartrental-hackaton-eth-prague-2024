import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request) {
  try {
    const body = await request.json();
    const { info, agreement } = body;

    if (!info || !agreement) {
      return NextResponse.json(
        { message: "Missing info or agreement parameter" },
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
              text: `You are an expert in writing complex smart contracts in Solidity language. You have a lot of experience in writing complex smart contracts and you create very high quality smart contracts that are gas optimized and ready to be compiled.\n\n<tasks>\n- Carefully ready the lease agreement inside <agreement></agreement> and try to understand all its parts, provisions and obligations.\n- If the leasing agreement inside <agreement></agreement> is of leasing agreement type then  convert it into a smart contract with all the logic in Solidity (version 0.8.22)\n- Try to create the smart contract in a complex way so it all of its parts, provisions and obligations.\n- Use additional info from user inside <info></info> to set stuff like land owner address, tenant address, downpayment in ETH etc.\n- Always generate just the JSON based on format in <format></format> without no additional text such as description etc.\n</tasks>\n\n<format>\n{\n   "success": "Whether the content inside in <agreement></agreement> is of lease agreement type (boolean)",\n   "contract": "Smart contract in Solidity"\n}\n</format>\n\n<info>${info}</info>\n\n<agreement${agreement}</agreement>`,
            },
          ],
        },
      ],
    });

    return NextResponse.json(msg, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error while generating", error: error.message },
      { status: 500 }
    );
  }
}
