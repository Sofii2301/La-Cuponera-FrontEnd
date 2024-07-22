import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ListaCupones from "../../components/Cupones/ListaCupones";
import Perfil from "./Perfil"
import MapLatLong from "../../components/MapLatLong";
import Loading from "../../components/Loading";
import HorarioDisplay from "../../components/Vendedor/HorarioDisplay"
import SocialMediaDisplay from '../../components/Vendedor/SocialMediaDisplay';
import Cupon from "../../components/Cupones/Cupon";
import { getVendedorById } from "../../services/vendedoresService";
import { getCouponsByVendor } from '../../services/CuponesService';
import { useAuth } from '../../services/AuthContext';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {  responsive } from "../../js/slider";
import ComentariosList from '../../components/ComentariosList'

export default function Perfil_vistaPrevia() {
    const [vendedor, setVendedor] = useState([]);
    const [cupones, setCupones] = useState([]);
    const { authState } = useAuth();
    const vendedorId = authState.user;

    useEffect(() => {  
        const fetchVendedorData = async () => {
            try {
                const dat = await getVendedorById(vendedorId,'Complete');
                const data = dat[0];
                data.horariosTiendaFisica = JSON.parse(data.horariosTiendaFisica);
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
                const vendorCoupons = await getCouponsByVendor(vendedorId);
                setCupones(vendorCoupons);
                
            } catch (error) {
                console.error('Error fetching coupons:', error);
            }
        };

        fetchCouponsData();
        console.log('cupon: ', cupon)
    }, [vendedorId]);

    if (!vendedor) {
        return <Loading/>;
    }

    const cupon = cupones.map((item, index) => (
        <Cupon
            key={index}
            discount={item.discount}
            id={item.id} 
            categorias={item.categorias}
            title={item.title}
            raiting={item.raiting}
            price={item.price}
        />
    ));

    return (
        <>
        <Perfil>
            <div className="row row-sm">
                <div className="col-lg-12 col-md-12">
                    <div className="card custom-card main-content-body-profile">
                        <div className="tab-content">
                            <div className="main-content-body tab-pane p-4 border-top-0 active" id="about" role="tabpanel">
                                <div className="border rounded-10"> 
                                    <div className="p-4"> 
                                        <label className="main-content-label fs-13 mg-b-20">Contacto</label> 
                                        <div className="d-sm-flex"> 
                                            {vendedor && vendedor.telefono && (
                                            <div className="mb-3 mb-sm-0"> 
                                                <div className="main-profile-contact-list"> 
                                                    <div className="media"> 
                                                        <div className="media-icon bg-primary-transparent text-primary"> 
                                                            <i className="bi bi-telephone-forward"></i> 
                                                        </div> 
                                                        <div className="media-body"> 
                                                            <span>Teléfono</span> 
                                                            <div>{vendedor.telefono}</div>
                                                        </div> 
                                                    </div> 
                                                </div> 
                                            </div> 
                                            )}
                                            {vendedor && vendedor.dirTiendaFisica && (
                                            <div className="ms-0 ms-sm-5 mb-3 mb-sm-0"> 
                                                <div className="main-profile-contact-list"> 
                                                    <div className="media"> 
                                                        <div className="media-icon bg-info-transparent text-info"> 
                                                            <i className="bi bi-geo-alt"></i> 
                                                        </div> 
                                                        <div className="media-body"> 
                                                            <span>Dirección</span> 
                                                            <div>{vendedor.dirTiendaFisica}</div>
                                                        </div> 
                                                    </div> 
                                                </div> 
                                            </div>
                                            )} 
                                            {vendedor && vendedor.paginaWeb && (
                                            <div className="ms-0 ms-sm-5 mb-3 mb-sm-0"> 
                                                <div className="main-profile-contact-list"> 
                                                    <div className="media"> 
                                                        <div className="media-icon bg-info-transparent text-info"> 
                                                            <i className="bi bi-globe2"></i> 
                                                        </div> 
                                                        <div className="media-body"> 
                                                            <span>Página web</span> 
                                                            <div>{vendedor.paginaWeb}</div>
                                                        </div> 
                                                    </div> 
                                                </div> 
                                            </div>)}
                                        </div> 
                                    </div> 
                                    <div className="border-top"></div> 
                                    <div className="d-flex flex-sm-column flex-md-row">
                                        <div className="p-3 p-sm-4"> 
                                            <label className="main-content-label fs-13 mg-b-20">Redes Sociales</label> 
                                            <div className="d-xl-flex"> 
                                                <div className="ms-0 ms-xl-3 mb-3 mb-xl-0"> 
                                                    <SocialMediaDisplay socialMediaString={vendedor.redesSociales} />
                                                </div> 
                                            </div>
                                        </div> 
                                        <div className="border-top"></div> 
                                        {vendedor && vendedor.descripcion && (
                                        <>
                                        <div className="p-4 container-descrip-v"> 
                                            <label className="main-content-label fs-13 mg-b-20">Descripción</label>
                                            <p className="m-b-5 d-flex">{vendedor.descripcion}</p>
                                        </div> 
                                        </>
                                        )}
                                    </div>
                                    <div className="border-top"></div> 
                                    <div className="p-4">
                                        <label className="main-content-label fs-13 mg-b-20">Horarios</label>
                                        <div className="mb-3 mb-xl-0"> 
                                            <div className="horarios"> 
                                                <div className="media"> 
                                                    <div className="media-icon bg-primary-transparent text-primary"> 
                                                        <i className="bi bi-clock"></i> 
                                                    </div> 
                                                    <div className="media-body">  
                                                        {vendedor && vendedor.horariosTiendaFisica && (vendedor.horariosTiendaFisica !== '{}') ? (
                                                            <p><HorarioDisplay horarios={vendedor.horariosTiendaFisica} /></p>
                                                        ) : (
                                                            <p>--:-- a --:--</p>
                                                        )}
                                                    </div> 
                                                </div> 
                                            </div> 
                                        </div>
                                    </div>
                                    <div className="border-top"></div>
                                    <div className="p-4">
                                        {/* Mapa de localización */}
                                        <label className="main-content-label text-uppercase mb-3">Ubicación</label>   
                                        <div className="container-map-pvp">
                                            <MapLatLong coordinates={ vendedor.location && vendedor.location.coordinates && vendedor.location.coordinates[0] && vendedor.location.coordinates[1] && vendedor.location.coordinates } />  
                                        </div> 
                                    </div>
                                    <div className="border-top"></div> 
                                    <div className="p-4 container-cupones-previa">
                                        <div className="row">
                                            <label className="main-content-label text-uppercase mb-3">Cupones</label>
                                        </div>
                                        <div className="p-2 cupones-previa">
                                            <Carousel className="carousel-cupones" itemClass="carousel-item-custom" showDots={true} responsive={responsive}>
                                                {cupon}
                                            </Carousel>
                                        </div>
                                    </div>
                                    <div className="border-top"></div> 
                                    <div className="p-4">
                                        <div className="row">
                                            <label className="main-content-label text-uppercase mb-3">Comentarios</label>
                                        </div>
                                        <div className="p-2">
                                            <ComentariosList id={vendedor.vendedor_id} tipo='vendedor'></ComentariosList>
                                        </div>
                                    </div>
                                </div> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Perfil>
        </>
    );
}