// src/components/ComprarCupon.jsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../services/AuthContext';
import { getCoupons } from '../services/couponService';

const ComprarCupon = () => {
    const { authState } = useAuth();
    const [coupons, setCoupons] = useState([]);
    const [comprados, setComprados] = useState([]);

    useEffect(() => {
        const fetchCoupons = async () => {
            try {
                const data = await getCoupons();
                setCoupons(data);
            } catch (error) {
                console.error('Error al obtener cupones:', error);
            }
        };

        fetchCoupons();
    }, []);

    const handleCompra = async (couponId) => {
        try {
            // Suponiendo que existe una API para comprar un cupón
            await fetch(`${API_BASE_URL_CUPONERO}/comprar`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authState.token}`
                },
                body: JSON.stringify({ couponId })
            });
            setComprados([...comprados, couponId]);
        } catch (error) {
            console.error('Error al comprar cupón:', error);
        }
    };

    return (
        <div>
            <h1>Comprar Cupones</h1>
            <ul>
                {coupons.map(coupon => (
                    <li key={coupon.id}>
                        {coupon.nombre} - {coupon.descripcion} - {coupon.descuento}%
                        <button onClick={() => handleCompra(coupon.id)} disabled={comprados.includes(coupon.id)}>
                            {comprados.includes(coupon.id) ? 'Comprado' : 'Comprar'}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ComprarCupon;
