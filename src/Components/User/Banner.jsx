import React from 'react';
import './Banner.css'
const Banner = ({ image }) => {
  return (
    <div className="image-container">
      <img src={image} className='img-fluid' />
    </div>
  );
};


export default Banner;
