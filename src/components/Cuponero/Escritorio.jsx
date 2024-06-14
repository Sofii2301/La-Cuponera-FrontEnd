import React, { useEffect, useState } from 'react';
import { useAuth } from '../../services/AuthContext';
import { getCuponeroById } from '../../services/cuponerosService';
import { getCoupons } from '../../services/CuponesService';
import { Link } from 'react-router-dom';

import parati from "../../assets/categorias/parati.png";
import peludos from "../../assets/categorias/peludos.png";
import disfrutar from "../../assets/categorias/paradisfrutar.png";
import paladar from "../../assets/categorias/paratupaladar.png";
import quienamas from "../../assets/categorias/paraquienamas.png";
import hogar from "../../assets/categorias/paratuhogar.png";
import bienestar from "../../assets/categorias/paratubienestar.png";
import mente from "../../assets/categorias/paratumente.png";
import inmobiliariayautomotriz from "../../assets/categorias/inmobiliaria.png";
import tecnologia from "../../assets/categorias/tecnologia.png";
import mesa from "../../assets/categorias/paratumesa.png";
import gobernantes from "../../assets/categorias/gobernantes.png";
import serviciosprofesionales from "../../assets/categorias/serviciosprofesionales.png";
import reciclaygana from "../../assets/categorias/reciclaygana.png";

