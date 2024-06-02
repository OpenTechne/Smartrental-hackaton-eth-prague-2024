"use client";
import { useState, useEffect } from "react";
import DynamicForm from "../src/components/DynamicForm";
import FileUploader from "../src/components/FileUploader";
import { useToast } from "@chakra-ui/react";
import UserEnv from "@/src/components/UserEnv";
import LoadingPage from "@/src/components/LoadingPage";
import NotifyPage from "@/src/components/NotifyPage";
import { useAccount } from "wagmi";

export default function Home() {
  const toast = useToast();

  const { address, isConnected } = useAccount();
  console.log(isConnected);
  const [contract, setContract] = useState({ abi: [], bytecode: "" });
  const [fields, setFields] = useState([]);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [contractDeployData, setContractDeployData] = useState(null);
  const [view, setView] = useState("UPLOAD");

  useEffect(() => {
    if (isConnected && view !== "USER_ENV") {
      setView("USER_ENV");
    }
    if (!isConnected && view !== "UPLOAD") {
      setView("UPLOAD");
    }
  }, [isConnected]);

  if (!isConnected) {
    if (view !== "UPLOAD") {
      setView("UPLOAD");
    }
  }

  function getFormFieldsFromConstructor(abi) {
    const constructorAbi = abi.find((item) => item.type === "constructor");
    if (!constructorAbi) {
      throw new Error("No constructor found in the ABI");
    }

    const formFields = constructorAbi.inputs.map((input) => {
      let type = "input";
      if (input.type === "bool") {
        type = "checkbox";
      } else if (input.type === "uint256") {
        type = "number";
      } else if (input.type === "address") {
        type = "input";
      }

      return {
        type: type,
        name: input.name,
        label: `${
          input.name.charAt(0).toUpperCase() +
          input.name.slice(1).replace(/([A-Z])/g, " $1")
        }`,
        placeholder: input.type,
        required: true,
        value: type === "checkbox" ? false : "",
        section: "form",
      };
    });

    return formFields;
  }

  const generateContract = async (document) => {
    setView("LOADING");
    setLoadingMessage(
      "Your smart contract is being generated. This may take a while."
    );

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
      setFields(getFormFieldsFromConstructor(abi));

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
        return <LoadingPage loadingMessage={loadingMessage} />;
      case "FORM":
        return (
          <DynamicForm
            fields={fields}
            columns={2}
            contract={contract}
            setView={setView}
            setContractDeployData={setContractDeployData}
            setLoadingMessage={setLoadingMessage}
          />
        );
      case "NOTIFY":
        return (
          <NotifyPage
            contractDeployData={contractDeployData}
            onClick={onNotify}
            setView={setView}
          />
        );
      case "USER_ENV":
        return <UserEnv contract={contractDeployData} />;
      case "LOGIN":
        return <div>Login Page</div>; // Add your login component or logic here
      default:
        return <div>Invalid view</div>;
    }
  };

  return <>{renderView()}</>;
}
