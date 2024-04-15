"use client";
import React from 'react';
import './App.css';
import { useDropzone } from 'react-dropzone';

export default function Home() {
  const [file, setFile] = React.useState<File | null>(null);
  const [preview, setPreview] = React.useState<string>('');

  const onDrop = React.useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setFile(file);
    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="flex flex-col min-h-screen relative">
      <video autoPlay loop muted className="absolute w-full h-full object-cover z-0" id="background-video">
        <source src="hex.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="relative z-10 flex flex-col min-h-screen">
        <nav className="flex justify-between items-center p-4 bg-violet-500 text-white">
          <div className="flex gap-x-4">
            <a href="/" className="text-lg font-semibold">Home</a>
            <a href="/about" className="text-lg font-semibold">About</a>
          </div>
          <a href="/login" className="text-lg font-semibold">Login</a>
        </nav>

        {/* Use 'bg-transparent' if you want no color overlay on the video */}
        <div className="flex-grow flex flex-col justify-center items-center bg-transparent">
          <div className="w-full flex flex-col items-center text-center">
            <img src='logo.jpg' className="mb-5 mt-2 w-24 h-24" alt="logo" />
            <h1 className="text-5xl font-serif mb-2 text-white">CLINIVISION</h1>
            <p className="text-base text-gray-400">Empowering Medical Diagnostics</p>
          </div>

          <div className="mt-8 mb-3">
            <div className="bg-white bg-opacity-75 shadow-md rounded-lg p-6 max-w-lg mx-auto">
              <h2 className="text-2xl font-semibold mb-6 text-center">Submit Your Image</h2>
              <div {...getRootProps({ className: 'dropzone border-2 border-dashed border-gray-300 p-6 mb-4 rounded-md text-center' })}>
                <input {...getInputProps()} />
                {isDragActive ? 
                  <p>Drop the files here ...</p> : 
                  <p>Drag 'n' drop some files here, or click to select files</p>
                }
                {preview && <img src={preview} className="w-full h-auto rounded-md mt-4" alt="Preview" />}
              </div>
              <button className="w-full bg-violet-500 text-white py-2 px-4 rounded-md hover:bg-violet-600 transition duration-150 ease-in-out" disabled={!file}>
                Submit
              </button>
            </div>
          </div>
        </div>

        <footer className="text-sm text-gray-400 mt-1.5 py-1.5 w-full text-center relative z-10">
          Sponsored by Project Code at the University of Virginia
        </footer>
      </div>
    </div>
  );
}
