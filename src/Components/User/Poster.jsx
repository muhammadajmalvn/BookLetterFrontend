import React from 'react';
import './Poster.css'
const Poster = ({ image, title }) => {
    return (
        <div className="poster">
            <h2>{title}</h2>
            <div className="image-container">
                <img src={image} alt={title} className='img-fluid'/>
            </div>
        </div>
    );
};

export default Poster;
