import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ListaCupones from "../../components/Cupones/ListaCupones";
import Perfil from "./Perfil"
import MapLatLong from "../../components/MapLatLong";
import Loading from "../../components/Loading";
import HorarioDisplay from "../../components/Vendedor/HorarioDisplay"
import SocialMediaDisplay from '../../components/Vendedor/SocialMediaDisplay';
import Cupon from "../../components/Cupones/Cupon";
import { getVendedorById, getPlan, getVideoById } from "../../services/vendedoresService";
import { getCouponById, getCouponsByVendor, getRaitingByVendor } from '../../services/CuponesService';
import { useAuth } from '../../services/AuthContext';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {  responsive } from "../../js/slider";
import ComentariosList from '../../components/ComentariosList'
import ListaCuponesHorizontal from '../../components/Cupones/ListaCuponesHorizontal'

function formatPhoneNumber(phoneNumber) {
    if (!phoneNumber) return '';
    const visibleDigits = phoneNumber.slice(0, 4);
    const hiddenDigits = phoneNumber.slice(4).replace(/\d/g, '*');
    return `${visibleDigits}${hiddenDigits}`;
}

export default function Perfil_vistaPrevia() {
    const [vendedor, setVendedor] = useState([]);
    const [cupones, setCupones] = useState([]);
    const { authState } = useAuth();
    const vendedorId = authState.user;
    const [plan, setPlan] = useState(0);
    const [videoUrl, setVideoUrl] = useState('');
    const [masVendidos, setMasVendidos] = useState([]);
    const [loading, setLoading] = useState(true);

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

    const fetchVideo = async () => {
        try {
            const response = await getVideoById(vendedorId);
            setVideoUrl(response);
        } catch (error) {
            console.error('Error obteniendo el video:', error);
        }
    };

    const fetchMasVendidos = async () => {
        try {
            const ratings = await getRaitingByVendor(vendedorId);
    
            // Agrupar las calificaciones por id_cupon y sumar las calificaciones
            const ratingsByCoupon = ratings.reduce((acc, rating) => {
                rating = rating.rating
                if (acc[rating.id_cupon]) {
                    acc[rating.id_cupon] += rating.raiting;
                } else {
                    acc[rating.id_cupon] = rating.raiting;
                }
                return acc;
            }, {});
    
            // Convertir a una lista de objetos y ordenar por calificación
            const sortedRatings = Object.entries(ratingsByCoupon)
                .map(([id_cupon, totalRaiting]) => ({ id_cupon, totalRaiting }))
                .sort((a, b) => b.totalRaiting - a.totalRaiting);

            // Seleccionar los dos cupones con mayor calificación
            const topTwoRatings = sortedRatings.slice(0, 2);
    
            // Obtener los datos de los cupones utilizando los IDs
            const topTwoCoupons = await Promise.all(
                topTwoRatings.map(async (rating) => {
                    const coupon = await getCouponById(rating.id_cupon);
                    return coupon[0];
                })
            );
    
            setMasVendidos(topTwoCoupons);
        } catch (error) {
            console.error('Error obteniendo los cupones más vendidos:', error);
        }
    };

    useEffect(() => {  
        fetchVendedorData();
        fetchCouponsData();
        fetchPlan();
        fetchVideo();
        fetchMasVendidos();
        setLoading(false);
    }, [vendedorId]);

    if (!vendedor) {
        return <Loading/>;
    }

    if (loading) {
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
                                    {(plan === 2 || plan === 3) && videoUrl && (
                                        <>
                                        <div className="row p-4 d-flex align-items-center">
                                            <div className="col-4 d-flex flex-column">
                                                <label className="main-content-label fs-13 mg-b-20 mb-5">Mas vendidos</label>
                                                <ListaCuponesHorizontal listaCupones={masVendidos}/>
                                            </div>
                                            <div className="col-8 d-flex justify-content-center">
                                                <video className="video-cont" src={videoUrl} controls width="600"></video>
                                            </div>
                                        </div>
                                        <div className="border-top"></div>
                                        </>
                                    )}
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
                                                            <div>{(plan === 1) ? (formatPhoneNumber(vendedor.telefono)) : (vendedor.telefono)}</div>
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
                                                    <Link to={vendedor.paginaWeb} className="media"> 
                                                        <div className="media-icon bg-info-transparent text-info"> 
                                                            <i className="bi bi-globe2"></i> 
                                                        </div> 
                                                        <div className="media-body"> 
                                                            <span>Página web</span> 
                                                            <div>{vendedor.paginaWeb}</div>
                                                        </div> 
                                                    </Link> 
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
                                    {(plan === 2 || plan === 3) && ( 
                                        <div className="p-4">
                                            <div className="row">
                                                <label className="main-content-label text-uppercase mb-3">Comentarios</label>
                                            </div>
                                            <div className="p-2">
                                                <ComentariosList id={vendedor.vendedor_id} tipo='vendedor'></ComentariosList>
                                            </div>
                                        </div>
                                    )}
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