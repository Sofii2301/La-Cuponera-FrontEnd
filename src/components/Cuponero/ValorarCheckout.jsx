import React, { useState } from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import coupon_default from "../../assets/coupon_default.png";
import SocialShareButtons from '../SocialShareButtons';

export default function ValorarCheckout({ cartCoupons, reviews, setReviews, comments, setComments, errors, setErrors, Like, setLike }) {
    const handleRatingChange = (couponId, newRating) => {
        setReviews(prevReviews => ({
            ...prevReviews,
            [couponId]: newRating,
        }));
    };

    const handleCommentChange = (couponId, newComment) => {
        setComments(prevComments => ({
            ...prevComments,
            [couponId]: newComment,
        }));
    };

    const handleHeartClick = (currentLikeStatus) => {
        currentLikeStatus === 1 ? setLike(0) : setLike(1);    
    }

    // Validación para pasar al siguiente paso
    const validateActions = () => {
        const allValid = cartCoupons.every(coupon => {
            const hasReview = !!reviews[coupon.id];
            const hasComment = !!comments[coupon.id];
            const hasLike = Like === 1;

            return hasReview || hasComment || hasLike;
        });

        setValidationError(!allValid);
        return allValid;
    };

    return (
        <div className="container">
            <div className="titulo-descrip-vc mb-3">
                <h2 className="fw-bold">Valorar</h2>
                <p>¡Conseguir cupones con La Cuponera es gratis! Solo te pedimos unos minutos de tu tiempo para dejarnos tu opinión.</p>
            </div>
            {cartCoupons.map(coupon => (
                <div key={coupon.id} className="mb-4 d-flex flex-column border rounded-md">
                    <div className="p-4 d-flex justify-around flex-wrap">
                        <div className="h-40 w-40 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            {coupon.image ? (
                                <img
                                    src={coupon.image}
                                    alt={coupon.title}
                                    className="h-full w-full object-cover object-center me-3 mb-2"
                                />
                            ) : (
                                <img
                                    src={coupon_default}
                                    alt='Cupon'
                                    className="h-full w-full object-cover object-center me-3 mb-2"
                                />
                            )}
                        </div>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                mb: 2,
                            }}
                        >
                            <h4 className="mb-2">{coupon.title}</h4>
                            <Rating
                                name={`rating-${coupon.id}`}
                                value={reviews[coupon.id] || 0}
                                precision={0.5}
                                onChange={(event, newValue) => handleRatingChange(coupon.id, newValue)}
                            />
                            <textarea
                                placeholder="Deja tu comentario aquí..."
                                value={comments[coupon.id] || ""}
                                onChange={(event) => handleCommentChange(coupon.id, event.target.value)}
                                className="form-control mt-2"
                            />
                            {errors.comments && errors.comments[coupon.id] && (
                                <div style={{ color: 'red' }}>{errors.comments[coupon.id]}</div>
                            )}
                        </Box>
                    </div>
                    <div className="border-top"></div>
                    <div className='d-flex align-items-center justify-content-between p-4'>
                        <div className="d-flex justify-content-center">
                            <h6 className='mr-3 mt-2'>Dejale un like a este cupón:</h6>
                            <button onClick={() => handleHeartClick(Like)}>
                                {Like === 1 ? (
                                    <FavoriteIcon color="error" fontSize='large'/>
                                ) : (
                                    <FavoriteBorderIcon fontSize='large' />
                                )}
                            </button>
                        </div>
                        {errors.reviews && errors.reviews[coupon.id] && (
                            <div style={{ color: 'red' }}>{errors.reviews[coupon.id]}</div>
                        )}
                    </div>
                    <div className="border-top"></div>
                    <Box className='p-4'>
                        <h6 className='mb-3'>Comparte este cupón en tus redes sociales:</h6>
                        <SocialShareButtons shareUrl={`https://lacuponera.app/cupon/${coupon.id}`} title='¡Mirá este cupón de La Cuponera!' />
                    </Box>
                    <div className="border-top"></div>
                </div>
                
            ))}
        </div>
    );
}
