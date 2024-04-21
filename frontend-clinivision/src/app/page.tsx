"use client";
import React from 'react';
import './App.css';
import { useDropzone } from 'react-dropzone';

export default function Home() {
  const [file, setFile] = React.useState<File | null>(null);
  const [preview, setPreview] = React.useState<string>('');
  const [predictions, setPredictions] = React.useState<any>({bounding_boxes: [], labels: []});
  const [imageData, setImageData] = React.useState(null);

  const onDrop = React.useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setFile(file);
    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleSubmit = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await fetch('http://127.0.0.1:8000/uploadfile/', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      console.log(data);
      // setPredictions({data.bounding_boxes, data.labels});
      setImageData(data.image);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
    <nav className="flex justify-between items-center p-4 bg-violet-500 text-white">
      <div className="flex gap-x-4"> 
        <a href="/" className="text-lg font-semibold">Home</a>
        <a href="/about" className="text-lg font-semibold">About</a>
      </div>
      <a href="/login" className="text-lg font-semibold">Login</a>
    </nav>


      <div className="flex flex-grow">
        
        <div className="w-1/5 bg-gray-400 min-h-full"></div>
        
        
        <div className="flex-grow flex flex-col justify-center items-center bg-violet-300">
          <div className="w-full flex flex-col items-center">
            <img src='logo.jpg' className="mb-5 mt-2 w-24 h-24" alt="logo" />
            <h1 className="text-5xl font-serif mb-2">CLINIVISION</h1>
            <p className="text-base text-gray-600">Empowering Medical Diagnostics</p>
          </div>

          <div className="mt-8 mb-3">
            <div className="bg-white shadow-md rounded-lg p-6 max-w-lg">
              <h2 className="text-2xl font-semibold mb-6 text-center">Submit Your Image</h2>
              <div {...getRootProps({ className: 'dropzone border-2 border-dashed border-gray-300 p-6 mb-4 rounded-md text-center' })}>
                <input {...getInputProps()} />
                {isDragActive ? <p>Drop the files here ...</p> : <p>Drag 'n' drop some files here, or click to select files</p>}
                {preview && <img src={preview} className="w-full h-auto rounded-md mt-4" alt="Preview" />}
              </div>
              <button className="w-full bg-violet-500 text-white py-2 px-4 rounded-md hover:bg-violet-600 transition duration-150 ease-in-out" disabled={!file}
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>


          {imageData && <img src={`data:image/jpeg;base64,${imageData}`} className="w-full h-auto rounded-md mt-4" alt="Processed image" />}
        </div>
      
        
        <div className="w-1/5 bg-gray-400 min-h-full"></div>
      </div>

      <footer className="text-sm text-gray-600 mt-1.5 py-1.5 w-full text-center ">
        Sponsored by Project Code at the University of Virginia
      </footer>
    </div>
  );
}

// "use client";
// import React from 'react';
// import './App.css';
// import { useDropzone } from 'react-dropzone';

// export default function Home() {
//   const [file, setFile] = React.useState<File | null>(null);
//   const [preview, setPreview] = React.useState<string>('');
//   const [predictions, setPredictions] = React.useState<any>({ bounding_boxes: [], labels: [] });

//   const onDrop = React.useCallback((acceptedFiles: File[]) => {
//     const file = acceptedFiles[0];
//     setFile(file);
//     const previewUrl = URL.createObjectURL(file);
//     setPreview(previewUrl);
//   }, []);

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

//   const handleSubmit = async () => {
//     if (!file) return;
//     const formData = new FormData();
//     formData.append('file', file);
//     try {
//       const response = await fetch('http://127.0.0.1:8000/uploadfile/', {
//         method: 'POST',
//         body: formData,
//       });
//       const data = await response.json();
//       console.log(data);
//       setPredictions(data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div className="flex flex-col min-h-screen">
//       <nav className="flex justify-between items-center p-4 bg-violet-500 text-white">
//         <div className="flex gap-x-4">
//           <a href="/" className="text-lg font-semibold">Home</a>
//           <a href="/about" className="text-lg font-semibold">About</a>
//         </div>
//         <a href="/login" className="text-lg font-semibold">Login</a>
//       </nav>

//       <div className="flex flex-grow">

//         <div className="w-1/5 bg-gray-400 min-h-full"></div>


//         <div className="flex-grow flex flex-col justify-center items-center bg-violet-300">
//           <div className="w-full flex flex-col items-center">
//             <img src='logo.jpg' className="mb-5 mt-2 w-24 h-24" alt="logo" />
//             <h1 className="text-5xl font-serif mb-2">CLINIVISION</h1>
//             <p className="text-base text-gray-600">Empowering Medical Diagnostics</p>
//           </div>

//           <div className="mt-8 mb-3">
//             <div className="bg-white shadow-md rounded-lg p-6 max-w-lg">
//               <h2 className="text-2xl font-semibold mb-6 text-center">Submit Your Image</h2>
//               <div {...getRootProps({ className: 'dropzone border-2 border-dashed border-gray-300 p-6 mb-4 rounded-md text-center' })}>
//                 <input {...getInputProps()} />
//                 {isDragActive ? <p>Drop the files here ...</p> : <p>Drag 'n' drop some files here, or click to select files</p>}
//                 {preview && <img src={preview} className="w-full h-auto rounded-md mt-4" alt="Preview" />}
//               </div>
//               <button className="w-full bg-violet-500 text-white py-2 px-4 rounded-md hover:bg-violet-600 transition duration-150 ease-in-out" disabled={!file}
//                 onClick={handleSubmit}
//               >
//                 Submit
//               </button>
//             </div>
//           </div>

//           {/* Displaying bounding boxes and labels */}
//           {predictions.bounding_boxes.length > 0 && (
//             <div className="mt-8 relative">
//               {predictions.bounding_boxes.map((bbox: number[], index: number) => (
//                 <div
//                   key={index}
//                   className="absolute border-2 border-red-500"
//                   style={{
//                     top: `${bbox[1]}%`,
//                     left: `${bbox[0]}%`,
//                     width: `${bbox[2] - bbox[0]}%`,
//                     height: `${bbox[3] - bbox[1]}%`,
//                   }}
//                 >
//                   <div className="bg-red-500 text-white text-xs px-1">
//                     {predictions.labels[index]}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}

//         </div>

//         <div className="w-1/5 bg-gray-400 min-h-full"></div>
//       </div>

//       <footer className="text-sm text-gray-600 mt-1.5 py-1.5 w-full text-center ">
//         Sponsored by Project Code at the University of Virginia
//       </footer>
//     </div>
//   );
// }
// 