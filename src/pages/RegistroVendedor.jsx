import React from "react";
import "../css/registro_vendedor.css"

import Nav from "./Nav";

import cuponik from "../assets/cuponik/web2.png"

export default function RegistroVendedor(props) {

    return(
        <> 
        <div className="bottom-image">
            <img src={cuponik} alt="cuponik" className="cuponik" />
        </div>
        <Nav isSignIn={true} />
        <div className="overlay-r">
            {/* section */}
            <section className="my-lg-14 my-8">
                {/* container */}
                <div className="container">
                <div className="row justify-content-center align-items-center">
                    <div className="container mt-5">
                    <div className="mb-lg-9 mb-5 text-center">
                        <h1 className="mb-1 h2 fw-bold titulo">¡Hola Vendedor!</h1>
                        <p id="subtitulo">
                        ¡Bienvenido a La Cuponera! Registra tu Tienda on-line de
                        OFERTAS
                        </p>
                    </div>
                    {/* form */}
                    <form
                        id="storeRegistrationForm"
                        className="needs-validation"
                        noValidate
                    >
                        <div className="row g-3">
                            {/* col */}
                            <div className="col mb-3">
                                {/* input */}
                                <label htmlFor="storeName" className="form-label">
                                Nombre de la tienda
                                </label>
                                <input
                                type="text"
                                className="form-control"
                                id="storeName"
                                placeholder="Ingresa el nombre de tu tienda"
                                required
                                />
                                <div className="invalid-feedback">
                                Por favor, ingresá el nombre de tu tienda
                                </div>
                            </div>
                            <div className="col mb-3">
                                {/* input */}
                                <label htmlFor="storeAddress" className="form-label">
                                Tienda Física
                                </label>
                                <input
                                type="text"
                                className="form-control"
                                id="storeAddress"
                                placeholder="Direccion de tu tienda física"
                                required
                                />
                                <div className="invalid-feedback">
                                Por favor, ingresá la direccipon de tu tienda
                                </div>
                            </div>
                        </div>
                        <div className="row g-3">
                            <div className="col mb-3">
                                {/* input */}
                                <label htmlFor="phoneNumber" className="form-label">
                                Teléfono de Contacto
                                </label>
                                <input
                                type="text"
                                className="form-control"
                                id="phoneNumber"
                                placeholder="Número de Contacto / Whatsapp Business"
                                required
                                />
                                <div className="invalid-feedback">
                                Por favor, ingresá un numero de telefono
                                </div>
                            </div>
                        </div>
                        <div className="row g-3">
                            <div className="col mb-3">
                                {/* input */}
                                <label htmlFor="storeDescription" className="form-label">
                                Descripción Comercial
                                </label>
                                <textarea
                                className="form-control"
                                id="storeDescription"
                                rows="3"
                                placeholder="Quienes son? Que hacen?"
                                ></textarea>
                            </div>
                        </div>
                        <div className="row g-3">
                            <div className="col mb-3">
                                {/* input */}
                                <label htmlFor="formSignupEmail" className="form-label">
                                Email
                                </label>
                                <input
                                type="email"
                                className="form-control"
                                id="formSignupEmail"
                                placeholder="Correo electrónico"
                                required
                                />
                                <div className="invalid-feedback">
                                Por favor, ingresá el mail de tu marca
                                </div>
                            </div>
                        </div>
                        <div className="row g-3">
                            <div className="col mb-3">
                                <div className="password-field position-relative">
                                <label
                                    htmlFor="formSignupPassword"
                                    className="form-label"
                                >
                                    Contraseña
                                </label>
                                <div className="password-field position-relative">
                                    <input
                                    type="password"
                                    className="form-control fakePassword"
                                    id="formSignupPassword"
                                    placeholder="********"
                                    required
                                    />
                                    <span>
                                    <i className="bi bi-eye-slash passwordToggler"></i>
                                    </span>
                                    <div className="invalid-feedback">
                                    Por favor, ingresá tu contraseña
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>

                        {/* btn */}
                        <div className="col-12 d-grid">
                        <button
                            type="submit"
                            id="registro"
                            style={{ backgroundColor: "#F9ED48", border: "none", color: "black" }}
                            className="btn btn-primary"
                        >
                            Registrar
                        </button>
                        </div>
                    </form>
                    </div>
                </div>
                </div>
            </section>
        </div>
        </>
    )
}