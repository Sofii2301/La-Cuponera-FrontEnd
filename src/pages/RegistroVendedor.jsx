import React, { useState, useEffect } from "react";
import { useIntl } from 'react-intl'; 
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import Nav from "../components/Nav";
import cuponikWide from "../assets/cuponik/web2.png";
import cuponikTall from "../assets/cuponik/Celular-pose-PNG.png";
import { getPlan, getVendedores, updateVendor } from "../services/vendedoresService";
import Loading from '../components/Loading';

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import CambiarPlan from "../components/Planes/CambiarPlan";

    /*id_tienda: {type: Number, required: false}, 
    nombreTienda:  { type: String, required: true },
    dirTiendaFisica: { type: String, required: true}, 
    telefono: { type: Number, required: true }, 
    descripcion: { type: String, required: true }, 
    email: { type: String, required: true, unique: true }, 
    contraseña: { type: String, required: true }, 
    registroFecha: {type: Date, default: Date.now,},
    estadoVerificacion: {type: String, enum: ['Pendiente', 'Aprobada', 'Desaprobada'], required: true, default: 'Pendiente',},
    redesSociales: { type: String, required: true }, 
    paginaWeb: { type: String, required: true}, 
    horariosTiendaFisica: { type: String, required: true },
    representanteLegal: { type: String, required: true }, 
    Nit: { type: Number, required: true  },  
    categorias: { type: Object, required: false }, 
    raiting: {type: Number, require: false},  
    portada:{type: String}, 
    logo: {type: String}, 
    seguidores: {type: Array, default: []}, 
    type:{type: String, default: 'vendedor'}, 
    geolocalizacion:{type: String} */ 

