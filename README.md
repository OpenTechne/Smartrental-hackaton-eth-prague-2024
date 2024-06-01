### Requirements

- Node.js v20.11.0
  - run: `nvm use`
- Yarn
  - run: `npm install --global yarn`

### UI architecture

### Tech Stack

- Front-end
  - https://nextjs.org/
  - https://www.rainbowkit.com/
  - https://flowbite-react.com/
  - https://wagmi.sh/

#### Workflow

##### Contract creation

1. Upload PDF/Word contract, that gets translated into the smart contract. BONUS>(Pinata) Pictures and descriptions of the flaws and furniture are added, too. a AI chatbot that helps edit the contract.

-Upload - get a summary - validate contract / Default contract
-Text what to edit
-Login > Submit

?Digital Signatures: Use blockchain-based digital signatures to verify the authenticity of agreements.
ating and Review System
?Reputation System: Implement a decentralized rating system for both landlords and tenants based on past interactions and contract completions.
Checkboxes:
1.1. The deposit is in ETH, if it grows part of the rent can be paid with the capital gains. The deposit is held in the SC.
1.2. The rent price is adjusted based on the infation. 2. Ferification form page, where the landlord can check that the smart contract was created correctly. But the UI is a human readable form, not a SC itself. Use AI to describe the smart contract. 3. The form is sent to a tenant where he can confirm the correcness of the conditions or propose changes. 4. After they both accept the conditions the smart contract is saved and later its deployed on the chain.

UI:

1. DnD the contract or button to upload the contract
   -after upload short animation ("We are transformung your contract into your smart contract")
2. Form with information distracted from the contract. You can see and modify things
3. Conntect the wallet - send it to the tennant to confirm
4. Deploying

##### Environment

5. User environment consists of X sections:
   5.1. The contract. You can change some properties of the contract. AI chatbot that can edit the contract.
   5.2. BONUS: Requests. The tenant can request changes or repairs of the apartment. If he paid for a repair himself he can upload the reciept and upon confirmation from the landlord it gets covered.
   5.3. BONUS: Communication channel/messenger.

#### API Endpoints

* /api/deploy json body:
  ```json
  {
	  "chainName": "<chain name string>",
	  "contract": "<solidity Code of the contract>",
    "constructorArguments" : "<Array of constructor arguments>"
   }
  ```

* /api/generate json body:  ,  
  ```json
  {
	  "info": "<Extra prompt info>",
	  "agreement": "<Contract parsed as string>"
  }
  ```

