import React from 'react';
const LoadingOverlay = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="loading-overlay">
      <div className="loader"></div>
    </div>
  );
};

export default LoadingOverlay;