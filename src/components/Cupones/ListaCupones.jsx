import React, { useState, useEffect } from "react";
import img_cupon from "../../assets/burguer.jpg";
import { deleteCoupon } from '../../services/CuponesService';
import { useNavigate, useLocation, Link } from "react-router-dom";

export default function ListaCupones({listaCupones}) {
    const [cupones, setCupones] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        setCupones(listaCupones);
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteCoupon(id);
            setCupones(cupones.filter(coupon => coupon.id !== id));
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
                console.log("Valor de cupon.image:", coupon.image);
                return (
                    <div className="col-md-6 col-lg-6 col-xl-4 col-12 mb-3" key={coupon._id}>
                        <div className="card custom-card cupon-card-lc"> 
                            <div className="p-0 ht-100p"> 
                                <div className="product-grid-lc"> 
                                    <div className="product-image-lc"> 
                                        <Link to="" className="image-lc"> 
                                        {coupon.image ? (
                                            <img src={coupon.image} alt="Cupon" />
                                        ) : (
                                            <img src={img_cupon} alt="Portada" className="img-fluid" />
                                        )} 
                                        </Link> 
                                        <span className="product-discount-label-lc">{coupon.discount}%</span> 
                                    </div> 
                                    <div className="catetgoria-lc">Categorías{coupon.categorias}</div>
                                    <div className="product-content-lc"> 
                                        <div className="prices-lc d-flex justify-content-between align-items-center">
                                            <h3 className="title-lc">
                                                <Link>{coupon.title}</Link>
                                            </h3> 
                                            <div className="price-lc text-end">
                                                <span className="old-price-lc">$25{coupon.price} </span>
                                                <span className="new-price-lc">{/*coupon.price*/25 - ((/*coupon.price*/25 * coupon.discount)/100)}</span>
                                            </div>
                                        </div>
                                        <div className="col-md-8 col-lg-6 col-xl-4 col-12 rating-lc"> 
                                            <i className="bi bi-star"></i>
                                            <i className="bi bi-star"></i>
                                            <i className="bi bi-star"></i>
                                            <i className="bi bi-star"></i>
                                            <i className="bi bi-star"></i>
                                            <div className="text-muted">(14)</div>
                                        </div> 
                                    </div> 
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
            })):(<p>Aún no has añadido ningún cupón</p>)}
        </div>
        </>
    );
}
