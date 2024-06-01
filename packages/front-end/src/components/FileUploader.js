import React from "react";
import { useDropzone } from "react-dropzone";

import { Button } from "@chakra-ui/react";
import PageWrapper from "./PageWrapper";
import Image from "next/image";
import useFileUploader from "../hooks/useFileUploader";

const FileUploader = ({ onUpload }) => {
  const { document, handleFileChange, resetDocument } = useFileUploader();

  const onDrop = (acceptedFiles) => {
    handleFileChange(acceptedFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ".pdf, .doc, .docx",
  });

  const buttons = (
    <div className="mr-[40px]">
      {document?.content && (
        <Button
          className="m-[10px]"
          variant="outline"
          colorScheme="black"
          bg="white"
          onClick={() => resetDocument()}
        >
          Cancel
        </Button>
      )}
      <Button
        variant="outline"
        colorScheme="black"
        isDisabled={!document?.content}
        bg="white"
        onClick={() => onUpload(document)}
      >
        Generate
      </Button>
    </div>
  );

  const body = (
    <div className="w-full h-full">
      <div
        {...getRootProps()}
        className=" h-[240px] p-4 border-2 border-dashed border-black rounded-lg cursor-pointer mb-2 flex justify-center items-center"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <Image alt="cloud" src="/cloud.svg" width="48" height="48" />
            <div className="flex flex-col justify-center items-center mt-[20px]">
              <p>Drag and drop file here or click to browse</p>
              <p className="text-grayText text-sm">Word or PDF</p>
            </div>
          </div>
        )}
      </div>
      <div className="file-list">
        {document?.content && (
          <>
            <h3>Uploaded file:</h3>
            <ul>
              <li key={document.name}>
                <span>{document.name}</span>
              </li>
            </ul>
          </>
        )}
      </div>
    </div>
  );

  return <PageWrapper bottom={buttons}>{body}</PageWrapper>;
};

export default FileUploader;
