"use client";
import { useState } from "react";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import DynamicForm from "../src/components/DynamicForm";
import FileUploader from "../src/components/FileUploader";
import LoadingPage from "@/src/components/LoadingPage";

import UserEnv from "@/src/components/UserEnv";

import {
  RENTAL_FORM_FIELDS,
  RENTAL_FORM_SECTIONS,
} from "../src/constants/rentalForm";

export default function Home() {
  const handleSubmit = (data) => {
    console.log("Form submitted:", data);
  };

  const [contract, setContract] = useState(undefined);

  const generateContract = async (document) => {
    console.log("Generating contract from document:", document);
    // setContract(document);
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
      setResponse(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // const contract = true;
  if (contract) {
    console.log(contract);
  } else {
    console.log("no contract");
  }

  return contract ? (
    <DynamicForm
      fields={RENTAL_FORM_FIELDS}
      sections={RENTAL_FORM_SECTIONS}
      onSubmit={handleSubmit}
      columns={2}
    />
  ) : (
    <FileUploader onUpload={generateContract} />
    // <LoadingPage />
    // <UserEnv />
  );
}
