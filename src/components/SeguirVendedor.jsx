import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getVendedorById, updateVendor } from '../services/vendedoresService';

const SeguirVendedor = ({ vendedorId, onFollowChange }) => {
    const { authState } = useAuth();
    const [vendedor, setVendedor] = useState(null);
    const [following, setFollowing] = useState(false);

    useEffect(() => {
        const fetchVendedor = async () => {
            try {
                const data = await getVendedorById(vendedorId, 'Complete');
                setVendedor(data[0]);
                setFollowing(data[0].seguidores.includes(authState.user));
            } catch (error) {
                console.error('Error al obtener vendedor:', error);
            }
        };

        fetchVendedor();
    }, [vendedorId, authState.user]);

    const handleFollow = async () => {
        try {
            let updatedFollowers;
            if (following) {
                // Dejar de seguir al vendedor
                updatedFollowers = vendedor.seguidores.filter(id => id !== authState.userId);
            } else {
                // Seguir al vendedor
                updatedFollowers = [...vendedor.seguidores, authState.userId];
            }
            const updatedVendedor = { seguidores: updatedFollowers };
            await updateVendor(vendedorId, updatedVendedor, 'Complete');
            setFollowing(!following);
            setVendedor(updatedVendedor);
            onFollowChange(updatedVendedor);
        } catch (error) {
            console.error(`Error al ${following ? 'dejar de seguir' : 'seguir'} al vendedor:`, error);
        }
    };

    return (
        <button 
            className="btn rounded-10 btn-rosa" 
            onClick={handleFollow} 
        >
            {following ? 'Siguiendo' : 'Seguir'}
        </button>
    );
};

export default SeguirVendedor;
