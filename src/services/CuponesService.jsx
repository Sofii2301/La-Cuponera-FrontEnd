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
    const formData = new FormData();
    for (const key in couponData) {
        formData.append(key, couponData[key]);
    }
    const response = await fetch(`${API_BASE_URL_CUPONES}`, {
        method: 'POST',
        body: formData,
    });
    return handleResponse(response);
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
