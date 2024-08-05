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

import C1 from '../assets/banners/BannersCategorias/SM/1.png';
import C2 from '../assets/banners/BannersCategorias/SM/2.png';
import C3 from '../assets/banners/BannersCategorias/SM/3.png';
import C4 from '../assets/banners/BannersCategorias/SM/4.png';
import C5 from '../assets/banners/BannersCategorias/SM/5.png';
import C6 from '../assets/banners/BannersCategorias/SM/6.png';
import C7 from '../assets/banners/BannersCategorias/SM/7.png';
import C8 from '../assets/banners/BannersCategorias/SM/8.png';
import C9 from '../assets/banners/BannersCategorias/SM/9.png';
import C10 from '../assets/banners/BannersCategorias/SM/10.png';
import C11 from '../assets/banners/BannersCategorias/SM/11.png';
import C12 from '../assets/banners/BannersCategorias/SM/12.png';
import C13 from '../assets/banners/BannersCategorias/SM/13.png';
import C14 from '../assets/banners/BannersCategorias/SM/14.png';

import C1md from '../assets/banners/BannersCategorias/MD/1.png';
import C2md from '../assets/banners/BannersCategorias/MD/2.png';
import C3md from '../assets/banners/BannersCategorias/MD/3.png';
import C4md from '../assets/banners/BannersCategorias/MD/4.png';
import C5md from '../assets/banners/BannersCategorias/MD/5.png';
import C6md from '../assets/banners/BannersCategorias/MD/6.png';
import C7md from '../assets/banners/BannersCategorias/MD/7.png';
import C8md from '../assets/banners/BannersCategorias/MD/8.png';
import C9md from '../assets/banners/BannersCategorias/MD/9.png';
import C10md from '../assets/banners/BannersCategorias/MD/10.png';
import C11md from '../assets/banners/BannersCategorias/MD/11.png';
import C12md from '../assets/banners/BannersCategorias/MD/12.png';
import C13md from '../assets/banners/BannersCategorias/MD/13.png';
import C14md from '../assets/banners/BannersCategorias/MD/14.png';

import C1xl from '../assets/banners/BannersCategorias/XL/1.png';
import C2xl from '../assets/banners/BannersCategorias/XL/2.png';
import C3xl from '../assets/banners/BannersCategorias/XL/3.png';
import C4xl from '../assets/banners/BannersCategorias/XL/4.png';
import C5xl from '../assets/banners/BannersCategorias/XL/5.png';
import C6xl from '../assets/banners/BannersCategorias/XL/6.png';
import C7xl from '../assets/banners/BannersCategorias/XL/7.png';
import C8xl from '../assets/banners/BannersCategorias/XL/8.png';
import C9xl from '../assets/banners/BannersCategorias/XL/9.png';
import C10xl from '../assets/banners/BannersCategorias/XL/10.png';
import C11xl from '../assets/banners/BannersCategorias/XL/11.png';
import C12xl from '../assets/banners/BannersCategorias/XL/12.png';
import C13xl from '../assets/banners/BannersCategorias/XL/13.png';
import C14xl from '../assets/banners/BannersCategorias/XL/14.png';

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

// Banners por categoría
/*'Para ti', "Para los peludos", "Para disfrutar", 'Para tu paladar',
'Para quien amas', 'Para tu hogar', 'Para tu bienestar', 'Para tu mente',
'Inmobiliaria & Automotriz', 'Tecnología', 'Para tu mesa', 'Para los gobernantes',
'Servicios Profesionales', 'Reciclá & Ganá'*/

const bannersPorCategoriaXl = {
    "Para ti": [C1xl],
    "Para los peludos": [C2xl],
    "Para disfrutar": [C3xl],
    "Para tu paladar": [C4xl],
    "Para quien amas": [C5xl],
    'Para tu hogar': [C6xl],
    'Para tu bienestar': [C7xl],
    'Para tu mente': [C8xl],
    'Inmobiliaria & Automotriz': [C9xl],
    'Tecnología': [C10xl],
    'Para tu mesa': [C11xl],
    'Para los gobernantes':[C12xl],
    'Servicios Profesionales': [C13xl],
    'Reciclá & Ganá': [C14xl]
};
const bannersPorCategoriaMd = {
    "Para ti": [C1md],
    "Para los peludos": [C2md],
    "Para disfrutar": [C3md],
    "Para tu paladar": [C4md],
    "Para quien amas": [C5md],
    'Para tu hogar': [C6md],
    'Para tu bienestar': [C7md],
    'Para tu mente': [C8md],
    'Inmobiliaria & Automotriz': [C9md],
    'Tecnología': [C10md],
    'Para tu mesa': [C11md],
    'Para los gobernantes':[C12md],
    'Servicios Profesionales': [C13md],
    'Reciclá & Ganá': [C14md]
};
const bannersPorCategoriaSm = {
    "Para ti": [C1],
    "Para los peludos": [C2],
    "Para disfrutar": [C3],
    "Para tu paladar": [C4],
    "Para quien amas": [C5],
    'Para tu hogar': [C6],
    'Para tu bienestar': [C7],
    'Para tu mente': [C8],
    'Inmobiliaria & Automotriz': [C9],
    'Tecnología': [C10],
    'Para tu mesa': [C11],
    'Para los gobernantes':[C12],
    'Servicios Profesionales': [C13],
    'Reciclá & Ganá': [C14]
};

const Carrousel = ({categoria}) => { 
    const esPantallaGrande = useMediaQuery('(min-width: 1200px)');
    const esPantallaMediana = useMediaQuery('(min-width: 768px)');

    const [banners, setBanners] = useState([]);

    useEffect(() => {
        if(categoria) {
            if (esPantallaGrande) {
                setBanners(bannersPorCategoriaXl[categoria]);
            } else if(esPantallaMediana) {
                setBanners(bannersPorCategoriaMd[categoria]);
            } else {
                setBanners(bannersPorCategoriaSm[categoria]);
            }
        } else {
            if (esPantallaGrande) {
                setBanners(bannersXl);
            } else if(esPantallaMediana) {
                setBanners(bannersMd);
            } else {
                setBanners(bannersSm);
            }
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