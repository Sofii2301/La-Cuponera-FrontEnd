import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Vendedor from "../../components/Vendedor/Vendedor";
import ListaCupones from "../../components/Cupones/ListaCupones";
import { getCoupons } from "../../services/CuponesService";
import { getVendedorById, uploadImage } from "../../services/vendedoresService";
import portadaDefault from "../../assets/banner_default.png";
import logoDefault from "../../assets/logo_default.png";
import Map from "../../components/Map";

export default function Perfil({children}) {
    const navigate = useNavigate();
    const location = useLocation();
    //const vendedorLocalData = JSON.parse(localStorage.getItem("vendedorData"));
    const [cupones, setCupones] = useState([]);
    const [vendedor, setVendedor] = useState(null);
    const [isVendedor, setIsVendedor] = useState(false);

    const vendedorId = "";
    
    
    
    useEffect(() => { 
        const fetchVendedorData = async () => {
            try {
                const data = await getVendedorById(vendedorId);
                setVendedor(data);
                setIsVendedor(data.type === "vendedor");
                console.log("type: ", isVendedor);
            } catch (error) {
                console.error('Error fetching vendor data:', error);
            }
        };

        fetchVendedorData();
    }, [vendedorId]);

    //////////////////////////////////////////////////////////////////////////////
    /*useEffect(() => {
        const data = JSON.parse(localStorage.getItem("laCuponeraData"));
        data.cuponeraData.logo = null;
        data.cuponeraData.portada = null;
        setIsVendedor(true);
        setVendedor(data.cuponeraData);
    }, []);*/
    //////////////////////////////////////////////////////////////////////////

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

    const handlePortadaUpload = async (event) => {
        const file = event.target.files[0];
        if (file) {
            try {
                const response = await uploadImage(vendedorId, file, 'portada');
                setVendedor((prev) => ({ ...prev, portada: response.imagePath }));
            } catch (error) {
                console.error('Error uploading portada:', error);
            }
        }
    };

    const handleLogoUpload = async (event) => {
        const file = event.target.files[0];
        if (file) {
            try {
                const response = await uploadImage(vendedorId, file, 'logo');
                setVendedor((prev) => ({ ...prev, logo: response.imagePath }));
            } catch (error) {
                console.error('Error uploading logo:', error);
            }
        }
    };

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
                                        {vendedor && vendedor.portada ? (
                                            <img src={vendedor.portada} alt="Portada" className="img-perfil-v" />
                                        ) : (
                                            <img src={portadaDefault} alt="Portada" className="img-perfil-v" />
                                        )}
                                        {isVendedor && (
                                            <button className="upload-button-camera"><i className="bi bi-camera"></i></button>
                                            /*<label className="upload-button-camera">
                                                <i className="bi bi-camera"></i>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handlePortadaUpload}
                                                    style={{ display: 'none' }}
                                                />
                                            </label>*/
                                        )}
                                    </div>
                                    <div className="profile-cover__img">
                                        {vendedor && vendedor.logo ? (
                                            <img src={vendedor.logo} alt="Logo" className="rounded-circle img-perfil-v" />
                                        ) : (
                                            <img src={logoDefault} alt="Logo" className="img-perfil-v" />
                                        )}
                                        {isVendedor && (
                                            <button className="upload-button-plus"><i className="bi bi-plus"></i></button>
                                            /*<label className="upload-button-plus">
                                                <i className="bi bi-plus"></i>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleLogoUpload}
                                                    style={{ display: 'none' }}
                                                />
                                            </label>*/
                                        )}
                                        {vendedor && vendedor.nombreTienda ? (
                                            <h3>{vendedor.nombreTienda}</h3>
                                        ) : (
                                            <h3>Nombre de la Tienda</h3>
                                        )}
                                        {/* {vendedor && vendedor.rubro ? (
                                            <p>{vendedor.rubro}</p>
                                        ) : (
                                            <p>Rubro</p>
                                        )} */}
                                        {vendedor && vendedor.categorias ? (
                                            //<p>{vendedor.categorias.join(', ')}</p>
                                            <p>{vendedor.categorias}</p>
                                        ) : (
                                            <p>Categorias</p>
                                        )}
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