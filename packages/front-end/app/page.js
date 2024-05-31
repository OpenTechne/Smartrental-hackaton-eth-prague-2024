"use client";

import FileUploader from "../src/components/FileUploader";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-24 w-full">
      <FileUploader />
    </main>
  );
}
