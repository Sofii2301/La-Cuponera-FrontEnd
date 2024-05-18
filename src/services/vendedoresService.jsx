// src/services/vendedoresService.js
import { API_BASE_URL } from '../../config';

const handleResponse = async (response) => {
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error en la solicitud');
    }
    return response.json();
};

export const getVendedores = async () => {
    const response = await fetch(`${API_BASE_URL}/vendedores`);
    return handleResponse(response);
};

export const getVendedorById = async (id) => {
    const response = await fetch(`${API_BASE_URL}/vendedores/${id}`);
    return handleResponse(response);
};

export const registerVendedor = async (userData) => {
    const response = await fetch(`${API_BASE_URL}/vendedores/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    });
    return handleResponse(response);
};

export const loginVendedor = async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/vendedores/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    });
    return handleResponse(response);
};

export const updateVendedor = async (id, userData) => {
    const response = await fetch(`${API_BASE_URL}/vendedores/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
    return handleResponse(response);
};

export const deleteVendedor = async (id) => {
    const response = await fetch(`${API_BASE_URL}/vendedores/${id}`, {
        method: 'DELETE',
    });
    return handleResponse(response);
};
