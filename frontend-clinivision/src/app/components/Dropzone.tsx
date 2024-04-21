import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const Dropzone: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [predictions, setPredictions] = React.useState<any>({bounding_boxes: [], labels: []});
  const [imageData, setImageData] = React.useState(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setFile(file);
    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
  }, []);

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
  

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    
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
        <button className="w-full bg-violet-600 text-white py-2 px-4 rounded-md hover:bg-violet-600 transition duration-150 ease-in-out" disabled={!file} onClick={handleSubmit}>
          Submit
        </button>
      </div>
      {imageData && <img src={`data:image/jpeg;base64,${imageData}`} className="w-full h-auto rounded-md mt-4" alt="Processed image" />}
    </div>
  );
};

export default Dropzone;
