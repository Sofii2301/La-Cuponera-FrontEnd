import { createContext, useState, useContext, useEffect } from "react";
import {jwtDecode} from "jwt-decode";
import { API_BASE_URL_VENDEDOR, API_BASE_URL_CUPONERO } from '../../config';

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

    useEffect(() => {
        // Verificar si hay un token almacenado en localStorage al cargar la página
        const storedAuth = localStorage.getItem('cuponeraToken');

        if (storedAuth) {
            try {
                const auth = JSON.parse(storedAuth);
                if (auth && auth.token) {
                    const decoded = jwtDecode(auth.token);

                    let userId = null;
                    if (decoded.vendedorId) {
                        userId = decoded.vendedorId;
                    } else if (decoded.userId) {
                        userId = decoded.userId;
                    }

                    // Actualizar el estado de autenticación con los datos del token
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
    const login = async (credentials, userType) => {
        try {
            const apiUrl = userType === 'cuponero' ? API_BASE_URL_CUPONERO : API_BASE_URL_VENDEDOR;
            console.log("Credentials: ", credentials)
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
            
            setAuthState({
                token: token,
                user: userId,
                userType: userType
            });

            localStorage.setItem('cuponeraToken', JSON.stringify({ token: token, user: userId, userType: userType }));

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
            const { token } = data;
            const decoded = jwtDecode(token);
            const userId = decoded.vendedorId || decoded.cuponeroId || null;
            if (!userId) throw new Error('Token inválido: no contiene userId o vendedorId');

            /*let userId = null;
            if (decoded.ID) {
                userId = decoded.ID;
            } else if (decoded.userId) {
                userId = decoded.userId;
            }*/

            setAuthState({
                token: token,
                user: userId,
                userType: userType
            });

            localStorage.setItem('cuponeraToken', JSON.stringify({ token: token, user: userId, userType: userType }));
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

    return (
        <AuthContext.Provider value={{ user: authState.user, userType: authState.userType, authState, register, login, logout }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
// Hook personalizado para usar el contexto de autenticación
export const useAuth = () => {
    return useContext(AuthContext);
};