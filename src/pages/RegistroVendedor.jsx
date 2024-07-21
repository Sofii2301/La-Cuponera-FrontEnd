import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../services/AuthContext';
import Nav from "../components/Nav";
import cuponikWide from "../assets/cuponik/web2.png";
import cuponikTall from "../assets/cuponik/Celular-pose-PNG.png";
import { DateTime } from "luxon";
import { getVendedores, updateVendor } from "../services/vendedoresService";

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
    const navigate = useNavigate(); 
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
            const userType = 'vendedor'; // o 'cuponero', dependiendo del tipo de registro
            const formatData ={
                "user_login": "vendedor1",
                "user_pass": formData.contraseña,
                "user_nicename": "vendedor1",
                "user_email": formData.email,
                "user_url": "",
                "user_registered": DateTime.utc().toISO(),
                "user_activation_key": "",
                "user_status": 0,
                "display_name": "temp_name",
                "telefono": formData.telefono,
                "nombreTienda": formData.nombreTienda,
                "dirTiendaFisica": formData.dirTiendaFisica,
                "descripcion": formData.descripcion,
            }
            await register(formatData, userType);
            try {
                const dataComplete = {
                    Segundo_Registro: 0
                }
                const vendedores = await getVendedores();
                console.log('formData.email: ', formData.email)
                const user = vendedores.find(vendedor => vendedor.user_email === formData.email);
                console.log('user: ', user)
                updateVendor(user.ID, dataComplete, 'Complete')
            } catch (err) {
                console.error('Error:', err);
                setErrorMessage(err.message);
            }
            navigate(`/signup/verify/`); // Navega a la página verificacion del correo
        } catch (err) {
            console.error('Error:', err);
            setErrorMessage(err.message);
        }
    };

    const validateForm = () => {
        let isValid = true;
        const errors = {};

        // Validar cada campo
        if (formData.nombreTienda.trim() === '') {
            errors.storeName = 'Por favor, ingresa el nombre de tu tienda';
            isValid = false;
        }

        if (String(formData.telefono).trim() === '') {
            errors.phoneNumber = 'Por favor, ingresa un número de teléfono';
            isValid = false;
        }

        if (formData.email.trim() === '') {
            errors.email = 'Por favor, ingresa el correo electrónico de tu marca';
            isValid = false;
        }

        if (formData.contraseña.trim() === '') {
            errors.password = 'Por favor, ingresa tu contraseña';
            isValid = false;
        }

        setFormErrors(errors);
        return isValid;
    };

    useEffect(() => {
        function adjustOverlayHeight() {
            const overlay = document.querySelector('.overlay-rv');
            if (overlay) {
                overlay.style.height = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight) + 100 + 'px';
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
                                    <h1 className="mb-1 h2 fw-bold titulo titulo-rv">¡Hola Vendedor!</h1>
                                    <p id="subtitulo">
                                        ¡Bienvenido a La Cuponera! Registra tu Tienda on-line de OFERTAS
                                    </p>
                                </div>
                                <form id="storeRegistrationForm" onSubmit={handleSubmit}>
                                    <div className="row row-1-home g-3">
                                        <div className="col col-rv mb-3">
                                            <label htmlFor="storeName" className="form-label">
                                                Nombre de la tienda
                                            </label>
                                            <input
                                                type="text"
                                                className={`form-control ${formErrors.storeName && 'is-invalid'}`}
                                                id="nombreTienda"
                                                name="nombreTienda"
                                                value={formData.nombreTienda}
                                                onChange={handleChange}
                                                placeholder="Ingresa el nombre de tu tienda"
                                                required
                                            />
                                            <div className="invalid-feedback">
                                                {formErrors.storeName}
                                            </div>
                                        </div>
                                        <div className="col col-rv mb-3">
                                            <label htmlFor="storeAddress" className="form-label">
                                                Tienda Física
                                            </label>
                                            <input
                                                type="text"
                                                className={`form-control ${formErrors.storeAddress && 'is-invalid'}`}
                                                id="dirTiendaFisica"
                                                name="dirTiendaFisica"
                                                value={formData.dirTiendaFisica}
                                                onChange={handleChange}
                                                placeholder="Dirección de tu tienda física"
                                            />
                                        </div>
                                    </div>
                                    <div className="row g-3">
                                        <div className="col col-rv mb-3">
                                            <label htmlFor="phoneNumber" className="form-label">
                                                Teléfono de Contacto
                                            </label>
                                            <input
                                                type="text"
                                                className={`form-control ${formErrors.phoneNumber && 'is-invalid'}`}
                                                id="telefono"
                                                name="telefono"
                                                value={formData.telefono}
                                                onChange={handleChange}
                                                placeholder="Número de Contacto / Whatsapp Business"
                                                required
                                            />
                                            <div className="invalid-feedback">
                                                {formErrors.phoneNumber}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row g-3">
                                        <div className="col col-rv mb-3">
                                            <label htmlFor="storeDescription" className="form-label">
                                                Descripción Comercial
                                            </label>
                                            <textarea
                                                className="form-control"
                                                id="descripcion"
                                                name="descripcion"
                                                value={formData.descripcion}
                                                onChange={handleChange}
                                                rows="3"
                                                placeholder="Quiénes son? Qué hacen?"
                                            ></textarea>
                                        </div>
                                    </div>
                                    <div className="row g-3">
                                        <div className="col col-rv mb-3">
                                            <label htmlFor="formSignupEmail" className="form-label">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                className={`form-control ${formErrors.email && 'is-invalid'}`}
                                                id="formSignupEmail"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="Correo electrónico"
                                                required
                                            />
                                            <div className="invalid-feedback">
                                                {formErrors.email}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row g-3">
                                        <div className="col col-rv mb-3">
                                            <div className="password-field position-relative">
                                                <label htmlFor="formSignupPassword" className="form-label">
                                                    Contraseña
                                                </label>
                                                <div className="password-field position-relative">
                                                    <input
                                                        type={showPassword ? "text" : "password"}
                                                        className={`form-control ${formErrors.password && 'is-invalid'}`}
                                                        id="contraseña"
                                                        name="contraseña"
                                                        value={formData.contraseña}
                                                        onChange={handleChange}
                                                        placeholder="********"
                                                        required
                                                    />
                                                    <div className="form-check mt-2">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            id="showPasswordCheck"
                                                            checked={showPassword}
                                                            onChange={() => setShowPassword(!showPassword)}
                                                        />
                                                        <label className="form-check-label" htmlFor="showPasswordCheck">
                                                            Mostrar contraseña
                                                        </label>
                                                    </div>
                                                    <div className="invalid-feedback">
                                                        {formErrors.password}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col col-rv-12 d-grid mb-3">
                                        <button
                                            type="submit"
                                            id="registro"
                                            className="btn btn-amarillo"
                                        >
                                            Registrar
                                        </button>
                                    </div>
                                    {errorMessage && <div className="text-danger mt-3">{errorMessage}</div>}
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
