import React, { createContext, useState, useContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { API_BASE_URL_VENDEDOR } from '../../config';
import { API_BASE_URL_CUPONERO } from '../../config';
// Crear el contexto de autenticación
const AuthContext = createContext();

// Proveedor del contexto de autenticación
export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        token: null,
        user: null,
        userType: null // 'cuponero' o 'vendedor'
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwtDecode(token);
            setAuthState({
                token: token,
                user: decoded.userId,
                userType: decoded.userType
            });
        }
    }, []);

    const login = async (email, password, userType) => {
        try {
            const apiUrl = userType === 'cuponero' ? API_BASE_URL_CUPONERO : API_BASE_URL_VENDEDOR;
            const response = await fetch(`${apiUrl}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                throw new Error('Error al iniciar sesión');
            }

            const data = await response.json();
            const { token } = data;
            const decoded = jwtDecode(token);

            localStorage.setItem('token', token);

            setAuthState({
                token: token,
                user: decoded.userId,
                userType: userType
            });

            return data;
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            throw error;
        }
    };

    const register = async (userData, userType) => {
        try {
            const apiUrl = userType === 'cuponero' ? API_BASE_URL_CUPONERO : API_BASE_URL_VENDEDOR;
            const response = await fetch(`${apiUrl}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            if (!response.ok) {
                throw new Error('Error al registrarse');
            }

            const data = await response.json();
            const { token } = data;
            const decoded = jwtDecode(token);

            localStorage.setItem('token', token);

            setAuthState({
                token: token,
                user: decoded.userId,
                userType: userType
            });

            return data;
        } catch (error) {
            console.error('Error al registrarse:', error);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setAuthState({
            token: null,
            user: null,
            userType: null
        });
    };

    return (
        <AuthContext.Provider value={{ user: authState.user, authState, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook personalizado para usar el contexto de autenticación
export const useAuth = () => {
    return useContext(AuthContext);
};
