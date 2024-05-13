import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function MenuNav(props) {
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

    return (
        <nav className="navbar navbar-expand-lg navbar-light navbar-default py-0 pb-lg-4" aria-label="Offcanvas navbar large">
            <div className="container">
                <div className="offcanvas offcanvas-start" tabIndex="-1" id="navbar-default" aria-labelledby="navbar-defaultLabel">
                    <div className="offcanvas-body">
                        <div className="dropdown me-3 d-none d-lg-block">
                            <button className="btn custom-btn btn-home-v" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                <Link className="nav-link dropdown-toggle" to="/vendedor/" role="button" id="amarillo">
                                    <span className="me-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-house" viewBox="0 0 16 16">
                                            <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z"/>
                                        </svg>
                                    </span>
                                    Home
                                </Link>
                            </button>
                        </div>

                        <div>
                            <ul className="navbar-nav align-items-center">
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
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
