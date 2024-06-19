import React, { useState, useEffect } from "react";
import { deleteCoupon, deleteCouponImage } from '../../services/CuponesService';
import { useNavigate, useLocation } from "react-router-dom";
import Cupon from "./Cupon";

const ListaCupones = ({ listaCupones }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [cupones, setCupones] = useState([]);

    useEffect(() => {
        setCupones(listaCupones)
    }, [listaCupones]);

    const handleDelete = async (id) => {
        try {
            await deleteCoupon(id);
            await deleteCouponImage(id);
            // Actualiza la lista de cupones después de eliminar uno
            setCupones(prevCupones => prevCupones.filter(coupon => coupon._id !== id));
        } catch (error) {
            console.error('Error al eliminar cupón:', error);
        }
    };

    const handleUpdate = async (id) => {
        navigate(`/vendedor/cupones/mis-cupones/editar-cupon/${id}`);
    };

    const handleCreate = async () => {
        navigate(`/vendedor/cupones/mis-cupones/agregar-cupon`);
    };
    
    return (
        <>
        {location.pathname === '/vendedor/cupones/mis-cupones' && (
            <div className="row align-items-end mb-3">
                <div className="btn-agregar-cupon">
                    <button onClick={() => handleCreate()} className="btn-agregar-cupon btn btn-azul">
                        Agregar Cupón
                    </button>
                </div>
            </div> 
        )}
        <div className="row row-sm container-cupones-lc">
            {cupones ? (cupones.map(coupon => {
                console.log("Cupon data:", cupones);
                return (
                    <div className="col-md-6 col-lg-6 col-xl-4 col-12 mb-3 col-cupon-lc" key={coupon._id}>
                        <div className="card custom-card cupon-card-lc"> 
                            <div className="p-0 ht-100p cupon-lc"> 
                            <div className="product-grid-lc"> 
                                <Cupon
                                    _id={coupon._id}
                                    discount={coupon.discount}
                                    categorias={coupon.categorias}
                                    title={coupon.title}
                                    price={coupon.price}
                                    raiting={coupon.raiting}
                                />
                                {location.pathname === '/vendedor/cupones/mis-cupones' && (
                                    <div className="gestion-btns-lc">
                                        <button onClick={() => handleUpdate(coupon._id)} className="btn btn-amarillo me-2">Editar</button>
                                        <button onClick={() => handleDelete(coupon._id)} className="btn btn-rosa">Eliminar</button>
                                    </div>
                                )}
                            </div>
                            </div> 
                        </div>
                    </div>
                );
            })):(<p>Aún no hay cupones</p>)}
        </div>
        </>
    );
}

export default ListaCupones;
