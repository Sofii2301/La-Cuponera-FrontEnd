import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ListaCupones from "../../components/Cupones/ListaCupones";
import Perfil from "./Perfil"
import Map from "../../components/Map";

export default function Perfil_vistaPrevia() {
    const vendedor = JSON.parse(localStorage.getItem("vendedorData"));
    const [cupones, setCupones] = useState([]);

    useEffect(() => {
        // Obtener los cupones del vendedor desde localStorage
        const vendedorData = JSON.parse(localStorage.getItem("vendedorData"));
        if (vendedorData && vendedorData.cupones) {
            setCupones(vendedorData.cupones);
        }
    }, []);

    return (
        <>
        <Perfil>
            <div className="row row-sm mt-3">
                <div className="col-lg-12 col-md-12">
                    <div className="card custom-card main-content-body-profile">
                        <div className="tab-content">
                            <div class="main-content-body tab-pane p-4 border-top-0 active" id="about" role="tabpanel">
                                <div class="border rounded-10"> 
                                    <div class="p-4"> 
                                        <h4 class="fs-15 text-uppercase mb-3">Descripción</h4> 
                                        {vendedor && vendedor.descripcion ? (
                                            <p class="m-b-5">{vendedor.descripcion}</p>
                                        ) : (
                                            <p class="m-b-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. At culpa atque repellat, qui impedit accusamus perspiciatis sint necessitatibus tempora, incidunt modi magnam consectetur similique id nihil ex laboriosam earum fuga!</p>
                                        )}
                                        <div class="mb-3 mb-xl-0"> 
                                            <div class="horarios"> 
                                                <div class="media"> 
                                                    <div class="media-icon bg-primary-transparent text-primary"> 
                                                        <i class="bi bi-clock"></i> 
                                                    </div> 
                                                    <div class="media-body"> 
                                                        <span>Horarios</span> 
                                                        {vendedor && vendedor.horariosTiendaFisica ? (
                                                            <p>{vendedor.horariosTiendaFisica}</p>
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
                                        <h4 class="fs-15 text-uppercase mb-3">Ubicación</h4>   
                                        <div className="container-map-pvp">
                                            <Map type="map-cuadro"/>
                                        </div> 
                                    </div>
                                    <div class="border-top"></div> 
                                    <div class="p-4"> 
                                        <label class="main-content-label fs-13 mg-b-20">Contact</label> 
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
                                                                <div>Calle 123</div>
                                                            )}
                                                        </div> 
                                                    </div> 
                                                </div> 
                                            </div> 
                                            <div class="ms-0 ms-sm-3 mb-3 mb-sm-0"> 
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
                                        <label class="main-content-label fs-13 mg-b-20">Social</label> 
                                        <div class="d-xl-flex"> 
                                            <div class="mb-3 mb-xl-0"> 
                                                <div class="main-profile-social-list"> 
                                                    <div class="media"> 
                                                        <div class="media-icon bg-primary-transparent text-primary"> 
                                                            <i class="bi bi-instagram"></i> 
                                                        </div> 
                                                        <div class="media-body"> 
                                                            <span>Instagram</span> 
                                                            <Link to="https://www.instagram.com/lacuponera.colombia/?next=%2F">lacuponera.colombia</Link> 
                                                        </div> 
                                                    </div> 
                                                </div> 
                                            </div>
                                            <div class="ms-0 ms-xl-3 mb-3 mb-xl-0"> 
                                                <div class="main-profile-social-list"> 
                                                    <div class="media"> 
                                                        <div class="media-icon bg-primary-transparent text-primary"> 
                                                            <i class="bi bi-instagram"></i> 
                                                        </div> 
                                                        <div class="media-body"> 
                                                            <span>Facebook</span> 
                                                            <Link to="https://www.facebook.com/lacuponera.col/">lacuponera.col</Link> 
                                                        </div> 
                                                    </div> 
                                                </div> 
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
                                                    <ListaCupones  cupones={cupones}/>
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