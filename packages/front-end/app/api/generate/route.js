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

    const exampleContract =
      "// SPDX-License-Identifier: MIT\npragma solidity 0.8.19;\n\ncontract ResidentialLeaseAgreement {\n    enum Status {\n        Init,\n        Pending,\n        Acepted,\n        Terminated\n    }\n\n    address public immutable landlord;\n    address public immutable tenant;\n    uint256 public immutable downPayment;\n    uint256 public immutable monthlyRent;\n    uint256 public immutable rentalPeriod;\n    uint256 public immutable penaltyInterestRate;\n    uint256 public immutable compensation;\n    uint256 public startDate;\n    uint256 public totalPayed;\n    Status public status;\n\n    constructor(\n        address _landlord,\n        address _tenant,\n        uint256 _downPayment,\n        uint256 _monthlyRent,\n        uint256 _rentalPeriod,\n        uint256 _penaltyInterestRate,\n        uint256 _compensation\n    ) {\n        landlord = _landlord;\n        tenant = _tenant;\n        downPayment = _downPayment;\n        monthlyRent = _monthlyRent;\n        rentalPeriod = _rentalPeriod;\n        penaltyInterestRate = _penaltyInterestRate;\n        compensation = _compensation;\n    }\n\n    function acceptContractLandLord() external {\n        require(status == Status.Init, 'Contract should be in Init status');\n        require(msg.sender == landlord, 'Only landlord can accept contract');\n        status = Status.Init;\n    }\n\n    function acceptContractAndStartRental() external payable {\n        require(status == Status.Pending, 'Contract should be pending');\n        require(msg.sender == tenant, 'Only tenant can acept contract');\n        require(msg.value == downPayment + monthlyRent, 'Tenant should deposit downPayment plus first month rent');\n        payable(landlord).transfer(monthlyRent);\n        status = Status.Acepted;\n        startDate = block.timestamp;\n    }\n\n    function payRent() external payable {\n        require(status == Status.Acepted, 'Contract should be acepted');\n        require(msg.sender == tenant, 'Only tenant can pay rent');\n        require(msg.value == monthlyRent, 'Incorrect rent amount');\n        require(address(this).balance >= monthlyRent + downPayment, 'Security Deposit should be always present');\n        totalPayed += monthlyRent;\n        payable(landlord).transfer(monthlyRent);\n    }\n\n    function liquidateDeposit() external {\n        require(status == Status.Acepted, 'Contract should be acepted');\n        uint256 payedMonths = totalPayed / monthlyRent;\n        uint256 timeOutOfPayment = block.timestamp - startDate - 30 days * payedMonths;\n        require(timeOutOfPayment > 30 days, 'No time out of payment');\n        uint256 ammountToLiquidate = ((timeOutOfPayment - 30 days) / 1 days) * monthlyRent * penaltyInterestRate / 100;\n        if (ammountToLiquidate > address(this).balance) {\n            ammountToLiquidate = address(this).balance;\n        }\n        payable(landlord).transfer(ammountToLiquidate);\n    }\n\n    function terminateContract() external payable {\n        require(status == Status.Acepted, 'Contract should be acepted');\n        if (block.timestamp >= startDate + rentalPeriod) {\n            status = Status.Terminated;\n            payable(tenant).transfer(address(this).balance);\n            return;\n        }\n        require(msg.sender == tenant || msg.sender == landlord, 'Only tenant or landlord can terminate a contract');\n        if (msg.sender == tenant) {\n            payable(landlord).transfer(address(this).balance);\n        } else {\n            require(msg.value == compensation, 'Landlord should pay compensation');\n            payable(tenant).transfer(address(this).balance);\n        }\n        status = Status.Terminated;\n    }\n}\n";

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
              text: `You are an expert in writing complex smart contracts in Solidity language. You have a lot of experience in writing complex smart contracts and you create very high quality smart contracts that are gas optimized and ready to be compiled.\n\n<tasks>\n- Carefully ready the lease agreement inside <agreement></agreement> and try to understand all its parts, provisions and obligations. \n- Try to create the smart contract (without comments) in a complex way so it all of its parts, provisions and obligations. \n- Try to name constructor paramaters as much self-describing as possible \n- Always output just the contract as a string with no additional formatting or text\n \n- If you generate something else than a smart contract e. g. a text describing it you will be penalised \n- You can have to create  variations of contract inside <exampleContract></exampleContract>, you should to replicate the security practices in that contract and create secure variations of it without vulnerabilities</tasks>\n\n<exampleContract>${exampleContract}</exampleContract>\n\n<agreement>${agreement}</agreement>  \n\n Contract: \n// SPDX-License-Identifier: MIT...`,
            },
          ],
        },
      ],
    });
    const contract = msg.content[0].text;

    console.log(contract)

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

    console.log(output);
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
