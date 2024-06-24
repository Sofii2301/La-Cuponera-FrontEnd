// src/components/SeguirVendedor.jsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../services/AuthContext';
import { getVendedores } from '../services/vendedoresService';

const SeguirVendedor = () => {
    const { authState } = useAuth();
    const [vendedores, setVendedores] = useState([]);
    const [following, setFollowing] = useState([]);

    useEffect(() => {
        const fetchVendedores = async () => {
            try {
                const data = await getVendedores('Complete');
                setVendedores(data);
            } catch (error) {
                console.error('Error al obtener vendedores:', error);
            }
        };

        fetchVendedores();
    }, []);

    const handleFollow = async (vendedorId) => {
        try {
            // Suponiendo que existe una API para seguir a un vendedor
            await fetch(`${API_BASE_URL_CUPONERO}/follow`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authState.token}`
                },
                body: JSON.stringify({ vendedorId })
            });
            setFollowing([...following, vendedorId]);
        } catch (error) {
            console.error('Error al seguir al vendedor:', error);
        }
    };

    return (
        <div>
            <h1>Seguir Vendedor</h1>
            <ul>
                {vendedores.map(vendedor => (
                    <li key={vendedor.vendedor_id}>
                        {vendedor.nombre}
                        <button onClick={() => handleFollow(vendedor.vendedor_id)} disabled={following.includes(vendedor.id)}>
                            {following.includes(vendedor.vendedor_id) ? 'Siguiendo' : 'Seguir'}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SeguirVendedor;
