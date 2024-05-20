import React, { useState, useEffect } from "react";
import logo from "../../assets/logo_default.png";
import { getCoupons, deleteCoupon } from '../../services/CuponesService';
import { useNavigate, useLocation } from "react-router-dom";

export default function ListaCupones() {
    const [coupons, setCoupons] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

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

    const handleUpdate = async (id) => {
        navigate(`/vendedor/cupones/mis-cupones/editar-cupon/${id}`);
    };

    const handleCreate = async () => {
        navigate(`/vendedor/cupones/mis-cupones/crear-cupon`);
    };
    
    return (
        <>
        {location.pathname === '/vendedor/cupones/mis-cupones' && (
            <div className="row align-items-end mb-3">
                <div className="btn-agregar-cupon">
                    <button onClick={() => handleCreate()} className="btn-agregar-cupon btn-azul">
                    Agregar Cupón
                    </button>
                </div>
            </div> 
        )}
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
                                {location.pathname === '/vendedor/cupones/mis-cupones' && (
                                    <div className="gestion-btns">
                                        <button onClick={() => handleUpdate(coupon._id)} className="btn btn-amarillo me-2">Editar</button>
                                        <button onClick={() => handleDelete(coupon._id)} className="btn btn-rosa">Eliminar</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </li>
                );
            })}
        </ul>
        </>
    );
}
