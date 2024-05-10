import React from "react";
import { Link } from 'react-router-dom';
import Nav from "../Nav";
import MenuNav from "./MenuNav";

export default function NavCuponeros(props) {

    return(
        <>
            <Nav isSignIn = "" children2={<MenuNav />}>
                {/* Buscador */}
                <div className="col-xxl-5 col-lg-5 d-none d-lg-block">
                    <form action="#">
                        <div className="input-group">
                            <input className="form-control rounded-0 rounded-start" type="search" placeholder="Encontrá nuevos productos" />
                            <span className="input-group-append">
                                <button className="btn bg-white border border-start-0 ms-n10 rounded-0 rounded-end" type="button">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="feather feather-search"
                                    >
                                        <circle cx="11" cy="11" r="8"></circle>
                                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                    </svg>
                                </button>
                            </span>
                        </div>
                    </form>
                </div>

                <div className="col-lg-2 col-xxl-2 text-end col-md-6 col-7">
                    <div className="list-inline">
                        <div className="list-inline-item me-5">
                            <Link to="" className="text-muted position-relative">
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
                                    className="feather feather-heart"
                                >
                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                </svg>
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill" id="amarillo3">
                                <span className="visually-hidden">unread messages</span>
                                    0
                                </span>
                            </Link>
                        </div>
                        <div className="nav-item dropdown list-inline-item me-5 w-100 w-lg-auto dropdown-fullwidth">
                            <Link to="" className="nav-link dropdown-toggle" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
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
                            <ul className="dropdown-menu">
                                <li>
                                    <Link className="dropdown-item" to="">
                                        <i className="bi bi-person-circle"></i>
                                        Mi Perfil
                                    </Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="">
                                        <i className="bi bi-arrow-down-circle-fill"></i>
                                        Mis Descargas
                                    </Link>
                                </li>
                                <li><Link className="dropdown-item" to="">Mis Puntos</Link></li>
                                <li><Link className="dropdown-item" to="">Mi Historial</Link></li>
                                <li><Link className="dropdown-item" to="">Tus Marcas</Link></li>
                            </ul>
                        </div>
                        <div className="list-inline-item me-5 me-lg-0">
                            <Link className="text-muted position-relative" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" to="#offcanvasExample" role="button" aria-controls="offcanvasRight">
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
                                    className="feather feather-shopping-bag"
                                >
                                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                                    <line x1="3" y1="6" x2="21" y2="6"></line>
                                    <path d="M16 10a4 4 0 0 1-8 0"></path>
                                </svg>
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill" id="amarillo3">
                                    1
                                    <span className="visually-hidden">unread messages</span>
                                </span>
                            </Link>
                        </div>
                        <div className="list-inline-item d-inline-block d-lg-none">
                            <button className="navbar-toggler collapsed" type="button" data-bs-toggle="offcanvas" data-bs-target="#navbar-default" aria-controls="navbar-default" aria-label="Toggle navigation">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#e4d529" className="bi bi-text-indent-left text-primary" viewBox="0 0 16 16">
                                    <path
                                        d="M2 3.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm.646 2.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L4.293 8 2.646 6.354a.5.5 0 0 1 0-.708zM7 6.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 3a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm-5 3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                
            </Nav>
        </>
    )
}
