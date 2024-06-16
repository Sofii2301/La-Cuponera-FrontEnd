// NavConfig.jsx
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Bell, User, Power } from 'react-feather';
import logoDefault from "../assets/logo_default.png";
import "../css/nav.css";
import { useAuth } from '../services/AuthContext';
import { getVendedorById } from "../services/vendedoresService";
import Avatar from '@mui/joy/Avatar';
import { useNavigate } from "react-router-dom";

const NavConfig = ({ disableButtons }) => {
    const { user, logout } = useAuth();
    const [notifications, setNotifications] = useState([]);
    const [vendedor, setVendedor] = useState(null);
    const [notificationNavOpen, setNotificationNavOpen] = useState(false);
    const [perfilNavOpen, setPerfilNavOpen] = useState(false);
    const notificationRef = useRef(null);
    const profileRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (notificationRef.current && !notificationRef.current.contains(event.target)) {
                setNotificationNavOpen(false);
            }
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setPerfilNavOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const fetchVendedorData = async () => {
            try {
                const data = await getVendedorById(user);
                setVendedor(data);
                setNotifications(data.notificaciones || []);
            } catch (error) {
                console.error('Error fetching vendor data:', error);
            }
        };

        fetchVendedorData();
    }, [user]);

    const handleNotificationClick = () => {
        setNotificationNavOpen(!notificationNavOpen);
        setPerfilNavOpen(false); // Close profile dropdown if open
    };

    const handleProfileClick = () => {
        setPerfilNavOpen(!perfilNavOpen);
        setNotificationNavOpen(false); // Close notification dropdown if open
    };

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light nav-bar">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">
                    <img src={logoDefault} alt="La Cuponera" className="d-inline-block align-text-top" />
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item dropdown" ref={notificationRef}>
                            <button className="nav-link" onClick={handleNotificationClick}>
                                <Bell size={20} />
                            </button>
                            {notificationNavOpen && (
                                <ul className="dropdown-menu show" aria-labelledby="navbarDropdown">
                                    {notifications.length > 0 ? (
                                        notifications.map((notification, index) => (
                                            <li key={index}>
                                                <span className="dropdown-item">{notification}</span>
                                            </li>
                                        ))
                                    ) : (
                                        <li>
                                            <span className="dropdown-item">No hay notificaciones</span>
                                        </li>
                                    )}
                                </ul>
                            )}
                        </li>
                        <li className="nav-item dropdown" ref={profileRef}>
                            <button className="nav-link" onClick={handleProfileClick}>
                                {vendedor && vendedor.fotoPerfil ? (
                                    <Avatar
                                        src={vendedor.fotoPerfil}
                                        alt="Profile"
                                        sx={{ width: 34, height: 34 }}
                                    />
                                ) : (
                                    <User size={20} />
                                )}
                            </button>
                            {perfilNavOpen && (
                                <ul className="dropdown-menu show" aria-labelledby="navbarDropdown">
                                    <li>
                                        <Link className="dropdown-item" to="/vendedor/perfil/vista-previa">Perfil</Link>
                                    </li>
                                    <li>
                                        <button className="dropdown-item" onClick={handleLogout}>Cerrar sesión</button>
                                    </li>
                                </ul>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavConfig;




            /* 
            /*const openFullscreen = () => {
                const elem = document.documentElement;
                if (elem.requestFullscreen) {
                elem.requestFullscreen();
                } else if (elem.mozRequestFullScreen) { /* Firefox 
                elem.mozRequestFullScreen();
                } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera 
                elem.webkitRequestFullscreen();
                } else if (elem.msRequestFullscreen) { /* IE/Edge 
                elem.msRequestFullscreen();
                }
            };
            
            
            Theme mode toggle 
            <div className="header-element-nc header-theme-mode">
                <Link to="" className="header-link layout-setting">
                <span className="light-layout">
                    <Moon className="header-link-icon lh-2" />
                </span>
                <span className="dark-layout">
                    <Sun className="header-link-icon lh-2" />
                </span>
                </Link>
            </div>
            */

            /* Country selector 
            <div className="header-element-nc country-selector">
                <Link to="" className="header-link dropdown-toggle country-Flag" aria-expanded="false">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <circle cx="256" cy="256" r="256" fill="#f0f0f0"></circle>
                        <g fill="#0052b4">
                            <path d="M52.92 100.142c-20.109 26.163-35.272 56.318-44.101 89.077h133.178L52.92 100.142zM503.181 189.219c-8.829-32.758-23.993-62.913-44.101-89.076l-89.075 89.076h133.176zM8.819 322.784c8.83 32.758 23.993 62.913 44.101 89.075l89.074-89.075H8.819zM411.858 52.921c-26.163-20.109-56.317-35.272-89.076-44.102v133.177l89.076-89.075zM100.142 459.079c26.163 20.109 56.318 35.272 89.076 44.102V370.005l-89.076 89.074zM189.217 8.819c-32.758 8.83-62.913 23.993-89.075 44.101l89.075 89.075V8.819zM322.783 503.181c32.758-8.83 62.913-23.993 89.075-44.101l-89.075-89.075v133.176zM370.005 322.784l89.075 89.076c20.108-26.162 35.272-56.318 44.101-89.076H370.005z"></path>
                        </g>
                        <g fill="#d80027">
                            <path d="M509.833 222.609H289.392V2.167A258.556 258.556 0 00256 0c-11.319 0-22.461.744-33.391 2.167v220.441H2.167A258.556 258.556 0 000 256c0 11.319.744 22.461 2.167 33.391h220.441v220.442a258.35 258.35 0 0066.783 0V289.392h220.442A258.533 258.533 0 00512 256c0-11.317-.744-22.461-2.167-33.391z"></path>
                            <path d="M322.783 322.784L437.019 437.02a256.636 256.636 0 0015.048-16.435l-97.802-97.802h-31.482v.001zM189.217 322.784h-.002L74.98 437.019a256.636 256.636 0 0016.435 15.048l97.802-97.804v-31.479zM189.217 189.219v-.002L74.981 74.98a256.636 256.636 0 00-15.048 16.435l97.803 97.803h31.481zM322.783 189.219L437.02 74.981a256.328 256.328 0 00-16.435-15.047l-97.802 97.803v31.482z"></path>
                        </g>
                        </svg>
                    </span>
                </Link>
                <ul className="main-header-dropdown dropdown-menu dropdown-menu-end">
                    <li>
                        <Link className="dropdown-item d-flex align-items-center" to="">
                        <span className="avatar avatar-xs lh-1 me-2">
                            <img src="../assets/images/flags/6.jpg" alt="img" />
                        </span>
                        English
                        </Link>
                    </li>
                    <li>
                        <Link className="dropdown-item d-flex align-items-center" to="">
                        <span className="avatar avatar-xs lh-1 me-2">
                            <img src="../assets/images/flags/5.jpg" alt="img" />
                        </span>
                        Spanish
                        </Link>
                    </li>
                    <li>
                        <Link className="dropdown-item d-flex align-items-center" to="">
                        <span className="avatar avatar-xs lh-1 me-2">
                            <img src="../assets/images/flags/1.jpg" alt="img" />
                        </span>
                        French
                        </Link>
                    </li>
                    <li>
                        <Link className="dropdown-item d-flex align-items-center" to="">
                        <span className="avatar avatar-xs lh-1 me-2">
                            <img src="../assets/images/flags/2.jpg" alt="img" />
                        </span>
                        German
                        </Link>
                    </li>
                    <li>
                        <Link className="dropdown-item d-flex align-items-center" to="">
                        <span className="avatar avatar-xs lh-1 me-2">
                            <img src="../assets/images/flags/3.jpg" alt="img" />
                        </span>
                        Italian
                        </Link>
                    </li>
                    <li>
                        <Link className="dropdown-item d-flex align-items-center" to="">
                        <span className="avatar avatar-xs lh-1 me-2">
                            <img src="../assets/images/flags/4.jpg" alt="img" />
                        </span>
                        Russian
                        </Link>
                    </li>
                </ul>
            </div>*/

            /* Fullscreen toggle 
            <div className="header-element-nc header-fullscreen d-xl-flex d-none">
                <Link onClick={openFullscreen} to="" className="header-link">
                    <Maximize className="full-screen-open header-link-icon" />
                    <Minimize className="full-screen-close header-link-icon d-none" />
                </Link>
            </div>*/

            /* Cart dropdown 
            <div className="header-element-nc cart-dropdown d-xl-flex d-none">
                <Link to="" className="header-link dropdown-toggle">
                    <ShoppingCart className="header-link-icon" />
                    <span className="badge bg-primary header-icon-badge" id="cart-icon-badge">5</span>
                </Link>
                <div className="main-header-dropdown dropdown-menu dropdown-menu-end">
                <div className="p-3">
                    <div className="d-flex align-items-center justify-content-between">
                        <p className="mb-0 fs-17 fw-semibold">Cart Items</p>
                        <span className="badge bg-primary rounded-pill" id="cart-data">5 Items</span>
                    </div>
                </div>
                <div>
                    <hr className="dropdown-divider" /></div>
                    <ul className="list-unstyled mb-0" id="header-cart-items-scroll" data-simplebar>
                        {/* Cart items go here 
                        <li className="dropdown-item">
                        <div className="d-flex align-items-center cart-dropdown-item">
                            <img src="../assets/images/ecommerce/jpg/1.jpg" alt="img" className="avatar avatar-sm br-5 me-3" />
                            <div className="flex-grow-1">
                                <p className="fs-14 mb-1">SomeThing Phone</p>
                                <div className="d-flex align-items-center justify-content-between">
                                    <span className="text-muted">$799 x 1</span>
                                    <div className="d-flex">
                                    <Link className="btn btn-icon btn-sm btn-outline-light" to="">
                                        <Plus className="fs-14" />
                                    </Link>
                                    <Link className="btn btn-icon btn-sm btn-outline-light" to="">
                                        <Minus className="fs-14" />
                                    </Link>
                                    </div>
                                </div>
                            </div>
                            <Link className="btn btn-icon btn-sm btn-outline-light" to="">
                                <Trash2 className="fs-14" />
                            </Link>
                        </div>
                        </li>
                        {/* More cart items 
                    </ul>
                    <div className="p-3 empty-cart d-none text-center">
                        <p className="fs-16 fw-semibold mb-0">Your Cart is Empty</p>
                    </div>
                    <div className="p-3">
                        <Link to="checkout.html" className="btn btn-primary w-100 text-center">Proceed to checkout</Link>
                    </div>
                </div>
            </div>*/

            /* Search bar
            <div className="header-element-nc search-bar d-xl-flex d-none">
                <form className="d-flex" role="search">
                <input className="form-control search-input" type="search" placeholder="Search..." aria-label="Search" />
                <button className="btn btn-light" type="submit">
                    <Search className="fe fe-search" />
                </button>
                </form>
            </div> */