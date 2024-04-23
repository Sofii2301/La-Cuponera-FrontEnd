import React from "react";
import { Link } from "react-router-dom";
import "../css/registro_cuponero.css"
import Nav from "./Nav";
import Map from "./Map";

export default function ForgotPassword(props) {

    return(
        <>
        <Map/>
        <div className="overlay">
            <Nav isSignIn={false} />

            <main>
                <div className="container-fluid d-flex justify-content-center align-items-center">
                <div className="row justify-content-center align-items-center">
                    <div className="formulario col-11 col-md-8 col-lg-8 mx-auto text-center">
                    <div className="mb-lg-9 mb-5 text-center">
                        <h1 className="mb-1 h2 fw-bold titulo" style={{ paddingBottom: '2%' }}>¿Olvidaste tu contraseña?</h1>
                        <p id="subtitulo">Ingresá tu dirección de correo electrónico asociado a la cuenta y te enviaremos un enlace para que puedas restablecer tu contraseña.</p>
                    </div>
                    <form className="needs-validation" noValidate>
                        <div className="row g-3">
                        <div className="col-12">
                            <label htmlFor="formForgetEmail" className="form-label visually-hidden">Email</label>
                            <input type="email" className="form-control" id="formForgetEmail" placeholder="Email" required />
                            <div className="invalid-feedback">Por favor, ingresá tu mail</div>
                        </div>
                        <div className="col-12 d-grid gap-2">
                            <button type="submit" style={{ backgroundColor: '#f9ec00', border: 'none', color: 'black' }} className="btn btn-primary">Restablecer contraseña</button>
                            <Link to="signin.html" className="btn btn-light">Volver a Iniciar Sesión</Link>
                        </div>
                        </div>
                    </form>
                    </div>
                </div>
                </div>
            </main>
        </div>
        </>
    )
}