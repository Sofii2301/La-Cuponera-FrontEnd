import React from "react";
import { Link } from "react-router-dom";

import logo from "../assets/logo.png?ver=2.0";
import descuento from "../assets/descuento.png?ver=2.0";
import cuponero from "../assets/cuponero.png?ver=2.2";
import vendedor from "../assets/vendedor.png?ver=2.2";
import cuponeroGif from "../assets/winwin/WinWinGrande-izq.gif";
import vendedorGif from "../assets/cuponik/CuponicSaludo3-der.gif";

import Map from "../components/Map";

export default function Home(props) {

    function cambiar(tipo) {
        const ubicacionUsuario = 'Argentina'; // Suponiendo que obtienes la ubicación del usuario de alguna manera

        if ((ubicacionUsuario === 'Colombia' || ubicacionUsuario === 'Argentina') && tipo === 'cuponero') {
            return "/signup/cuponero"; // Devuelve la ruta para Cuponero
        } else if ((ubicacionUsuario === 'Colombia' || ubicacionUsuario === 'Argentina') && tipo === 'vendedor') {
            return "/signup/vendedor"; // Devuelve la ruta para Vendedor
        } else {
            console.log('Lo sentimos, el registro solo está disponible para usuarios en Argentina o Colombia.');
            return ""; // Devuelve una cadena vacía en caso de error
        }
    }   

    return (
        <>
            <section>
                <Map type="map-fondo"/>
                <div className="overlay overlay-home">
                    <img className="img-fluid mb-3 cuponero-gif" src={cuponeroGif} alt="WinWIn"/>
                    <img className="img-fluid mb-3 vendedor-gif" src={vendedorGif} alt="Cuponik"/>
                    <div className="content content-home">
                        <div className="container container-home text-center">      
                            <div className="row row-home logo-container-home">
                                <div className="col-md-12 ">
                                    <img
                                        className="img-fluid mb-3 logo-h"
                                        src={logo}
                                        alt="Logo"
                                    />
                                </div>
                            </div>
                            <div className="row row-home desc-container-home">
                                <div className="col-md-12 desc-container">
                                    <img
                                        className="img-fluid mb-3 descuento"
                                        src={descuento}
                                        alt="Descuento"
                                    />
                                </div>
                            </div>
                            <div className="row row-home btnes-container-home">
                                <div className="col-md-6 btn-container">
                                    <div className="btn-soy text-center">
                                        <div className="div-circulo">
                                            <Link to={cambiar('cuponero')} className=" btn btn-amarillo btn-lg btn-circulo">
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
                                            <Link to={cambiar('vendedor')} className="btn btn-amarillo btn-lg btn-circulo">
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
                            <div className="row row-home rgt-container-home">
                                <div className="col-md-12 mt-3">
                                    <h4 className="registro">
                                        ¿Ya tenés una cuenta?{' '}
                                        <Link
                                            to="signin/"
                                            style={{
                                                color: '#f9ec00',
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
                            <div className="row row-home rds-container-home">
                                <div className="col-md-12 mt-3 redes">
                                    <Link to="https://www.facebook.com/lacuponera.col/">
                                        <svg 
                                            xmlns="http://www.w3.org/2000/svg" 
                                            fill="none" 
                                            viewBox="0 0 14 14" 
                                            id="Facebook-1--Streamline-Core"
                                        >
                                            <desc>Facebook 1 Streamline Icon: https://streamlinehq.com</desc>
                                            <g id="facebook-1--media-facebook-social">
                                                <path 
                                                    id="Vector" 
                                                    fill="#ffff" 
                                                    d="M0 12.9231V1.07692C0 0.791305 0.113461 0.517386 0.315423 0.315423 0.517386 0.113461 0.791305 0 1.07692 0H12.9231c0.2856 0 0.5595 0.113461 0.7615 0.315423 0.2019 0.201963 0.3154 0.475882 0.3154 0.761497V12.9231c0 0.2856 -0.1135 0.5595 -0.3154 0.7615 -0.202 0.2019 -0.4759 0.3154 -0.7615 0.3154H9.69231V8.89539h0.76459c0.1743 0 0.3413 -0.06922 0.4645 -0.19241 0.1232 -0.1232 0.1924 -0.29029 0.1924 -0.46452v-0.82923c0 -0.08627 -0.0169 -0.17169 -0.05 -0.25139 -0.033 -0.0797 -0.0814 -0.15212 -0.1424 -0.21312s-0.1334 -0.10939 -0.2131 -0.14241c-0.0797 -0.03301 -0.1651 -0.05 -0.2514 -0.05h-0.72151V5.74c0 -0.90462 0.40921 -0.90462 0.81841 -0.90462h0.5277c0.0867 0.00357 0.1731 -0.01194 0.2531 -0.04543 0.08 -0.0335 0.1517 -0.08416 0.21 -0.14841 0.0626 -0.05958 0.1121 -0.1315 0.1455 -0.21121 0.0334 -0.07971 0.0498 -0.16547 0.0484 -0.25187v-0.79692c0.0028 -0.0877 -0.0116 -0.1751 -0.0425 -0.25721 -0.031 -0.08211 -0.0778 -0.15732 -0.1378 -0.22133 -0.06 -0.06401 -0.132 -0.11556 -0.212 -0.15172 -0.0799 -0.03615 -0.1662 -0.05619 -0.2539 -0.05897H9.85385c-0.36137 -0.01359 -0.72137 0.05143 -1.05516 0.19057 -0.33378 0.13913 -0.63338 0.34906 -0.87811 0.61529 -0.24472 0.26623 -0.42874 0.58241 -0.53934 0.9267 -0.1106 0.3443 -0.14514 0.70849 -0.10124 1.06744v1.26h-0.68923c-0.08717 -0.00143 -0.17375 0.01451 -0.2547 0.04688 -0.08095 0.03237 -0.15465 0.08053 -0.21679 0.14168 -0.06215 0.06114 -0.1115 0.13404 -0.14519 0.21445 -0.03368 0.08042 -0.05102 0.16673 -0.05101 0.25391v0.82923c-0.00001 0.08718 0.01733 0.1735 0.05101 0.25391 0.03369 0.08041 0.08304 0.15331 0.14519 0.21446 0.06214 0.06114 0.13584 0.1093 0.21679 0.14168 0.08095 0.03237 0.16753 0.0483 0.2547 0.04688H7.28V14H1.07692c-0.285615 0 -0.559534 -0.1135 -0.761497 -0.3154C0.113461 13.4826 0 13.2087 0 12.9231Z" 
                                                    strokeWidth="1"
                                                ></path>
                                            </g>
                                        </svg>
                                    </Link>
                                    <Link to="https://www.instagram.com/lacuponera.colombia/?next=%2F">
                                        <svg 
                                            xmlns="http://www.w3.org/2000/svg" 
                                            fill="none" 
                                            viewBox="0 0 14 14" 
                                            id="Instagram--Streamline-Core"
                                        >
                                            <desc>Instagram Streamline Icon: https://streamlinehq.com</desc>
                                            <g id="instagram">
                                                <path 
                                                    id="Subtract" 
                                                    fill="#ffff" 
                                                    fillRule="evenodd" 
                                                    d="M3.08 0.14C1.4563 0.14 0.14 1.4563 0.14 3.08V10.92C0.14 12.5437 1.4563 13.86 3.08 13.86H10.9201C12.5437 13.86 13.86 12.5437 13.86 10.92V3.08C13.86 1.4563 12.5437 0.14 10.9201 0.14H3.08ZM11.7663 3.0843C11.7663 3.552 11.3872 3.9311 10.9195 3.9311C10.4518 3.9311 10.0726 3.552 10.0726 3.0843C10.0726 2.6165 10.4518 2.2374 10.9195 2.2374C11.3872 2.2374 11.7663 2.6165 11.7663 3.0843ZM7.0002 4.6513C5.703 4.6513 4.6515 5.7028 4.6515 6.9999S5.703 9.3486 7.0002 9.3486S9.3488 8.297 9.3488 6.9999S8.2973 4.6513 7.0002 4.6513ZM3.5224 6.9999C3.5224 5.0792 5.0794 3.5221 7.0002 3.5221S10.4779 5.0792 10.4779 6.9999S8.9209 10.4777 7.0002 10.4777S3.5224 8.9206 3.5224 6.9999Z" 
                                                    clipRule="evenodd" 
                                                    strokeWidth="1"
                                                ></path>
                                            </g>
                                        </svg>
                                    </Link>
                                    <Link to="https://www.youtube.com/@lacuponeracolombia/featured">
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        fill="none" 
                                        viewBox="0 0 24 24" 
                                        id="Youtube-Clip-Logo--Streamline-Logos"
                                    >
                                        <desc>Youtube Clip Logo Streamline Icon: https://streamlinehq.com</desc>
                                        <path 
                                            fill="#ffffff" 
                                            fillRule="evenodd" 
                                            d="M1.172 7.693A55.991 55.991 0 0 0 1 12c0 1.632 0.08 3.167 0.182 4.44 0.146 1.817 1.531 3.206 3.318 3.33 1.794 0.125 4.305 0.23 7.5 0.23 3.195 0 5.706 -0.105 7.5 -0.23 1.787 -0.124 3.172 -1.513 3.318 -3.33 0.102 -1.273 0.182 -2.808 0.182 -4.44 0 -1.576 -0.074 -3.06 -0.172 -4.307a3.727 3.727 0 0 0 -3.46 -3.46C17.59 4.107 15.164 4 12 4c-3.164 0 -5.591 0.107 -7.368 0.233a3.727 3.727 0 0 0 -3.46 3.46ZM15.5 12 10 9v6l5.5 -3Z" 
                                            clipRule="evenodd" 
                                            strokeWidth="1"
                                        ></path>
                                    </svg>
                                    </Link>
                                    <Link to="https://www.tiktok.com/@lacuponera.colombia">
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        fill="none" 
                                        viewBox="0 0 24 24" 
                                        id="Tiktok-Logo--Streamline-Logos" 
                                    >
                                        <desc>Tiktok Logo Streamline Icon: https://streamlinehq.com</desc>
                                        <path 
                                            fill="#ffffff" 
                                            d="M16 1h-3.5v15.5c0 1.5 -1.5 3 -3 3s-3 -0.5 -3 -3c0 -2 1.899 -3.339 3.5 -3V10c-6.12 0 -7 5 -7 6.5S3.977 23 9.5 23c4.522 0 6.5 -3.5 6.5 -6V8c1.146 1.018 2.922 1.357 5 1.5V6c-3.017 0 -5 -2.654 -5 -5Z" 
                                            strokeWidth="1"
                                        ></path>
                                    </svg>
                                    </Link>
                                    <Link to="https://www.linkedin.com/in/la-cuponera-digital-a765a8209/">
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        fill="none" 
                                        viewBox="0 0 24 24" 
                                        id="Linkedin-Logo--Streamline-Logos" 
                                    >
                                        <desc>Linkedin Logo Streamline Icon: https://streamlinehq.com</desc>
                                        <path 
                                            fill="#ffffff" 
                                            fillRule="evenodd" 
                                            d="M3.5 6a2.5 2.5 0 1 0 0 -5 2.5 2.5 0 0 0 0 5ZM6 23V8H1v15h5ZM8 8h4.5v1.946C13.216 9.005 14.746 8 17.5 8c4.33 0 5.5 4.32 5.5 7v8h-5v-8c0 -1 -0.5 -3 -2.5 -3 -1.42 0 -2.42 1.008 -3 1.951V23H8V8Z"
                                            clipRule="evenodd" 
                                            strokeWidth="1"
                                        ></path>
                                    </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
