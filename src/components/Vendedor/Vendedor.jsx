import React, { useState, useEffect, Children } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useMediaQuery } from '@mui/material';
import NavVendedor from "./NavVendedor";
import NavVendedorMobile from "./NavVendedorMobile";
import { Link } from 'react-router-dom';
import Nav from "../Nav";
import NavConfig from "../NavConfig";
import Loading from "../Loading";
import { useAuth } from '../../services/AuthContext';
import RegistroCompletoV from "../../pages/Vendedor/RegistroCompletoV";
import RedirectHome from "../RedirectHome";
import { getVendedorById } from "../../services/vendedoresService";

export default function Vendedor({children}) {
    const navigate = useNavigate();
    const { authState } = useAuth();
    const [segundoRegistro, setSegundoRegistro] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    
        if (!authState.token || authState.userType !== 'vendedor') {
            navigate('/signin/vendedor'); // Redirige al home si no está autenticado
        } 

        const fetchVendedorData = async () => {
            try {
                const data = await getVendedorById(authState.user, 'Complete');
                console.log("data: ", data)
                setSegundoRegistro(data[0].Segundo_Registro);
                console.log("segundoRegistro: ", segundoRegistro)
                setLoading(false);
            } catch (error) {
                console.error('Error fetching vendor data:', error);
                setLoading(false);
            }
        };

        if (authState.token && authState.user) {
            fetchVendedorData();
        }
    }, [authState, navigate, segundoRegistro]);

    if (!authState.token || authState.userType !== 'vendedor' ) {
        return null; // Evita el renderizado si el usuario no está autenticado
    }

    const esPantallaGrande = useMediaQuery('(min-width: 992px)');

    if (loading) {
        return <Loading/>;
    }

    return (
        <>
            {authState.token && authState.userType === 'vendedor' ? (
                <>
                    {esPantallaGrande ? 
                        <NavVendedor disableButtons={segundoRegistro === 0}>
                            <Nav children={<></>} children2={<NavConfig disableButtons={segundoRegistro === 0}/>}></Nav>
                            {segundoRegistro === 0 ? (
                                <div className="mt-3">
                                    <RegistroCompletoV/>
                                </div>
                            ) : (
                                <div className="container-escritorio-pc">{children}</div>
                            )}
                        </NavVendedor>
                    : 
                        <NavVendedorMobile disableButtons={segundoRegistro === 0}>
                            {segundoRegistro === 0 ? (
                                <RegistroCompletoV/>
                            ) : (
                                <div className="container-escritorio-mobile">{children}</div>
                            )}
                        </NavVendedorMobile>
                    }
                </>
            ) : (
                <RedirectHome></RedirectHome>
            )}
        </>
    );
}