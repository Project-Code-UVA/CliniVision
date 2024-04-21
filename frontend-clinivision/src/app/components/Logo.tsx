import React from 'react';


const Logo: React.FC = () => {
  return (
    <div className="text-center">
      <img src='logo.jpg' className="mx-auto mb-4" alt="logo" style={{ width: '100px', height: '100px' }} />
      <h1 className="text-5xl font-serif text-white">CLINIVISION</h1>
      <p className="text-base text-gray-400">Empowering Medical Diagnostics</p>
    </div>
  );
};

export default Logo;
