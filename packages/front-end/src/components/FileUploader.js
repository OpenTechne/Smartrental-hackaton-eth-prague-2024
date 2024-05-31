import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

const FileUploader = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const onDrop = (acceptedFiles) => {
    setUploadedFiles(acceptedFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ".pdf, .doc, .docx",
  });

  return (
    <div className="w-[660px] h-[440px] bg-capuccino rounded-3xl relative">
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

      <div className="w-full h-[80px] bg-fair-green absolute bottom-0 rounded-b-3xl"></div>
    </div>
  );
};

export default FileUploader;
