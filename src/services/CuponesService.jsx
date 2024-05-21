// src/services/couponService.js
import { API_BASE_URL_CUPONES } from '../../config';

const handleResponse = async (response) => {
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error en la solicitud');
    }
    return response.json();
};

export const getCoupons = async () => {
    const response = await fetch(`${API_BASE_URL_CUPONES}`);
    return handleResponse(response);
};

export const getCouponById = async (id) => {
    const response = await fetch(`${API_BASE_URL_CUPONES}/${id}`);
    return handleResponse(response);
};

export const createCoupon = async (couponData) => {
    try {
        const response = await fetch(`${API_BASE_URL_CUPONES}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(couponData),
        });
        return handleResponse(response);
    } catch (error) {
        console.error('Error en createCoupon:', error);
        throw error;
    }
};

export const updateCoupon = async (id, couponData) => {
    const response = await fetch(`${API_BASE_URL_CUPONES}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(couponData),
    });
    return handleResponse(response);
};

export const deleteCoupon = async (id) => {
    const response = await fetch(`${API_BASE_URL_CUPONES}/${id}`, {
        method: 'DELETE',
    });
    return handleResponse(response);
};
