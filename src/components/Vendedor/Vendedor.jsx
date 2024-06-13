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

export default function Vendedor({children}) {
    const navigate = useNavigate();
    const { user, authState } = useAuth();

    /*useEffect(() => {
        
        // Verificar si el registro principal del vendedor está completo
        /*if (!(authState.userType === 'vendedor')) {
            navigate("/signup/vendedor");
        } else {// Verificar si el registro total del vendedor está completo 
            const data = JSON.parse(localStorage.getItem("vendedorData"));
            console.log("segundoRegistro: ", data.segundoRegistro)
            console.log("segundoRegistro-cond: ", data.id === user && data.segundoRegistro === false)
            if (/*data.id === user && data.segundoRegistro === false) {
                navigate('/vendedor/completar-registro');
            }
        }*/
        /*if (user.segundoRegistro === false) {

        }
        

    }, []);
    useEffect(() => {
        if (!authState.token || authState.userType !== 'vendedor') {
            navigate('/'); // Redirige al home si no está autenticado
        }
    }, [authState, navigate]);

    if (!authState.token || authState.userType !== 'vendedor') {
        return null; // Evita el renderizado si el usuario no está autenticado
    }
    */

    const esPantallaGrande = useMediaQuery('(min-width: 960px)');
    const segundoRegistro = false
    console.log("user: ",user);
    console.log("type: ",authState.userType);

    return (
        <>
            {/*authState.token && authState.userType === 'vendedor'*/true ? (
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