import React from 'react'
import "../../css/Cuponero/filtro.css"
import Multiselect from "multiselect-react-dropdown";
import ListaCupones from '../Cupones/ListaCupones';
import { productData } from "../../js/cupones"

const categoryOptions = [
    'Para ti', "Para los peludos", "Para disfrutar", 'Para tu paladar',
    'Para quien amas', 'Para tu hogar', 'Para tu bienestar', 'Para tu mente',
    'Inmobiliaria & Automotriz', 'Tecnología', 'Para tu mesa', 'Para los gobernantes',
    'Servicios Profesionales', 'Reciclá & Ganá'
];

const handleCategoryChange = (selectedList) => {
    setFormData(prevState => ({
        ...prevState,
        categorias: selectedList
    }));
};

const handleCategoryRemove = (selectedList) => {
    setFormData(prevState => ({
        ...prevState,
        categorias: selectedList
    }));
};

export default function Filtro() {
    return (
        <div className='contenedorCupones'>
            <div className='cuponesSubCont1'>
                <div className='cuponesTxt'>
                    <h1 className='titulo'>Cupones</h1>
                    <p>Conseguí cupones de tus productos favoritos</p>
                </div>
                <div className='cuponesSelect'>
                    <p>Ordenar por:</p>
                    <Multiselect
                        isObject={false}
                        onRemove={handleCategoryRemove}
                        onSelect={handleCategoryChange}
                        options={categoryOptions}
                    />
                </div>
            </div>
            <div className='cuponesSubCont2'>
                <ListaCupones listaCupones={productData}> </ListaCupones>
            </div>
        </div>
    )
}
