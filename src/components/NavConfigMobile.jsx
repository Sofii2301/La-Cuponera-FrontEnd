// NavConfig.jsx
import React, { useEffect, useState, useRef } from 'react';
import logoDefault from "../assets/logo_default.png";
import "../css/nav.css";
import { useAuth } from '../context/AuthContext';
import { getLogoImage, getVendedorById } from "../services/vendedoresService";
import { useNavigate } from "react-router-dom";

import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Divider from '@mui/joy/Divider';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Logout from '@mui/icons-material/Logout';

const NavConfigMobile = () => {
    const { user, logout, userType } = useAuth();
    const [vendedor, setVendedor] = useState(null);
    const [imagen, setImagen] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchVendedorData = async () => {
            try {
                const data = await getVendedorById(user,'Complete');
                const img = await getLogoImage(user);
                setVendedor(data[0]);
                setImagen(img);
            } catch (error) {
                console.error('Error fetching vendor data:', error);
            }
        };

        fetchVendedorData();
    }, [user, imagen]);

    const handleLogout = () => {
        const res = logout();
        if(res){
            if (userType === 'vendedor') {
                navigate("/signin/vendedor");
            } else {
                navigate("/");
            }
        }
    };

    return (
        <>
            <Divider />
            {vendedor && 
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', color: 'white' }}>
                    {vendedor && vendedor.nombreTienda ? (
                        <Avatar alt={vendedor.nombreTienda} src={imagen} size="sm"variant="outlined" />
                    ) : (
                        <Avatar alt={vendedor.nombreTienda} src={logoDefault} size="sm" variant="outlined"/>
                    )}
                    <Box sx={{ minWidth: 0, flex: 1 }}>
                        <Typography level=""><strong>{vendedor.nombreTienda}</strong></Typography>
                        <Typography level="">{vendedor.categorias.join(', ')}</Typography>
                    </Box>
                    <IconButton size="sm" variant="plain" color="white" onClick={handleLogout}>
                        <Logout/>
                    </IconButton>
                </Box>
            }
        </>

    );
};

export default NavConfigMobile;