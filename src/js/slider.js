import { useIntl } from 'react-intl';
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
    const intl = useIntl();

    return [
    {
        id: 1,
        imageurl: Gobernantes,
        name: intl.formatMessage({ id: 'rulers', defaultMessage: 'Gobernantes' }),
    },
    {
        id: 2,
        imageurl: Inmobiliaria,
        name: intl.formatMessage({ id: 'real_estate', defaultMessage: 'Inmobiliaria & Automotriz' }),
    },
    {
        id: 3,
        imageurl: ParaDisfrutar,
        name: intl.formatMessage({ id: 'to_enjoy', defaultMessage: 'Para disfrutar' }),
    },
    {
        id: 4,
        imageurl: ParaQuienAmas,
        name: intl.formatMessage({ id: 'for_who_you_love', defaultMessage: 'Para quien amas' }),
    },
    {
        id: 5,
        imageurl: ParaTi,
        name: intl.formatMessage({ id: 'for_you', defaultMessage: 'Para ti' }),
    },
    {
        id: 6,
        imageurl: ParaTuBienestar,
        name: intl.formatMessage({ id: 'for_your_wellbeing', defaultMessage: 'Para tu bienestar' }),
    },
    {
        id: 7,
        imageurl: ParaTuHogar,
        name: intl.formatMessage({ id: 'for_your_home', defaultMessage: 'Para tu hogar' }),
    },
    {
        id: 8,
        imageurl: ParaTuMente,
        name: intl.formatMessage({ id: 'for_your_mind', defaultMessage: 'Para tu mente' }),
    },
    {
        id: 9,
        imageurl: ParaTuMesa,
        name: intl.formatMessage({ id: 'for_your_table', defaultMessage: 'Para tu mesa' }),
    },
    {
        id: 10,
        imageurl: ParaTuPaladar,
        name: intl.formatMessage({ id: 'for_your_palate', defaultMessage: 'Para tu paladar' }),
    },
    {
        id: 11,
        imageurl: Peludos,
        name: intl.formatMessage({ id: 'pets', defaultMessage: 'Para los peludos' }),
    },
    {
        id: 12,
        imageurl: Recicla,
        name: intl.formatMessage({ id: 'recycle_and_earn', defaultMessage: 'Reciclá & Ganá' }),
    },
    {
        id: 13,
        imageurl: Servicios,
        name: intl.formatMessage({ id: 'services', defaultMessage: 'Servicios Profesionales' }),
    },
    {
        id: 14,
        imageurl: Tecnologia,
        name: intl.formatMessage({ id: 'technology', defaultMessage: 'Tecnología' }),
    },
    ]

};

