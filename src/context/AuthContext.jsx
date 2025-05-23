import React, { createContext, useState, useContext, useEffect, useMemo } from "react";
import {jwtDecode} from "jwt-decode";

const API_BASE_URL_VENDEDOR = import.meta.env.VITE_API_BASE_URL_VENDEDOR;
const API_BASE_URL_CUPONERO = import.meta.env.VITE_API_BASE_URL_CUPONERO;

// Crear el contexto de autenticación
const AuthContext = createContext();
// Proveedor del contexto de autenticación
export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        token: null,
        user: null,
        userType: null // 'cuponero' o 'vendedor'
    });
    const [loading, setLoading] = useState(true);

    const login = async (credentials, userType) => {
        try {
            const apiUrl = userType === 'cuponero' ? `${API_BASE_URL_CUPONERO}/cuponeros`  : `${API_BASE_URL_VENDEDOR}/vendedores`;
            const response = await fetch(`${apiUrl}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });
            if (!response.ok) {
                throw new Error('Error al iniciar sesión, por favor revisa los datos');
            }

            const data = await response.json();
            const { token } = data;
            const decoded = jwtDecode(token);

            let userId = null;
            if (decoded.vendedorId) {
                userId = decoded.vendedorId;
            } else if (decoded.userId) {
                userId = decoded.userId;
            }
            if (!userId) throw new Error('Token inválido: no contiene userId o vendedorId');
            
            const currentTime = new Date().getTime(); // Timestamp en milisegundos
            setAuthState({
                token: token,
                user: userId,
                userType: userType
            });

            //console.log(JSON.stringify({ token: token, user: userId, userType: userType, timestamp: currentTime }))

            localStorage.setItem('cuponeraToken', JSON.stringify({ token: token, user: userId, userType: userType, timestamp: currentTime }));

            return data;
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            throw error;
        }
    };
    const register = async (userData, userType) => {
        try {
            const apiUrl = userType === 'cuponero' ? `${API_BASE_URL_CUPONERO}/cuponeros`  : `${API_BASE_URL_VENDEDOR}/vendedores`;
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
            const { token } = data;
            const decoded = jwtDecode(token);
            let userId = null;
            if (decoded.vendedorId) {
                userId = decoded.vendedorId;
            } else if (decoded.cuponeroId) {
                userId = decoded.cuponeroId;
            }
            if (!userId) throw new Error('Token inválido: no contiene cuponeroId o vendedorId');

            setAuthState({
                token: token,
                user: userId,
                userType: userType
            });

            const currentTime = new Date().getTime();
            localStorage.setItem('cuponeraToken', JSON.stringify({ token: token, user: userId, userType: userType, timestamp: currentTime }));
            return data;
        } catch (error) {
            console.error('Error al registrarse 2:', error);
            throw error;
        }
    };
    const logout = () => {
        localStorage.removeItem('cuponeraToken');
        setAuthState({
            token: null,
            user: null,
            userType: null
        });
        return true;
    };

    // Memoriza el valor del contexto para evitar cambios innecesarios en cada render
    const authContextValue = useMemo(() => ({
        user: authState.user,
        userType: authState.userType,
        authState,
        register,
        login,
        logout
    }), [authState]);

    useEffect(() => {
        // Verificar si hay un token almacenado en localStorage al cargar la página
        const storedAuth = localStorage.getItem('cuponeraToken');

        if (storedAuth) {
            try {
                const auth = JSON.parse(storedAuth);
                const currentTime = new Date().getTime();

                if (auth.timestamp && currentTime - auth.timestamp > 86400000) {
                    // Si ha pasado más de 24 horas, cerrar sesión
                    logout();
                } else if (auth?.token) {
                    const decoded = jwtDecode(auth.token);

                    let userId = null;
                    if (decoded.vendedorId) {
                        userId = decoded.vendedorId;
                    } else if (decoded.userId) {
                        userId = decoded.userId;
                    }

                    setAuthState({
                        token: auth.token,
                        user: userId,
                        userType: auth.userType
                    });
                }
            } catch (error) {
                console.error('Error parsing stored auth token:', error);
            }
        }
        // Una vez completada la verificación del token, establecer loading en false
        setLoading(false);
    }, []);

    return (
        <AuthContext.Provider value={authContextValue}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
// Hook personalizado para usar el contexto de autenticación
export const useAuth = () => {
    return useContext(AuthContext);
};