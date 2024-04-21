import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, children, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded-lg max-w-lg mx-auto relative">
        <button onClick={onClose} className="absolute top-0 right-0 p-2">✖️</button>
        {children}
      </div>
    </div>
  );
};

const Dropzone: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [imageData, setImageData] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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
      setImageData(data.image);
      setIsModalOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    if (preview) {
      URL.revokeObjectURL(preview);
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
        <button className="w-full bg-violet-600 text-white py-2 px-4 rounded-md hover:bg-violet-700 transition duration-150 ease-in-out" disabled={!file} onClick={handleSubmit}>
          Submit
        </button>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {imageData && <img src={`data:image/jpeg;base64,${imageData}`} className="w-full max-w-md h-auto rounded-md" alt="Processed image" />}
      </Modal>
    </div>
  );
};

export default Dropzone;
