import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import RegistroCompletoV from "../../components/Vendedor/RegistroCompletoV";
import Vendedor from "../../components/Vendedor/Vendedor";

export default function Home_V() {
    const navigate = useNavigate();
    const [registroCompleto, setRegistroCompleto] = useState(false);

    useEffect(() => {
        // Verificar si el registro principal del vendedor está completo
        //const registroVendedorCompleto = localStorage.getItem("registroVendedorCompleto");
        const registroVendedorCompleto = true;
        if (registroVendedorCompleto) {
            setRegistroCompleto(true);
        } else {
            navigate("/signup/vendedor");
        }
    }, []);

    return (
        <>
            <Vendedor>
            {registroCompleto ? (
                <>
                    Home
                </>
            ) : (
                <RegistroCompletoV />
            )}
            </Vendedor>
        </>
    );
}