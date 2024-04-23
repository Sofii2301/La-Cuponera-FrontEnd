import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import logo from "../assets/logo.png"

export default function Nav({ isSignIn }) {

    return(
        <>
            <div className="border-bottom shadow-sm">
                <nav className="navbar navbar-light py-2">
                    <div className="container justify-content-center justify-content-lg-between">
                    <Link to="/" className="navbar-brand">
                        <img src={logo} alt="" className="d-inline-block align-text-top logo" />
                    </Link>
                    <span className="navbar-text">
                        {isSignIn ? (
                        <>
                            ¿Ya tenés una cuenta? <Link to="/signin">Iniciar sesión</Link>
                        </>
                        ) : (
                        <>
                            ¿Aún no tenés tu cuenta? <Link to="/signup">Registrate</Link>
                        </>
                        )}
                    </span>
                    </div>
                </nav>
            </div>
        </>
    )
}