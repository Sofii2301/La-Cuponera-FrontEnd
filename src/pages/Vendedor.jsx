import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NavVendedor from "../components/NavVendedor";
import { Link } from 'react-router-dom';
import RegistroCompletoV from "../components/RegistroCompletoV";
import SeccionCargaCupones from "../components/SeccionCargaCupones";

export default function Vendedor() {
    const navigate = useNavigate();
    const [registroCompleto, setRegistroCompleto] = useState(false);

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
            {registroCompleto ? (
                <>
                    <SeccionCargaCupones />
                </>
            ) : (
                <RegistroCompletoV />
            )}

            <SeccionCargaCupones />
        </>
    );
}