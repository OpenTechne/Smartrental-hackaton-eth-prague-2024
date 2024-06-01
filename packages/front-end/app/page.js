"use client";
import { useState } from "react";
import DynamicForm from "../src/components/DynamicForm";
import FileUploader from "../src/components/FileUploader";
import { useToast } from "@chakra-ui/react";

import UserEnv from "@/src/components/UserEnv";

import {
  RENTAL_FORM_FIELDS,
  RENTAL_FORM_SECTIONS,
} from "../src/constants/rentalForm";
import LoadingPage from "@/src/components/LoadingPage";

export default function Home() {
  const toast = useToast();

  const handleSubmit = (data) => {
    console.log("Form submitted:", data);
  };

  const [contract, setContract] = useState(undefined);
  const [fields, setFields] = useState([]);
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
      .map((param) => param.trim().split(" "));

    const formFields = params.map(([type, name]) => {
      let fieldType = "input";
      if (type === "bool") {
        fieldType = "checkbox";
      } else if (type === "uint256") {
        fieldType = "number";
      } else if (type === "address") {
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
      const result = data.content[0].text;
      console.log(result);

      setContract(result);
      setFields(getFormFieldsFromContract(result));
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

  const renderView = () => {
    console.log(view);
    switch (view) {
      case "UPLOAD":
        return <FileUploader onUpload={generateContract} />;
      case "LOADING":
        return <LoadingPage />;
      case "FORM":
        return (
          <DynamicForm fields={fields} onSubmit={handleSubmit} columns={2} />
        );
      case "NOTIFY":
        return <NotifyPage />;
      case "USER_ENV":
        return <UserEnv />;
      case "LOGIN":
        return <div>Login Page</div>; // Add your login component or logic here
      default:
        return <div>Invalid view</div>;
    }
  };

  return <div>{renderView()}</div>;
}
