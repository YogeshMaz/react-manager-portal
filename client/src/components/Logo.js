// src/components/Logo.js
import React from 'react';
import logo from '../images/MM.jpeg'; // Adjust the path as necessary

const Logo = ({
  src, // Add src prop for the logo image source
  altText = "Company Logo",
  width = "40px",
  marginRight = "5px",
  height = "auto",
  textAlign = "center"
}) => {
  return (
    <div style={{ textAlign }}>
      <img src={logo} alt={altText} style={{ width, height, marginRight }} />
    </div>
  );
};

  export default Logo;