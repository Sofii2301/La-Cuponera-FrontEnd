import React, { useState, useEffect } from 'react';
import { useMediaQuery } from '@mui/material';
import { getVendedores } from '../../services/vendedoresService';
import { useNavigate } from "react-router-dom";

const MapWithSidebar = () => {
    const [vendedores, setVendedores] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAndSetVendedores = async () => {
            try {
                const data = await getVendedores();
                console.log('Vendedores data:', data);
                setVendedores(data);
            } catch (error) {
                console.error('Error fetching vendors:', error);
            }
        };

        fetchAndSetVendedores();
    }, []);

    const sortedVendedores = [...vendedores].sort((a, b) => b.raiting - a.raiting);

    const handleStoreClick = (store) => {
        navigate("/vendedor/perfil/vista-previa")
    };

    const esPantallaGrande = useMediaQuery('(min-width: 767px)');

    return (
        <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
            {vendedores && 
                <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
                    {sortedVendedores.map((vendedor) => (
                        <li key={vendedor._id} onClick={() => handleStoreClick(vendedor)}>
                            <div className="flex items-center gap-x-6 flex-direction-column">
                                <img className="h-16 w-16 rounded-full" src={vendedor.logo} alt="" />
                                <div>
                                    <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">{vendedor.nombreTienda}</h3>
                                    <p className="text-sm font-semibold leading-6 text-indigo-600">{vendedor.categorias && vendedor.categorias.join(', ')}</p>
                                    <p className="text-sm font-semibold leading-6 text-indigo-600">{vendedor.raiting}</p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            }
        </div>
        </div>
    );
};

export default MapWithSidebar;