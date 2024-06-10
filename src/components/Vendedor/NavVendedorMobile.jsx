import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Offcanvas } from "react-bootstrap";
import logo from "../../assets/logo.png";
import Nav from "../Nav";
import NavConfig from "../NavConfig";
import {
    FaHome,
    FaBars,
    FaUserAlt,
    FaRegChartBar,
    FaRegCreditCard,
    FaThList,
    FaArrowCircleDown,
    FaEdit,
    FaSlidersH,
    FaUsers
} from "react-icons/fa";
import { MdLocalOffer } from "react-icons/md";

export default function NavVendedorMobile({ children }) {
    const [showSidebar, setShowSidebar] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null); // Estado para controlar qué menú desplegable está abierto
    const navigate = useNavigate(); // Hook para navegar programáticamente

    const toggleDropdown = (index, item) => {
        if (item.dropdown) {
            // Si la sidebar está abierta, abre/cierra el dropdown
            setOpenDropdown(openDropdown === index ? null : index);
        } else {
            navigate(item.path);
        }
    };

    const menuItem = [
        {
            path: "/vendedor/",
            name: "Inicio",
            icon: <FaHome />
        },
        {
            path: "/vendedor/perfil/vista-previa",
            name: "Perfil",
            icon: <FaUserAlt />
        },
        {
            path: "/vendedor/estadisticas",
            name: "Estadísticas",
            icon: <FaRegChartBar />
        },
        {
            path: "/vendedor/cupones/mis-cupones",
            name: "Mis Cupones",
            icon: <MdLocalOffer />,
            /*dropdown: [ // Agrega un array para las opciones desplegables
                {
                    path: "/vendedor/cupones/mis-cupones",
                    name: "Gestionar Cupones",
                    icon: <FaSlidersH />
                },
                {
                    path: "/vendedor/cupones/mis-cuponeros",
                    name: "Mis Cuponeros",
                    icon: <FaUsers />
                },
            ]*/
        },
        {
            path: "/vendedor/pagos/cambiar-plan",
            name: "Pagos y suscripciones",
            icon: <FaRegCreditCard />
        }
    ]

    const handleClose = () => setShowSidebar(false);
    const handleShow = () => setShowSidebar(true);

    return (
        <>
            <Nav 
                children={
                    <button className="btn btn-primary" type="button" onClick={handleShow}>
                        <i className="bi bi-list"></i>
                    </button>
                } 
                children2={<NavConfig/>}
            />
            <Offcanvas className="sidebar-nav-mobile" show={showSidebar} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>
                        <Link to="/" className="navbar-brand" style={{ display: showSidebar ? "block" : "none" }}>
                            <img 
                                src={logo} 
                                alt="La Cuponera" 
                                //className="d-inline-block align-text-top logo-sidebar"
                                className={`d-inline-block align-text-top logo-sidebar`}
                            />
                        </Link>
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {
                        menuItem.map((item, index) => (
                            <div key={index}>
                                <div className={`sidebar-link ${location.pathname === item.path ? 'active' : ''}`} onClick={() => toggleDropdown(index, item)}>
                                    <div className="icon-sidebar">{item.icon}</div>
                                    <div className="sidebar-link_text">{item.name}</div>
                                </div>
                                {/* Agregar opciones desplegables */}
                                {openDropdown === index && item.dropdown && (
                                    <div style={{ paddingLeft: "20px" }}>
                                        {item.dropdown.map((option, idx) => (
                                            <NavLink to={option.path} key={idx} className="sidebar-link">
                                                <div className="icon-sidebar">{option.icon}</div>
                                                <div className="sidebar-link_text">{option.name}</div>
                                            </NavLink>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))
                    }
                </Offcanvas.Body>
            </Offcanvas>
            <div className="container mt-3">
                {children}
            </div>
        </>
    );
}
