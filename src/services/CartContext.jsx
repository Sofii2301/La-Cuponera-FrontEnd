// CartContext.js
import React, { createContext, useContext, useState } from "react";

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

    const emptyCart = (couponId) => {
        const emptyCart = [];
        localStorage.setItem('cart', JSON.stringify(emptyCart));
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
