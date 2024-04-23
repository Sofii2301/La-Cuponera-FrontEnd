import React from "react";
import logo from "../assets/logo.png"

export default function Nav(props) {

    return(
        <>
        <div className="border-bottom shadow-sm">
            <nav className="navbar navbar-light py-2">
                <div className="container justify-content-center justify-content-lg-between">
                <a className="navbar-brand" href="../plantilla/temps/index-2.html">
                    <img src={logo} alt="" className="align-text-top logo" />
                </a>
                <span className="navbar-text">
                    ¿Ya tenés una cuenta? <a href="signin.html">Iniciar sesión</a>
                </span>
                </div>
            </nav>
        </div>
        </>
    )
}