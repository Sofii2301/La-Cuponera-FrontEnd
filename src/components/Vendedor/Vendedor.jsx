import React, { useState, useEffect, Children } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useMediaQuery } from '@mui/material';
import NavVendedor from "./NavVendedor";
import NavVendedorMobile from "./NavVendedorMobile";
import { Link } from 'react-router-dom';
import Nav from "../Nav";
import NavConfig from "../NavConfig";
import { useAuth } from '../../services/AuthContext';

export default function Vendedor({children}) {
    const navigate = useNavigate();
    const { user, authState } = useAuth();

    useEffect(() => {
        console.log("user: ",user);
        if (user){
            // Verificar si el registro principal del vendedor está completo
            if (!(authState.userType === 'vendedor')) {
                navigate("/signup/vendedor");
            } else {// Verificar si el registro total del vendedor está completo 
                if (user.segundoRegistro === 'Pendiente') {
                    navigate("/vendedor/completar-registro");
                } 
            }
        } else {
            navigate("/");
        }
    }, []);

    const esPantallaGrande = useMediaQuery('(min-width: 960px)');

    return (
        <>
            {esPantallaGrande ? 
                <NavVendedor>
                    <Nav children={<></>} children2={<NavConfig/>}></Nav>
                    {children}
                </NavVendedor>
            : 
                <NavVendedorMobile>
                    {children}
                </NavVendedorMobile>
            }
            
            
        </>
    );
}