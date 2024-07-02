import React, { useEffect, useState } from "react";
import { Carousel } from 'antd';
import { useMediaQuery } from '@mui/material';

import Banner1 from '../assets/lacuponera.jpg';
import Banner2 from '../assets/PortadaMail(2).jpg';
import MaysoonMakeUp1 from '../assets/banners/banners_ganadores-04-01.jpg';
import MaysoonMakeUp2 from '../assets/banners/banners_ganadores-04-02.jpg';
import MaysoonMakeUp3 from '../assets/banners/banners_ganadores-04-03.jpg';
import atest1 from '../assets/banners/banners_ganadores-04.jpg';
import atest2 from '../assets/banners/banners_ganadores-05.jpg';
import atest3 from '../assets/banners/banners_ganadores-06.jpg';
import MaquillajeKloe1 from '../assets/banners/banners_ganadores-07.jpg';
import MaquillajeKloe2 from '../assets/banners/banners_ganadores-08.jpg';
import MaquillajeKloe3 from '../assets/banners/banners_ganadores-09.jpg';

const contentStyle = {
    height: 'auto',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
    width: '100%',
};

const bannerGeneral = [
    Banner1
];

const bannersXl = [
    MaysoonMakeUp1,
    atest1,
    MaquillajeKloe1
];

const bannersMd = [
    MaysoonMakeUp2,
    atest2,
    MaquillajeKloe2
];

const bannersSm = [
    MaysoonMakeUp3,
    atest3,
    MaquillajeKloe3
];

const Carrousel = () => { 
    const esPantallaGrande = useMediaQuery('(min-width: 1200px)');
    const esPantallaMediana = useMediaQuery('(min-width: 768px)');

    const [banners, setBanners] = useState([]);

    useEffect(() => {
        if (esPantallaGrande) {
            setBanners(bannersXl);
        } else if(esPantallaMediana) {
            setBanners(bannersMd);
        } else {
            setBanners(bannersSm);
        }
        //setBanners(bannerGeneral);
    }, []);
    return ( 
        <Carousel autoplay>
            {banners.map((image, index) => (
                <div key={index}>
                    <img src={image} alt={`slide-${index}`} style={{ ...contentStyle, objectFit: 'cover', width: '100%' }} />
                </div>
            ))}
        </Carousel>
    )
};
export default Carrousel;