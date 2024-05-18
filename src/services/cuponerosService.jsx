// src/services/cuponerosService.js
import { API_BASE_URL } from '../../config';

const handleResponse = async (response) => {
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error en la solicitud');
    }
    return response.json();
};

export const getCuponeros = async () => {
    const response = await fetch(`${API_BASE_URL}/cuponeros`);
    return handleResponse(response);
};

export const getCuponeroById = async (id) => {
    const response = await fetch(`${API_BASE_URL}/cuponeros/${id}`);
    return handleResponse(response);
};

export const registerCuponero = async (userData) => {
    const response = await fetch(`${API_BASE_URL}/cuponeros/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    });
    return handleResponse(response);
};

export const loginCuponero = async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/cuponeros/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    });
    return handleResponse(response);
};

export const updateCuponero = async (id, userData) => {
    const response = await fetch(`${API_BASE_URL}/cuponeros/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
    return handleResponse(response);
};

export const deleteCuponero = async (id) => {
    const response = await fetch(`${API_BASE_URL}/cuponeros/${id}`, {
        method: 'DELETE',
    });
    return handleResponse(response);
};
