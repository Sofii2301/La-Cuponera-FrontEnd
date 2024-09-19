import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Offcanvas, ListGroup } from 'react-bootstrap';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/Cuponero/nav_cuponero.css';
import Logo from "../../assets/video/logo.png"
import useCheckIfIsLogged from '../../services/PrivateRoute';

export default function MenuSidebar() {
    const [showSidebar, setShowSidebar] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const isLogged = useCheckIfIsLogged();

    const userId = user;

    const handleClose = () => setShowSidebar(false);
    const handleShow = () => setShowSidebar(true);

    const gotoMyAccount = () => {
        navigate(`/cuponero/mi-cuenta/${userId}`);
        setShowSidebar(false);
    };

    const handleLogout = () => {
        const res = logout();
        if (res) {
            navigate("/signin/cuponero");
        }
        setShowSidebar(false);
    };

    const menuItems = [
        { text: 'Cerca a Vos', href: '/', icon: 'geo-alt' },
        { text: 'Cupones', href: '/cuponero/cupones', icon: 'ticket' },
        { text: 'Tiendas', href: '/cuponero/tiendas', icon: 'shop-window' },
    ];

    return (
        <>
            <IconButton
                size="large"
                aria-label="menu"
                onClick={handleShow}
                color="inherit"
            >
                <MenuIcon />
            </IconButton>
            <Offcanvas className="sidebar-nav-mobile" show={showSidebar} onHide={handleClose} placement="end">
                <Offcanvas.Header closeButton>
                    <img className='logoMobile' src={Logo} alt="" />
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <ListGroup variant="flush">
                        {menuItems.map((item, index) => (
                            <ListGroup.Item className='itemMobile' action key={index} onClick={handleClose}>
                                <Link to={item.href} className="text-decoration-none">
                                    <i className={`bi bi-${item.icon} mr-1`}></i>
                                    {item.text}
                                </Link>
                            </ListGroup.Item>
                        ))}
                        {isLogged && 
                            <>
                                <ListGroup.Item className='itemMobile' action onClick={gotoMyAccount}>
                                    <i className={`bi bi-person mr-1`}></i>
                                    Mi cuenta
                                </ListGroup.Item>
                                <ListGroup.Item className='itemMobile' action onClick={handleLogout}>
                                    <i className={`bi bi-box-arrow-right mr-1`}></i>
                                    Cerrar sesión
                                </ListGroup.Item>
                                <ListGroup.Item className='itemMobile' action onClick={handleClose}>
                                    <Link to={`/cuponero/historial`} className="text-decoration-none">
                                        <i className={`bi bi-box-arrow-right mr-1`}></i>
                                        Historial pedidos
                                    </Link>
                                </ListGroup.Item>
                            </>
                        }
                    </ListGroup>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}
