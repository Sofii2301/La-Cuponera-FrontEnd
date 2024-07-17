import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from '@mui/material';

import { useAuth } from '../../services/AuthContext';

import Loading from "../Loading";
import RedirectHome from "../RedirectHome";
import NavCuponeros from "./NavCuponeros";
import Footer from "./Footer"
import { getCuponeroById } from "../../services/cuponerosService";

export default function Cuponeros({children}) {
    const navigate = useNavigate();
    const { authState } = useAuth();
    const [isVerificationChecked, setIsVerificationChecked] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!authState.token || authState.userType !== 'cuponero') {
            navigate('/'); // Redirige al home si no está autenticado
        } else if (!isVerificationChecked) {
            setLoading(true);
            const fetchCuponero = async () => {
                try {
                    const data = await getCuponeroById(authState.user);
                    setIsVerificationChecked(true);
                    if (data.estadoVerificacion !== 'Aprobada') {
                        navigate('/signup/verify/');
                    }
                    setLoading(false);
                } catch (error) {
                    console.error('Error al obtener los datos del cuponero:', error);
                    setLoading(false);
                }
            };

            fetchCuponero();
        } 
        setLoading(false);
    }, [authState, navigate, isVerificationChecked]);

    if (!authState.token || authState.userType !== 'cuponero') {
        return null; // Evita el renderizado si el usuario no está autenticado
    }

    if (loading) {
        return <Loading/>;
    }

    return (
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
                <RedirectHome />
            )}
        </>
    );
}
