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

// Funciones para la gestión de imágenes
export const uploadImage = async (imageFile) => {
    try {
        const formData = new FormData();
        formData.append('imagen', imageFile);

        const response = await fetch(`${API_BASE_URL_CUPONES_IMAGEN}`, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error(`Error en la inserción: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error insertando cupon:', error);
    }
};

export const updateImage = async (id, imageFile) => {
    try {
        const formData = new FormData();
        formData.append('imagen', imageFile);

        const response = await fetch(`${API_BASE_URL_CUPONES_IMAGEN}/${id}`, {
            method: 'PUT',
            body: formData
        });

        if (!response.ok) {
            throw new Error(`Error en la actualización: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error actualizando cupon:', error);
    }
};

export const deleteImage = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL_CUPONES_IMAGEN}/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error(`Error en la eliminación: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error eliminando cupon:', error);
    }
};