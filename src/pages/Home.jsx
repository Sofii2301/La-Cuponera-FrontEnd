import React from "react";
import { Link } from "react-router-dom";
import "../css/home.css";

import logo from "../assets/logo.png?ver=2.0";
import descuento from "../assets/descuento.png?ver=2.0";
import cuponero from "../assets/cuponero.png?ver=2.2";
import vendedor from "../assets/vendedor.png?ver=2.2";
import x from "../assets/x.png";
import i from "../assets/icon-insta.png";
import y from "../assets/youtube.png";
import Map from "./Map";

export default function Home(props) {
    function cambiar(v) {
        const ubicacionUsuario = 'Argentina'; // Suponiendo que obtienes la ubicación del usuario de alguna manera

        if ((ubicacionUsuario === 'Colombia' || ubicacionUsuario === 'Argentina') && v === 'cuponero') {
            return '/signup/cuponero';
        } else if ((ubicacionUsuario === 'Colombia' || ubicacionUsuario === 'Argentina') && v === 'vendedor') {
            return '/signup/vendedor';
        } else {
        // Usuario no está en Argentina o Colombia
        alert('Lo sentimos, el registro solo está disponible para usuarios en Argentina o Colombia.');
        }
    }   

    return (
        <>
            <section>
                <h1  id="pais" hidden></h1>
                <Map />
                <div className="overlay-h">
                    <div className="content">
                        <div className="container text-center">
                            <div className="row lg-container">
                                <div className="col-md-12 ">
                                    <img
                                        className="img-fluid mb-3 logo"
                                        src={logo}
                                        alt="Logo"
                                    />
                                </div>
                            </div>
                            <div className="row desc-container">
                                <div className="col-md-12 desc-container">
                                    <img
                                        className="img-fluid mb-3 descuento"
                                        src={descuento}
                                        alt="Descuento"
                                    />
                                </div>
                            </div>
                            <div className="row btnes-container">
                                <div className="col-md-6 btn-container">
                                    <div className="btn-soy text-center">
                                        <div className="div-circulo">
                                            <Link to={cambiar('cuponero')} className=" btn btn-primary btn-lg btn-circulo">
                                                <img
                                                    src={cuponero}
                                                    alt="Cuponero"
                                                    className="img-fluid icon"
                                                />
                                            </Link>
                                        </div>
                                        <div className="soy">
                                            <h2>Soy Cuponero</h2>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 btn-container">
                                    <div className="btn-soy text-center">
                                        <div className="div-circulo">
                                            <Link to={cambiar('vendedor')} className="btn btn-primary btn-lg btn-circulo">
                                                <img
                                                    src={vendedor}
                                                    alt="Vendedor"
                                                    className="img-fluid icon"
                                                />
                                            </Link>
                                        </div>
                                        <div className="soy">
                                            <h2>Soy Vendedor</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row rgt-container">
                                <div className="col-md-12 mt-3">
                                    <h4 className="registro">
                                        ¿Ya tenés una cuenta?{' '}
                                        <Link
                                            to="signin.html"
                                            style={{
                                                color: '#f6e901',
                                                cursor: 'pointer',
                                                textDecoration: 'none',
                                            }}
                                        >
                                            {' '}
                                            Iniciar Sesión
                                        </Link>
                                    </h4>
                                </div>
                            </div>
                            <div className="row rds-container">
                                <div className="col-md-12 mt-3 redes">
                                    <img
                                        className="img-fluid me-3"
                                        src={x}
                                        alt="Red X"
                                    />
                                    <img
                                        className="img-fluid me-3"
                                        src={i}
                                        alt="Instagram"
                                    />
                                    <img
                                        className="img-fluid"
                                        src={y}
                                        alt="YouTube"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
