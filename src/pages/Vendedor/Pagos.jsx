import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Vendedor from "../../components/Vendedor/Vendedor";

export default function Pagos({children}) {

    return (
        <>
            <Vendedor>
            <div className="container-fluid mt-3">
                <div className="row square row-sm">
                    <div className="col-lg-12 col-md-12">
                        <div className="card custom-card">
                            <div className="card-body">
                                <div className="panel profile-cover">
                                    Mi Paln
                                </div>
                                <div className="profile-tab tab-menu-heading">
                                    <nav className="nav main-nav-line p-3 tabs-menu profile-nav-line" role="tablist">
                                        <Link
                                            className="nav-link"
                                            to="/vendedor/pagos/formas"
                                            role="tab"
                                        >Formas de pago</Link>
                                        <Link
                                            className="nav-link"
                                            to="/vendedor/pagos/cambiar-plan"
                                            role="tab"
                                        >Cambiar plan</Link>
                                        <Link
                                            className="nav-link"
                                            to="/vendedor/pagos/historial"
                                            role="tab"
                                        >Historial de pedidos y presupuesto</Link>
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