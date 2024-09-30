import { useState, useEffect } from "react";
import { useIntl } from 'react-intl';
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import ListaCupones from "../../components/Cupones/ListaCupones";
import { getCouponById, getCouponsByVendor, getRaitingByVendor } from "../../services/CuponesService";
import { getCoverImage, getLogoImage, getVendedorById, getPlan, getVideoById } from "../../services/vendedoresService";
import portadaDefault from "../../assets/banner_default.png";
import logoDefault from "../../assets/logo_default.png";
import MapLatLong from "../../components/MapLatLong";
import HorarioDisplay from "../../components/Vendedor/HorarioDisplay"
import SocialMediaDisplay from '../../components/Vendedor/SocialMediaDisplay';
import Cuponeros from "../../components/Cuponero/Cuponeros";
import Vendedor from "../../components/Vendedor/Vendedor";
import Loading from "../../components/Loading";
import SeguirVendedor from '../../components/SeguirVendedor';
import Raiting from '../../components/Raiting'
import { useAuth } from "../../context/AuthContext";
import ComentariosList from '../../components/ComentariosList'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {  responsive } from "../../js/slider";
import Cupon from "../../components/Cupones/Cupon";
import winwin from "../../assets/winwin/WinWinFINAL3_(1).gif";
import useCheckIfIsLogged from '../../services/PrivateRoute';
import ListaCuponesHorizontal from '../../components/Cupones/ListaCuponesHorizontal'
import { useMediaQuery } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

export default function VendedorC() {
    const { authState } = useAuth();
    const location = useLocation();
    const { id } = useParams();

    // Verifica si la ruta actual es "/cuponero/perfil-vendedor/:id"
    const isPerfilVendedorV = location.pathname === `/vendedor/perfil-vendedor/${id}`;

    return (
        <>
            {(isPerfilVendedorV && authState.userType === 'vendedor') ? (
                <>
                <Vendedor>
                    <ContentPage isPerfilVendedorV={isPerfilVendedorV} />
                </Vendedor>
                </>
            ) : (
                <>
                <Cuponeros>
                    <ContentPage isPerfilVendedorV={isPerfilVendedorV} />
                </Cuponeros>
                </>
            )}
        </>
    );
}

function formatPhoneNumber(phoneNumber) {
    if (!phoneNumber) return '';
    const visibleDigits = phoneNumber.slice(0, 4);
    const hiddenDigits = phoneNumber.slice(4).replace(/\d/g, '*');
    return `${visibleDigits}${hiddenDigits}`;
}

