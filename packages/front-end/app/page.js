"use client";

import { Text } from "@chakra-ui/react";
import DynamicForm from "../src/components/DynamicForm";
import FileUploader from "../src/components/FileUploader";
import {
  RENTAL_FORM_FIELDS,
  RENTAL_FORM_SECTIONS,
} from "../src/constants/rentalForm";

export default function Home() {
  const handleSubmit = (data) => {
    console.log("Form submitted:", data);
  };

  const contract = false;

  return contract ? (
    <DynamicForm
      fields={RENTAL_FORM_FIELDS}
      sections={RENTAL_FORM_SECTIONS}
      onSubmit={handleSubmit}
      columns={2}
    />
  ) : (
    <FileUploader />
  );
}
