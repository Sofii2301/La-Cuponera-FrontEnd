import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import cuponikWide from "../assets/cuponik/web2.png";
import cuponikTall from "../assets/cuponik/Celular-pose-PNG.png";

export default function RegistroVendedor(props) {
    const navigate = useNavigate(); 
    const [formData, setFormData] = useState({
        storeName: '',
        storeAddress: '',
        phoneNumber: '',
        storeDescription: '',
        email: '',
        password: '',
        type:'vendedor',
        socialInstagram: '',
        socialFacebook: '',
        socialLinkedin: '',
        socialOtro: '',
        websiteLink: '',
        storeHours: '',
        representativeName: '',
        companyNIT: '',
        categories: [], 
        portada: "",
        logo: ""
    });
    const [formErrors, setFormErrors] = useState({
        storeName: '',
        phoneNumber: '',
        storeDescription: '',
        email: '',
        password: ''
    });
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        const isValid = validateForm();
        if (!isValid) {
            return; // No enviar el formulario si hay errores
        }

        try {
            const response = await fetch('http://localhost:9000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            console.log(response);
            if (response.ok) {
                const data = await response.json();
                console.log(data); // Manejar la respuesta según sea necesario
                const vendedorId = data.id; // ID generado por la base de datos
                const registroVendedorValue = true;
                const registroVendedorCompletoValue = false;

                // Guardar el ID del vendedor y los datos del vendedor en localStorage
                localStorage.setItem("vendedorData", JSON.stringify({ id: vendedorId, ...formData, cupones: [], registroVendedor: registroVendedorValue, registroVendedorCompleto: registroVendedorCompletoValue }));
                
                const vendedorData = JSON.parse(localStorage.getItem("vendedorData"));
                console.log("RegistroVendedor-registro ppal: ", vendedorData.registroVendedor);
                console.log("RegistroVendedor-registro total: ", vendedorData.registroVendedorCompleto);

                const userType = 'vendedor'; // o 'cuponero', dependiendo del tipo de registro
                navigate(`/signup/verify/${userType}/${formData.email}`); // Navega a la página verificacion del correo
            } else {
                throw new Error('Error al registrar el vendedor');
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('Error interno del servidor');
        }
    };

    const validateForm = () => {
        let isValid = true;
        const errors = {};

        // Validar cada campo
        if (formData.storeName.trim() === '') {
            errors.storeName = 'Por favor, ingresa el nombre de tu tienda';
            isValid = false;
        }

        if (formData.phoneNumber.trim() === '') {
            errors.phoneNumber = 'Por favor, ingresa un número de teléfono';
            isValid = false;
        }

        if (formData.email.trim() === '') {
            errors.email = 'Por favor, ingresa el correo electrónico de tu marca';
            isValid = false;
        }

        if (formData.password.trim() === '') {
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
                overlay.style.height = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight) + 'px';
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
            <Nav isSignIn={"sesion"} />
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
                                <form id="storeRegistrationForm">
                                    <div className="row row-1-home g-3">
                                        <div className="col col-rv mb-3">
                                            <label htmlFor="storeName" className="form-label">
                                                Nombre de la tienda
                                            </label>
                                            <input
                                                type="text"
                                                className={`form-control ${formErrors.storeName && 'is-invalid'}`}
                                                id="storeName"
                                                name="storeName"
                                                value={formData.storeName}
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
                                                id="storeAddress"
                                                name="storeAddress"
                                                value={formData.storeAddress}
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
                                                id="phoneNumber"
                                                name="phoneNumber"
                                                value={formData.phoneNumber}
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
                                                id="storeDescription"
                                                name="storeDescription"
                                                value={formData.storeDescription}
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
                                                        type="password"
                                                        className={`form-control ${formErrors.password && 'is-invalid'}`}
                                                        id="formSignupPassword"
                                                        name="password"
                                                        value={formData.password}
                                                        onChange={handleChange}
                                                        placeholder="********"
                                                        required
                                                    />
                                                    <span className="eye-icon-container"><i className="bi bi-eye-slash passwordToggler"></i></span>
                                                    <div className="invalid-feedback">
                                                        {formErrors.password}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col col-rv-12 d-grid">
                                        <button
                                            type="submit"
                                            onClick={handleRegister}
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
