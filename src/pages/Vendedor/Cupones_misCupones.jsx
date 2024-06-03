import React, { useState, useEffect } from "react";
import Vendedor from "../../components/Vendedor/Vendedor";
import ListaCupones from "../../components/Cupones/ListaCupones";
import { getCoupons } from '../../services/CuponesService';

export default function Cupones_misCupones() {
    const [cupones, setCupones] = useState([]);
    const vendedorId = "665623e7148fc08b6ee20773";

    useEffect(() => {
        const fetchCouponsData = async () => {
            try {
                const allCoupons = await getCoupons();
                const vendorCoupons = allCoupons.filter(coupon => coupon.createdBy === vendedorId);
                setCupones(vendorCoupons);
            } catch (error) {
                console.error('Error fetching coupons:', error);
            }
        };

        fetchCouponsData();
    }, [vendedorId]);
    return (
        <>
            <Vendedor>
                <div className="container-mis-cupones">
                    <div className="container-mis-cupones-lista">
                        <ListaCupones listaCupones={cupones}/>
                    </div>
                </div>
            </Vendedor>
        </>
    );
}