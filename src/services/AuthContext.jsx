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
        const storedAuth = localStorage.getItem('token');
        console.log("Token from localStorage: ", storedAuth); // Verifica el token aquí
        if (storedAuth) {
            /*const decoded = jwtDecode(token);
            console.log("Decoded token: ", decoded); // Verifica el token decodificado

            let UserId = null;
            if (decoded.vendedorId) {
                UserId = decoded.vendedorId;
            } else if (decoded.userId) {
                UserId = decoded.userId;
            }*/
            try {
                const auth = JSON.parse(storedAuth);
                console.log("token: ", auth.token);

                setAuthState({
                    token: auth.token,
                    user: auth.user,
                    userType: auth.userType
                });
            } catch (e) {
                console.error('Error parsing stored auth token:', e);
            }
        }
    }, []);

    const login = async (credentials, userType) => {
        try {
            const apiUrl = userType === 'cuponero' ? API_BASE_URL_CUPONERO : API_BASE_URL_VENDEDOR;
            console.log("apiUrl: ", `${apiUrl}/login`)
            console.log("Auth-context credentials: ", credentials)
            const response = await fetch(`${apiUrl}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });

            if (!response.ok) {
                throw new Error('Error al iniciar sesión');
            }

            const data = await response.json();
            console.log("Register API response: ", data);
            const { token } = data;
            const decoded = jwtDecode(token);

            let userId = null;
            if (decoded.vendedorId) {
                userId = decoded.vendedorId;
            } else if (decoded.userId) {
                userId = decoded.userId;
            }

            setAuthState({
                token: token,
                user: userId,
                userType: userType
            });
            
            localStorage.setItem('token', JSON.stringify({ token: token, user: userId, userType: userType }));

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
                const errorDetails = await response.json();
                throw new Error(`Error al registrarse: ${errorDetails.message}`);
            }

            const data = await response.json();
            console.log("Register API response: ", data);
            const { token } = data;
            const decoded = jwtDecode(token);

            let userId = null;
            if (decoded.vendedorId) {
                userId = decoded.vendedorId;
            } else if (decoded.userId) {
                userId = decoded.userId;
            }

            setAuthState({
                token: token,
                user: userId,
                userType: userType
            });

            localStorage.setItem('token', JSON.stringify({ token: token, user: userId, userType: userType }));

            console.log('Registration successful:', data);
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
