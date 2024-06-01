"use client";
import { useState } from "react";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import DynamicForm from "../src/components/DynamicForm";
import FileUploader from "../src/components/FileUploader";
import LoadingPage from "@/src/components/LoadingPage";
import NotifyPage from "@/src/components/NotifyPage";

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
          info: "Random text",
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

  const [tenantEmail, setTenantEmail] = useState("");
  const [view, setView] = useState("LOGIN");
  console.log(contract);
  if (contract) {
    setView("FORM");
  }

  // return contract ? (
  //   <DynamicForm
  //     fields={RENTAL_FORM_FIELDS}
  //     sections={RENTAL_FORM_SECTIONS}
  //     onSubmit={handleSubmit}
  //     columns={2}
  //   />
  // ) : (
  //   // <FileUploader setContract={setContract} />
  //   // <LoadingPage />
  //   // <UserEnv />
  //   <NotifyPage />
  // );

  const renderView = () => {
    switch (view) {
      case "LOGIN":
        return <FileUploader setContract={() => setContract} />; // Add your login component or logic here
      case "FORM":
        return (
          <DynamicForm
            fields={RENTAL_FORM_FIELDS}
            sections={RENTAL_FORM_SECTIONS}
            onSubmit={() => handleSubmit}
            columns={2}
          />
        );
      case "LOADING":
        return <LoadingPage />;
      case "NOTIFY":
        return <NotifyPage />;
      case "USER_ENV":
        return <UserEnv />;
      default:
        return <div>Invalid view</div>;
    }
  };

  return <div>{renderView()}</div>;
}
