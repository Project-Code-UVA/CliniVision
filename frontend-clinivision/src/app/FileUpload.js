import React, { useState } from "react";

const FileUpload = ({ onFileChange }) => {
  const [dragging, setDragging] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    onFileChange(file);
  };

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-8 text-center ${
        dragging ? "border-blue-500" : "border-gray-300"
      }`}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <p className="text-gray-500">Drag & drop your image here</p>
      <p className="mt-2">or</p>
      <button className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-md" onClick={() => document.getElementById("fileInput").click()}>
        Select Image
      </button>
      <input id="fileInput" type="file" className="hidden" onChange={(e) => onFileChange(e.target.files[0])} />
    </div>
  );
};

export default FileUpload;
