import React from 'react';

const NavigationBar: React.FC = () => {
  return (
    <nav className="flex justify-between items-center p-4 bg-violet-600 text-white font-semibold">
      <div className="flex gap-x-4">
        <a href="/" className="text-lg font-semibold px-4">Home</a>
        <a href="/about" className="text-lg font-semibold">About</a>
      </div>
      <a href="/login" className="text-lg font-semibold">Login</a>
    </nav>
  );
};

export default NavigationBar;
