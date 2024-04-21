'use client';
import React from 'react';
import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer';
import Dropzone from './components/Dropzone';
import VideoBackground from './components/VideoBackground';
import Logo from './components/Logo'; // Assuming you've created a Logo component
import './App.css';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen relative">
      <VideoBackground />
      <NavigationBar />
      <div className="flex-grow flex flex-col justify-between"> {/* This will space out the children */}
        <div className="flex-grow flex flex-col justify-center"> {/* This will center the logo and dropzone vertically */}
          <Logo />
          <Dropzone />
        </div>
        <Footer />
      </div>
    </div>
  );
}


export default Home;

