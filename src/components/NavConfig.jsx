import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import logoDefault from "../assets/logo_default.png";
import { useAuth } from '../context/AuthContext';
import { getLogoImage, getVendedorById } from "../services/vendedoresService";
import { Box, Typography } from '@mui/material';

export default function NavConfig({ disableButtons }) {
    const { user, logout, userType } = useAuth();
    const [notifications, setNotifications] = useState([]);
    const [vendedor, setVendedor] = useState(null);
    const [anchorElNotification, setAnchorElNotification] = useState(null);
    const [anchorElProfile, setAnchorElProfile] = useState(null);
    const [logo, setLogo] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            if (user) {
                const data = await getVendedorById(user);
                setVendedor(data);
                const logo = await getLogoImage(data.logo);
                setLogo(logo);
            }
        };
        fetchData();
    }, [user]);

    const handleNotificationClick = (event) => {
        setAnchorElNotification(event.currentTarget);
    };

    const handleProfileClick = (event) => {
        setAnchorElProfile(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorElNotification(null);
        setAnchorElProfile(null);
    };

    const handleLogout = () => {
        logout();
        if (userType === 'vendedor') {
            navigate("/signin/vendedor");
        } else {
            navigate("/");
        }
    };

    const goToProfile = () => {
        navigate('/vendedor/perfil/vista-previa');
        handleClose();
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: '#0088ff' }}>
                <Toolbar>
                    <Link to="/">
                        <img src={logoDefault} alt="Logo" className="logo-navbar" />
                    </Link>

                    <Box sx={{ flexGrow: 1 }} /> {/* Flex para empujar elementos al final */}
                    
                    {/* Icono de Notificaciones */}
                    <IconButton
                        size="large"
                        aria-label="show notifications"
                        aria-controls="notification-menu"
                        aria-haspopup="true"
                        onClick={handleNotificationClick}
                        color="inherit"
                        disabled={disableButtons}
                    >
                        <Badge badgeContent={notifications.length} color="error">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>

                    {/* Menú de Notificaciones */}
                    <Menu
                        id="notification-menu"
                        anchorEl={anchorElNotification}
                        open={Boolean(anchorElNotification)}
                        onClose={handleClose}
                        keepMounted
                    >
                        {notifications.length > 0 ? (
                            notifications.map((notification, index) => (
                                <MenuItem key={index}>{notification.message}</MenuItem>
                            ))
                        ) : (
                            <MenuItem>No tienes nuevas notificaciones</MenuItem>
                        )}
                    </Menu>

                    {/* Icono de Perfil */}
                    {vendedor && (
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls="profile-menu"
                            aria-haspopup="true"
                            onClick={handleProfileClick}
                            color="inherit"
                        >
                            {logo ? (
                                <Avatar alt={vendedor.nombreTienda} src={logo} />
                            ) : (
                                <Avatar alt={vendedor.nombreTienda} src={logoDefault} />
                            )}
                        </IconButton>
                    )}

                    {/* Menú de Perfil */}
                    <Menu
                        id="profile-menu"
                        anchorEl={anchorElProfile}
                        open={Boolean(anchorElProfile)}
                        onClose={handleClose}
                        keepMounted
                    >
                        <Box sx={{ padding: 2, textAlign: 'center', minWidth: 200 }}>
                            <Typography variant="h6">{vendedor?.nombreTienda}</Typography>
                            {vendedor?.categorias && (
                                <Typography variant="body2" color="textSecondary">
                                    {vendedor.categorias.join(', ')}
                                </Typography>
                            )}
                        </Box>
                        <MenuItem onClick={goToProfile}>
                            <AccountCircle sx={{ marginRight: 1 }} /> Perfil
                        </MenuItem>
                        <MenuItem onClick={handleLogout}>
                            <PowerSettingsNewIcon sx={{ marginRight: 1 }} /> Cerrar sesión
                        </MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