export default function Escritorio(props) {
    const { authState } = useAuth();
    const [cuponero, setCuponero] = useState(null);
    const [coupons, setCoupons] = useState([]);

    useEffect(() => {
        console.log("userType: ", authState.userType);

        const fetchCuponero = async () => {
            try {
                const data = await getCuponeroById(authState.user);
                setCuponero(data);
                console.log("cuponero: ", data);
            } catch (error) {
                console.error('Error al obtener cuponero:', error);
            }
        };

        const fetchCoupons = async () => {
            try {
                const data = await getCoupons();
                setCoupons(data);
            } catch (error) {
                console.error('Error al obtener cupones:', error);
            }
        };

        if (authState.userType === 'cuponero') {
            fetchCuponero();
            fetchCoupons();
        }
    }, [authState.user, authState.userType]);

    if (!cuponero) {
        return <div>Cargando...</div>;
    }

    return (
        <>
            <div>
                <h1>Dashboard de Cuponero</h1>
                <h2>Bienvenido, {cuponero.nombre}</h2>
                <h3>Tus cupones:</h3>
                <ul>
                    {coupons.map((coupon) => (
                        <li key={coupon.id}>{coupon.nombre}</li>
                    ))}
                </ul>
            </div>
            <main>
                <style>
                    {`
                    html, body {
                        height: 100%;
                        margin: 0;
                    }
                    .leaflet-container {
                        height: 400px;
                        width: 100%;
                        max-width: 100%;
                        max-height: 100%;
                    }
                    `}
                </style>

                {/* Banner */}
                <section className="mt-8">
                    <div className="container">
                        <div className="hero-slider">
                            <div style={{ background: "url() no-repeat", backgroundSize: "cover", borderRadius: "0.5rem", backgroundPosition: "center", border: "2px solid black" }}>
                                <div className="ps-lg-12 py-lg-16 col-xxl-5 col-md-7 py-14 px-8 text-xs-center">
                                    <span className="badge text-bg-warning">Sale</span>
                                    <h2 className="text-dark display-5 fw-bold mt-4">OFERTA</h2>
                                    <p className="lead"></p>
                                    <Link className="btn btn-dark mt-3">
                                        Comprar ahora
                                        <i className="feather-icon icon-arrow-right ms-1"></i>
                                    </Link>
                                </div>
                            </div>
                            <div style={{ background: "url() no-repeat", backgroundSize: "cover", borderRadius: "0.5rem", backgroundPosition: "center", border: "2px solid black" }}>
                                <div className="ps-lg-12 py-lg-16 col-xxl-5 col-md-7 py-14 px-8 text-xs-center">
                                    <span className="badge text-bg-warning">Sale</span>
                                    <h2 className="text-dark display-5 fw-bold mt-4">
                                        OFERTA
                                        <br />
                                        <span className="text-primary">%</span>
                                    </h2>
                                    <p className="lead"></p>
                                    <Link className="btn btn-dark mt-3">
                                        Comprar ahora
                                        <i className="feather-icon icon-arrow-right ms-1"></i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Mapa */}
                <section className="mt-8">
                    <div style={{ width: "100%" }} className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="bg-light d-lg-flex justify-content-between align-items-center py-2 py-lg-3 px-2 text-center text-lg-start rounded">
                                    <div id="map" style={{ width: "100%" }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Primeras ofertas */}
                <section className="mt-8">
                    <div className="container">
                        <h6 id="ciudad"></h6>
                        <div className="row">
                            <div className="col-12 col-md-6 mb-3 mb-lg-0">
                                <div>
                                    <div className="py-10 px-8 rounded" style={{ background: "url(../plantilla/assets/images/banner/grocery-banner-2.jpg) no-repeat", backgroundSize: "cover", backgroundPosition: "center", border: "2px solid darkgray" }}>
                                        <div>
                                            <h3 className="fw-bold mb-1">OFERTA</h3>
                                            <p className="mb-4">
                                                Obtené un
                                                <span className="fw-bold">%</span>
                                                de descuento
                                            </p>
                                            <Link className="btn btn-dark">Comprar ahora</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6">
                                <div>
                                    <div className="py-10 px-8 rounded" style={{ background: "url(../plantilla/assets/images/banner/grocery-banner-2.jpg) no-repeat", backgroundSize: "cover", backgroundPosition: "center", border: "2px solid darkgray" }}>
                                        <div>
                                            <h3 className="fw-bold mb-1">OFERTA</h3>
                                            <p className="mb-4">
                                                Obtené un
                                                <span className="fw-bold">%</span>
                                                de descuento
                                            </p>
                                            <Link className="btn btn-dark">Comprar ahora</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Seccion Categorias */}
                <section className="mb-lg-10 mt-lg-14 my-8">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 mb-6">
                                <h3 className="mb-0">Categorias</h3>
                            </div>
                        </div>
                        <div className="row category-slider">
                            <div className="col item">
                                <Link to="temps/shop-grid.html" className="text-decoration-none text-inherit">
                                    <div className="card card-product mb-lg-4">
                                        <div className="card-body text-center py-8" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                            <img src={parati} alt="Producto La Cuponera" className="mb-3 img-fluid" style={{ width: '110px', height: '110px' }} />
                                            <div className="text-truncate">Para los peludos</div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className="col item">
                                <Link to="" className="text-decoration-none text-inherit">
                                    <div className="card card-product mb-lg-4">
                                        <div className="card-body text-center py-8" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                            <img src={peludos} alt="Producto La Cuponera" className="mb-3 img-fluid" style={{ width: '110px', height: '110px' }} />
                                            <div className="text-truncate">Para los peludos</div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className="col item">
                                <Link to="" className="text-decoration-none text-inherit">
                                    <div className="card card-product mb-lg-4">
                                        <div className="card-body text-center py-8" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                            <img src={disfrutar} alt="Producto La Cuponera" className="mb-3 img-fluid" style={{ width: '110px', height: '110px' }} />
                                            <div className="text-truncate">Para disfrutar</div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className="col item">
                                <Link to="" className="text-decoration-none text-inherit">
                                    <div className="card card-product mb-lg-4">
                                        <div className="card-body text-center py-8" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                            <img src={paladar} alt="Producto La Cuponera" className="mb-3 img-fluid" style={{ width: '110px', height: '110px' }} />
                                            <div className="text-truncate">Para tu paladar</div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className="col item">
                                <Link to="" className="text-decoration-none text-inherit">
                                    <div className="card card-product mb-lg-4">
                                        <div className="card-body text-center py-8" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                            <img src={quienamas} alt="Producto La Cuponera" className="mb-3 img-fluid" style={{ width: '110px', height: '110px' }} />
                                            <div className="text-truncate">Para quien más</div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className="col item">
                                <Link to="" className="text-decoration-none text-inherit">
                                    <div className="card card-product mb-lg-4">
                                        <div className="card-body text-center py-8" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                            <img src={hogar} alt="Producto La Cuponera" className="mb-3 img-fluid" style={{ width: '110px', height: '110px' }} />
                                            <div className="text-truncate">Para tu hogar</div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className="col item">
                                <Link to="" className="text-decoration-none text-inherit">
                                    <div className="card card-product mb-lg-4">
                                        <div className="card-body text-center py-8" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                            <img src={bienestar} alt="Producto La Cuponera" className="mb-3 img-fluid" style={{ width: '110px', height: '110px' }} />
                                            <div className="text-truncate">Para tu bienestar</div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className="col item">
                                <Link to="" className="text-decoration-none text-inherit">
                                    <div className="card card-product mb-lg-4">
                                        <div className="card-body text-center py-8" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                            <img src={mente} alt="Producto La Cuponera" className="mb-3 img-fluid" style={{ width: '110px', height: '110px' }} />
                                            <div className="text-truncate">Para tu mente</div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className="col item">
                                <Link to="" className="text-decoration-none text-inherit">
                                    <div className="card card-product mb-lg-4">
                                        <div className="card-body text-center py-8" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                            <img src={inmobiliariayautomotriz} alt="Producto La Cuponera" className="mb-3 img-fluid" style={{ width: '110px', height: '110px' }} />
                                            <div className="text-truncate">Inmobiliaria y Automotriz</div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className="col item">
                                <Link to="" className="text-decoration-none text-inherit">
                                    <div className="card card-product mb-lg-4">
                                        <div className="card-body text-center py-8" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                            <img src={tecnologia} alt="Producto La Cuponera" className="mb-3 img-fluid" style={{ width: '110px', height: '110px' }} />
                                            <div className="text-truncate">Tecnología</div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className="col item">
                                <Link to="" className="text-decoration-none text-inherit">
                                    <div className="card card-product mb-lg-4">
                                        <div className="card-body text-center py-8" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                            <img src={mesa} alt="Producto La Cuponera" className="mb-3 img-fluid" style={{ width: '110px', height: '110px' }} />
                                            <div className="text-truncate">Para tu mesa</div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className="col item">
                                <Link to="" className="text-decoration-none text-inherit">
                                    <div className="card card-product mb-lg-4">
                                        <div className="card-body text-center py-8" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                            <img src={gobernantes} alt="Producto La Cuponera" className="mb-3 img-fluid" style={{ width: '110px', height: '110px' }} />
                                            <div className="text-truncate">Gobernantes</div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className="col item">
                                <Link to="" className="text-decoration-none text-inherit">
                                    <div className="card card-product mb-lg-4">
                                        <div className="card-body text-center py-8" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                            <img src={serviciosprofesionales} alt="Producto La Cuponera" className="mb-3 img-fluid" style={{ width: '110px', height: '110px' }} />
                                            <div className="text-truncate">Servicios profesionales</div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className="col item">
                                <Link to="" className="text-decoration-none text-inherit">
                                    <div className="card card-product mb-lg-4">
                                        <div className="card-body text-center py-8" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                            <img src={reciclaygana} alt="Producto La Cuponera" className="mb-3 img-fluid" style={{ width: '110px', height: '110px' }} />
                                            <div className="text-truncate">Recicla y gana</div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
