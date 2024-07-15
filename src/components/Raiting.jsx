import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { getRaitingByCoupon, getRaitingByVendor } from '../services/CuponesService';
import Loading from './Loading'

export default function Raiting({ couponId, vendedorId }) {
    const [rating, setRating] = useState(null);

    useEffect(() => {
        const fetchRating = async () => {
            try {
                let data;
                if (couponId) {
                    data = await getRaitingByCoupon(couponId);
                }
                if (vendedorId) {
                    data = await getRaitingByVendor(vendedorId);
                }
                if (data && data.length > 0) {
                    const totalRating = data.reduce((sum, rating) => {
                        const ratingValue = parseFloat(rating.rating.raiting);
                        return !isNaN(ratingValue) ? sum + ratingValue : sum;
                    }, 0);
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
        <Stack spacing={1} className='rating'>
            <Rating 
                name="half-rating-read" 
                value={rating} 
                precision={0.5} 
                readOnly 
            />
        </Stack>
    );
};