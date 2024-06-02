import React from "react";
import { useDropzone } from "react-dropzone";

import { Button } from "@chakra-ui/react";
import PageWrapper from "./PageWrapper";
import Image from "next/image";

import { ConnectButton } from "@rainbow-me/rainbowkit";

const FileUploader = ({
  onUpload,
  document,
  handleFileChange,
  resetDocument,
}) => {
  const onDrop = (acceptedFiles) => {
    handleFileChange(acceptedFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ".pdf, .doc, .docx",
  });

  const buttons = (
    <div className="mr-4">
      {document?.content && (
        <Button
          className="m-[10px]"
          onClick={() => resetDocument()}
          fontFamily="mulish"
        >
          Cancel
        </Button>
      )}
      <Button
        className="text-white bg-darkGreen hover:bg-opacity-80 transition ease-in-out duration-500 "
        colorScheme="black"
        isDisabled={!document?.content}
        onClick={() => onUpload(document)}
      >
        Generate
      </Button>
    </div>
  );

  const body = (
    <>
      <input {...getInputProps()} />
      <div className="w-full h-full">
        <div
          {...getRootProps()}
          className={`w-[603px] h-[240px] p-4 border-[1px] border-dashed border-black rounded-lg cursor-pointer mb-2 flex justify-center items-center hover:bg-fairGreen hover:bg-opacity-60 transition ease-in-out duration-500 ${
            isDragActive ? "bg-fairGreen bg-opacity-60" : ""
          }`}
        >
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <Image alt="cloud" src="/cloud.svg" width="48" height="48" />
              <div className="flex flex-col justify-center items-center mt-[20px]">
                {document?.content ? (
                  <>
                    <h3 className="font-bold mb-2">Uploaded file:</h3>
                    <span className="text-center">{document.name}</span>
                  </>
                ) : (
                  <>
                    <p className="mb-2">
                      Drag and drop file here or click to browse
                    </p>
                    <p className="text-grayText text-sm">Word or PDF</p>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-between mt-4 mb-2 items-center">
          <span className="font-medium">Do you already have an account?</span>
          <ConnectButton label="Log in with your wallet" />
        </div>
      </div>
    </>
  );

  return <PageWrapper bottom={buttons}>{body}</PageWrapper>;
};

export default FileUploader;
