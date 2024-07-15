// CartContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);

    const addToCart = (couponId) => {
        if (!cart.includes(couponId)) {
            const updatedCart = [...cart, couponId];
            setCart(updatedCart);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
        }
    };

    const removeFromCart = (couponId) => {
        const updatedCart = cart.filter(id => id !== couponId);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const emptyCart = () => {
        setCart([]); // Actualiza el estado del carrito
        localStorage.setItem('cart', JSON.stringify([])); // Actualiza el almacenamiento local
    };

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart'));
        if (storedCart) {
            setCart(storedCart);
        }
    }, []);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, emptyCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
