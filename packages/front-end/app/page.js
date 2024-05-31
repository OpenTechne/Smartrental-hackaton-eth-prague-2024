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

  return (
    <main className="flex min-h-screen flex-col p-24 w-full">
      {/* <FileUploader /> */}
      <Text noOfLines={1}>
        "The quick brown fox jumps over the lazy dog" is an English-language
        pangram—a sentence that contains all of the letters of the English
        alphabet. Owing to its existence, Chakra was created.
      </Text>
      <DynamicForm
        fields={RENTAL_FORM_FIELDS}
        sections={RENTAL_FORM_SECTIONS}
        onSubmit={handleSubmit}
        columns={2}
      />
    </main>
  );
}
