import React, { useState, useEffect } from "react";
import logo from "../../assets/logo_default.png";
import { getCoupons, deleteCoupon } from '../../services/CuponesService';
import EditCupon from "./EditarCupon";

export default function ListaCupones() {
    const [coupons, setCoupons] = useState([]);

    useEffect(() => {
        const fetchCoupons = async () => {
            const data = await getCoupons();
            setCoupons(data);
        };
        fetchCoupons();
    }, []);

    const handleDelete = async (id) => {
        await deleteCoupon(id);
        setCoupons(coupons.filter(coupon => coupon._id !== id));
    };

    const handlenUpdate = async (id) => {
        EditCupon(id);
    };

    /*useEffect(() => {
        return () => {
            // Limpiar URLs de objetos creados
            cupones.forEach(cupon => {
                if (cupon.image instanceof File) {
                    URL.revokeObjectURL(cupon.image);
                }
            });
        };
    }, [cupones]);*/
    
    return (
        <>
        <ul className="list-group cupones-container">
            {coupons.map(coupon => {
                console.log("Valor de cupon.image:", coupon.image);
                return (
                    <li key={coupon._id} className="list-group-item cupon-container mb-3">
                        <div className="row">
                            <div className="col-6">
                                {coupon.image ? (
                                    <img src={typeof coupon.image === 'string' ? coupon.image : (coupon.image instanceof File ? URL.createObjectURL(coupon.image) : '')} alt="Cupon" />
                                    //<img src={cupon.image} alt="Cupon" />
                                ) : (
                                    <img src={logo} alt="Portada" className="img-fluid" />
                                )}
                            </div>
                            <div className="col-6">
                                <h3>{coupon.title}</h3>
                                <p>{coupon.description}</p>
                                <p>Descuento: {coupon.discount}%</p>
                                <p>Vencimiento: {coupon.expirationDate}</p>
                                
                                <button onClick={() => handlenUpdate(coupon._id)} className="btn btn-amarillo me-2">Editar</button>
                                <button onClick={() => handleDelete(coupon._id)} className="btn btn-rosa">Eliminar</button>
                            </div>
                        </div>
                    </li>
                );
            })}
        </ul>
        </>
    );
}