function ContentPage({isPerfilVendedorV}) {
    const intl = useIntl();
    const { id } = useParams();
    const [cupones, setCupones] = useState([]);
    const [vendedor, setVendedor] = useState(null);
    const [logo, setLogo] = useState(null);
    const [portada, setPortada] = useState(null);
    const [plan, setPlan] = useState(0);
    const [videoUrl, setVideoUrl] = useState('');
    const [masVendidos, setMasVendidos] = useState([]);
    const [loading, setLoading] = useState(true);
    const isLogged = useCheckIfIsLogged();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        email: '',
        mensaje: ''
    })
    const [formErrors, setFormErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState(null);
    const esPantallaGrande = useMediaQuery('(min-width: 1200px)');

    const vendedorId = id;

    const fetchVendedorData = async () => {
        try {
            const data = await getVendedorById(vendedorId,'Complete');
            setVendedor(data[0]);
        } catch (error) {
            console.error('Error fetching vendor data:', error);
        }
    };
    const fetchVendedorLogo = async () => {
        try {
            const data = await getLogoImage(vendedorId);
            if (data.data !== null) {
                setLogo(data);
            }
        } catch (error) {
            console.error('Error fetching vendor logo:', error);
        }
    };
    const fetchVendedorPortada = async () => {
        try {
            const data = await getCoverImage(vendedorId);
            if (data.data !== null) {
                setPortada(data);
            }
        } catch (error) {
            console.error('Error fetching vendor cover:', error);
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
                .map(([id_cupon, raiting]) => ({ id_cupon, raiting }))
                .sort((a, b) => parseFloat(b.raiting) - parseFloat(a.raiting));

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
        fetchVendedorLogo();
        fetchVendedorPortada();
        fetchCouponsData();
        fetchPlan();
        fetchVideo();
        fetchMasVendidos();
        setLoading(false);
    }, [vendedorId]);

    const handleFollowChange = () => {
        fetchVendedorData();
    };

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validateForm();
        if (!isValid) {
            return; // No enviar el formulario si hay errores
        }
        
        if (isLogged) {
            console.log('formData: ', formData)
            setMessage(intl.formatMessage({ id: 'data_sent_successfully', defaultMessage: 'Datos envíados correctamente.' }));
        } else {
            navigate('/signin/cuponero')
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const validateForm = () => {
        let isValid = true;
        const errors = {};

        // Validar cada campo
        if (formData.nombre.trim() === '') {
            errors.nombre = intl.formatMessage({ id: 'name_error_message', defaultMessage: 'Por favor, ingresa tu nombre' });
            isValid = false;
        }

        if (String(formData.apellido).trim() === '') {
            errors.apellido = intl.formatMessage({ id: 'last_name_error_message', defaultMessage: 'Por favor, ingresa tu apellido' });
            isValid = false;
        }

        if (String(formData.email).trim() === '') {
            errors.email = intl.formatMessage({ id: 'email_error_message', defaultMessage: 'Por favor, ingresá tu mail' });
            isValid = false;
        }

        if (String(formData.mensaje).trim() === '') {
            errors.mensaje = intl.formatMessage({ id: 'write_to_store_error_message', defaultMessage: 'Por favor, escribe un mensaje para la tienda' });
            isValid = false;
        }

        setFormErrors(errors);
        return isValid;
    };

    return (
        <>
            <div className="container-fluid mt-3 ps-lg-5 pe-lg-5 ps-xl-5 pe-xl-5 ps-xxl-5 pe-xxl-5">
                <div className="row square row-sm">
                    <div className="col-lg-12 col-md-12">
                        {isPerfilVendedorV && 
                            <Link to='/vendedor/' className="pb-2 text-primary">{intl.formatMessage({ id: 'back_to_map', defaultMessage: 'Volver al mapa' })}</Link>
                        }
                        <div className="card custom-card">
                            <div className="card-body">
                                <div className="panel profile-cover">
                                    <div className="profile-cover__action bg-img">
                                        {portada ? (
                                            <img src={portada} alt="Portada" className="img-perfil-v" />
                                        ) : (
                                            <img src={portadaDefault} alt="Portada" className="img-perfil-v" />
                                        )}
                                    </div>
                                    <div className="profile-cover__img logo-perfil-circulo-nombre">
                                        {logo ? (
                                            <img src={logo} alt="Logo" className="rounded-circle img-perfil-v" />
                                        ) : (
                                            <img src={logoDefault} alt="Logo" className="img-perfil-v" />
                                        )}
                                        <div className="nombre-categorias-perfil">
                                            {vendedor && vendedor.nombreTienda ? (
                                                <h3>{vendedor.nombreTienda}</h3>
                                            ) : (
                                                <h3>{intl.formatMessage({ id: 'store_name', defaultMessage: 'Nombre de la Tienda' })}</h3>
                                            )}
                                            <div className="mb-3">
                                                <Raiting vendedorId={vendedorId}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="profile-cover__info">
                                        <ul className="nav">
                                            {isLogged && !isPerfilVendedorV && <li><SeguirVendedor vendedorId={vendedorId} onFollowChange={handleFollowChange} /></li>}
                                            <li><strong>{cupones.length}</strong>{intl.formatMessage({ id: 'coupons', defaultMessage: 'Cupones' })}</li>
                                            <li><strong>{vendedor && vendedor.seguidores ? vendedor.seguidores.length : 0}</strong>{intl.formatMessage({ id: 'followers', defaultMessage: 'Seguidores' })}</li>  
                                        </ul>
                                    </div>
                                            <h5>{intl.formatMessage({ id: 'categories', defaultMessage: 'Categorías' })}:</h5>
                                            {vendedor && vendedor.categorias ? (
                                                <p>{vendedor.categorias.join(', ')}</p>
                                            ) : (
                                                <p>{intl.formatMessage({ id: 'categories', defaultMessage: 'Categorías' })}</p>
                                            )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row row-sm">
                    <div className="col-lg-12 col-md-12">
                        <div className="card custom-card main-content-body-profile">
                            <div className="tab-content">
                                <div className="main-content-body tab-pane p-4 border-top-0 active" id="about" role="tabpanel">
                                    <div className="border rounded-10"> 
                                        {(plan === 2) && videoUrl && (
                                            <>
                                            <div className={`${!esPantallaGrande ? 'flex-column-reverse' : ''} row p-4 d-flex align-items-center`}>
                                                <div className="col-xl-4 col-lg-12 d-flex flex-column">
                                                    <label className="main-content-label fs-13 mg-b-20 mb-5">
                                                        {intl.formatMessage({ id: 'best_sellers', defaultMessage: 'Mas vendidos' })}
                                                    </label>
                                                    <ListaCuponesHorizontal listaCupones={masVendidos}/>
                                                </div>
                                                {!esPantallaGrande && <div className="border-top mt-6 mb-3"></div>}
                                                <div className="col-xl-8 col-lg-12 d-flex justify-content-center">
                                                    <video className="video-cont" src={videoUrl} controls width="600"></video>
                                                </div>
                                            </div>
                                            </>
                                        )}
                                        {(plan === 2 || plan === 1) && (
                                            <Link to={`https://wa.me/${vendedor.telefono}`} className="btn btn-success whatsapp-redirection-btn">
                                                <WhatsAppIcon fontSize='large'/>
                                                <strong className="ml-2">
                                                    {intl.formatMessage({ id: 'contact_seller', defaultMessage: 'Contactar vendedor' })}
                                                </strong>
                                            </Link>
                                        )}
                                        <div className="p-4"> 
                                            <label className="main-content-label fs-13 mg-b-20">
                                                {intl.formatMessage({ id: 'contact', defaultMessage: 'Contacto' })}
                                            </label> 
                                            <div className="d-sm-flex"> 
                                                {vendedor && vendedor.telefono && (
                                                <div className="mb-3 mb-sm-0"> 
                                                    <div className="main-profile-contact-list"> 
                                                        <div className="media"> 
                                                            <div className="media-icon bg-primary-transparent text-primary"> 
                                                                <i className="bi bi-telephone-forward"></i> 
                                                            </div> 
                                                            <div className="media-body"> 
                                                            <span>{intl.formatMessage({ id: 'telephone', defaultMessage: 'Teléfono' })}</span> 
                                                                <div>{(plan === 3) ? (formatPhoneNumber(vendedor.telefono)) : (vendedor.telefono)}</div>
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
                                                            <span>{intl.formatMessage({ id: 'address', defaultMessage: 'Dirección' })}</span> 
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
                                                            <span>{intl.formatMessage({ id: 'web_page', defaultMessage: 'Página web' })}</span>  
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
                                                <label className="main-content-label fs-13 mg-b-20">
                                                    {intl.formatMessage({ id: 'social_media', defaultMessage: 'Redes Sociales' })}
                                                </label>
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
                                                <label className="main-content-label fs-13 mg-b-20">
                                                    {intl.formatMessage({ id: 'description', defaultMessage: 'Descripción' })}
                                                </label>
                                                <p className="m-b-5 d-flex">{vendedor.descripcion}</p>
                                            </div> 
                                            </>
                                            )}
                                        </div>
                                        <div className="border-top"></div> 
                                        <div className="p-4">
                                            <label className="main-content-label fs-13 mg-b-20">
                                                {intl.formatMessage({ id: 'hours', defaultMessage: 'Horarios' })}
                                            </label>
                                            <div className="mb-3 mb-xl-0"> 
                                                <div className="horarios"> 
                                                    <div className="media"> 
                                                        <div className="media-icon bg-primary-transparent text-primary"> 
                                                            <i className="bi bi-clock"></i> 
                                                        </div> 
                                                        <div className="media-body">  
                                                            {vendedor && vendedor.horariosTiendaFisica && (vendedor.horariosTiendaFisica !== '{}') ? (
                                                                <p><HorarioDisplay horarios={JSON.parse(vendedor.horariosTiendaFisica)} /></p>
                                                            ) : (
                                                                <p>{intl.formatMessage({ id: 'hours_not_available', defaultMessage: '--:-- a --:--' })}</p>
                                                            )}
                                                        </div> 
                                                    </div> 
                                                </div> 
                                            </div>
                                        </div>
                                        <div className="border-top"></div>
                                        <div className="p-4">
                                            {/* Mapa de localización */}
                                            <label className="main-content-label text-uppercase mb-3">
                                                {intl.formatMessage({ id: 'location', defaultMessage: 'Ubicación' })}
                                            </label>   
                                            <div className="container-map-pvp">
                                                <MapLatLong coordinates={ vendedor.location && vendedor.location.coordinates && vendedor.location.coordinates[0] && vendedor.location.coordinates[1] && vendedor.location.coordinates } />  
                                            </div> 
                                        </div>
                                        <div className="border-top"></div>
                                        {(plan === 2 || plan === 1) && ( 
                                            <>
                                            <div className="p-4 container-cupones-previa">
                                                <div className="row">
                                                <label className="main-content-label text-uppercase mb-3">
                                                    {intl.formatMessage({ id: 'coupons', defaultMessage: 'Cupones' })}
                                                </label>
                                                </div>
                                                <div className="p-2 cupones-previa">
                                                    <Carousel className="carousel-cupones" itemClass="carousel-item-custom" showDots={true} responsive={responsive}>
                                                        {cupon}
                                                    </Carousel>
                                                </div>
                                            </div>
                                            <div className="border-top"></div> 
                                            <div className="row d-flex">
                                                <div className={!isPerfilVendedorV ? 'col-6 p-4' : 'col-12 p-4'}>
                                                    <div className="row">
                                                        <label className="main-content-label text-uppercase mb-3">
                                                            {intl.formatMessage({ id: 'comments', defaultMessage: 'Comentarios' })}
                                                        </label>
                                                    </div>
                                                    <div className="p-2">
                                                        <ComentariosList id={vendedorId} tipo='vendedor'></ComentariosList>
                                                    </div>
                                                </div>
                                                {!isPerfilVendedorV && ( 
                                                    <div className="col-6 container-form-previa">
                                                        <div className="row">
                                                            <label className="main-content-label text-uppercase text-center mb-0 mt-4">Contactate con la tienda</label>
                                                        </div>
                                                        <img src={winwin} alt="winwin"/>
                                                        <div className="ml-4 mr-4">
                                                            <div className="form-perfil p-4">
                                                                <form action="" onSubmit={handleSubmit}>
                                                                    <label className="input-perfil-label" htmlFor="">Nombre:</label>
                                                                    <input 
                                                                        type="text"
                                                                        className={`input-perfil form-control ${formErrors.nombre && 'is-invalid'}`}
                                                                        id="nombre"
                                                                        name="nombre"
                                                                        value={formData.nombre}
                                                                        onChange={handleChange}
                                                                        placeholder="Ingresa tu nombre"
                                                                        required
                                                                    />
                                                                    {formErrors.nombre && <div className="invalid-feedback" style={{ color: 'white' }}>{formErrors.nombre}</div>}
                                                                    <label className="input-perfil-label" htmlFor="">Apellido:</label>
                                                                    <input 
                                                                        type="text"
                                                                        className={`input-perfil form-control ${formErrors.apellido && 'is-invalid'}`}
                                                                        id="apellido"
                                                                        name="apellido"
                                                                        value={formData.apellido}
                                                                        onChange={handleChange}
                                                                        placeholder="Ingresa tu apellido"
                                                                        required
                                                                    />
                                                                    {formErrors.apellido && <div className="invalid-feedback" style={{ color: 'white' }}>{formErrors.apellido}</div>}
                                                                    <label className="input-perfil-label" htmlFor="">Email:</label>
                                                                    <input 
                                                                        type="email"
                                                                        className={`input-perfil form-control ${formErrors.email && 'is-invalid'}`}
                                                                        id="email"
                                                                        name="email"
                                                                        value={formData.email}
                                                                        onChange={handleChange}
                                                                        placeholder="Ingresa tu email"
                                                                        required
                                                                    />
                                                                    {formErrors.email && <div className="invalid-feedback" style={{ color: 'white' }}>{formErrors.email}</div>}
                                                                    <label className="input-perfil-label" htmlFor="">Escribe tu mensaje:</label>
                                                                    <textarea 
                                                                        className={`input-perfil form-control ${formErrors.mensaje && 'is-invalid'}`}
                                                                        id="mensaje"
                                                                        name="mensaje"
                                                                        value={formData.mensaje}
                                                                        onChange={handleChange}
                                                                        placeholder="Escribe tu consulta..."
                                                                        required
                                                                    ></textarea>
                                                                    {formErrors.mensaje && <div className="invalid-feedback" style={{ color: 'white' }}>{formErrors.mensaje}</div>}
                                                                    {errorMessage && <div className="text-white mt-3" style={{ color: 'white' }}>{errorMessage}</div>}
                                                                    <div className="btn btn-amarillo w-100"><input type="submit" value="Enviar" /></div>
                                                                    {message && <div className="text mt-3" style={{ color: 'white' }}>{message}</div>}
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                            </>
                                        )}
                                    </div> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
