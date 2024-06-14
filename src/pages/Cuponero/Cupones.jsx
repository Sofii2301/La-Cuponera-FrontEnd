import React, { useState, useEffect } from "react";
import { getCoupons } from '../../services/CuponesService';
import Cuponeros from "../../components/Cuponero/Cuponeros";
import ListaCupones from "../../components/Cupones/ListaCupones";

export default function Cupones(props) {
    const [cupones, setCupones] = useState([]);

    useEffect(() => {
        const fetchCouponsData = async () => {
            try {
                const allCoupons = await getCoupons();
                setCupones(allCoupons);
                console.log("Cupones data:", cupones);
            } catch (error) {
                console.error('Error fetching coupons:', error);
            }
        };

        fetchCouponsData();

        console.log('cupones data: ', cupones)
    }, []);

    return(
        <>
            <Cuponeros>
                <div className="p-5">
                    <ListaCupones listaCupones={cupones}/>
                </div>
            </Cuponeros>
        </>
    )
}