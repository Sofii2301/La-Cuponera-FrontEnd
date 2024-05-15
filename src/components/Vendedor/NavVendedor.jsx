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
    FaSlidersH 
}from "react-icons/fa";
import { MdLocalOffer } from "react-icons/md";
import { Link, NavLink } from 'react-router-dom';
import logo from "../../assets/logo.png";

const Sidebar = ({children}) => {
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
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
            path:"/vendedor/cupones/mis-cupones",
            name:"Mis Cupones",
            icon:<MdLocalOffer />
        },
        {
            path:"/vendedor/cupones/editar-cupones",
            name:"Gestionar Cupones",
            icon:<FaSlidersH />
        },
        {
            path:"/vendedor/cupones/descargas",
            name:"Descargas",
            icon:<FaArrowCircleDown />
        },
        {
            path:"/",
            name:"Pagos",
            icon:<FaRegCreditCard />
        },
        {
            path:"/vendedor/perfil/editar-perfil",
            name:"Editar Perfil",
            icon:<FaEdit />
        },
    ]
    return (
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
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="sidebar-link">
                           <div className="icon-sidebar">{item.icon}</div>
                           <div style={{display: isOpen ? "block" : "none"}} className="sidebar-link_text">{item.name}</div>
                       </NavLink>
                   ))
               }
           </div>
           <div className='content-sidebar'>{children}</div>
        </div>
    );
};

export default Sidebar;