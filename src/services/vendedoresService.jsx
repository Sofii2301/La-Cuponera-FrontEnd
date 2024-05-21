// src/servicesService.js
import { API_BASE_URL_VENDEDORES } from '../../config';

const handleResponse = async (response) => {
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error en la solicitud');
    }
    return response.json();
};

export const getVendedores = async () => {
    const response = await fetch(`${API_BASE_URL_VENDEDORES}`);
    return handleResponse(response);
};

export const getVendedorById = async (id) => {
    const response = await fetch(`${API_BASE_URL_VENDEDORES}/${id}`);
    return handleResponse(response);
};

export const registerVendedor = async (userData) => {
    try {
        const response = await fetch(`${API_BASE_URL_VENDEDORES}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        return handleResponse(response);
    } catch (error) {
        console.error('Error en registerVendedor:', error);
        throw error;
    }
};

export const loginVendedor = async (credentials) => {
    try {
        const response = await fetch(`${API_BASE_URL_VENDEDORES}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });
        return handleResponse(response);
    } catch (error) {
        console.error('Error en registerVendedor:', error);
        throw error;
    }
};

export const updateVendedor = async (id, userData) => {
    const response = await fetch(`${API_BASE_URL_VENDEDORES}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
    return handleResponse(response);
};

export const deleteVendedor = async (id) => {
    const response = await fetch(`${API_BASE_URL_VENDEDORES}/${id}`, {
        method: 'DELETE',
    });
    return handleResponse(response);
};
