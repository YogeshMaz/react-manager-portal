// ImageLink.js
import React from 'react';

const ImageLink = ({ imageUrl }) => {
  return (
    <a href={imageUrl} target="_blank" rel="noopener noreferrer">
      <img src={imageUrl} alt="Uploaded Image" style={{ width: '100px', height: '100px' }} />
    </a>
  );
};

export default ImageLink;
