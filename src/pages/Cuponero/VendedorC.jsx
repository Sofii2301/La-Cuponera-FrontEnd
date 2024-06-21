import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Vendedor from "../../components/Vendedor/Vendedor";
import ListaCupones from "../../components/Cupones/ListaCupones";
import { getCoupons } from "../../services/CuponesService";
import { getVendedorById } from "../../services/vendedoresService";
import portadaDefault from "../../assets/banner_default.png";
import logoDefault from "../../assets/logo_default.png";
import { useAuth } from "../../services/AuthContext";
import MapLatLong from "../../components/MapLatLong";
import HorarioDisplay from "../../components/Vendedor/HorarioDisplay"
import SocialMediaDisplay from '../../components/Vendedor/SocialMediaDisplay';
import Cuponeros from "../../components/Cuponero/Cuponeros";

export default function VendedorC() {
    const { user } = useAuth();
    const location = useLocation();
    const { id } = useParams();
    const [cupones, setCupones] = useState([]);
    const [vendedor, setVendedor] = useState(null);

    const vendedorId = id;

    useEffect(() => { 
        const fetchVendedorData = async () => {
            try {
                const data = await getVendedorById(vendedorId);
                setVendedor(data);
            } catch (error) {
                console.error('Error fetching vendor data:', error);
            }
        };

        fetchVendedorData();
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

    if (!vendedor) {
        return <div>Cargando...</div>;
    }

    return (
        <>
            <Cuponeros>
                <div className="container-fluid mt-3 ps-lg-5 pe-lg-5 ps-xl-5 pe-xl-5 ps-xxl-5 pe-xxl-5">
                    <div className="row square row-sm">
                        <div className="col-lg-12 col-md-12">
                            <div className="card custom-card">
                                <div className="card-body">
                                    <div className="panel profile-cover">
                                        <div className="profile-cover__action bg-img">
                                            {vendedor && vendedor.portada ? (
                                                <img src={`${import.meta.env.VITE_REACT_APP_IMAGES_PATH}${vendedor.portada}`} alt="Portada" className="img-perfil-v" />
                                            ) : (
                                                <img src={portadaDefault} alt="Portada" className="img-perfil-v" />
                                            )}
                                        </div>
                                        <div className="profile-cover__img logo-perfil-circulo-nombre">
                                            {vendedor && vendedor.logo ? (
                                                <img src={`${import.meta.env.VITE_REACT_APP_IMAGES_PATH}${vendedor.logo}`} alt="Logo" className="rounded-circle img-perfil-v" />
                                            ) : (
                                                <img src={logoDefault} alt="Logo" className="img-perfil-v" />
                                            )}
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
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row row-sm">
                        <div className="col-lg-12 col-md-12">
                            <div className="card custom-card main-content-body-profile">
                                <div className="tab-content">
                                    <div class="main-content-body tab-pane p-4 border-top-0 active" id="about" role="tabpanel">
                                        <div class="border rounded-10"> 
                                            <div class="p-4"> 
                                                <label class="main-content-label fs-13 mg-b-20">Descripción</label>
                                                {vendedor && vendedor.descripcion ? (
                                                    <p class="m-b-5">{vendedor.descripcion}</p>
                                                ) : (
                                                    <p class="m-b-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. At culpa atque repellat, qui impedit accusamus perspiciatis sint necessitatibus tempora, incidunt modi magnam consectetur similique id nihil ex laboriosam earum fuga!</p>
                                                )}
                                            </div> 
                                            <div class="border-top"></div> 
                                            <div className="p-4">
                                                {/* Mapa de localización */}
                                                <h4 class="fs-15 text-uppercase mb-3">Ubicación</h4>   
                                                <div className="container-map-pvp">
                                                    <MapLatLong coordinates={ vendedor.location && vendedor.location.coordinates && vendedor.location.coordinates[0] && vendedor.location.coordinates[1] && vendedor.location.coordinates } />  
                                                </div> 
                                            </div>
                                            <div class="border-top"></div> 
                                            <div class="p-4"> 
                                                <label class="main-content-label fs-13 mg-b-20">Contacto</label> 
                                                <div class="d-sm-flex"> 
                                                    <div class="mb-3 mb-sm-0"> 
                                                        <div class="main-profile-contact-list"> 
                                                            <div class="media"> 
                                                                <div class="media-icon bg-primary-transparent text-primary"> 
                                                                    <i class="bi bi-telephone-forward"></i> 
                                                                </div> 
                                                                <div class="media-body"> 
                                                                    <span>Teléfono</span> 
                                                                    {vendedor && vendedor.telefono ? (
                                                                        <div>{vendedor.telefono}</div>
                                                                    ) : (
                                                                        <div>12345678</div>
                                                                    )}
                                                                </div> 
                                                            </div> 
                                                        </div> 
                                                    </div> 
                                                    <div class="ms-0 ms-sm-5 mb-3 mb-sm-0"> 
                                                        <div class="main-profile-contact-list"> 
                                                            <div class="media"> 
                                                                <div class="media-icon bg-info-transparent text-info"> 
                                                                    <i class="bi bi-geo-alt"></i> 
                                                                </div> 
                                                                <div class="media-body"> 
                                                                    <span>Dirección</span> 
                                                                    {vendedor && vendedor.dirTiendaFisica ? (
                                                                        <div>{vendedor.dirTiendaFisica}</div>
                                                                    ) : (
                                                                        <div>Calle 123</div>
                                                                    )} 
                                                                </div> 
                                                            </div> 
                                                        </div> 
                                                    </div>
                                                    <div class="ms-0 ms-sm-5 mb-3 mb-sm-0"> 
                                                        <div class="horarios"> 
                                                            <div class="media"> 
                                                                <div class="media-icon bg-primary-transparent text-primary"> 
                                                                    <i class="bi bi-clock"></i> 
                                                                </div> 
                                                                <div class="media-body"> 
                                                                    <span>Horarios</span> 
                                                                    {vendedor && vendedor.horariosTiendaFisica ? (
                                                                        <p><HorarioDisplay horarios={vendedor.horariosTiendaFisica} /></p>
                                                                    ) : (
                                                                        <p>--:-- a --:--</p>
                                                                    )}
                                                                </div> 
                                                            </div> 
                                                        </div> 
                                                    </div>
                                                </div> 
                                            </div> 
                                            <div class="border-top"></div> 
                                            <div class="p-3 p-sm-4"> 
                                                <label class="main-content-label fs-13 mg-b-20">Redes Sociales</label> 
                                                <div class="d-xl-flex"> 
                                                    <div class="ms-0 ms-xl-3 mb-3 mb-xl-0"> 
                                                        <SocialMediaDisplay socialMediaString={vendedor.redesSociales} />
                                                    </div> 
                                                </div>
                                            </div> 
                                            <div class="border-top"></div> 
                                            <div className="p-4 container-cupones-previa">
                                                <div className="row">
                                                    <h4 class="fs-15 text-uppercase mb-3">Cupones</h4>
                                                </div>
                                                <div className="row ">
                                                    <div className="col">
                                                        <div className="cupones-previa">
                                                            <ListaCupones  listaCupones={cupones}/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> 
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Cuponeros>
        </>
    );
}
