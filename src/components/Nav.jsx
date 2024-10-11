import React, { useState, useEffect, useRef } from "react";
import { FormattedMessage } from 'react-intl';
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import vendedor from '../assets/vendedor.png'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Nav({ isSignIn, children, children2, link }) {
    const [position, setPosition] = useState(0);
    const [anchorTd, setAnchorTd] = useState(null);
    const vendedorButtonRef = useRef(null);
    const isTiendaOpen = Boolean(anchorTd);
    const navigate = useNavigate();

    window.addEventListener('scroll', function() {
        const scrollY = this.scrollY;
        setPosition(scrollY);
    }, { passive: false });

    const handleTiendaMenuOpen = (event) => {
        setAnchorTd(event.currentTarget);
    };

    const handleTiendaClose = () => {
        setAnchorTd(null);
    };

    const gotoSignUpV = () => {
        navigate(`/signup/vendedor`);
    };
    const gotoSignInV = () => {
        navigate(`/signin/vendedor`);
    };

    const tiendaId = 'button-to-log-or-signup-vendedor'

    const renderTienda = (
        <Menu
            anchorEl={anchorTd}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            id={tiendaId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
            open={isTiendaOpen}
            onClose={handleTiendaClose}
            sx={{
                '.MuiPaper-root': {
                    width: vendedorButtonRef.current ? vendedorButtonRef.current.offsetWidth : 'auto',
                    textAlign: 'center',
                },
            }}
        >
            <MenuItem onClick={gotoSignUpV}><FormattedMessage id='sign_up' defaultMessage='Registrate' /></MenuItem>
            <MenuItem onClick={gotoSignInV}><FormattedMessage id='login' defaultMessage='Inicia Sesión' /></MenuItem>
            <Link to='https://lacuponera.digital/'><MenuItem><FormattedMessage id='more_information' defaultMessage='Información' /></MenuItem></Link>
        </Menu>
    );

    return(
        <>
            <AppBar className="border-bottom shadow-sm navbar navbar-light py-2" position={position <= 0 ? 'static' : 'fixed'}>
                <div className="container-navbar">
                    <div className="row row-nav">
                        {children && (
                            <div className="col-1">
                                {children}
                            </div>
                        )}
                        <div className="col-xxl-2 col-lg-3 col-md-5 col-10">
                            <Link to={link ? link : '/'} className="navbar-brand-logo">
                                <img src={logo} alt="" className="d-inline-block align-text-top logo-navbar" />
                            </Link>
                        </div>
                        {isSignIn && (
                            <div className="col-xxl-5 col-lg-5 col-md-6 col-12">
                                <span className="navbar-text">
                                    {isSignIn === "sesion-c" && (
                                        <>
                                            <FormattedMessage id="already_have_account" defaultMessage="¿Ya tenés una cuenta?" />{' '}
                                            <Link to="/signin/cuponero" style={{ textDecoration: 'none' }}>
                                                <FormattedMessage id="signin" defaultMessage="Iniciar sesión" />
                                            </Link>
                                        </>
                                    )}
                                    {isSignIn === "sesion-v" && (
                                        <>
                                            <FormattedMessage id="already_have_account" defaultMessage="¿Ya tenés una cuenta?" />{' '}
                                            <Link to="/signin/vendedor" style={{ textDecoration: 'none' }}>
                                                <FormattedMessage id="signin" defaultMessage="Iniciar sesión" />
                                            </Link>
                                        </>
                                    )}
                                    {isSignIn === "registro" && (
                                        <>
                                            <FormattedMessage id="no_account_yet" defaultMessage="¿Aún no tenés tu cuenta?" />{' '}
                                            <Link to="/" style={{ textDecoration: 'none' }}>
                                                <FormattedMessage id="sign_up" defaultMessage="Registrate" />
                                            </Link>
                                        </>
                                    )}
                                    {isSignIn === "registro-v" && (
                                        <>
                                            <FormattedMessage id="no_account_yet" defaultMessage="¿Aún no tenés tu cuenta?" />{' '}
                                            <Link to="/signup/vendedor" style={{ textDecoration: 'none' }}>
                                                <FormattedMessage id="sign_up" defaultMessage="Registrate" />
                                            </Link>
                                        </>
                                    )}
                                    {isSignIn === "registro-tienda" && (
                                        <div className="barra-link-vendedor">
                                            <p className='mr-2'>
                                                <FormattedMessage id="have_business" defaultMessage="¿Tenés tu propio negocio?" />
                                            </p>
                                            <IconButton
                                                size="small"
                                                edge="end"
                                                aria-controls={tiendaId}
                                                aria-haspopup="true"
                                                onClick={handleTiendaMenuOpen}
                                                ref={vendedorButtonRef}
                                            >
                                                <div target="_blank" className="btn btn-amarillo d-flex align-items-center">
                                                    <img src={vendedor} alt="Icono Vendedor" className='img-fluid mr-2 me-2'/>
                                                    <p className='d-flex'>
                                                        <FormattedMessage id="be_seller" defaultMessage="Ser Vendedor" />
                                                    </p>
                                                </div>
                                            </IconButton>
                                        </div>
                                    )}
                                </span>
                            </div>
                        )}
                        {children2 && (
                            <div className="col-1">
                                {children2}
                            </div>
                        )}
                    </div>
                </div>
            </AppBar>
            {renderTienda}
        </>
    );
}
