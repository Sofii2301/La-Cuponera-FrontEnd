// src/components/CuponeroDashboard.jsx

import React, { useState, useEffect } from 'react';
import { getVendedores } from '../services/vendedoresService';
import { getCoupons } from '../services/couponService';
import { followVendor } from '../services/cuponerosService'; // Definir esta función en el servicio de cuponeros
import { useAuth } from '../services/AuthContext';

const CuponeroDashboard = () => {
    const [vendedores, setVendedores] = useState([]);
    const [cupones, setCupones] = useState([]);
    const { authState } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const vendedoresData = await getVendedores('Complete');
                setVendedores(vendedoresData);
                const cuponesData = await getCoupons();
                setCupones(cuponesData);
            } catch (error) {
                console.error('Error al obtener datos:', error);
            }
        };
        fetchData();
    }, []);

    const handleFollow = async (vendorId) => {
        try {
            await followVendor(authState.user, vendorId);
            alert('Vendedor seguido con éxito');
        } catch (error) {
            console.error('Error al seguir vendedor:', error);
        }
    };

    const handlePurchase = (couponId) => {
        // Implementar la lógica de compra de cupones
        //console.log(`Comprando cupón ${couponId}`);
    };

    return (
        <div>
            <h1>Dashboard Cuponero</h1>
            <h2>Vendedores</h2>
            <ul>
                {vendedores.map(vendedor => (
                    <li key={vendedor._id}>
                        {vendedor.nombre}
                        <button onClick={() => handleFollow(vendedor._id)}>Seguir</button>
                    </li>
                ))}
            </ul>
            <h2>Cupones Disponibles</h2>
            <ul>
                {cupones.map(cupon => (
                    <li key={cupon._id}>
                        {cupon.title} - {cupon.discount}%
                        <button onClick={() => handlePurchase(cupon._id)}>Comprar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CuponeroDashboard;
