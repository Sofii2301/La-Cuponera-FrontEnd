import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Vendedor from "../../components/Vendedor/Vendedor";
import ListaCupones from "../../components/Cupones/ListaCupones";
import { getCouponsByVendor } from "../../services/CuponesService";
import { getVendedorById, getCoverImage, getLogoImage, getPlan } from "../../services/vendedoresService";
import portadaDefault from "../../assets/banner_default.png";
import logoDefault from "../../assets/logo_default.png";
import GenericModal from '../../components/Modal';
import UploadImage, { uploadTypes } from '../../components/Vendedor/UploadImage';
import Raiting from '../../components/Raiting'
import { useAuth } from "../../context/AuthContext";
import { isNil } from "lodash";

export default function Perfil({children}) {
    const { user, userType } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [cupones, setCupones] = useState([]);
    const [vendedor, setVendedor] = useState(null);
    const [portada, setPortada] = useState(null);
    const [logo, setLogo] = useState(null);
    const [plan, setPlan] = useState(0);
    const [isVendedor, setIsVendedor] = useState(false);
    const [showModalImage, setShowModalImage] = useState(false);
    const [imageType, setImageType] = useState(''); // Nuevo estado para el tipo de imagen

    const vendedorId = user;
    const fetchVendedorData = async () => {
        try {
            const data = await getVendedorById(vendedorId,'Complete');
            setVendedor(data[0]);
            setIsVendedor(userType === "vendedor");
        } catch (error) {
            console.error('Error fetching vendor data:', error);
        }
    };

    const fetchPortada = async () => {
        try {
            const portadaImg = await getCoverImage(vendedorId);
            setPortada(portadaImg);
        } catch (error) {
            setPortada(null);
            console.error('Error fetching portada:', error);
        }
    };

    const fetchLogo = async () => {
        try {
            const logoImg = await getLogoImage(vendedorId);
            setLogo(logoImg);
        } catch (error) {
            setLogo(null);
            console.error('Error fetching logo:', error);
        }
    };

    const fetchCouponsData = async () => {
        try {
            const vendorCoupons = await getCouponsByVendor(vendedorId);
            setCupones(vendorCoupons);
        } catch (error) {
            console.error('Error fetching coupons:', error);
        }
    };

    const fetchPlan = async () => {
        try {
            const plan = await getPlan(vendedorId);
            setPlan(plan);
        } catch (error) {
            console.error('Error fetching plan:', error);
        }
    };

    useEffect(() => {
        fetchVendedorData();
        fetchPortada();
        fetchLogo();
        fetchPlan();
    }, [vendedorId, userType]);

    useEffect(() => {
        fetchCouponsData();
    }, [vendedorId]);

    const handleOpenModalImage = (type) => {
        setImageType(type);
        setShowModalImage(true);
    }
    const handleCloseModalImage = () => setShowModalImage(false);

    const onRefetch = (type) => {
        if(type == uploadTypes.LOGO) {
            fetchLogo();
        } else {
            fetchPortada();
        }
    }

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
                                                <img src={portadaDefault} alt="Portada default" className="img-perfil-v" />
                                            )}
                                            {isVendedor && (
                                                <>
                                                    <button type="button" className="upload-button-camera" onClick={() => handleOpenModalImage('portada')}>
                                                        <i className="bi bi-camera"></i>
                                                    </button>
                                                    <GenericModal
                                                        show={showModalImage && imageType === 'portada'}
                                                        handleClose={handleCloseModalImage}
                                                        title="Actualizar Portada"
                                                    >
                                                        <UploadImage
                                                            vendedorId={vendedorId}
                                                            type={uploadTypes.PORTADA}
                                                            existingImage={!isNil(portada)}
                                                            refetch={() => onRefetch(uploadTypes.PORTADA)}
                                                            onDelete={ () => {setPortada(null)}}
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
                                                    <img src={logoDefault} alt="Logo default" className="img-perfil-v" />
                                                )}
                                                {isVendedor && (
                                                    <>
                                                        <button type="button" className="upload-button-plus" onClick={() => handleOpenModalImage('logo')}>
                                                            <i className="bi bi-plus"></i>
                                                        </button>
                                                        <GenericModal
                                                            show={showModalImage && imageType === 'logo'}
                                                            handleClose={handleCloseModalImage}
                                                            title="Actualizar Logo"
                                                        >
                                                            <UploadImage
                                                                vendedorId={vendedorId}
                                                                type={uploadTypes.LOGO}
                                                                existingImage={!isNil(logo)}
                                                                refetch={ () => onRefetch(uploadTypes.LOGO)}
                                                                onDelete={ () => { setLogo(null) }}
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
                                                <Raiting vendedorId={vendedorId}/>
                                            </div>
                                        </div>
                                        <div className="btn-profile">
                                        </div>
                                        <div className="profile-cover__info">
                                            <ul className="nav">
                                                <li>
                                            <button className="btn rounded-10 btn-rosa">
                                                <i className="fa fa-plus"></i>
                                                <span>Seguir</span>
                                            </button></li>
                                                <li><strong>{cupones.length}</strong>Cupones</li>
                                                <li><strong>{vendedor && vendedor.seguidores ? vendedor.seguidores.length : 0}</strong>Seguidores</li>
                                            </ul>
                                        </div>
                                    </div>
                                        <h5>Categorias:</h5>
                                                {vendedor && vendedor.categorias ? (
                                                    <p>{vendedor.categorias.join(', ')}</p>
                                                ) : (
                                                    <p>Categorias</p>
                                                )}
                                    <div className="profile-tab tab-menu-heading barra-perfil-v">
                                        <nav className="nav main-nav-line tabs-menu profile-nav-line" role="tablist">
                                            <Link
                                                className={`nav-link ${location.pathname === '/vendedor/perfil/vista-previa' ? 'active' : ''}`}
                                                to="/vendedor/perfil/vista-previa"
                                                role="tab"
                                            >Vista Previa</Link>
                                            <Link
                                                className={`nav-link ${location.pathname === '/vendedor/perfil/editar-perfil' ? 'active' : ''}`}
                                                to="/vendedor/perfil/editar-perfil"
                                                role="tab"
                                            >Editar Perfil</Link>
                                            {(plan === 2) && (
                                                <Link
                                                    className={`nav-link ${location.pathname === '/vendedor/perfil/video' ? 'active' : ''}`}
                                                    to="/vendedor/perfil/video"
                                                    role="tab"
                                                >Video Comercial</Link>
                                            )}
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
