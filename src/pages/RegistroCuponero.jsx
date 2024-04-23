import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../css/map.css"
import "../css/registro_cuponero.css"
import "../js/map.js"
import "../js/registro.js"
import Map from "./Map";

import winwin from "../assets/winwin/PoseWinWin2.gif"
import google from "../assets/icon-google.png"
import face from "../assets/icon-face.png"

export default function RegistroCuponero(props) {

    return(
        <>
        <div id="map">
            <Map/>
        </div>
        <div id="overlay">
        {/* navigation */}
        <div className="border-bottom shadow-sm">
            <nav className="navbar navbar-light py-2">
            <div className="container justify-content-center justify-content-lg-between">
                <a className="navbar-brand" href="public.html">
                <img src="../assets/logo.png" alt="" className="d-inline-block align-text-top logo" />
                </a>
                <span className="navbar-text" style={{ color: 'black' }}>
                ¿Ya tenés una cuenta? <a href="signin.html">Iniciar sesión</a>
                </span>
            </div>
            </nav>
        </div>

        <main>
            {/* img */}
            <img id="winwin" src={winwin} alt="WinWin" className="img-fluid" />

            {/* container */}
            <div className="container-fluid d-flex justify-content-center align-items-center">
            {/* row */}
            <div className="fila row justify-content-center align-items-center">
                {/* col */}
                <div className="formulario col-11 col-md-8 col-lg-6 mx-auto">
                <div className="mb-lg-9 mb-5 text-center">
                    <h1 className="mb-1 h2 fw-bold titulo">Empezá a conseguir cupones</h1>
                    <p id="subtitulo">¡Bienvenido a La Cuponera! Ingresá tu correo electrónico para comenzar.</p>
                </div>
                {/* form */}
                <form id="registration-form" className="needs-validation was-validated" noValidate>
                    <div className="row g-3">
                    {/* col */}
                    <div className="col">
                        {/* input */}
                        <label htmlFor="formSignfname" className="form-label visually-hidden">Nombre</label>
                        <input type="text" className="form-control" id="formSignupfname" placeholder="Nombre" required />
                        <div className="invalid-feedback">Por favor, ingresá tu nombre</div>
                    </div>
                    <div className="col">
                        {/* input */}
                        <label htmlFor="formSignuplname" className="form-label visually-hidden">Apellido</label>
                        <input type="text" className="form-control" id="formSignuplname" placeholder="Apellido" required />
                        <div className="invalid-feedback">Por favor, ingresá tu apellido</div>
                    </div>
                    <div className="col-12">
                        {/* input */}
                        <label htmlFor="formSignupEmail" className="form-label visually-hidden">Email</label>
                        <input type="email" className="form-control" id="formSignupEmail" placeholder="Correo electrónico" required />
                        <div className="invalid-feedback">Por favor, ingresá tu mail</div>
                    </div>
                    <div className="col-12">
                        <div className="password-field position-relative">
                        <label htmlFor="formSignupPassword" className="form-label visually-hidden">Contraseña</label>
                        <div className="password-field position-relative">
                            <input type="password" className="form-control fakePassword" id="formSignupPassword" placeholder="********" required />
                            <span><i className="bi bi-eye-slash passwordToggler"></i></span>
                            <div className="invalid-feedback">Por favor, ingresá tu contraseña</div>
                        </div>
                        </div>
                    </div>
                    {/* btn */}
                    <div className="col-12 d-grid">
                        <button type="submit" id="registro" style={{ backgroundColor: '#f9ec00', border: 'none', color: 'black' }} className="btn btn-primary">
                        Registrar
                        </button>
                    </div>
                    <div className="registro-con">
                        <div className="col-12 d-grid">
                        <button type="button" id="registro-google" className="btn btn-primary">
                            <img src={google} alt="Google Icon" />
                            <p>Registrate con Google</p>
                        </button>
                        </div>
                        <div className="col-12 d-grid">
                        <button type="button" id="registro-facebook" className="btn btn-primary">
                            <img src={face} alt="Facebook Icon" />
                            <p>Registrate con Facebook</p>
                        </button>
                        </div>
                    </div>

                    {/* text */}
                    {/* <p>
                        <small>
                        <a href="#!" style={{ color: '#f9ec00', fontWeight: 'bold' }}>Términos de servicio</a>
                        y
                        <a href="#!" style={{ color: '#f9ec00', fontWeight: 'bold' }}>Política de privacidad</a>
                        </small>
                    </p> */}
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