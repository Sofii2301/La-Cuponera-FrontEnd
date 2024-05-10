import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

import "../css/nav.css"

export default function Nav({ isSignIn, children, children2 }) {

    return(
        <>
            <div className="border-bottom shadow-sm">
                <div className="navbar navbar-light py-2">
                    <div className="container-navbar">
                        <div className="row align-items-center gx-lg-2 gx-0">
                            <div className="col-xxl-2 col-lg-3 col-md-6 col-5">
                                <Link to="/" className="navbar-brand d-none d-lg-block">
                                    <img src={logo} alt="" className="d-inline-block align-text-top logo-navbar" />
                                </Link>
                            </div>
                            <div className="d-flex justify-content-between w-100 d-lg-none">
                                <Link to="/" className="navbar-brand">
                                    <img src={logo} alt="" className="d-inline-block align-text-top logo-navbar" />
                                </Link>
                            </div>
                            
                        </div>
                        
                        <span className="navbar-text">
                            {isSignIn === "sesion" && (
                                <>
                                    ¿Ya tenés una cuenta? <Link to="/signin" style={{textDecoration: "none"}}>Iniciar sesión</Link>
                                </>
                            )}
                            {isSignIn === "registro" && (
                                <>
                                    ¿Aún no tenés tu cuenta? <Link to="/" style={{textDecoration: "none"}}>Registrate</Link>
                                </>
                            )}
                            {isSignIn !== "registro" && isSignIn !== "sesion" && ""}
                        </span>
                        {children}
                    </div>
                </div>
                {children2}
            </div>
        </>
    );
}
