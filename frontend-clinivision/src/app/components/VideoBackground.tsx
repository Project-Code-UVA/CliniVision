import React from 'react';

const VideoBackground: React.FC = () => {
  return (
    <video autoPlay loop muted className="absolute w-full h-full object-cover z-negative" id="background-video">
      <source src="hex.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoBackground;
