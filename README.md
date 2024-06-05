# Smartrental

## The Ultimate Gateway to On-Chain Rentals
### [Built at  ETHPrague 2024](https://ethprague2024.devfolio.co/)

[![Smartrental - ETH Prague 2024](http://img.youtube.com/vi/8z3hdfggEhc/0.jpg)](http://www.youtube.com/watch?v=8z3hdfggEhc "Smartrental - ETH Prague 2024")

### Requirements

- Node.js v20.11.0
  - run: `nvm use`
- Yarn
  - run: `npm install --global yarn`

### Tech Stack
- Front-end
  - https://nextjs.org/
  - https://www.rainbowkit.com/
  - https://v2.chakra-ui.com/
  - https://wagmi.sh/

- Back-end
  - https://viem.sh/
  - https://www.anthropic.com/claude
  - https://github.com/ethereum/solc-js

- Networks supported
  - polygonAmoy
  - polygonZkEvmCardona
  - lineaSepolia
  - optimismSepolia
  - mantleSepoliaTestnet


### The problem Smartrental solves
The problem with conventional real estate paper contracts

Crypto-native individuals often face significant challenges when trying to rent properties using their favorite cryptocurrencies. Traditional real estate owners are unfamiliar with crypto terminology and smart contracts, leading to misunderstandings and missed opportunities. This disconnect prevents crypto users from leveraging their digital assets for rental purposes, while property owners miss out on a growing market segment.
Furthermore, paper contracts and traditional bureaucracy can be unclear and often contain small print that is easily overlooked. This lack of transparency and clarity can lead to disputes and inefficiencies in the rental process.
Additionally, paper contracts are ineffective in resolving misunderstandings. These issues can be mitigated by incorporating game theory principles and on-chain value systems to create more transparent, fair, and efficient rental agreements.
Smartrental approach

SmartRental offers a comprehensive solution by translating conventional paper contracts into blockchain-based smart contracts. Key features include:

  - **Automated Contract Translation:** Converts PDF or Word rental contract into Solidity smart contract based on a set of audited Solidity templates, leveraginAutomated Contract Translation:Automated Contract Translation:g the most cutting-edge LLMs on the market.
  - **Effortless Deployment:** Allows property owner to deploy smart contract without managing private keys.
  - **User-Friendly Interface:** Simplifies the rental process for both crypto-native tenants and traditional property owners.
  - **Secure Contracts:** LLMs do not have free will in generating contracts; instead, they use a series of audited templates, applying variations to match the given paper contract.
  - **Secure Transactions:** AI-generated Solidity contracts are Multi-Chain Contract Verification:Multi-Chain Contract Verification:Multi-Chain Contract Verification: with economic game theories to ensure transparency and security throughout the rental process.

### Challenges we ran into
During the development of SmartRental, we mainly faced following challenges:

  - **Prompt Engineering for Solidity Code Generation:** One of the major hurdles was tuning the prompt engineering to ensure the generated Solidity code was compilable. This required multiple iterations and extensive testing to achieve the desired level of accuracy and reliability.
  - **Contract Security Review and Prompt Iteration:** Ensuring the security of the produced code. We conducted multiple rounds of thorough contract reviews to guarantee that the smart contracts met high-security standards. This iterative process was crucial for building trust in our solution and ensuring its reliability.
  - **Multi-Chain Contract Verification:** Programmatically verifying contracts across multiple blockchain networks presented a significant challenge. We tackled this by integrating with Etherscan-like scanners' APIs, which allowed us to automate the verification process and ensure that contracts were correctly deployed and validated across different chains.
