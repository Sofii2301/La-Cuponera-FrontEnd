// CartContext.js
import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { useAuth } from './AuthContext';
import PropTypes from 'prop-types';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const { authState } = useAuth();
    const userId = authState.user;
    const [cart, setCart] = useState([]);

    // Clave única para almacenar el carrito por usuario
    const getCartKey = () => `cart_${userId}`;

    // Cargar el carrito desde localStorage cuando el usuario esté autenticado
    useEffect(() => {
        if (userId) {
            const storedCart = JSON.parse(localStorage.getItem(getCartKey())) || [];
            setCart(storedCart);
        } else {
            setCart([]); // Si no hay usuario, vacía el carrito
        }
    }, [userId]);

    const addToCart = (couponId) => {
        if (!cart.includes(couponId)) {
            const updatedCart = [...cart, couponId];
            setCart(updatedCart);
            localStorage.setItem(getCartKey(), JSON.stringify(updatedCart));
        }
    };

    const removeFromCart = (couponId) => {
        const updatedCart = cart.filter(id => id !== couponId);
        setCart(updatedCart);
        localStorage.setItem(getCartKey(), JSON.stringify(updatedCart));
    };

    const emptyCart = () => {
        setCart([]);
        localStorage.removeItem(getCartKey()); // Elimina el carrito del localStorage al vaciar
    };

    // Cuando el usuario cierra sesión, vacía el carrito y limpia localStorage
    useEffect(() => {
        if (!authState.token) { // Cuando el token de sesión no existe
            emptyCart();
        }
    }, [authState]);

    // Usar useMemo para memorizar el valor del contexto y evitar renders innecesarios
    const value = useMemo(() => ({
        cart,
        addToCart,
        removeFromCart,
        emptyCart
    }), [cart]);

    return (
        <CartContext.Provider value={ value }>
            {children}
        </CartContext.Provider>
    );
};

CartProvider.propTypes = {
    children: PropTypes.node.isRequired,  // Validación de 'children'
};

export const useCart = () => useContext(CartContext);