import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

import "../css/nav.css"

export default function Nav({ isSignIn, children }) {

    return(
        <>
            <div className="border-bottom shadow-sm">
                <nav className="navbar navbar-light py-2">
                    <div className="container-navbar">
                        <Link to="/" className="navbar-brand">
                            <img src={logo} alt="" className="d-inline-block align-text-top logo-navbar" />
                        </Link>
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
                </nav>
            </div>
        </>
    );
}
