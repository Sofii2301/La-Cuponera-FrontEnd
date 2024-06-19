import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ListaCupones from "../../components/Cupones/ListaCupones";
import Perfil from "./Perfil"
import MapLatLong from "../../components/MapLatLong";
import HorarioDisplay from "../../components/Vendedor/HorarioDisplay"
import SocialMediaDisplay from '../../components/Vendedor/SocialMediaDisplay';
import { getVendedorById } from "../../services/vendedoresService";
import { getCoupons } from '../../services/CuponesService';
import { useAuth } from '../../services/AuthContext';

export default function Perfil_vistaPrevia() {
    const [vendedor, setVendedor] = useState([]);
    const [cupones, setCupones] = useState([]);
    const { authState } = useAuth();
    const vendedorId = authState.user;

    //////////////////////////////////////////////////////////////////////////////
    /*useEffect(() => {
        const data = JSON.parse(localStorage.getItem("laCuponeraData"));
        setVendedor(data.cuponeraData);
    }, []);*/
    //////////////////////////////////////////////////////////////////////////
    useEffect(() => {  
        const fetchVendedorData = async () => {
            try {
                const data = await getVendedorById(vendedorId);
                data.horariosTiendaFisica = JSON.parse(data.horariosTiendaFisica);
                setVendedor(data);
            } catch (error) {
                console.error('Error fetching vendor data:', error);
            }
        };
        
        const fetchCouponsData = async () => {
            try {
                const allCoupons = await getCoupons();
                const vendorCoupons = allCoupons.filter(coupon => coupon.createdBy === vendedorId);
                setCupones(vendorCoupons);
            } catch (error) {
                console.error('Error fetching coupons:', error);
            }
        };

        if (authState.userType === 'vendedor') {
            fetchVendedorData();
            fetchCouponsData();
        }
        fetchCouponsData();
    }, [vendedorId, authState.userType]);

    if (!vendedor) {
        return <div>Cargando...</div>;
    }

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
                                        <label className="main-content-label fs-13 mg-b-20">Descripción</label>
                                        {vendedor && vendedor.descripcion ? (
                                            <p className="m-b-5">{vendedor.descripcion}</p>
                                        ) : (
                                            <p className="m-b-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. At culpa atque repellat, qui impedit accusamus perspiciatis sint necessitatibus tempora, incidunt modi magnam consectetur similique id nihil ex laboriosam earum fuga!</p>
                                        )}
                                        <div className="mb-3 mb-xl-0"> 
                                            <div className="horarios"> 
                                                <div className="media"> 
                                                    <div className="media-icon bg-primary-transparent text-primary"> 
                                                        <i className="bi bi-clock"></i> 
                                                    </div> 
                                                    <div className="media-body"> 
                                                        <span>Horarios</span> 
                                                        {vendedor && vendedor.horariosTiendaFisica ? (
                                                            <HorarioDisplay horarios={vendedor.horariosTiendaFisica} />
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
                                        <h4 className="fs-15 text-uppercase mb-3">Ubicación</h4>   
                                        <div className="container-map-pvp">
                                            <MapLatLong coordinates={ vendedor.location?.coordinates } />  
                                        </div> 
                                    </div>
                                    <div className="border-top"></div> 
                                    <div className="p-4"> 
                                        <label className="main-content-label fs-13 mg-b-20">Contacto</label> 
                                        <div className="d-sm-flex"> 
                                            <div className="mb-3 mb-sm-0"> 
                                                <div className="main-profile-contact-list"> 
                                                    <div className="media"> 
                                                        <div className="media-icon bg-primary-transparent text-primary"> 
                                                            <i className="bi bi-telephone-forward"></i> 
                                                        </div> 
                                                        <div className="media-body"> 
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
                                            <div className="ms-0 ms-sm-3 mb-3 mb-sm-0"> 
                                                <div className="main-profile-contact-list"> 
                                                    <div className="media"> 
                                                        <div className="media-icon bg-info-transparent text-info"> 
                                                            <i className="bi bi-geo-alt"></i> 
                                                        </div> 
                                                        <div className="media-body"> 
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
                                        </div> 
                                    </div> 
                                    <div className="border-top"></div> 
                                    <div className="p-3 p-sm-4"> 
                                        <label className="main-content-label fs-13 mg-b-20">Redes Sociales</label> 
                                        <div className="d-xl-flex"> 
                                            <div className="ms-0 ms-xl-3 mb-3 mb-xl-0"> 
                                                <SocialMediaDisplay socialMediaString={vendedor.redesSociales} />
                                            </div> 
                                        </div>
                                    </div> 
                                    <div className="border-top"></div> 
                                    <div className="p-4 container-cupones-previa">
                                        <div className="row">
                                            <h4 className="fs-15 text-uppercase mb-3">Cupones</h4>
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
        </Perfil>
        </>
    );
}