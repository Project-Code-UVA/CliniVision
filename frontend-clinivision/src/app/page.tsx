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
      <img src='jaren.jpg' className="App-logo mb-20" alt="logo" />
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold">CLINIVISION</h1>
        <p className="text-sm text-gray-600">Presented by Jaren Bresnick's Project Code</p>
      </header>

      <div className="w-96 bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-8">
          <h2 className="text-xl font-semibold mb-4">Submit Image</h2>
          <label htmlFor="imageUpload" className="block w-full bg-blue-500 text-white py-2 px-4 rounded-md text-center cursor-pointer mb-4">
            Upload Image
          </label>
          <input id="imageUpload" type="file" onChange={handleChange} className="hidden" />
          {file && <img src={file} className="w-full h-auto mb-4" alt="Uploaded" />}
          {/* Additional upload methods */}
          {/* <FileUpload></FileUpload> */}
          {/* <DragDrop></DragDrop> */}
        </div>
      </div>

      <footer className="text-sm text-gray-600 mt-auto bottom-0 fixed w-full bg-white p-4">
        Sponsored by Rishi Sureshkumar, Pre-Med Computer Science Major at the University of Virginia.
      </footer>
    </div>
  );
}
