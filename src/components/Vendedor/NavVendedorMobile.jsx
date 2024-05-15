import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Offcanvas } from "react-bootstrap";
import logo from "../../assets/logo.png";

export default function NavVendedorMobile({ children }) {
    const [showSidebar, setShowSidebar] = useState(false);
    const [perfilNavOpen, setPerfilNavOpen] = useState(false);
    const [perfilOpen, setPerfilOpen] = useState(false);
    const [cuponesOpen, setCuponesOpen] = useState(false);

    const handlePerfilMouseEnter = () => {
        setPerfilOpen(true);
    };

    const handlePerfilMouseLeave = () => {
        setPerfilOpen(false);
    };

    const handleCuponesMouseEnter = () => {
        setCuponesOpen(true);
    };

    const handleCuponesMouseLeave = () => {
        setCuponesOpen(false);
    };

    const handlePerfilNavMouseEnter = () => {
        setPerfilNavOpen(true);
    };

    const handlePerfilNavMouseLeave = () => {
        setPerfilNavOpen(false);
    };

    const handleClose = () => setShowSidebar(false);
    const handleShow = () => setShowSidebar(true);

    return (
        <>
            <div className="border-bottom shadow-sm">
                <div className="navbar navbar-light py-2">
                    <div className="container-navbar">
                        <div className="row align-items-center w-100">
                            <div className="col-1">
                                <button className="btn btn-primary" type="button" onClick={handleShow}>
                                    <i className="bi bi-list"></i>
                                </button>
                            </div>
                            <div className="col-10">
                                <Link to="/" className="navbar-brand">
                                    <img src={logo} alt="" className="d-inline-block align-text-top logo-navbar" />
                                </Link>
                            </div>
                            <div className="col-1">
                                {/* Icono Perfil */}
                                <div className="nav-item dropdown list-inline-item" onMouseEnter={handlePerfilNavMouseEnter} onMouseLeave={handlePerfilNavMouseLeave}>
                                    <Link  className="nav-link dropdown-toggle"
                                        data-bs-toggle="collapse"
                                        role="button"
                                        aria-expanded="false"
                                        aria-controls="collapseExample">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="#e4d529"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="feather feather-user"
                                        >
                                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                            <circle cx="12" cy="7" r="4"></circle>
                                        </svg>
                                    </Link>
                                    <ul className={`dropdown-menu ${perfilNavOpen ? 'show' : ''}`} style={{ zIndex:5 }}>
                                        <li><Link className="dropdown-item" to="">
                                            <i className="bi bi-person-circle"></i>
                                            Perfil
                                        </Link></li>
                                        <li><Link className="dropdown-item" to="">
                                            <i className="bi bi-arrow-down-circle-fill"></i>
                                            Cupones
                                        </Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>                   
                </div>
            </div>
            <Offcanvas show={showSidebar} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Menu</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <button className="btn custom-btn btn-home-v" type="button">
                        <Link className="nav-link dropdown-toggle" to="/vendedor/" role="button" id="amarillo">
                            <span className="me-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-house" viewBox="0 0 16 16">
                                    <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z"/>
                                </svg>
                            </span>
                            Home
                        </Link>
                    </button>
                    <ul className="list-unstyled components mb-5">
                            <li className="nav-item dropdown w-100 w-lg-auto" onMouseEnter={handlePerfilMouseEnter} onMouseLeave={handlePerfilMouseLeave}>
                                <Link className="nav-link dropdown-toggle" role="button" id="amarillo" data-bs-toggle="dropdown" aria-expanded="false">Perfil</Link>
                                <ul className={`dropdown-menu ${perfilOpen ? 'show' : ''}`}>
                                    <li><Link className="dropdown-item" to="/vendedor/perfil/vista-previa">Vista Previa</Link></li>
                                    <li><Link className="dropdown-item" to="/vendedor/perfil/mis-cuponeros">Mis cuponeros</Link></li>
                                    <li><Link className="dropdown-item" to="/vendedor/perfil/editar-perfil">Editar Perfil</Link></li>
                                </ul>
                            </li>

                            <li className="nav-item dropdown w-100 w-lg-auto" onMouseEnter={handleCuponesMouseEnter} onMouseLeave={handleCuponesMouseLeave}>
                                <Link className="nav-link dropdown-toggle" role="button" id="amarillo" data-bs-toggle="dropdown" aria-expanded="false">Cupones</Link>
                                <ul className={`dropdown-menu ${cuponesOpen ? 'show' : ''}`}>
                                    <li><Link className="dropdown-item" to="/vendedor/cupones/mis-cupones">Mis Cupones</Link></li>
                                    <li><Link className="dropdown-item" to="/vendedor/cupones/editar-cupones">Editar Cupones</Link></li>
                                    <li><Link className="dropdown-item" to="/vendedor/cupones/descargas">Descargas</Link></li>
                                </ul>
                            </li>

                            <li className="nav-item w-100 w-lg-auto">
                                <Link className="nav-link" to="/vendedor/estadisticas" id="amarillo">Estadísticas</Link>
                            </li>
                        </ul>
                </Offcanvas.Body>
            </Offcanvas>
            <div className="container mt-3">
                {children}
            </div>
        </>
    );
}
