import React from 'react';
import { Carousel } from 'antd';

import Banner1 from '../assets/lacuponera.jpg';
import Banner2 from '../assets/PortadaMail(2).jpg';

const contentStyle = {
    height: '300px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
    width: '100%',
};

const banners = [
    Banner1,
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