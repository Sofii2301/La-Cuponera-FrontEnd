import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import img_cupon from "../../assets/burguer.jpg";
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { getCouponImage } from '../../services/CuponesService';

export default function Cupon(coupon) {
    const [image, setImage] = useState(null);

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const imageUrl = await getCouponImage(coupon._id);
                setImage(imageUrl);
                console.log("imagen: ", image)
            } catch (error) {
                console.error('Error al obtener la imagen del cupón:', error);
            }
        };

        if (coupon._id) {
            fetchImage();
        }
    }, [coupon._id]);

    return (
        <>
        <Link to={`/cupon/${coupon._id}`}>
            <div className="card custom-card cupon-card-lc"> 
                <div className="p-0 ht-100p cupon-lc"> 
                    <div className="product-grid-lc"> 
                        <div className="product-image-lc"> 
                            <Link to="" className="image-lc"> 
                                {image ? (
                                    <img src={image} alt="Cupon" />
                                ) : (
                                    <img src={img_cupon} alt="Portada" className="img-fluid" />
                                )} 
                            </Link> 
                            <span className="product-discount-label-lc">{coupon.discount}%</span> 
                        </div> 
                        <div className="categoria-lc">{coupon.categorias}</div>
                        <div className="product-content-lc"> 
                            <div className="prices-lc d-flex justify-content-between align-items-center">
                                <h3 className="title-lc">
                                    <Link>{coupon.title}</Link>
                                </h3> 
                                <div className="price-lc text-end">
                                    <span className="old-price-lc">${coupon.price && coupon.price} </span>
                                    <span className="new-price-lc">{coupon.price && coupon.discount && coupon.price - ((coupon.price * coupon.discount)/100)}</span>
                                </div>
                            </div>
                            <div className="col-md-8 col-lg-6 col-xl-4 col-12 rating-lc"> 
                                <Stack spacing={1} className='rating'>
                                    <Rating name="half-rating-read" defaultValue={coupon.raiting && coupon.raiting} precision={0.5} readOnly />
                                </Stack>
                            </div> 
                        </div> 
                    </div>
                </div>
            </div>
        </Link>
    
        </>
    );
}