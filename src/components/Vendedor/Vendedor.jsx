import React, { useState, useEffect, Children } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NavVendedor from "./NavVendedor";
import { Link } from 'react-router-dom';

export default function Vendedor({children}) {
    const navigate = useNavigate();

    useEffect(() => {
        // Verificar si el registro principal del vendedor está completo
        const registroVendedorCompleto = localStorage.getItem("registroVendedorCompleto");
        if (!registroVendedorCompleto) {
            navigate("/signup/vendedor");
        } 
    }, []);

    return (
        <>
            <NavVendedor/>
            {children}
        </>
    );
}