import React from 'react';
import { Carousel } from 'antd';

import Banner1 from '../assets/portada.jpg';
import Banner2 from '../assets/portada-face.jpg';

const contentStyle = {
    height: '250px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
    width: '80%',
};

const banners = [
    Banner1,
    Banner2,
];

const Carrousel = () => (
    <Carousel autoplay>
        {banners.map((image, index) => (
            <div key={index}>
                <img src={image} alt={`slide-${index}`} style={{ ...contentStyle, objectFit: 'cover', width: '100%' }} />
            </div>
        ))}
    </Carousel>
);
export default Carrousel;