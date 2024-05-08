import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NavVendedor from "../components/NavVendedor";
import { Link } from 'react-router-dom';
import RegistroCompletoV from "../components/RegistroCompletoV";
import SeccionCargaCupones from "../components/SeccionCargaCupones";

export default function Vendedor() {
    const navigate = useNavigate();
    const [registroCompleto, setRegistroCompleto] = useState(false);

    

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
        </>
    );
}