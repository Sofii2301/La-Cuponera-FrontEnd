import React from "react";
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

    return(
        <>
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
                                    <div className="text-truncate">Para tu mesa</div>
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
                            {/* Repite estos bloques para cada categoría */}
                        </div>
                    </div>
                </section>

                <Cupones />
            </main>
        </>
    )
}

function ProductCard() {
    return (
        <div className="col">
            <div className="card card-product-v2 h-100">
                <div className="card-body position-relative">
                    <div className="text-center position-relative" style={{ width: '100%', height: '220px', border: 'solid 2px rgb(54, 134, 209)' }}>
                        <div className="position-absolute top-0 start-0">
                            <span className="badge bg-danger"></span>
                        </div>
                        <a href="#!"><img src="" alt="Producto La Cuponera" className="mb-3 img-fluid" /></a>

                        <div className="product-action-btn">
                            <a href="#!" className="btn-action mb-1" data-bs-toggle="modal" data-bs-target="#quickViewModal" title="Ver">
                                <i className="bi bi-eye" title="Ver"></i>
                            </a>
                            <a href="#!" className="btn-action  mb-1" data-bs-toggle="tooltip" data-bs-html="true" title="Favorito"><i className="bi bi-heart"></i></a>
                        </div>
                    </div>
                    <div className="text-small mb-1">
                        <a href="#!" className="text-decoration-none text-muted"><small>Categoria</small></a>
                    </div>
                        <h2 className="fs-6"><a href="temps/shop-single.html" className="text-inherit text-decoration-none">Producto</a></h2>
                    <div>
                        <small className="text-warning">
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-fill"></i>
                            <i className="bi bi-star-half"></i>
                        </small>
                        <span className="text-muted small">4.5</span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-3">
                        <div>
                            <span className="text-dark">$precio</span>
                            <span className="text-decoration-line-through text-muted">$anterior</span>
                        </div>
                    </div>
                    <div className="product-fade-block">
                        <div className="d-grid mt-4">
                        <a href="#" className="btn btn-primary rounded-pill">Agregar al carrito</a>
                        </div>
                    </div>
                </div>
                <div className="product-content-fade border-info" style={{ marginBottom: '-60px' }}></div>
            </div>
        </div>
    );
}

function Cupones() {
    return (
        <section className="my-lg-14 my-8">
            <style>
                {`
                    .carousel-control-prev-icon,
                    .carousel-control-next-icon {
                        background-color: black;
                    }
                `}
            </style>
            <div className="container">
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <h3 className="mb-0">Cupones</h3>
                        <p className="mb-0">Conseguí cupones de tus productos favoritos</p>
                    </div>
                    <div id="productCarousel" className="carousel slide" data-bs-ride="carousel" style={{ width: '60%', overflow: 'hidden', display: 'flex', flexWrap: 'nowrap' }}>
                        <button className="carousel-control-prev" type="button" data-bs-target="#productCarousel" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true" style={{ color: 'black' }}></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <div className="carousel-inner" style={{ width: '95%', paddingLeft: '10%', textAlign: 'center' }}>
                            <div className="carousel-item active">
                                <div className="row">
                                    <div className="col">
                                        <a href="#" className="nav-link active" id="nav-parati-tab" data-bs-toggle="tab" data-bs-target="#nav-parati" role="tab" aria-controls="nav-parati" aria-selected="true">
                                            Para ti
                                        </a>
                                    </div>
                                    {/* Agregar más enlaces aquí */}
                                </div>
                            </div>
                            {/* Más items del carrusel */}
                        </div>
                        <button className="carousel-control-next" type="button" data-bs-target="#productCarousel" data-bs-slide="next" style={{ width: '5%' }}>
                            <span className="carousel-control-next-icon" aria-hidden="true" style={{ color: 'black' }}></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
                <div className="row g-4 row-cols-lg-5 row-cols-2 row-cols-md-3 productos">
                    {/* Agregar más ProductCard aquí */}
                    <ProductCard />
                </div>
            </div>
        </section>
    );
}
