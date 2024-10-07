// ImageLink.js
import React from 'react';

const ImageSrc = ({ imageUrl }) => {
  return (
      <img src={imageUrl} alt="Uploaded Image" style={{ width: '100px', height: '100px' }} />
  );
};

export default ImageSrc;
