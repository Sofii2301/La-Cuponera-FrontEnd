import Gobernantes from "../assets/categorias/gobernantes.png"
import Inmobiliaria from "../assets/categorias/inmobiliaria.png"
import ParaDisfrutar from "../assets/categorias/paradisfrutar.png"
import ParaQuienAmas from "../assets/categorias/paraquienamas.png"
import ParaTi from "../assets/categorias/parati.png"
import ParaTuBienestar from "../assets/categorias/paratubienestar.png"
import ParaTuHogar from "../assets/categorias/paratuhogar.png"
import ParaTuMente from "../assets/categorias/paratumente.png"
import ParaTuMesa from "../assets/categorias/paratumesa.png"
import ParaTuPaladar from "../assets/categorias/paratupaladar.png"
import Peludos from "../assets/categorias/peludos.png"
import Recicla from "../assets/categorias/reciclaygana.png"
import Servicios from "../assets/categorias/serviciosprofesionales.png"
import Tecnologia from "../assets/categorias/tecnologia.png"
//import { useTranslation } from 'react-i18next';

export const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 1024 },
        items: 5,
        slidesToSlide: 2,
    },
    desktop: {
        breakpoint: { max: 1024, min: 800 },
        items: 4,
    },
    tablet: {
        breakpoint: { max: 800, min: 464 },
        items: 2,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
    },
};

export const responsiveCV = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 5
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};

export const useProductData = () => {
    //const { t } = useTranslation();

    return [
    {
        id: 1,
        imageurl: Gobernantes,
        name: "Para los gobernantes"/*t('rulers')*/,
    },
    {
        id: 2,
        imageurl: Inmobiliaria,
        name: "Inmobiliaria & Automotriz"/*t('real_estate')*/,
    },
    {
        id: 3,
        imageurl: ParaDisfrutar,
        name: "Para disfrutar"/*t('to_enjoy')*/,
    },
    {
        id: 4,
        imageurl: ParaQuienAmas,
        name: "Para quien amas"/*t('for_who_you_love')*/,
    },
    {
        id: 5,
        imageurl: ParaTi,
        name: "Para ti"/*t('for_you')*/,
    },
    {
        id: 6,
        imageurl: ParaTuBienestar,
        name: "Para tu bienestar"/*t('for_your_wellbeing')*/,
    },
    {
        id: 7,
        imageurl: ParaTuHogar,
        name: "Para tu hogar"/*t('for_your_home')*/,
    },
    {
        id: 8,
        imageurl: ParaTuMente,
        name: "Para tu mente"/*t('for_your_mind')*/,
    },
    {
        id: 9,
        imageurl: ParaTuMesa,
        name: "Para tu mesa"/*t('for_your_table')*/,
    },
    {
        id: 10,
        imageurl: ParaTuPaladar,
        name: "Para tu paladar"/*t('for_your_palate')*/,
    },
    {
        id: 11,
        imageurl: Peludos,
        name: "Para los peludos"/*t('pets')*/,
    },
    {
        id: 12,
        imageurl: Recicla,
        name: "Reciclá & Ganá"/*t('recycle_and_earn')*/,
    },
    {
        id: 13,
        imageurl: Servicios,
        name: "Servicios Profesionales"/*t('services')*/,
    },
    {
        id: 14,
        imageurl: Tecnologia,
        name: "Tecnología"/*t('technology')*/,
    },
    ]

};

