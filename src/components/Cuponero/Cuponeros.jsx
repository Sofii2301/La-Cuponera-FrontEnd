import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from '@mui/material';

import { useAuth } from '../../services/AuthContext';

import RedirectHome from "../RedirectHome";
import NavCuponeros from "./NavCuponeros";
import Footer from "./Footer"
import { getCuponeroById } from "../../services/cuponerosService";

export default function Cuponeros({children}) {
    const navigate = useNavigate();
    const { authState } = useAuth();
    const [cuponero, setCuponero] = useState({});

    useEffect(() => {
        if (!authState.token || authState.userType !== 'cuponero') {
            navigate('/'); // Redirige al home si no está autenticado
        } 
    }, [authState, navigate]);

    useEffect(() => {
        const fetchCuponero = async () => {
            try {
                const data = await getCuponeroById(authState.user);
                setCuponero(data);
            } catch (error) {
                console.error('Error al obtener los datos del cuponero:', error);
            }
        };

        fetchCuponero();
    }, [authState.user]);

    if (!authState.token || authState.userType !== 'cuponero') {
        return null; // Evita el renderizado si el usuario no está autenticado
    }

    if (cuponero.estadoVerificacion !== 'Aprobada') {
        navigate('/signup/verify/'); // Redirige al verify si no está aprobada
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