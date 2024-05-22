// src/servicesService.js
import { API_BASE_URL_CUPONEROS } from '../../config';

const handleResponse = async (response) => {
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error en la solicitud');
    } 
    return response.json();
};

export const getCuponeros = async () => {
    const response = await fetch(`${API_BASE_URL_CUPONEROS}`);
    return handleResponse(response);
};

export const getCuponeroById = async (id) => {
    const response = await fetch(`${API_BASE_URL_CUPONEROS}/${id}`);
    return handleResponse(response);
};

export const registerCuponero = async (userData) => {
    try {
        const response = await fetch(`${API_BASE_URL_CUPONEROS}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        
        return handleResponse(response);
    } catch (error) {
        console.error('Error en registerCuponero:', error);
        throw error;
    }
};

export const loginCuponero = async (credentials) => {
    try { 
        const response = await fetch(`${API_BASE_URL_CUPONEROS}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });
        return handleResponse(response);
    } catch (error) {
        console.error('Error en registerCuponero:', error);
        throw error;
    }
};

export const updateCuponero = async (id, userData) => {
    const response = await fetch(`${API_BASE_URL_CUPONEROS}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
    return handleResponse(response);
};

export const deleteCuponero = async (id) => {
    const response = await fetch(`${API_BASE_URL_CUPONEROS}/${id}`, {
        method: 'DELETE',
    });
    return handleResponse(response);
};
