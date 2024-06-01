import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

import { Button } from "@chakra-ui/react";
import PageWrapper from "./PageWrapper";
import Image from "next/image";
import useFileUploader from "../hooks/useFileUploader";

const FileUploader = ({ setContract }) => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const { isUploading, document, handleFileChange } = useFileUploader();

  const onDrop = (acceptedFiles) => {
    handleFileChange(acceptedFiles);
    setUploadedFiles(acceptedFiles);
  };

  const uploadContract = () => {
    setContract(uploadedFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ".pdf, .doc, .docx",
  });

  useEffect(() => {
    console.log("isUploading", isUploading, document);
  }, [isUploading, document]);

  const buttons = (
    <div className="mr-[40px]">
      <Button
        className="m-[10px]"
        variant="outline"
        colorScheme="black"
        bg="white"
      >
        Cancel
      </Button>
      <Button
        variant="outline"
        color="grayText"
        bg="white"
        onClick={() => uploadContract()}
      >
        Upload
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
              <p className="text-grayText">
                JPG, PNG or PDF, file size no more than 10MB
              </p>
            </div>
          </div>
        )}
      </div>
      <div className="file-list">
        {uploadedFiles.length > 0 && (
          <>
            <h3>Uploaded Files:</h3>
            <ul>
              {uploadedFiles.map((file, index) => (
                <li key={index}>
                  <span>{file.name}</span>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );

  return <PageWrapper bottom={buttons}>{body}</PageWrapper>;
};

export default FileUploader;
