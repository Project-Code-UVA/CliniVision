"use client";
import React, { useState } from "react";
import Image from "next/image";
import FileUpload from './FileUpload.js';
import DragDrop from './DragDrop.js';
import './App.css';

export default function Home() {
  const [file, setFile] = useState('');

  function handleChange(e) {
    const uploadedFile = e.target.files[0];
    const fileUrl = URL.createObjectURL(uploadedFile);
    setFile(fileUrl);
  }

  return (
    <div className="flex flex-col min-h-screen bg-purple-100 justify-center items-center">
      <img src='x-ray.jpg' className="App-logo mb-20 mt-5" alt="logo" />
      <header className="text-center mb-8">
      <h1 className="text-7xl font-serif">CLINIVISION</h1>
      </header>

      <div className="w-96 bg-white shadow-md rounded-lg overflow-hidden mb-10">
        <div className="px-6 py-8 flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-4">Submit Image</h2>
          {file && <img src={file} className="w-full h-auto mb-4" alt="Uploaded" />}
          {/* Additional upload methods */}
          <FileUpload></FileUpload>
          {/* <DragDrop></DragDrop> */}
          <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md" disabled={!file}>
            Submit
          </button>
        </div>
      </div>

      <footer className="text-sm text-gray-600 mt-auto py-4">
        Sponsored by Project Code at the University of Virginia
      </footer>
    </div>
  );
}
