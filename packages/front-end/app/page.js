"use client";
import { useState } from "react";
import DynamicForm from "../src/components/DynamicForm";
import FileUploader from "../src/components/FileUploader";
import { useToast } from "@chakra-ui/react";
import UserEnv from "@/src/components/UserEnv";
import LoadingPage from "@/src/components/LoadingPage";
import NotifyPage from "@/src/components/NotifyPage";

export default function Home() {
  const cont = {
    message: "Contract deployed successfully",
    data: {
      hash: "0x950083c31c762d78fca248b40a11703ca25130dbbafa113d376df6eabaf23b8d",
      linkToBlockExplorer:
        "https://sepolia.lineascan.build/tx/0x950083c31c762d78fca248b40a11703ca25130dbbafa113d376df6eabaf23b8d",
      linkToContract:
        "https://sepolia.lineascan.build/address/0x72214e2ca2a2da93dae89a9d87a5515d6e836001",
      contractAddress: "0x72214e2ca2a2da93dae89a9d87a5515d6e836001",
      abi: [
        {
          inputs: [
            {
              internalType: "address",
              name: "_landlord",
              type: "address",
            },
            {
              internalType: "address",
              name: "_tenant",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "_downPayment",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "_monthlyRent",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "_rentalPeriod",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "_penaltyInterestRate",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "_compensation",
              type: "uint256",
            },
          ],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          inputs: [],
          name: "acceptContract",
          outputs: [],
          stateMutability: "payable",
          type: "function",
        },
        {
          inputs: [],
          name: "compensation",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "downPayment",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "landlord",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "liquidateDeposit",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "monthlyRent",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "payRent",
          outputs: [],
          stateMutability: "payable",
          type: "function",
        },
        {
          inputs: [],
          name: "penaltyInterestRate",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "rentalPeriod",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "startDate",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "status",
          outputs: [
            {
              internalType: "enum ResidentialLeaseAgreement.Status",
              name: "",
              type: "uint8",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "tenant",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "terminateContract",
          outputs: [],
          stateMutability: "payable",
          type: "function",
        },
        {
          inputs: [],
          name: "totalPayed",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
      ],
    },
  };
  const toast = useToast();

  const [contract, setContract] = useState({ abi: [], bytecode: "" });
  const [fields, setFields] = useState([]);
  const [contractDeployData, setContractDeployData] = useState({
    //TODO: Change this to default data (empty)
    contractLink:
      "https://sepolia.lineascan.build/address/0x72214e2ca2a2da93dae89a9d87a5515d6e836001",
    contractAddress: "0x72214e2ca2a2da93dae89a9d87a5515d6e836001",
    abi: [
      {
        inputs: [
          {
            internalType: "address",
            name: "_landlord",
            type: "address",
          },
        ],
      },
    ],
  });
  const [view, setView] = useState("UPLOAD");

  function getFormFieldsFromContract(contractCode) {
    const constructorRegex = /constructor\s*\(([^)]*)\)/;
    const match = contractCode.match(constructorRegex);

    if (!match) {
      throw new Error("No constructor found in the contract");
    }

    const paramsString = match[1].trim();
    const params = paramsString
      .split(",")
      .map((param) => param.trim().split(/\s+/));

    const formFields = params.map((param) => {
      let [type, name] = param;

      // Handle multiple words in type (e.g., "address payable")
      if (param.length > 2) {
        type = param.slice(0, -1).join(" ");
        name = param[param.length - 1];
      }

      let fieldType = "input";
      if (type === "bool") {
        fieldType = "checkbox";
      } else if (type === "uint256") {
        fieldType = "number";
      } else if (type.startsWith("address")) {
        fieldType = "input";
      }

      return {
        type: fieldType,
        name: name.replace(/[_\s]+/g, ""),
        label: `${
          name.charAt(0).toUpperCase() +
          name
            .slice(1)
            .replace(/([A-Z])/g, " $1")
            .replace(/[_\s]+/g, " ")
        }`,
        required: true,
        value: fieldType === "checkbox" ? false : "",
        section: "form",
      };
    });

    return formFields;
  }

  const generateContract = async (document) => {
    //console.log("Generating contract from document:", document);
    setView("LOADING");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          agreement: document.content,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to generate smart contract");
      }

      const data = await res.json();
      const { bytecode, abi } = data;

      setContract({ abi, bytecode });
      setView("FORM");
    } catch (err) {
      toast({
        title: "There was an error generating the smart contract",
        duration: 3000,
        status: "error",
        position: "bottom-right",
        variant: "subtle",
      });
      console.error(err);
      setView("UPLOAD");
    }
  };
  const onNotify = () => {
    setView("USER_ENV");
  };

  const renderView = () => {
    switch (view) {
      case "UPLOAD":
        return <FileUploader onUpload={generateContract} />;
      case "LOADING":
        return <LoadingPage />;
      case "FORM":
        return (
          <DynamicForm
            fields={fields}
            columns={2}
            contract={contract}
            setView={setView}
          />
        );
      case "NOTIFY":
        return (
          <NotifyPage
            contractDeployData={contractDeployData}
            onClick={onNotify}
          />
        );
      case "USER_ENV":
        return <UserEnv contract={cont} />;
      case "LOGIN":
        return <div>Login Page</div>; // Add your login component or logic here
      default:
        return <div>Invalid view</div>;
    }
  };

  return <div>{renderView()}</div>;
}
