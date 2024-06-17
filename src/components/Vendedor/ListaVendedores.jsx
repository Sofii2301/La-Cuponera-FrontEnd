import React, { useState, useEffect } from 'react';
import { useMediaQuery } from '@mui/material';
import { useNavigate } from "react-router-dom";
import Vendedor from "../../components/Cuponero/Vendedor"


const ListaVendedores = ({ listaVendedores }) => {
    const navigate = useNavigate();

    // No necesitamos un estado local aquí, ya que `listaVendedores` proviene directamente de los props
    const sortedVendedores = [...listaVendedores].sort((a, b) => b.raiting - a.raiting);

    const handleStoreClick = (vendedorId) => {
        navigate(`/cuponero/perfil-vendedor/${vendedorId}`)
    };

    const esPantallaGrande = useMediaQuery('(min-width: 767px)');

    return (
        <div className=" contenedor-lv">
            {listaVendedores && 
                <ul className={`container-vendedores`}>
                    {sortedVendedores.map((vendedor) => (
                        <li key={vendedor._id} onClick={() => handleStoreClick(vendedor._id)}>
                            <Vendedor
                                nombreTienda={vendedor.nombreTienda}
                                categorias={vendedor.categorias}
                                raiting={vendedor.raiting}
                            />
                        </li>
                    ))}
                </ul>
            }
        </div>
    );
};

export default ListaVendedores;
