import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ListaCupones from "../../components/Cupones/ListaCupones";
import Perfil from "./Perfil"
import MapLatLong from "../../components/MapLatLong";
import Loading from "../../components/Loading";
import HorarioDisplay from "../../components/Vendedor/HorarioDisplay"
import SocialMediaDisplay from '../../components/Vendedor/SocialMediaDisplay';
import { getVendedorById } from "../../services/vendedoresService";
import { getCouponsByVendor } from '../../services/CuponesService';
import { useAuth } from '../../services/AuthContext';

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
    }, [vendedorId]);

    if (!vendedor) {
        return <Loading/>;
    }

    return (
        <>
        <Perfil>
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
                                        <label class="main-content-label fs-13 mg-b-20">Horarios</label>
                                        <div class="mb-3 mb-xl-0"> 
                                            <div class="horarios"> 
                                                <div class="media"> 
                                                    <div class="media-icon bg-primary-transparent text-primary"> 
                                                        <i class="bi bi-clock"></i> 
                                                    </div> 
                                                    <div class="media-body">  
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
                                    <div class="border-top"></div>
                                    <div className="p-4">
                                        {/* Mapa de localización */}
                                        <label class="main-content-label text-uppercase mb-3">Ubicación</label>   
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
                                            <label class="main-content-label text-uppercase mb-3">Cupones</label>
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