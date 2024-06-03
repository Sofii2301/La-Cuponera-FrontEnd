import React, { createContext, useState, useContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [coupons, setCoupons] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decoded = jwtDecode(token);
            setUser(decoded);
            fetchCoupons(decoded.vendedorId);
        }
    }, []);

    const login = async (email, password) => {
        try {
            const response = await fetch('/api/vendedores/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, contraseña: password }),
            });

            if (response.ok) {
                const data = await response.json();
                const decoded = jwtDecode(data.token);
                localStorage.setItem("token", data.token);
                setUser(decoded);
                fetchCoupons(decoded.vendedorId);
            } else {
                throw new Error("Credenciales inválidas");
            }
        } catch (error) {
            console.error("Error en el login:", error);
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        setCoupons([]);
    };

    const fetchCoupons = async (vendedorId) => {
        try {
            const response = await fetch(`/api/cupones?vendedorId=${vendedorId}`);
            if (response.ok) {
                const data = await response.json();
                setCoupons(data);
            } else {
                console.error("Failed to fetch coupons");
            }
        } catch (error) {
            console.error("Error fetching coupons:", error);
        }
    };

    /*const login = (user, token) => {
        localStorage.setItem("token", token);
        setUser(user);
        fetchCoupons(user.vendedorId);
    };*/

    return (
        <AuthContext.Provider value={{ user, login, logout, coupons }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
