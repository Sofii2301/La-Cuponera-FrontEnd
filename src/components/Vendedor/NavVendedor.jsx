import { useState } from 'react';
import { FaHome, FaBars, FaUserAlt, FaRegChartBar, FaRegCreditCard} from "react-icons/fa";
import { MdLocalOffer } from "react-icons/md";
import { CgEditBlackPoint } from "react-icons/cg";
import { Link, useNavigate } from 'react-router-dom';
import logo from "../../assets/logo.png";
import isotipo from "../../assets/HumanBeing/isotipo_hb.png";

const Sidebar = ({ children, disableButtons, plan }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null); // Estado para controlar qué menú desplegable está abierto
    const navigate = useNavigate(); // Hook para navegar programáticamente

    const toggle = () => setIsOpen(!isOpen);

    const toggleDropdown = (index, item) => {
        if (!isOpen) {
            // Si la sidebar está cerrada, navega al path
            navigate(item.path);
        } else {
            if (item.dropdown) {
                // Si la sidebar está abierta, abre/cierra el dropdown
                setOpenDropdown(openDropdown === index ? null : index);
            } else {
                navigate(item.path);
            }
        }
    };

    const menuItem = [
        { path: "/vendedor/", name: "Inicio", icon: <FaHome /> },
        { path: "/vendedor/perfil/vista-previa", name: "Perfil", icon: <FaUserAlt /> },
        { path: "/vendedor/estadisticas", name: "Estadísticas", icon: <FaRegChartBar /> },
        { path: "/vendedor/cupones/mis-cupones", name: "Mis Cupones", icon: <MdLocalOffer /> },
        { path: "/vendedor/humanbeing/comingsoon", name: "Human Being", icon: <img src={isotipo} alt="Isotipo Human Being" /> },
        //{ path: `/vendedor/pagos/cambiar-plan/${plan}`, name: "Pagos", icon: <FaRegCreditCard /> }
    ];

    return (
        <div className="container-sidebar">
            <div style={{ width: isOpen ? "200px" : "50px" }} className={`sidebar-v ${isOpen ? "open" : ""}`}>
                <div className="top_section">
                    <Link to="/vendedor/perfil/vista-previa" className={`navbar-brand ${disableButtons ? 'disabled' : ''}`} style={{ display: isOpen ? "block" : "none" }}>
                        <img src={logo} alt="La Cuponera" className="d-inline-block align-text-top logo-sidebar" />
                    </Link>
                    <div style={{ marginLeft: isOpen ? "15px" : "0px" }} className="bars">
                        <FaBars onClick={toggle} />
                    </div>
                </div>
                {menuItem.map((item, index) => (
                    <div key={index}>
                        <div 
                            className={`sidebar-link ${location.pathname === item.path ? 'active' : ''} ${(disableButtons || (plan === 3 && item.path === '/vendedor/cupones/mis-cupones')) ? 'disabled' : ''}`}  
                            onClick={() => toggleDropdown(index, item)}
                            style={disableButtons ? { pointerEvents: 'none' } : {}}
                        >
                            <div className="icon-sidebar">{item.icon}</div>
                            <div style={{ display: isOpen ? "block" : "none" }} className="sidebar-link_text">{item.name}</div>
                        </div>
                    </div>
                ))}
            </div>
            <div className='content-sidebar'>{children}</div>
        </div>
    );
};

export default Sidebar;
