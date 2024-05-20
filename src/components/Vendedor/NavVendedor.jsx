import React, { useState } from 'react';
import {
    FaHome,
    FaBars,
    FaUserAlt,
    FaRegChartBar,
    FaRegCreditCard ,
    FaThList,
    FaArrowCircleDown,
    FaEdit,
    FaSlidersH,
    FaUsers
}from "react-icons/fa";
import { MdLocalOffer } from "react-icons/md";
import { Link, NavLink } from 'react-router-dom';
import logo from "../../assets/logo.png";

const Sidebar = ({children}) => {
    const[isOpen ,setIsOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null); // Estado para controlar qué menú desplegable está abierto
    
    const toggle = () => setIsOpen (!isOpen);

    const toggleDropdown = (index) => {
        setOpenDropdown(openDropdown === index ? null : index);
    };

    const menuItem=[
        {
            path:"/vendedor/",
            name:"Inicio",
            icon:<FaHome/>
        },
        {
            path:"/vendedor/perfil/vista-previa",
            name:"Perfil",
            icon:<FaUserAlt/>
        },
        {
            path:"/vendedor/estadisticas",
            name:"Estadísticas",
            icon:<FaRegChartBar/>
        },
        {
            path:"",
            name:"Mis Cupones",
            icon:<MdLocalOffer />,
            dropdown: [ // Agrega un array para las opciones desplegables
                {
                    path: "/vendedor/cupones/mis-cupones",
                    name: "Gestionar Cupones",
                    icon:<FaSlidersH />
                },
                {
                    path: "/vendedor/cupones/mis-cuponeros",
                    name: "Mis Cuponeros",
                    icon:<FaUsers />
                },
            ]
        },
        {
            path:"/",
            name:"Pagos",
            icon:<FaRegCreditCard />
        }
    ]

    return (
        <>
            <div className="container-sidebar">
            <div style={{width: isOpen ? "200px" : "50px"}} className="sidebar">
                <div className="top_section">
                        <Link to="/" className="navbar-brand" style={{display: isOpen ? "block" : "none"}}>
                            <img src={logo} alt="La Cuponera" className="d-inline-block align-text-top logo-sidebar" />
                        </Link>
                        <div style={{marginLeft: isOpen ? "15px" : "0px"}} className="bars">
                            <FaBars onClick={toggle}/>
                        </div>
                </div>
                {
                    menuItem.map((item, index) => (
                        <div key={index}>
                            <NavLink className="sidebar-link" to={item.path} onClick={() => toggleDropdown(index)}>
                                <div className="icon-sidebar">{item.icon}</div>
                                <div style={{ display: isOpen ? "block" : "none" }} className="sidebar-link_text">{item.name}</div>
                            </NavLink>
                            {/* Agregar opciones desplegables */}
                            {openDropdown === index && item.dropdown && (
                                <div style={{ paddingLeft: "20px" }}>
                                    {isOpen && item.dropdown.map((option, idx) => (
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
            </div>
            <div className='content-sidebar'>{children}</div>
            </div>
        </>
    );
};

export default Sidebar;