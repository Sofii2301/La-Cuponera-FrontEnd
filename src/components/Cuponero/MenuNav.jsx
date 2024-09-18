import React from "react";
import { Link, useLocation } from 'react-router-dom';
//import { useTranslation } from 'react-i18next';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function MenuNav() {
    const location = useLocation();
    //const { t } = useTranslation();

    const navigation = [
        { name: 'CERCA A VOS'/*t('near_you')*/, href: "/", current: location.pathname === "/" },
        { name: 'CUPONES'/*t('coupons')*/, href: "/cuponero/cupones", current: location.pathname === "/cuponero/cupones" },
        { name: 'TIENDAS'/*t('stores')"*/, href: "/cuponero/tiendas", current: location.pathname === "/cuponero/tiendas" },
    ];
    

    return(
        <>
            <div className="p-3 menu-nav">
                <div className="flex space-x-4">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            to={item.href}
                            className={classNames(
                                item.current ? 'bg-pink-600 text-white' : 'text-white-300 hover:bg-yellow-500 hover:text-white',
                                'rounded-md px-4 py-2 text-sm font-medium text-center op-menu'
                            )}
                            aria-current={item.current ? 'page' : undefined}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}


/*<nav className="navbar navbar-expand-lg navbar-light navbar-default py-0 pb-lg-4" aria-label="Offcanvas navbar large">
                    <div className="container">
                        <div className="offcanvas offcanvas-start" tabIndex="-1" id="navbar-default" aria-labelledby="navbar-defaultLabel">
                            <div className="offcanvas-header pb-1">
                                <Link to="" href="../plantilla/temps/index-2.html"><img src="../static/assets/logo.png" alt="La Cuponera"></img></Link>
                                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                            </div>
                        <div className="offcanvas-body">
                            <div className="d-block d-lg-none mb-4">
                                <form action="#">
                                    <div className="input-group">
                                    <input className="form-control rounded" type="search" placeholder="Encontrá nuevos productos" />
                                    <span className="input-group-append">
                                        <button className="btn bg-white border border-start-0 ms-n10 rounded-0 rounded-end" type="button">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="feather feather-search"
                                        >
                                            <circle cx="11" cy="11" r="8"></circle>
                                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                        </svg>
                                        </button>
                                    </span>
                                    </div>
                                </form>
                                <div className="mt-2">
                                    <button type="button" className="btn btn-outline-gray-400 text-muted w-100" id="icon-pin" data-bs-toggle="modal" data-bs-target="#locationModal">
                                        <i className="bi bi-geo-alt-fill icon-pin"></i>
                                        Ubicación
                                    </button>
                                </div>
                            </div>

                            <div className="d-block d-lg-none mb-4">
                            <Link
                                to=""
                                id="amarillo3"
                                className="btn alldepartaments w-100 d-flex justify-content-center align-items-center"
                                data-bs-toggle="collapse"
                                //href="#collapseExample"
                                role="button"
                                aria-expanded="false"
                                aria-controls="collapseExample"
                            >
                                <span className="me-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="feather feather-grid"
                                >
                                    <rect x="3" y="3" width="7" height="7"></rect>
                                    <rect x="14" y="3" width="7" height="7"></rect>
                                    <rect x="14" y="14" width="7" height="7"></rect>
                                    <rect x="3" y="14" width="7" height="7"></rect>
                                </svg>
                                </span>
                                Todas las categorías
                            </Link>
                            <div className="collapse mt-2" id="collapseExample">
                                <div className="card card-body">
                                <ul className="mb-0 list-unstyled">
                                    <li><Link className="dropdown-item" ><img src="../static/assets/peludos.png" alt="Peludos"></img>Para los peludos</Link></li>
                                    <li><Link className="dropdown-item" >Para ti</Link></li>
                                    <li><Link className="dropdown-item" >Para tu mesa</Link></li>
                                    <li><Link className="dropdown-item" >Inmobiliaria & Automotriz</Link></li>
                                    <li><Link className="dropdown-item" >Para Disfrutar</Link></li>
                                    <li><Link className="dropdown-item" >Para Divertirte</Link></li>
                                    <li><Link className="dropdown-item" >Para los Gobernantes</Link></li>
                                    <li><Link className="dropdown-item" >Para Quien Amas</Link></li>
                                    <li><Link className="dropdown-item" >Para Tu Bienestar</Link></li>
                                    <li><Link className="dropdown-item" >Para Tu Hogar</Link></li>
                                    <li><Link className="dropdown-item" >Servicios Profesionales</Link></li>
                                </ul>
                                </div>
                            </div>
                            </div>

                            <div className="dropdown me-3 d-none d-lg-block">
                            <button className="btn custom-btn alldepartaments" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" >
                                <span className="me-1">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="feather feather-grid"
                                >
                                    <rect x="3" y="3" width="7" height="7"></rect>
                                    <rect x="14" y="3" width="7" height="7"></rect>
                                    <rect x="14" y="14" width="7" height="7"></rect>
                                    <rect x="3" y="14" width="7" height="7"></rect>
                                </svg>
                                </span>
                                Todas las categorías
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                <li><Link className="dropdown-item" ><img className="icono" src="../static/assets/peludos.png" alt="Peludos"></img>Para los peludos</Link></li>
                                <li><Link className="dropdown-item" ><img className="icono" src="../static/assets/parati.png" alt="Para ti"></img>Para ti</Link></li>
                                <li><Link className="dropdown-item" ><img className="icono" src="../static/assets/paratumesa.png" alt="Para tu mesa"></img>Para tu mesa</Link></li>
                                <li><Link className="dropdown-item" ><img className="icono" src="../static/assets/paratupaladar.png" alt="Para tu paladar"></img>Para tu paladar</Link></li>
                                <li><Link className="dropdown-item" ><img className="icono" src="../static/assets/inmobiliaria.png" alt="Inmobiliaria & Automotriz"></img>Inmobiliaria & Automotriz</Link></li>
                                <li><Link className="dropdown-item" ><img className="icono" src="../static/assets/paradisfrutar.png" alt="Para Disfrutar"></img>Para Disfrutar</Link></li>
                                <li><Link className="dropdown-item" ><img className="icono" src="../static/assets/gobernantes.png" alt="Para los gobernantes"></img>Para los gobernantes</Link></li>
                                <li><Link className="dropdown-item" ><img className="icono" src="../static/assets/paraquienamas.png" alt="Para quien amas"></img>Para quien amas</Link></li>
                                <li><Link className="dropdown-item" ><img className="icono" src="../static/assets/paratubienestar.png" alt="Para tu bienestar"></img>Para tu bienestar</Link></li>
                                <li><Link className="dropdown-item" ><img className="icono" src="../static/assets/paratumente.png" alt="Para tu mente"></img>Para tu mente</Link></li>
                                <li><Link className="dropdown-item" ><img className="icono" src="../static/assets/paratuhogar.png" alt="Para tu hogar"></img>Para tu hogar</Link></li>
                                <li><Link className="dropdown-item" ><img className="icono" src="../static/assets/serviciosprfesionales.png" alt="Servicios Profesionales"></img>Servicios Profesionales</Link></li>
                                <li><Link className="dropdown-item" ><img className="icono" src="../static/assets/tecnologia.png" alt="Tecnología"></img>Tecnología</Link></li>
                                <li><Link className="dropdown-item" ><img className="icono" src="../static/assets/recilaygana.png" alt="Recicla y gana"></img>Recicla y gana</Link></li>
                            </ul>
                            </div>

                            <div>
                            <ul className="navbar-nav align-items-center">
                                <li className="nav-item dropdown w-100 w-lg-auto">
                                <Link className="nav-link dropdown-toggle" role="button" id="amarillo" data-bs-toggle="dropdown" aria-expanded="false">Stores</Link>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item">Store List</Link></li>
                                    <li><Link className="dropdown-item">Store Grid</Link></li>
                                    <li><Link className="dropdown-item">Store Single</Link></li>
                                </ul>
                                </li>
                                <li className="nav-item dropdown w-100 w-lg-auto dropdown-fullwidth">
                                <Link className="nav-link dropdown-toggle" role="button" id="amarillo" data-bs-toggle="dropdown" aria-expanded="false">Mega menu</Link>
                                <div className="dropdown-menu pb-0">
                                    <div className="row p-2 p-lg-4">
                                    <div className="col-lg-3 col-12 mb-4 mb-lg-0">
                                        <h6 className="ps-3" id="amarillo2">Dairy, Bread & Eggs</h6>
                                        <Link className="dropdown-item" >Butter</Link>
                                        <Link className="dropdown-item" >Milk Drinks</Link>
                                        <Link className="dropdown-item" >Curd & Yogurt</Link>
                                        <Link className="dropdown-item" >Eggs</Link>
                                        <Link className="dropdown-item" >Buns & paradisfrutar</Link>
                                        <Link className="dropdown-item" >Cheese</Link>
                                        <Link className="dropdown-item" >Condensed Milk</Link>
                                        <Link className="dropdown-item" >Dairy Products</Link>
                                    </div>
                                    <div className="col-lg-3 col-12 mb-4 mb-lg-0">
                                        <h6 className="ps-3" id="amarillo2">Breakfast & Instant Food</h6>
                                        <Link className="dropdown-item" >Breakfast Cereal</Link>
                                        <Link className="dropdown-item" >Noodles, Pasta & Soup</Link>
                                        <Link className="dropdown-item" >Frozen Veg Snacks</Link>
                                        <Link className="dropdown-item" >Frozen Non-Veg Snacks</Link>
                                        <Link className="dropdown-item" >Vermicelli</Link>
                                        <Link className="dropdown-item" >Instant Mixes</Link>
                                        <Link className="dropdown-item" >Batter</Link>
                                        <Link className="dropdown-item" >Fruit and Juices</Link>
                                    </div>
                                    <div className="col-lg-3 col-12 mb-4 mb-lg-0">
                                        <h6 className="ps-3" id="amarillo2">Cold Drinks & Juices</h6>
                                        <Link className="dropdown-item" >Soft Drinks</Link>
                                        <Link className="dropdown-item" >Fruit Juices</Link>
                                        <Link className="dropdown-item" >Coldpress</Link>
                                        <Link className="dropdown-item" >Water & Ice Cubes</Link>
                                        <Link className="dropdown-item" >Soda & Mixers</Link>
                                        <Link className="dropdown-item" >Health Drinks</Link>
                                        <Link className="dropdown-item" >Herbal Drinks</Link>
                                        <Link className="dropdown-item" >Milk Drinks</Link>
                                    </div>
                                    <div className="col-lg-3 col-12 mb-4 mb-lg-0">
                                        <div className="card border-0">
                                        <img src="../plantilla/assets/images/banner/menu-banner.jpg" alt="eCommerce HTML Template" className="img-fluid" />
                                        <div className="position-absolute ps-6 mt-8">
                                            <h5 className="mb-0">
                                            Dont miss this
                                            <br />
                                            offer today.
                                            </h5>
                                            <Link className="btn btn-primary btn-sm mt-3">Comprar ahora</Link>
                                        </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </li>

                                <li className="nav-item w-100 w-lg-auto">
                                <Link className="nav-link" id="amarillo">Dashboard</Link>
                                </li>
                                <li className="nav-item dropdown w-100 w-lg-auto dropdown-flyout">
                                <Link id="navbarDropdownDocs" className="amarillo">Docs</Link>
                                <div className="dropdown-menu dropdown-menu-lg" aria-labelledby="navbarDropdownDocs">
                                    <Link className="dropdown-item align-items-start">
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#e4d529" className="bi bi-file-text" viewBox="0 0 16 16">
                                        <path fill="#e4d529" d="M5 4a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1H5zm-.5 2.5A.5.5 0 0 1 5 6h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zM5 8a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1H5zm0 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1H5z" />
                                        <path fill="#e4d529" d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z" />
                                        </svg>
                                    </div>
                                    <div className="ms-3 lh-1">
                                        <h6 className="mb-1">Documentations</h6>
                                        <p className="mb-0 small">Browse the all documentation</p>
                                    </div>
                                    </Link>
                                </div>
                                </li>
                            </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </nav> */