import React from "react";
import "../css/map.css";
import "../css/home.css";

import logo from "../assets/logo.png?ver=2.0"
import descuento from "../assets/descuento.png?ver=2.0"
import cuponero from "../assets/cuponero.png?ver=2.2"
import vendedor from "../assets/vendedor.png?ver=2.2"
import x from "../assets/x.png"
import i from "../assets/icon-insta.png"
import y from "../assets/youtube.png"


export default function Home(props) {
    function cambiar(v) {
        const pais = document.getElementById('pais').textContent;

        alert(pais);
        if ((pais === 'Colombia' || pais === 'Argentina') && v === 'cuponero') {
            const nuevaPagina = 'signin.html';
            window.location.href = nuevaPagina;
        } else if ((pais === 'Colombia' || pais === 'Argentina') && v === 'vendedor') {
            const nuevaPagina = 'escritorio_vendedor.html';
            window.location.href = nuevaPagina;
        }
    }

    return (
        <section>
            <div className="map">
                <iframe
                    title="Google Maps"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12451.686771735223!2d-62.27439210000001!3d-38.7196068!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95edbcabdc1302bd%3A0x9c3ae256e9e7effe!2sYPF!5e0!3m2!1ses!2sar!4v1713828389644!5m2!1ses!2sar"
                    width="600"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
            <div className="overlay">
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
                            <div
                                onClick={() => cambiar('cuponero')}
                                className="col-md-6 btn-container"
                            >
                                <div className="btn-soy text-center">
                                    <div className="div-circulo">
                                        <button className=" btn btn-primary btn-lg btn-circulo">
                                            <img
                                                src={cuponero}
                                                alt="Cuponero"
                                                className="img-fluid icon"
                                            />
                                        </button>
                                    </div>
                                    <div className="soy">
                                        <h2>Soy Cuponero</h2>
                                    </div>
                                </div>
                            </div>
                            <div
                                onClick={() => cambiar('vendedor')}
                                className="col-md-6 btn-container"
                            >
                                <div className="btn-soy text-center">
                                    <div className="div-circulo">
                                        <button className="btn btn-primary btn-lg btn-circulo">
                                            <img
                                                src={vendedor}
                                                alt="Vendedor"
                                                className="img-fluid icon"
                                            />
                                        </button>
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
                                    <a
                                        href="signin.html"
                                        style={{
                                            color: '#f6e901',
                                            cursor: 'pointer',
                                            textDecoration: 'none',
                                        }}
                                    >
                                        {' '}
                                        Iniciar Sesión
                                    </a>
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
    );
}
