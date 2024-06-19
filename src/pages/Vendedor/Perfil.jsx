import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Vendedor from "../../components/Vendedor/Vendedor";
import ListaCupones from "../../components/Cupones/ListaCupones";
import { getCoupons } from "../../services/CuponesService";
import { getVendedorById, getCoverImage, getLogoImage } from "../../services/vendedoresService";
import portadaDefault from "../../assets/banner_default.png";
import logoDefault from "../../assets/logo_default.png";
import GenericModal from '../../components/Modal';
import UploadLogo from '../../components/Vendedor/UploadLogo';
import UploadPortada from '../../components/Vendedor/UploadPortada';
import { useAuth } from "../../services/AuthContext";

export default function Perfil({children}) {
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [cupones, setCupones] = useState([]);
    const [vendedor, setVendedor] = useState(null);
    const [portada, setPortada] = useState(null);
    const [logo, setLogo] = useState(null);
    const [isVendedor, setIsVendedor] = useState(false);
    const [showModalImage, setShowModalImage] = useState(false);
    const [imageType, setImageType] = useState(''); // Nuevo estado para el tipo de imagen

    const vendedorId = user;

    useEffect(() => { 
        const fetchVendedorData = async () => {
            try {
                const data = await getVendedorById(vendedorId);
                setVendedor(data);
                setIsVendedor(data.type === "vendedor");
            } catch (error) {
                console.error('Error fetching vendor data:', error);
            }
        };

        const fetchPortada = async () => {
            try {
                const portadaImg = await getCoverImage(vendedorId);
                setPortada(portadaImg);
                console.log("portada: ", portadaImg);
            } catch (error) {
                console.error('Error fetching portada:', error);
            }
        };

        const fetchLogo = async () => {
            try {
                const logoImg = await getLogoImage(vendedorId);
                setLogo(logoImg);
                console.log("logo: ", logoImg);
            } catch (error) {
                console.error('Error fetching logo:', error);
            }
        };

        fetchVendedorData();
        fetchPortada();
        fetchLogo();
    }, [vendedorId]);

    useEffect(() => {
        const fetchCouponsData = async () => {
            try {
                const allCoupons = await getCoupons();
                const vendorCoupons = allCoupons.filter(coupon => coupon.createdBy === vendedorId);
                setCupones(vendorCoupons);
            } catch (error) {
                console.error('Error fetching coupons:', error);
            }
        };

        fetchCouponsData();
    }, [vendedorId]);

    const handleOpenModalImage = (type) => {
        setImageType(type);
        setShowModalImage(true);
    };
    const handleCloseModalImage = () => setShowModalImage(false);

    return (
        <>
            <Vendedor>
                <div className="container-fluid mt-3">
                    <div className="row square row-sm">
                        <div className="col-lg-12 col-md-12">
                            <div className="card custom-card">
                                <div className="card-body">
                                    <div className="panel profile-cover">
                                        <div className="profile-cover__action bg-img">
                                            {portada ? (
                                                <img src={portada} alt="Portada" className="img-perfil-v" />
                                            ) : (
                                                <img src={portadaDefault} alt="Portada" className="img-perfil-v" />
                                            )}
                                            {isVendedor && (
                                                <>
                                                    <button type="button" className="upload-button-camera" onClick={() => handleOpenModalImage('portada')}>
                                                        <i className="bi bi-camera"></i>
                                                    </button>
                                                    <GenericModal
                                                        show={showModalImage && imageType === 'portada'}
                                                        handleClose={handleCloseModalImage}
                                                        title="Subir Portada"
                                                    >
                                                        <UploadPortada
                                                            vendedorId={vendedorId}
                                                            existingImage={portada}
                                                        />
                                                    </GenericModal>
                                                </>
                                            )}
                                        </div>
                                        <div className="profile-cover__img logo-perfil-circulo-nombre">
                                            <div className="logo-button-plus">
                                                {logo ? (
                                                    <img src={logo} alt="Logo" className="rounded-circle img-perfil-v" />
                                                ) : (
                                                    <img src={logoDefault} alt="Logo" className="img-perfil-v" />
                                                )}
                                                {isVendedor && (
                                                    <>
                                                        <button type="button" className="upload-button-plus" onClick={() => handleOpenModalImage('logo')}>
                                                            <i className="bi bi-plus"></i>
                                                        </button>
                                                        <GenericModal
                                                            show={showModalImage && imageType === 'logo'}
                                                            handleClose={handleCloseModalImage}
                                                            title="Subir Logo"
                                                        >
                                                            <UploadLogo
                                                                vendedorId={vendedorId}
                                                                existingImage={logo}
                                                            />
                                                        </GenericModal>
                                                    </>
                                                )}
                                            </div>
                                            <div className="nombre-categorias-perfil">
                                                {vendedor && vendedor.nombreTienda ? (
                                                    <h3>{vendedor.nombreTienda}</h3>
                                                ) : (
                                                    <h3>Nombre de la Tienda</h3>
                                                )}
                                                {vendedor && vendedor.categorias ? (
                                                    <p>{vendedor.categorias.join(', ')}</p>
                                                ) : (
                                                    <p>Categorias</p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="btn-profile">
                                            <button className="btn rounded-10 btn-rosa">
                                                <i className="fa fa-plus"></i>
                                                <span>Seguir</span>
                                            </button>
                                        </div>
                                        <div className="profile-cover__info">
                                            <ul className="nav">
                                                <li><strong>{cupones.length}</strong>Cupones</li>
                                                <li><strong>{vendedor && vendedor.seguidores ? vendedor.seguidores.length : 0}</strong>Seguidores</li> 
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="profile-tab tab-menu-heading">
                                        <nav className="nav main-nav-line tabs-menu profile-nav-line" role="tablist">
                                            <Link
                                                className={`nav-link ${location.pathname === '/vendedor/perfil/vista-previa' ? 'active' : ''}`}
                                                to="/vendedor/perfil/vista-previa"
                                                role="tab"
                                            >Información</Link>
                                            <Link
                                                className={`nav-link ${location.pathname === '/vendedor/perfil/editar-perfil' ? 'active' : ''}`}
                                                to="/vendedor/perfil/editar-perfil"
                                                role="tab"
                                            >Editar Perfil</Link>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {children}
                </div>
            </Vendedor>
        </>
    );
}
