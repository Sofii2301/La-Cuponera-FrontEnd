// src/servicesService.js
import { API_BASE_URL_CUPONERO } from '../../config';

export const getCuponeros = async () => {
    try {
        const response = await fetch(`${API_BASE_URL_CUPONERO}`);
        if (!response.ok) {
            throw new Error('Error al obtener los cuponeros');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener los cuponeros:', error);
        throw error;
    }
};

export const getCuponeroById = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL_CUPONERO}/${id}`);
        if (!response.ok) {
            throw new Error('Error al obtener el cuponero');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener el cuponero:', error);
        throw error;
    }
};

export const createCuponero = async (cuponeroData) => {
    try {
        const response = await fetch(`${API_BASE_URL_CUPONERO}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cuponeroData)
        });
        if (!response.ok) {
            throw new Error('Error al crear el cuponero');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al crear el cuponero:', error);
        throw error;
    }
};

export const updateCuponero = async (id, cuponeroData) => {
    try {
        const response = await fetch(`${API_BASE_URL_CUPONERO}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cuponeroData)
        });
        if (!response.ok) {
            throw new Error('Error al actualizar el cuponero');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al actualizar el cuponero:', error);
        throw error;
    }
};

export const deleteCuponero = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL_CUPONERO}/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Error al eliminar el cuponero');
        }
        return { message: 'Cuponero eliminado correctamente' };
    } catch (error) {
        console.error('Error al eliminar el cuponero:', error);
        throw error;
    }
};

//enviar mail de verificacion
export const sendVerificationEmailC = async (email) => {
    try {
        const response = await fetch('/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        return { success: false, message: 'Error interno del servidor al enviar el correo de verificación.' };
    }
};

//verificar token ingresado por el usuario
export const verifyTokenC = async (email, token) => {
    try {
        const response = await fetch('/verify', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, token }),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        return { success: false, message: 'Error interno del servidor al verificar el token.' };
    }
};

export const followVendor = async (cuponeroId, vendorId) => {
    try {
        const response = await fetch(`${API_BASE_URL_CUPONERO}/${cuponeroId}/follow`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ vendorId })
        });
        if (!response.ok) {
            throw new Error('Error al seguir al vendedor');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al seguir al vendedor:', error);
        throw error;
    }
};

export const purchaseCoupon = async (cuponeroId, couponId) => {
    try {
        const response = await fetch(`${API_BASE_URL_CUPONERO}/${cuponeroId}/purchase`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ couponId })
        });
        if (!response.ok) {
            throw new Error('Error al comprar el cupón');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al comprar el cupón:', error);
        throw error;
    }
};