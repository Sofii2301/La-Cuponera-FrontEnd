import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { getCouponImage, getRaitingByCoupon } from '../../services/CuponesService';
import { useAuth } from "../../services/AuthContext";
import { useCart } from "../../services/CartContext";
import coupon_default from "../../assets/coupon_default.png";
import Loading from '../Loading'

const CouponRating = ({ couponId }) => {
    const [rating, setRating] = useState(null);

    useEffect(() => {
        const fetchRating = async () => {
            try {
                const data = await getRaitingByCoupon(couponId);
                console.log("couponId raiting: ", couponId)
                console.log("data raiting: ", data)
                if (data && data.length > 0) {
                    const totalRating = data.reduce((sum, rating) => sum + rating.raiting, 0);
                    const averageRating = totalRating / data.length;
                    setRating(averageRating);
                } else {
                    setRating(0); // Si no hay ratings, se puede establecer en 0 o un valor por defecto.
                }
            } catch (error) {
                console.error('Error fetching raiting data:', error);
            }
        };

        fetchRating();
    }, [couponId]);

    if (rating === null) {
        return <Loading/>;
    }
    return (
        <div className="col-md-8 col-lg-6 col-xl-4 col-12 rating-lc">
            <Stack spacing={1} className='rating'>
                <Rating 
                    name="half-rating-read" 
                    value={rating} 
                    precision={0.5} 
                    readOnly 
                />
            </Stack>
        </div>
    );
};


export default function Cupon({ id, discount, categorias, title, price }) {
    const { authState, user } = useAuth();
    const [image, setImage] = useState(null);
    const { addToCart } = useCart(); 

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
    }, [id]);

    const handleBuy = (couponId) => {
        addToCart(couponId);
        console.log('Cupón agregado al carrito:', couponId);
    };

    return (
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
                                    <span className="old-price-lc">${price && price} </span>
                                    <span className="new-price-lc">{price && discount && price - ((price * discount)/100)}</span>
                                </div>
                            </div>
                            <div className="col-md-8 col-lg-6 col-xl-4 col-12 rating-lc"> 
                                <CouponRating couponId={id}/>
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
    );
}
