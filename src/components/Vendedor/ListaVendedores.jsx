import React, { useState, useEffect } from 'react';
import { useMediaQuery } from '@mui/material';
import { useNavigate, useLocation } from "react-router-dom";
import Vendedor from "../../components/Cuponero/Vendedor"


const ListaVendedores = ({ listaVendedores }) => {

    // No necesitamos un estado local aquí, ya que `listaVendedores` proviene directamente de los props
    const sortedVendedores = [...listaVendedores].sort((a, b) => b.raiting - a.raiting);

    return (
        <div className=" contenedor-lv">
            {listaVendedores &&
                <ul className={`container-vendedores`}>
                    {sortedVendedores.map((vendedor) => (
                        <li key={vendedor.id}>
                            <Vendedor
                                nombreTienda={vendedor.nombreTienda}
                                categorias={vendedor.categorias}
                                raiting={vendedor.raiting}
                                id={vendedor.vendedor_id}
                            />
                        </li>
                    ))}
                </ul>
            }
        </div>
    );
};

export default ListaVendedores;
