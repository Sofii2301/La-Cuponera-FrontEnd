import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Nav({ isSignIn, children, children2 }) {
    return(
        <>
            <div className="border-bottom shadow-sm">
                <div className="navbar navbar-light py-2">
                    <div className="container-navbar">
                        <div className="row row-nav">
                            {children && (
                                <div className="col-1">
                                    {children}
                                </div>
                            )}
                            <div className="col-xxl-2 col-lg-3 col-md-5 col-10">
                                <Link to="/" className="navbar-brand-logo">
                                    <img src={logo} alt="" className="d-inline-block align-text-top logo-navbar" />
                                </Link>
                            </div>
                            {isSignIn && (
                                <div className="col-xxl-5 col-lg-5 col-md-6 col-12">
                                    <span className="navbar-text">
                                        {isSignIn === "sesion-c" && (
                                            <>
                                                ¿Ya tenés una cuenta? <Link to="/" style={{textDecoration: "none"}}>Iniciar sesión</Link>
                                            </>
                                        )}
                                        {isSignIn === "sesion-v" && (
                                            <>
                                                ¿Ya tenés una cuenta? <Link to="/signin/vendedor" style={{textDecoration: "none"}}>Iniciar sesión</Link>
                                            </>
                                        )}
                                        {isSignIn === "registro" && (
                                            <>
                                                ¿Aún no tenés tu cuenta? <Link to="/" style={{textDecoration: "none"}}>Registrate</Link>
                                            </>
                                        )}
                                        {isSignIn === "registro-v" && (
                                            <>
                                                ¿Aún no tenés tu cuenta? <Link to="/signup/vendedor" style={{textDecoration: "none"}}>Registrate</Link>
                                            </>
                                        )}
                                        {isSignIn === "registro-tienda" && (
                                            <>
                                                ¿Tenés tu propio negocio? <Link to="/signup/vendedor" style={{textDecoration: "none"}}>Ser Vendedor</Link>
                                            </>
                                        )}
                                        {isSignIn !== "registro" && isSignIn !== "sesion" && ""}
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
                </div>
            </div>
        </>
    );
}
