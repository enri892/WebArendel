import React from 'react';

const BackgroundEffects = () => {
  return (
    <div className="absolute inset-0">
      <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full filter blur-3xl" />
      <div className="absolute bottom-1/4 right-1/6 w-80 h-80 bg-gradient-to-r from-emerald-400/10 to-cyan-400/10 rounded-full filter blur-3xl" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-purple-400/8 to-pink-400/8 rounded-full filter blur-3xl" />
    </div>
  );
};

export default BackgroundEffects;