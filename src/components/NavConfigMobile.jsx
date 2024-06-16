// NavConfig.jsx
import React, { useEffect, useState, useRef } from 'react';
import logoDefault from "../assets/logo_default.png";
import "../css/nav.css";
import { useAuth } from '../services/AuthContext';
import { getVendedorById } from "../services/vendedoresService";
import { useNavigate } from "react-router-dom";

import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Divider from '@mui/joy/Divider';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Logout from '@mui/icons-material/Logout';

const NavConfigMobile = () => {
    const { user, logout } = useAuth();
    const [vendedor, setVendedor] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchVendedorData = async () => {
            try {
                const data = await getVendedorById(user);
                setVendedor(data);
            } catch (error) {
                console.error('Error fetching vendor data:', error);
            }
        };

        fetchVendedorData();
    }, [user]);

    const handleLogout = () => {
        logout();
        navigate("/signin/");
    };

    return (
        <>
            <Divider />
            {vendedor && 
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    {vendedor && vendedor.logo && vendedor.nombreTienda ? (
                        <Avatar alt={vendedor.nombreTienda} src={vendedor.logo} size="sm"variant="outlined" />
                    ) : (
                        <Avatar alt={vendedor.nombreTienda} src={logoDefault} size="sm" variant="outlined"/>
                    )}
                    <Box sx={{ minWidth: 0, flex: 1 }}>
                        <Typography level="title-sm">{vendedor.nombreTienda}</Typography>
                        <Typography level="body-xs">{vendedor.categorias.join(', ')}</Typography>
                    </Box>
                    <IconButton size="sm" variant="plain" color="neutral" onClick={handleLogout}>
                        <Logout/>
                    </IconButton>
                </Box>
            }
        </>

    );
};

export default NavConfigMobile;