export default function RegistroVendedor() {
    const intl = useIntl();
    const { user } = useAuth();
    const navigate = useNavigate(); 
    const [currentPlan, setCurrentPlan] = useState(3);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const vendedorId = String(user);

    const steps = [
        { label: intl.formatMessage({ id: 'sign_up', defaultMessage: 'Registrate' }), component: 'registro' },
        { label: intl.formatMessage({ id: 'select_plan', defaultMessage: 'Elige un plan' }), component: 'planes' },
    ];

    // Inicialización de `activeStep` desde localStorage o por defecto 0
    const [activeStep, setActiveStep] = useState(() => {
        const savedStep = localStorage.getItem('activeStep');
        if (savedStep) {
            const parsedStep = JSON.parse(savedStep);
            if (parsedStep.vendedorId === vendedorId) {
                return parsedStep.activeStep;
            }
        }
        return 0;
    });

    const fetchVendedorPlan = async () => {
        try {
            const plan = await getPlan(vendedorId);
            setCurrentPlan(plan);
        } catch (error) {
            console.error('Error fetching vendor data:', error);
        }
    };

    useEffect(() => {
        if(vendedorId && activeStep === 1) {
            fetchVendedorPlan();
        }
    }, [currentPlan]);

    useEffect(() => {
        const stepData = JSON.stringify({ activeStep, vendedorId });
        localStorage.setItem('activeStep', stepData);
    }, [activeStep, vendedorId]);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleComplete = () => {
        if (currentPlan >= 1 && currentPlan <= 3) {
            localStorage.setItem('activeStep', JSON.stringify({ activeStep: 0, vendedorId }));
            setLoading(false);
            navigate('/signup/verify/');
        } else {
            setErrorMessage(intl.formatMessage({ id: 'select_plan_error_message', defaultMessage: 'Por favor, selecciona un plan antes de continuar.' }));
        }
    };

    useEffect(() => {
        function adjustOverlayHeight() {
            const overlay = document.querySelector('.overlay-rv');
            if (overlay) {
                overlay.style.height = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight) + 1000 + 'px';
            }
        }

        adjustOverlayHeight(); // Ajustar la altura cuando se carga la página

        // Ajustar la altura cuando el contenido de la página cambia dinámicamente
        window.addEventListener('resize', adjustOverlayHeight);
        return () => {
            window.removeEventListener('resize', adjustOverlayHeight);
        };
    }, []);

    useEffect(() => {
        function adjustBackground() {
            const background = document.querySelector('.bottom-image-rv');
            if (background) {
                if (window.innerHeight > window.innerWidth) {
                background.style.backgroundImage = `url(${cuponikTall})`;
                } else {
                background.style.backgroundImage = `url(${cuponikWide})`;
                }
            }
        }
    
        adjustBackground(); // Ajustar el fondo cuando se carga la página
    
        // Ajustar el fondo cuando la ventana cambia de tamaño
        window.addEventListener('resize', adjustBackground);
        return () => {
            window.removeEventListener('resize', adjustBackground);
        };
    }, []);
    
    useEffect(() => {
        function adjustBackground() {
            const background = document.querySelector('.bottom-image-rv');
            if (background) {
                if (window.innerHeight > window.innerWidth) {
                background.classList.add('cuponik-tall');
                background.classList.remove('cuponik-wide');
                } else {
                background.classList.add('cuponik-wide');
                background.classList.remove('cuponik-tall');
                }
            }
        }
    
        adjustBackground(); // Ajustar el fondo cuando se carga la página
    
        // Ajustar el fondo cuando la ventana cambia de tamaño
        window.addEventListener('resize', adjustBackground);
        return () => {
            window.removeEventListener('resize', adjustBackground);
        };
    }, []);

    return(
        <>
            <div className="bottom-image-rv"></div>
            <Nav isSignIn={"sesion-v"} />
            <div className="overlay-rv">
                <section className="my-lg-14 my-8">
                    <div className="container container-rv">
                        <div className="row row-rv justify-content-center align-items-center">
                            <div className="container container-rv-2 mt-5">
                                <div className="container-titulo-rv mb-lg-9 mb-5 text-center">
                                    <h1 className="mb-1 h2 fw-bold titulo titulo-rv">
                                        {intl.formatMessage({ id: 'hello_seller', defaultMessage: '¡Hola Vendedor!' })}
                                    </h1>
                                    <p id="subtitulo">
                                        {intl.formatMessage({ id: 'welcome_vendor_register', defaultMessage: '¡Bienvenido a La Cuponera! Registra tu Tienda on-line de OFERTAS' })}
                                    </p>
                                </div>
                                <Box>
                                    <Stepper activeStep={activeStep} orientation="vertical">
                                        {steps.map((step, index) => (
                                            <Step key={step.label}>
                                                <StepLabel className="text-rv">{step.label}</StepLabel>
                                                <StepContent>
                                                    {step.component === 'registro' && (
                                                        <>
                                                            <FormularioRegistroVendedor onNextStep={handleNext} setLoading={setLoading} />
                                                            {loading && (<Loading />)}
                                                        </>
                                                    )}
                                                    {step.component === 'planes' && (
                                                        <>
                                                            <CambiarPlan currentPlan={currentPlan} />
                                                            <Box sx={{ mb: 2 }}>
                                                                <Button
                                                                    variant="contained"
                                                                    onClick={activeStep === steps.length - 1 ? handleComplete : handleNext}
                                                                    sx={{ mt: 1, mr: 1 }}
                                                                    className='w-100 btn btn-azul'
                                                                >
                                                                    {index === steps.length - 1 ? intl.formatMessage({ id: 'go_to_store', defaultMessage: 'Ir a mi tienda' }) : intl.formatMessage({ id: 'next', defaultMessage: 'Siguiente' })}
                                                                </Button>
                                                                {errorMessage && <div className="text-danger mt-3 text-rv">{errorMessage}</div>}
                                                            </Box>
                                                        </>
                                                    )}
                                                </StepContent>
                                            </Step>
                                        ))}
                                    </Stepper>
                                </Box>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

const FormularioRegistroVendedor = ({ onNextStep, setLoading }) => {
    const intl = useIntl();
    const { register} = useAuth();
    const [formData, setFormData] = useState({ 
        nombreTienda: "",
        dirTiendaFisica: "",
        telefono: '',
        descripcion: "",
        email: "",
        contraseña: "",
        registroFecha: new Date(), // Fecha actual
        estadoVerificacion: 'Pendiente', // Estado inicial
    });
    const [formErrors, setFormErrors] = useState({
        storeName: "",
        phoneNumber: "",
        email: "",
        password: "",
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    //////////////////////////////////////////////////////////////////////////////
    /*const [cuponeraData, setCuponeraData] = useState({ 
        nombreTienda: "La Cuponera",
        dirTiendaFisica: "calle 15 no 11-75, Chía, Colombia, 250001",
        telefono: "+57 321 3007039",
        descripcion: "🤖¡Bienvenido a La Cuponera 🌐 Descubre un nuevo horizonte para tu negocio en el mundo digital. En nuestra plataforma, fusionamos la comodidad del mundo digital con oportunidades ilimitadas para tu negocio. Desde productos de alta calidad hasta herramientas empresariales innovadoras, aquí encontrarás todo lo que tu negocio necesita para crecer y prosperar. ¡Embárcate en un viaje hacia el éxito con nosotros! \n\nExplora y lleva tu negocio al siguiente nivel.🚀👩‍🚀",
        email: "lacuponera.marcas@gmail.com",
        contraseña: "lacuponera",
        redesSociales: {"Facebook":{"username":"La Cuponera App","link":"https://www.facebook.com/lacuponera.col/"},"Instagram":{"username":"lacuponera.colombia","link":"https://www.instagram.com/lacuponera.colombia/"},"Youtube":{"username":"@lacuponeracolombia","link":"https://www.youtube.com/@lacuponeracolombia/featured","TikTok":{"username":"@lacuponera.colombia","link":"https://www.tiktok.com/@lacuponera.colombia"},"LinkedIn":{"username":"La Cuponera Digital","link":"https://www.linkedin.com/in/la-cuponera-digital-a765a8209/"}}},
        paginaWeb: "https://lacuponera.app/",
    //////////////////////////////////////////////////////////////////////////////*/

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isValid = validateForm();
        if (!isValid) {
            return; // No enviar el formulario si hay errores
        }
        
        try {
            setLoading(true);
            const userType = 'vendedor'; // o 'cuponero', dependiendo del tipo de registro
            const formatData = {
                "user_login": "vendedor1",
                "user_pass": formData.contraseña,
                "user_nicename": "vendedor1",
                "user_email": formData.email,
                "user_url": "",
                "user_registered": new Date().toISOString(),
                "user_activation_key": "",
                "user_status": 0,
                "display_name": "temp_name",
                "telefono": formData.telefono,
                "nombreTienda": formData.nombreTienda,
                "dirTiendaFisica": formData.dirTiendaFisica,
                "descripcion": formData.descripcion,
                "plan": 3
            }
            await register(formatData, userType);

            const dataComplete = {Segundo_Registro: 0}
            const dataPlan = {plan: 3}

            try {
                const vendedores = await getVendedores();
                const user = vendedores.find(vendedor => vendedor.user_email === formData.email);
                try {
                    await updateVendor(user.ID, dataComplete, 'Complete');
                } catch (error) {
                    console.error('Error:', error);
                    setErrorMessage(intl.formatMessage({ id: 'second_registration_error', defaultMessage: 'Error al establecer Segundo_Registro en 0' })+': '+err.message);
                }
                try {
                    await updateVendor(user.ID, dataPlan);
                } catch (error) {
                    console.error('Error:', error);
                    setErrorMessage('Error al actualizar el plan')
                }
            } catch (error) {
                console.error('Error:', error);
                setErrorMessage('Error al actualizar el vendedor')
            }
            
            onNextStep();
            //navigate(`/signup/verify/`); // Navega a la página verificacion del correo
        } catch (err) {
            console.error('Error:', err);
            setErrorMessage(intl.formatMessage({ id: 'registration_error', defaultMessage: 'Error al registrarse' })+': '+err.message);
        } finally {
            setLoading(false);
        }
    };

    const validateForm = () => {
        let isValid = true;
        const errors = {};

        if (!formData.nombreTienda.trim()) {
            errors.storeName = intl.formatMessage({ id: 'store_name_error_message', defaultMessage: 'Por favor, ingresa el nombre de tu tienda' });
            isValid = false;
        }

        if (!formData.telefono.trim()) {
            errors.phoneNumber = intl.formatMessage({ id: 'telephone_number_error_message', defaultMessage: 'Por favor, ingresa un número de teléfono' });
            isValid = false;
        } else if (!/^\+?\d{10,14}$/.test(formData.telefono)) {
            errors.phoneNumber = intl.formatMessage({ id: 'invalid_phone', defaultMessage: 'Número de teléfono inválido' });
            isValid = false;
        }

        if (!formData.email.trim()) {
            errors.email = intl.formatMessage({ id: 'corporative_email_error_message', defaultMessage: 'Por favor, ingresa el correo electrónico de tu marca' });
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errors.email = intl.formatMessage({ id: 'invalid_email', defaultMessage: 'Email inválido' });
            isValid = false;
        }

        if (!formData.contraseña.trim()) {
            errors.password = intl.formatMessage({ id: 'password_error_message', defaultMessage: 'Por favor, ingresa tu contraseña' });
            isValid = false;
        } else if (formData.contraseña.length < 6) {
            errors.password = intl.formatMessage({ id: 'password_length', defaultMessage: 'La contraseña debe tener al menos 6 caracteres' });
            isValid = false;
        }

        setFormErrors(errors);
        return isValid;
    };

    return (
        <form id="storeRegistrationForm" onSubmit={handleSubmit}>
            <div className="row row-1-home g-3">
            <div className="col col-rv mb-3">
                    <label htmlFor="nombreTienda" className="form-label text-rv">
                        {intl.formatMessage({ id: 'store_name', defaultMessage: 'Nombre de la tienda' })}
                    </label>
                    <input
                        type="text"
                        className={`form-control ${formErrors.storeName && 'is-invalid'}`}
                        id="nombreTienda"
                        name="nombreTienda"
                        value={formData.nombreTienda}
                        onChange={handleChange}
                        placeholder={intl.formatMessage({ id: 'enter_store_name', defaultMessage: 'Ingresa el nombre de tu tienda' })}
                        required
                    />
                    <div className="invalid-feedback">{formErrors.storeName}</div>
                </div>

                <div className="col col-rv mb-3">
                    <label htmlFor="dirTiendaFisica" className="form-label text-rv">
                        {intl.formatMessage({ id: 'physical_store', defaultMessage: 'Tienda Física' })}
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="dirTiendaFisica"
                        name="dirTiendaFisica"
                        value={formData.dirTiendaFisica}
                        onChange={handleChange}
                        placeholder={intl.formatMessage({ id: 'store_address', defaultMessage: 'Dirección de tu tienda física' })}
                    />
                </div>
            </div>

            <div className="row g-3">
                <div className="col col-rv mb-3">
                    <label htmlFor="telefono" className="form-label text-rv">
                        {intl.formatMessage({ id: 'contact_phone', defaultMessage: 'Teléfono de Contacto' })}
                    </label>
                    <input
                        type="text"
                        className={`form-control ${formErrors.phoneNumber && 'is-invalid'}`}
                        id="telefono"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                        placeholder={intl.formatMessage({ id: 'contact_number_whatsapp', defaultMessage: 'Número de Contacto / Whatsapp Business' })}
                        required
                    />
                    <div className="invalid-feedback">{formErrors.phoneNumber}</div>
                </div>
            </div>

            <div className="row g-3">
                <div className="col col-rv mb-3">
                    <label htmlFor="descripcion" className="form-label text-rv">
                        {intl.formatMessage({ id: 'commercial_description', defaultMessage: 'Descripción Comercial' })}
                    </label>
                    <textarea
                        className="form-control"
                        id="descripcion"
                        name="descripcion"
                        value={formData.descripcion}
                        onChange={handleChange}
                        rows="3"
                        placeholder={intl.formatMessage({ id: 'about_us', defaultMessage: '¿Quiénes son? ¿Qué hacen?' })}
                    ></textarea>
                </div>
            </div>

            <div className="row g-3">
                <div className="col col-rv mb-3">
                    <label htmlFor="email" className="form-label text-rv">
                        {intl.formatMessage({ id: 'email', defaultMessage: 'Email' })}
                    </label>
                    <input
                        type="email"
                        className={`form-control ${formErrors.email && 'is-invalid'}`}
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={intl.formatMessage({ id: 'enter_email', defaultMessage: 'Ingresa tu email' })}
                        required
                    />
                    <div className="invalid-feedback">{formErrors.email}</div>
                </div>
            </div>

            <div className="row g-3">
                <div className="col col-rv mb-3">
                    <label htmlFor="contraseña" className="form-label text-rv">
                        {intl.formatMessage({ id: 'password', defaultMessage: 'Contraseña' })}
                    </label>
                    <div className="input-group">
                        <input
                            type={showPassword ? "text" : "password"}
                            className={`form-control ${formErrors.password && 'is-invalid'}`}
                            id="contraseña"
                            name="contraseña"
                            value={formData.contraseña}
                            onChange={handleChange}
                            placeholder='********'
                            required
                        />
                        <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                        <div className="invalid-feedback">{formErrors.password}</div>
                    </div>
                </div>
            </div>
            <div className="col col-rv-12 d-grid mb-3">
                <button
                    type="submit"
                    id="registro"
                    className="btn btn-amarillo"
                >
                    {intl.formatMessage({ id: 'signup', defaultMessage: 'Registrar' })}
                </button>
            </div>
            {errorMessage && <div className="text-danger mt-3">{errorMessage}</div>}
        </form>
    )
}

