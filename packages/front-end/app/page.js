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
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState("UPLOAD");

  const generateContract = async (document) => {
    console.log("Generating contract from document:", document);
    // setContract(document);
    setLoading(true);
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
      // setResponse(data);
      if (data) {
        setView("FORM");
      }
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  // const contract = true;

  // return contract ? (
  //   <DynamicForm
  //     fields={RENTAL_FORM_FIELDS}
  //     sections={RENTAL_FORM_SECTIONS}
  //     onSubmit={handleSubmit}
  //     columns={2}
  //   />
  // ) : (
  //   <FileUploader onUpload={generateContract} />
  //   // <LoadingPage />
  //   // <UserEnv />
  // );

  const renderView = () => {
    console.log(view);
    switch (view) {
      case "UPLOAD":
        return <FileUploader onUpload={generateContract} />;
      case "LOADING":
        return <LoadingPage />;
      case "FORM":
        return (
          <DynamicForm
            fields={RENTAL_FORM_FIELDS}
            sections={RENTAL_FORM_SECTIONS}
            onSubmit={handleSubmit}
            columns={2}
          />
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
