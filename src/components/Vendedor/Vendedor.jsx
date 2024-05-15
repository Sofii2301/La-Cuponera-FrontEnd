import React, { useState, useEffect, Children } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NavVendedor from "./NavVendedor";
import { Link } from 'react-router-dom';
import Nav from "../Nav";

export default function Vendedor({children}) {
    const navigate = useNavigate();

    useEffect(() => {
        const vendedorData = JSON.parse(localStorage.getItem("vendedorData"));
        if (vendedorData){
            // Verificar si el registro principal del vendedor está completo
            if (!vendedorData.registroVendedor) {
                console.log("Vendedor-registro ppal: ", vendedorData.registroVendedor);
                navigate("/signup/vendedor");
            } else {// Verificar si el registro total del vendedor está completo 
                if (!vendedorData.registroVendedorCompleto) {
                    console.log("Vendedor-registro total: ", vendedorData.registroVendedorCompleto);
                    navigate("/vendedor/completar-registro");
                } 
            }
        } else {
            navigate("/");
        }
    }, []);

    return (
        <>
            <NavVendedor>
                {children}
            </NavVendedor>
            
        </>
    );
}