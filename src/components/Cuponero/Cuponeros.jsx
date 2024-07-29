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
        if (authState.token && authState.userType === 'cuponero' && !isVerificationChecked) {
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
        if (authState.token && authState.userType === 'vendedor') {
            navigate('/vendedor');
        }
        setLoading(false);
    }, [authState, navigate, isVerificationChecked]);

    if (loading) {
        return <Loading/>;
    }

    return (
        <>
            <NavCuponeros/>
            <div className="container-cuponeros">
                {children}
            </div>
            <Footer/>
        </>
    );
}
