import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import img_cupon from "../../assets/burguer.jpg";
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { getCouponImage } from '../../services/CuponesService';
import { useAuth } from "../../services/AuthContext";
import { getCuponeroById, updateCuponero } from "../../services/cuponerosService";
import coupon_default from "../../assets/coupon_default.png";

export default function Cupon(coupon) {
    const { authState, user } = useAuth();
    const [image, setImage] = useState(null);
    const [cuponero, setCuponero] = useState({});

    useEffect(() => {
        const fetchCuponero = async () => {
            try {
                const data = await getCuponeroById(user);
                setCuponero(data);
            } catch (error) {
                console.error('Error al obtener los datos del cuponero:', error);
            }
        };

        const fetchImage = async () => {
            try {
                const imageUrl = await getCouponImage(coupon._id);
                setImage(imageUrl);
            } catch (error) {
                console.error('Error al obtener la imagen del cupón:', error);
            }
        };

        fetchCuponero();
        if (coupon._id) {
            fetchImage();
        }
    }, [coupon._id]);

    const handleBuy = async (couponId) => {
        try {
            const updatedCart = {
                cart:[...cuponero.cart, couponId]
            };
            const updatedCuponero = await updateCuponero(cuponero._id, updatedCart);
            setCuponero(updatedCuponero);
        } catch (error) {
            console.error('Error al agregar el cupón al carrito:', error);
        }
    };

    return (
        <>
            <div className="card cupon-card-lc"> 
                <div className="p-0 ht-100p cupon-lc"> 
                    <div className="product-grid-lc"> 
                        <Link to={`/cupon/${coupon._id}`}>
                            <div className="product-image-lc"> 
                                {image ? (
                                    <img src={image} alt="Cupon" />
                                ) : (
                                    <img src={coupon_default} alt="Portada" className="img-fluid" />
                                )} 
                                <span className="product-discount-label-lc">{coupon.discount}%</span> 
                            </div> 
                            <div className="categoria-lc">{coupon.categorias}</div>
                            <div className="product-content-lc"> 
                                <div className="prices-lc d-flex justify-content-between align-items-center">
                                    <div className="title-lc">
                                        <h5>{coupon.title}</h5>
                                    </div> 
                                    <div className="price-lc text-end">
                                        {/* <span className="old-price-lc">${coupon.price && coupon.price} </span>
                                        <span className="new-price-lc">{coupon.price && coupon.discount && coupon.price - ((coupon.price * coupon.discount)/100)}</span> */}
                                    </div>
                                </div>
                                <div className="col-md-8 col-lg-6 col-xl-4 col-12 rating-lc"> 
                                    <Stack spacing={1} className='rating'>
                                        <Rating name="half-rating-read" defaultValue={coupon.raiting && coupon.raiting} precision={0.5} readOnly />
                                    </Stack>
                                </div> 
                            </div> 
                        </Link>
                        <div className="d-flex justify-content-center">
                            {authState.userType === 'cuponero' && 
                                <button onClick={() => handleBuy(coupon._id)} className="btn btn-amarillo w-100 m-2">Agregar al carrito</button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
