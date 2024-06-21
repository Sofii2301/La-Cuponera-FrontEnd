import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import icon from "../../assets/icono-amarillo.png";

export default function FooterC(props) {

    return(
        <>
            <div className="container-footer">
                <footer className="row row-cols-sm-2 row-cols-md-5 py-5 my-5 border-top">
                    <div className="col mb-3">
                        <Link to="/" className="d-flex align-items-center mb-3 link-body-emphasis text-decoration-none">
                            <img src={logo} alt="" className="d-inline-block align-text-top logo-navbar" />
                        </Link>
                        <p className="">© 2024</p>
                    </div>

                    <div className="col mb-3"></div>

                    <div className="col mb-3">
                        <h5>Navegar</h5>
                        <ul className="nav flex-column">
                            <li className="nav-item mb-2"><Link to="#" className="p-0">Localización</Link></li>
                            <li className="nav-item mb-2"><Link to="#" className="p-0">Cupones</Link></li>
                            <li className="nav-item mb-2"><Link to="#" className="p-0">Tiendas Certificadas</Link></li>
                            <li className="nav-item mb-2"><Link to="#" className="p-0">Lista de Favoritos</Link></li>
                            <li className="nav-item mb-2"><Link to="#" className="p-0">Mi Cariito</Link></li>
                        </ul>
                    </div>

                    <div className="col mb-3">
                        <h5 className="fw-bold">¡Registrá tu tienda!</h5>
                        <p>Registrá tu tienda para impulsar tu negocio en nuestra plataforma digital.</p>
                        <Link to="/signup/vendedor/" className="p-0">
                            <button className="btn btn-rosa">Registrar mi tienda</button>
                        </Link>
                    </div>

                    <div className="col mb-3">
                        <h5 className="fw-bold">La Cuponera Digital</h5>
                        <p>Obtené más información sobre cómo registrar tu tienda y sobre nosotros.</p>
                        <Link to="https://lacuponera.digital/" className="p-0">
                            <button className="btn btn-rosa">Más Información</button>
                        </Link>
                    </div>
                </footer>
                <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 border-top row rds-container-home">
                    <div className="col-md-4 col-sm-12 d-flex align-items-center">
                        <Link to="/" className="mb-3 me-0 mb-md-0 text-body-secondary text-decoration-none lh-1 l-icon-footer">
                            <img src={icon} alt="" className="d-inline-block align-text-top icon-footer" />
                        </Link>
                        <span className="mb-3 mb-md-0 text-body-secondary">La Cuponera App{/*© 2024 Company, Inc*/}</span>  
                    </div>
                    <div className="col-md-8 mt-3 redes">
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
                </footer>
            </div>
        </>
    )
}