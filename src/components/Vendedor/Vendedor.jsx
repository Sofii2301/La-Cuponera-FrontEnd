import React, { useState, useEffect, Children } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useMediaQuery } from '@mui/material';
import NavVendedor from "./NavVendedor";
import NavVendedorMobile from "./NavVendedorMobile";
import { Link } from 'react-router-dom';
import Nav from "../Nav";
import NavConfig from "../NavConfig";
import { useAuth } from '../../services/AuthContext';
import RegistroCompletoV from "../../pages/Vendedor/RegistroCompletoV";
import RedirectHome from "../RedirectHome";
import { getVendedorById } from "../../services/vendedoresService";

export default function Vendedor({children}) {
    const navigate = useNavigate();
    const { authState } = useAuth();
    const [segundoRegistro, setsegundoRegistro] = useState(true);

    useEffect(() => {
        console.log('authState vendedor: ',authState)
        if (!authState.token || authState.userType !== 'vendedor') {
            navigate('/'); // Redirige al home si no está autenticado
        } 

        const fetchVendedorData = async () => {
            try {
                const data = await getVendedorById(authState.user);
                console.log("data inicial vendedor: ", data)
                setsegundoRegistro(data.segundoRegistro);
            } catch (error) {
                console.error('Error fetching vendor data:', error);
            }
        };

        if (authState.token && authState.user) {
            fetchVendedorData();
        }
    }, [authState, navigate]);

    if (!authState.token || authState.userType !== 'vendedor') {
        return null; // Evita el renderizado si el usuario no está autenticado
    }

    const esPantallaGrande = useMediaQuery('(min-width: 992px)');
    
    console.log("user: ",authState.user);
    console.log("type: ",authState.userType);

    return (
        <>
            {authState.token && authState.userType === 'vendedor' ? (
                <>
                    {esPantallaGrande ? 
                        <NavVendedor>
                            <Nav children={<></>} children2={<NavConfig/>}></Nav>
                            {segundoRegistro === false ? (
                                <RegistroCompletoV/>
                            ) : (
                                <div className="container-escritorio-pc">{children}</div>
                            )}
                        </NavVendedor>
                    : 
                        <NavVendedorMobile>
                            {segundoRegistro === false ? (
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