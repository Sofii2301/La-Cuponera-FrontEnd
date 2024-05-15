import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import RegistroCompletoV from "../../components/Vendedor/RegistroCompletoV";
import Vendedor from "../../components/Vendedor/Vendedor";

export default function Home_V() {
    const navigate = useNavigate();

    useEffect(() => {
        const vendedorData = JSON.parse(localStorage.getItem("vendedorData"));
        if (vendedorData){
            // Verificar si el registro principal del vendedor está completo
            if (!vendedorData.registroVendedor) {
                console.log("Home-V-registro ppal: ", vendedorData.registroVendedor);
                navigate("/signup/vendedor");
            } else {// Verificar si el registro total del vendedor está completo 
                if (!vendedorData.registroVendedorCompleto) {
                    console.log("Home-V-registro total: ", vendedorData.registroVendedorCompleto);
                    navigate("/vendedor/completar-registro");
                } 
            }
        } else {
            navigate("/");
        }
    }, []);

    return (
        <>
            <Vendedor>
                Home
            </Vendedor>
        </>
    );
}