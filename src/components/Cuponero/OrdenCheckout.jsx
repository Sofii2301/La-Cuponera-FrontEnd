import React from "react";
import { Link } from "react-router-dom";
import Avatar from '@mui/joy/Avatar';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

export default function OrdenCheckout({ cartCoupons, reviews, comments, user }) {
    return (
        <div className="container">
            <div className="titulo-descrip-vc mb-3">
                <h2 className="fw-bold">Tu Orden</h2>
                <p>Revisa los detalles de tu orden y contacta a los vendedores para coordinar la compra de tus cupones.</p>
            </div>
            {cartCoupons && cartCoupons.map(coupon => (
                <div key={coupon.id} className="d-flex flex-column mb-4 rounded-md border border-gray-200 p-3">
                    <div className="coupon-oc d-flex justify-around flex-wrap">
                        <div className="h-32 w-32 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img src={coupon.image} alt={coupon.title} className="h-full w-full object-cover object-center" />
                        </div>
                        <div className="info-cupon-oc w-auto p-3">
                            <h4>{coupon.title}</h4>
                            <p><strong>Descuento:</strong> {coupon.discount}%</p>
                            <p><strong>Fecha de Expiración:</strong> {coupon.expirationDate}</p>
                        </div>
                    </div>
                    
                    <div className="opinion-oc m-3 d-flex flex-column">
                        <h4 className="mb-2">Tu opinión:</h4>
                        <div className="opinion-content-oc rounded-md border border-gray-200 p-3">
                            <Stack spacing={1} className='rating mb-2'>
                                <Rating name="half-rating-read" defaultValue={reviews[coupon.id]} precision={0.5} readOnly />
                            </Stack>
                            <p>Comentario: {comments[coupon.id]}</p>
                        </div>
                    </div>
                    <div className="vendor-wp-oc d-flex justify-between flex-wrap p-3">
                        <div className="vendor-logo-name-oc d-flex align-items-center me-3 mb-2">
                            <Avatar alt={coupon.vendorName} src={coupon.vendorLogo} size="sm" variant="outlined" />
                            <p className="ms-2">{coupon.vendorName}</p>
                        </div>
                        <Link to={`https://wa.me/${coupon.vendorPhone}`} target="_blank" rel="noopener noreferrer" className="btn btn-success">
                            <i className="bi bi-whatsapp"></i> Contactar Vendedor
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
}
