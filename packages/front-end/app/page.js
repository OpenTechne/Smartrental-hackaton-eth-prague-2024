"use client";

import FileUploader from "../src/components/FileUploader";

export default function Home() {
  return (
    <main className="flex justify-center items-center h-full min-h-screen flex-col p-24 w-full">
      <FileUploader />
    </main>
  );
}
