import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Vendedor from "../../components/Vendedor/Vendedor";
import ListaCupones from "../../components/Cupones/ListaCupones";

import portada from "../../assets/banner_default.png";
import logo from "../../assets/logo_default.png";
import Map from "../../components/Map";

export default function Perfil({children}) {
    const vendedor = JSON.parse(localStorage.getItem("vendedorData"));
    const [cupones, setCupones] = useState([]);

    useEffect(() => {
        // Obtener los cupones del vendedor desde localStorage
        const vendedorData = JSON.parse(localStorage.getItem("vendedorData"));
        if (vendedorData && vendedorData.cupones) {
            setCupones(vendedorData.cupones);
        }
    }, []);

    return (
        <>
        <Vendedor>
            <div className="container-fluid mt-3">
                <div className="row square row-sm">
                    <div className="col-lg-12 col-md-12">
                        <div className="card custom-card">
                            <div className="card-body">
                                <div className="panel profile-cover">
                                    <div className="profile-cover__img">
                                        {vendedor && vendedor.logo ? (
                                            <img src={vendedor.logo} alt="Logo" className="rounded-circle img-perfil-v" />
                                        ) : (
                                            <img src={logo} alt="Logo" className="img-perfil-v" />
                                        )}
                                        {/* Nombre del vendedor */}
                                        {vendedor && vendedor.nombreTienda ? (
                                            <h3>{vendedor.nombreTienda}</h3>
                                        ) : (
                                            <h3>Nombre de la Tienda</h3>
                                        )}
                                        {/* Nombre del vendedor */}
                                        {vendedor && vendedor.categorias ? (
                                            <p>{vendedor.categorias}</p>
                                        ) : (
                                            <p>Categorias</p>
                                        )}
                                    </div>
                                    <div className="btn-profile">
                                        <button className="btn rounded-10 btn-rosa">
                                            <i className="fa fa-plus"></i>
                                            <span>Seguir</span>
                                        </button>
                                    </div>
                                    <div className="profile-cover__action bg-img">
                                        {/* {vendedor && vendedor.portada ? (
                                            <img src={vendedor.portada} alt="Portada" className="img-perfil-v"/>
                                        ) : (
                                            <img src={portada} alt="Portada" className="img-perfil-v" />
                                        )} */}
                                    </div>
                                    <div className="profile-cover__info">
                                        <ul className="nav">
                                            <li><strong>6</strong>Cupones</li>
                                            <li><strong>33</strong>Seguidores</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="profile-tab tab-menu-heading">
                                    <nav className="nav main-nav-line tabs-menu profile-nav-line" role="tablist">
                                        <Link
                                            className={`nav-link ${location.pathname === '/vendedor/perfil/vista-previa' ? 'active' : ''}`}
                                            to="/vendedor/perfil/vista-previa"
                                            role="tab"
                                        >Información</Link>
                                        <Link
                                            className={`nav-link ${location.pathname === '/vendedor/perfil/editar-perfil' ? 'active' : ''}`}
                                            to="/vendedor/perfil/editar-perfil"
                                            role="tab"
                                        >Editar Perfil</Link>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {children}
            </div>
        </Vendedor>
        </>
    );
}