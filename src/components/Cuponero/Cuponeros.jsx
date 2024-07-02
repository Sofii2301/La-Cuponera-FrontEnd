import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from '@mui/material';

import { useAuth } from '../../services/AuthContext';

import RedirectHome from "../RedirectHome";
import NavCuponeros from "./NavCuponeros";
import Footer from "./Footer"

export default function Cuponeros({children}) {
    const navigate = useNavigate();
    const { authState } = useAuth();

    useEffect(() => {
        if (!authState.token || authState.userType !== 'cuponero') {
            navigate('/'); // Redirige al home si no está autenticado
        } 
    }, [authState, navigate]);

    if (!authState.token || authState.userType !== 'cuponero') {
        return null; // Evita el renderizado si el usuario no está autenticado
    }

    const esPantallaGrande = useMediaQuery('(min-width: 992px)');

    return(
        <>
            {authState.token && authState.userType === 'cuponero' ? (
                <>
                    <NavCuponeros/>
                    <div className="container-cuponeros">
                        {children}
                    </div>
                    <Footer/>
                </>
            ) : (
                <RedirectHome></RedirectHome>
            )}
        </>
    )
}