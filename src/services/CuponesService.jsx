// src/services/couponService.js
import { API_BASE_URL_CUPONES, API_BASE_URL_CUPONES_IMAGEN } from '../../config';

export const getCoupons = async () => {
    try {
        const response = await fetch(`${API_BASE_URL_CUPONES}`);
        if (!response.ok) {
            throw new Error('Error al obtener los cupones');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener los cupones:', error);
        throw error;
    }
};

export const getCouponById = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL_CUPONES}/${id}`);
        if (!response.ok) {
            throw new Error('Error al obtener el cupón');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener el cupón:', error);
        throw error;
    }
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
        if (!response.ok) {
            throw new Error('Error al crear el cupón');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al crear el cupón:', error);
        throw error;
    }
};

export const updateCoupon = async (id, couponData) => {
    try {
        const response = await fetch(`${API_BASE_URL_CUPONES}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(couponData)
        });
        if (!response.ok) {
            throw new Error('Error al actualizar el cupón');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al actualizar el cupón:', error);
        throw error;
    }
};

export const deleteCoupon = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL_CUPONES}/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Error al eliminar el cupón');
        }
        return { message: 'Cupón eliminado correctamente' };
    } catch (error) {
        console.error('Error al eliminar el cupón:', error);
        throw error;
    }
};

export const getCouponsByVendor = async (vendorId) => {
    try {
        const allCoupons = await getCoupons();
        return allCoupons.filter(coupon => coupon.createdBy === vendorId);
    } catch (error) {
        console.error('Error al obtener cupones por vendedor:', error);
        throw error;
    }
};


// Funciones para manejar imágenes de cupones

export const getCouponImage = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL_CUPONES_IMAGEN}/cupones/${id}`, {
            headers: {
                'Content-Type': 'image' 
            }
        });
        if (!response.ok) {
            throw new Error('Error al obtener la imagen del cupón');
        }
        const blob = await response.blob(); // Obtener la imagen como un blob
        return URL.createObjectURL(blob); // Crear una URL de objeto para la imagen
    } catch (error) {
        console.error('Error al obtener la imagen del cupón:', error);
        throw error;
    }
};

export const uploadCouponImage = async (id, imageFile) => {
    try {
        const formData = new FormData();
        formData.append('imagen', imageFile);
        const response = await fetch(`${API_BASE_URL_CUPONES_IMAGEN}/cupones/${id}`, {
            method: 'POST',
            body: formData
        });
        if (!response.ok) {
            throw new Error('Error al subir la imagen del cupón');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al subir la imagen del cupón:', error);
        throw error;
    }
};

export const updateCouponImage = async (id, imageFile) => {
    try {
        const formData = new FormData();
        formData.append('imagen', imageFile);
        const response = await fetch(`${API_BASE_URL_CUPONES_IMAGEN}/cupones/${id}`, {
            method: 'PUT',
            body: formData
        });
        if (!response.ok) {
            throw new Error('Error al actualizar la imagen del cupón');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al actualizar la imagen del cupón:', error);
        throw error;
    }
};

export const deleteCouponImage = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL_CUPONES_IMAGEN}/cupones/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Error al eliminar la imagen del cupón');
        }
        return { message: 'Imagen del cupón eliminada correctamente' };
    } catch (error) {
        console.error('Error al eliminar la imagen del cupón:', error);
        throw error;
    }
};