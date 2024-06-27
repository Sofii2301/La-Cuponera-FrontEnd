import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import img_cupon from "../../assets/burguer.jpg";
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { getCouponImage } from '../../services/CuponesService';
import { useAuth } from "../../services/AuthContext";
import coupon_default from "../../assets/coupon_default.png";

export default function Cupon({ id, discount, categorias, title, price, raiting }) {
    const { authState, user } = useAuth();
    const [image, setImage] = useState(null);

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const imageUrl = await getCouponImage(id);
                setImage(imageUrl);
            } catch (error) {
                console.error('Error al obtener la imagen del cupón:', error);
            }
        };

        if (id) {
            fetchImage();
        }
    }, [image]);

    const handleBuy = (couponId) => {
        try {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            const updatedCart = [...cart, couponId];
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            console.log('Cupón agregado al carrito:', updatedCart);
        } catch (error) {
            console.error('Error al agregar el cupón al carrito:', error);
        }
    };

    return (
        <>
            <div className="card cupon-card-lc"> 
                <div className="p-0 ht-100p cupon-lc"> 
                    <div className="product-grid-lc"> 
                        <Link to={`/cupon/${id}`}>
                            <div className="product-image-lc"> 
                                {image ? (
                                    <img src={image} alt="Cupon" />
                                ) : (
                                    <img src={coupon_default} alt="Portada" className="img-fluid" />
                                )} 
                                <span className="product-discount-label-lc">{discount}%</span> 
                            </div> 
                            <div className="categoria-lc">{categorias ? categorias : 'Categoria'}</div>
                            <div className="product-content-lc"> 
                                <div className="prices-lc d-flex justify-content-between align-items-center">
                                    <div className="title-lc">
                                        <h5>{title}</h5>
                                    </div> 
                                    <div className="price-lc text-end">
                                        {/* <span className="old-price-lc">${price && price} </span>
                                        <span className="new-price-lc">{price && discount && price - ((price * discount)/100)}</span> */}
                                    </div>
                                </div>
                                <div className="col-md-8 col-lg-6 col-xl-4 col-12 rating-lc"> 
                                    <Stack spacing={1} className='rating'>
                                        <Rating name="half-rating-read" defaultValue={raiting && raiting} precision={0.5} readOnly />
                                    </Stack>
                                </div> 
                            </div> 
                        </Link>
                        <div className="d-flex justify-content-center">
                            {authState.userType === 'cuponero' && 
                                <button onClick={() => handleBuy(id)} className="btn btn-amarillo w-100 m-2">Agregar al carrito</button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
