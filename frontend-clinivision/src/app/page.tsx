"use client";
import './App.css';
import Image from "next/image";
import React, {useState} from "react";
import FileUpload from './FileUpload.js'
import DragDrop from './DragDrop.js';

export default function Home() {
  const [file, setFile] = useState();
  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  return (
    <div className="App">

      <header className="App-header">
        <h1>
          JAREN BRESNICK'S PROJECT CODE PRESENTS:
        </h1>
        <h1 className="mb-5">
          CLINIVISION
        </h1>
      </header>

      <img src='jaren.jpg' className="App-logo" alt="logo" />

      <div className="imageSubmission">
        <h2 className="mb-4">Submit Image</h2>
        <input type="file" onChange={handleChange}/>
        <img src={file} />
        {/* <FileUpload></FileUpload> */}
        {/* <DragDrop></DragDrop> */}
      </div>
      <h4 className="mt-5">
        Sponsored by Rishi Sureshkumar, Pre-Med Computer Science Major at the University of Virginia. 
      </h4>
    </div>
  );
}
