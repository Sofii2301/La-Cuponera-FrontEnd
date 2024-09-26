import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Offcanvas, ListGroup } from 'react-bootstrap';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/Cuponero/nav_cuponero.css';
import Logo from "../../assets/video/logo.png";
import useCheckIfIsLogged from '../../services/PrivateRoute';
import cuponero from '../../assets/cuponero.png';
import vendedor from '../../assets/vendedor.png';
import logo_hb from '../../assets/HumanBeing/logo-horizontal.png'

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function MenuSidebar() {
    const intl = useIntl();
    const [showSidebar, setShowSidebar] = useState(false);
    const [expanded, setExpanded] = useState(false);
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

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const menuItems = [
        { text: intl.formatMessage({ id: "near_you", defaultMessage: 'CERCA TUYO' }), href: '/', icon: 'geo-alt' },
        { text: intl.formatMessage({ id: "coupons", defaultMessage: 'CUPONES' }), href: '/cuponero/cupones', icon: 'ticket' },
        { text: intl.formatMessage({ id: "stores", defaultMessage: 'TIENDAS' }), href: '/cuponero/tiendas', icon: 'shop-window' },
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
                    <div className="d-flex flex-column h-100">
                        <div>
                            <ListGroup variant="flush">
                                {menuItems.map((item, index) => (
                                    <ListGroup.Item className='itemMobile' action key={index} onClick={handleClose}>
                                        <Link to={item.href} className="text-decoration-none">
                                            <i className={`bi bi-${item.icon} mr-2`}></i>
                                            {item.text}
                                        </Link>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                            <Link to='/cuponero/humanbeing/comingsoon' className='btn btn-hb w-100' variant='success'>
                                <img src={logo_hb} alt="Human Being" />
                            </Link>
                        </div>
                        <div className="acordions-nm">
                            {isLogged ? (
                                <>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item className='itemMobile' action onClick={gotoMyAccount}>
                                            <i className={`bi bi-person mr-2`}></i>
                                            {intl.formatMessage({ id: "my_account", defaultMessage: 'Mi cuenta' })}
                                        </ListGroup.Item>
                                        <ListGroup.Item className='itemMobile' action onClick={handleLogout}>
                                            <i className={`bi bi-box-arrow-right mr-2`}></i>
                                            {intl.formatMessage({ id: 'logout', defaultMessage: 'Cerrar Sesión' })}
                                        </ListGroup.Item>
                                        <ListGroup.Item className='itemMobile' action onClick={handleClose}>
                                            <Link to={`/cuponero/historial`} className="text-decoration-none">
                                                <i className={`bi bi-box-arrow-right mr-2`}></i>
                                                {intl.formatMessage({ id: 'history_orders', defaultMessage: 'Historial pedidos' })}
                                            </Link>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </>
                            ) : (
                                <>
                                    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1-content"
                                            id="panel1-header"
                                            className='btn-log acordion-op-nm'
                                        >
                                            <img className="img-fluid mr-2" src={cuponero} alt={intl.formatMessage({ id: 'cuponero', defaultMessage: 'Cuponero' })} />
                                            {intl.formatMessage({ id: 'be_cuponero', defaultMessage: 'Ser cuponero' })}
                                        </AccordionSummary>
                                        <AccordionDetails className='btn-ser-nb d-flex flex-column'>
                                            <Link to="/signup/cuponero" className="text-decoration-none mb-2">
                                                <i className={`bi bi-person-plus mr-2`}></i>
                                                {intl.formatMessage({ id: 'register_you', defaultMessage: 'Registrarse' })}
                                            </Link>
                                            <Link to="/signin/cuponero" className="text-decoration-none">
                                                <i className={`bi bi-box-arrow-in-right mr-2`}></i>
                                                {intl.formatMessage({ id: 'signin', defaultMessage: 'Iniciar sesión' })}
                                            </Link>
                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1-content"
                                            id="panel1-header"
                                            className='btn-log acordion-op-nm'
                                        >
                                            <img className="img-fluid mr-2" src={vendedor} alt="Soy Vendedor" />
                                            {intl.formatMessage({ id: 'be_seller', defaultMessage: 'Ser vendedor' })}
                                        </AccordionSummary>
                                        <AccordionDetails className='btn-ser-nb d-flex flex-column'>
                                            <Link to="/signup/vendedor" className="text-decoration-none mb-2">
                                                <i className={`bi bi-person-plus mr-2`}></i>
                                                {intl.formatMessage({ id: 'register_you', defaultMessage: 'Registrarse' })}
                                            </Link>
                                            <Link to="/signin/vendedor" className="text-decoration-none mb-2">
                                                <i className={`bi bi-box-arrow-in-right mr-2`}></i>
                                                {intl.formatMessage({ id: 'signin', defaultMessage: 'Iniciar sesión' })}
                                            </Link>
                                            <Link to='https://lacuponera.digital/'>
                                                <i className={`bi bi-info-circle mr-2`}></i>
                                                {intl.formatMessage({ id: 'more_information', defaultMessage: 'Más información' })}
                                            </Link>
                                        </AccordionDetails>
                                    </Accordion>
                                </>
                            )}
                        </div>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}
