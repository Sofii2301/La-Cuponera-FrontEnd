import React, { useState, useEffect } from 'react';
import { useMediaQuery } from '@mui/material';
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo_default.png"
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

const ListaVendedores = ({ listaVendedores }) => {
    const navigate = useNavigate();

    // No necesitamos un estado local aquí, ya que `listaVendedores` proviene directamente de los props
    const sortedVendedores = [...listaVendedores].sort((a, b) => b.raiting - a.raiting);

    const handleStoreClick = (store) => {
        navigate("/vendedor/perfil/vista-previa")
    };

    const esPantallaGrande = useMediaQuery('(min-width: 767px)');

    return (
        <div className=" contenedor-lv">
            {listaVendedores && 
                <ul className={`container-vendedores`}>
                    {sortedVendedores.map((vendedor) => (
                        <li key={vendedor._id} onClick={() => handleStoreClick(vendedor)}>
                            <div className="flex items-center vendedor-lt product-grid-lc">
                                <img className="rounded-full" src={vendedor.logo ? vendedor.logo : logo} alt="" />
                                <div className="categoria-lc w-100">{vendedor.categorias ? vendedor.categorias.join(', ') : 'Categorias'}</div>
                                <div>
                                    <h3 className="text-base text-center font-semibold leading-7 tracking-tight text-gray-900">{vendedor.nombreTienda}</h3>
                                    <Stack spacing={1} className='rating'>
                                        <Rating name="half-rating-read" defaultValue={vendedor.raiting && vendedor.raiting} precision={0.5} readOnly />
                                    </Stack>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            }
        </div>
    );
};

export default ListaVendedores;
