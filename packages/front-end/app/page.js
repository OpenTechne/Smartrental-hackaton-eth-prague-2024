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
    // <FileUploader setContract={setContract} />
    // <LoadingPage />
    <UserEnv />
  );
}
