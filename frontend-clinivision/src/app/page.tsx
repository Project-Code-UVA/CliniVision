"use client";
import React, { useCallback, useState } from "react";
import { useDropzone } from 'react-dropzone';
import './App.css'; 

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setFile(file);
    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
  }, []);

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

  return (
    <div className="flex flex-col min-h-screen justify-center items-center bg-purple-100">
      <div className="w-full flex flex-col items-center">
        <img src='logo.jpg' className="mb-5 w-24 h-24" alt="logo" />
        <h1 className="text-5xl font-serif mb-2">CLINIVISION</h1>
        <p className="text-base text-gray-600">Empowering Medical Diagnostics</p>
      </div>

      <div className="mt-8">
        <div className="bg-white shadow-md rounded-lg p-6 max-w-lg">
          <h2 className="text-2xl font-semibold mb-6 text-center">Submit Your Image</h2>
          <div {...getRootProps({className: 'dropzone border-2 border-dashed border-gray-300 p-6 mb-4 rounded-md text-center'})}>
            <input {...getInputProps()} />
            {isDragActive ? <p>Drop the files here ...</p> : <p>Drag 'n' drop some files here, or click to select files</p>}
            {preview && <img src={preview} className="w-full h-auto rounded-md mt-4" alt="Preview" />}
          </div>
          <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-150 ease-in-out" disabled={!file}>
            Submit
          </button>
        </div>
      </div>

      <footer className="text-sm text-gray-600 mt-10 py-4 w-full text-center">
        Sponsored by Project Code at the University of Virginia
      </footer>
    </div>
  );
}
