import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

import { Button } from "@chakra-ui/react";
import PageWrapper from "./PageWrapper";

const FileUploader = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const onDrop = (acceptedFiles) => {
    setUploadedFiles(acceptedFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ".pdf, .doc, .docx",
  });

  const buttons = (
    <div className="mr-[40px]">
      <Button
        className="m-[10px]"
        variant="outline"
        colorScheme="green"
        bg="white"
      >
        Cancel
      </Button>
      <Button variant="outline" colorScheme="orange" bg="white">
        Upload
      </Button>
    </div>
  );

  const body = (
    <div className="w-full h-full bg-blue">
      <div
        {...getRootProps()}
        className="m-[70px] p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer mb-2"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag and drop file here or click to browse</p>
        )}
      </div>
      <div className="file-list">
        <h3>Uploaded File:</h3>
        {uploadedFiles.length > 0 ? (
          <ul>
            {uploadedFiles.map((file, index) => (
              <li key={index}>
                <span>{file.name}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No file uploaded</p>
        )}
      </div>
    </div>
  );

  return <PageWrapper bottom={buttons}>{body}</PageWrapper>;
};

export default FileUploader;
