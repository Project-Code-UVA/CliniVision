import './App.css';
import React, {useState} from "react";
import FileUpload from './FileUpload.js'
import DragDrop from './DragDrop.js';

function App() {

  const [file, setFile] = useState();
  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  return (
    <div className="App">

      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">CliniVision</a>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Link</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <header className="App-header">
        <h1>
          JAREN BRESNICK'S PROJECT CODE PRESENTS:
        </h1>
        <h1 class="mb-5">
          CLINIVISION
        </h1>
      </header>

      <img class="height" src='jaren.jpg' className="App-logo" alt="logo" />

      <div class="p-5 mt-5" classname="imageSubmission">
        <h2 class="mb-4">Submit Image</h2>
        <input type="file" onChange={handleChange}/>
        <img src={file} />
        {/* <FileUpload></FileUpload> */}
        {/* <DragDrop></DragDrop> */}
      </div>
      <h4 class="mt-5">
        Sponsored by Rishi Sureshkumar, Pre-Med Computer Science Major at the University of Virginia.
      </h4>
    </div>
  );
}

export default App;
