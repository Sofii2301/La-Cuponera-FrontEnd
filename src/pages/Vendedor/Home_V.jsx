import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Vendedor from "../../components/Vendedor/Vendedor";
import MapStores from "../../components/MapStores";
import Countdown from "../../components/Countdown";

import cuponik from "../../assets/cuponik/cuponik-onda.png";

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
                <div className="container-cd">
                    <div className="row countdown-container-slideIn">
                        <div className="col-xl-8 col-6 div-cd-text">
                            <Countdown className="countdown-component"/>
                            <div className="countdown-text">¡Ya falta muy poco para el lanzamiento!</div>
                        </div>
                        <div className="col-4 div-cuponik-cd">
                            <img className="cuponik-cd-hv" src={cuponik} alt="Cuponik" />
                        </div>
                    </div>
                </div>
                <MapStores/>
            </Vendedor>
        </>
    );
}