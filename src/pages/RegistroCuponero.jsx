import React, { useState } from "react";
import { useIntl } from 'react-intl';
import { Link, useNavigate } from "react-router-dom";
import ContainerMap from "../components/ContainerMap";
import GoogleLoginButton from "../components/GoogleLoginButton";
import FacebookLoginButton from "../components/FacebookLoginButton";
import { useAuth } from '../context/AuthContext';
import { useCart } from "../context/CartContext";

/*  id: {type: Number, required: false},
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    registroFecha: {type: String, required: false },
    estadoVerificacion: { type: String, required: false, enum: ['Pendiente', 'Aprobada', 'Desaprobada'] }, 
*/

export default function RegistroCuponero() {
    const intl = useIntl();
    const navigate = useNavigate();
    const { register } = useAuth();
    const { emptyCart } = useCart();
    const [formData, setFormData] = useState({
        nombre: "",
        apellido: "",
        email: "",
        password: "",
        registroFecha: new Date().toISOString(),
        estadoVerificacion: "Pendiente",
    });
    const [formErrors, setFormErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isValid = validateForm();
        if (!isValid) {
            return;
        }

        try {
            const userType = 'cuponero';
            await register(formData, userType);
            emptyCart();
            navigate(`/signup/verify/`);
        } catch (err) {
            console.error('Error:', err);
            setErrorMessage(intl.formatMessage({ id: 'registration_error', defaultMessage: 'Error al registrarse' })+': '+err.message);
        }
    };

    const validateForm = () => {
        const errors = {};
        let isValid = true;

        if (formData.nombre.trim() === '') {
            errors.nombre = intl.formatMessage({ id: 'name_error_message', defaultMessage: 'Por favor, ingresa tu nombre' });
            isValid = false;
        }

        if (formData.apellido.trim() === '') {
            errors.apellido = intl.formatMessage({ id: 'last_name_error_message', defaultMessage: 'Por favor, ingresa tu apellido' });
            isValid = false;
        }

        if (formData.email.trim() === '') {
            errors.email = intl.formatMessage({ id: 'email_error_message', defaultMessage: 'Por favor, ingresa tu mail' });
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errors.email = intl.formatMessage({ id: 'invalid_email', defaultMessage: 'Email inválido' });
            isValid = false;
        }

        if (formData.password.trim() === '') {
            errors.password = intl.formatMessage({ id: 'password_error_message', defaultMessage: 'Por favor, ingresa tu contraseña' });
            isValid = false;
        } else if (formData.password.length < 6) {
            errors.password = intl.formatMessage({ id: 'password_length', defaultMessage: 'La contraseña debe tener al menos 6 caracteres' });
            isValid = false;
        }

        setFormErrors(errors);
        return isValid;
    };

    return (
        <>
            <ContainerMap 
                title={intl.formatMessage({ id: 'register_title', defaultMessage: '¡Registrate y comenzá a ahorrar!' })} 
                subtitle={intl.formatMessage({ id: 'register_subtitle', defaultMessage: '¡Bienvenido a La Cuponera! Ingresá tu correo electrónico para comenzar' })} 
                isSignIn="sesion-c" 
                imagen="r-cuponero"
            >
                <form className="needs-validation" onSubmit={handleSubmit}>
                    <div className="mb-3 fila-rc">
                        <div className="col-rc">
                            <label htmlFor="formSignupfname" className="form-label visually-hidden">
                                {intl.formatMessage({ id: 'first_name', defaultMessage: 'Nombre' })}
                            </label>
                            <input
                                type="text"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                className={`form-control ${formErrors.nombre && 'is-invalid'}`}
                                id="formSignupfname"
                                placeholder={intl.formatMessage({ id: 'enter_first_name', defaultMessage: 'Ingresa tu nombre' })}
                                required
                            />
                            {formErrors.nombre && <div className="invalid-feedback">{formErrors.nombre}</div>}
                        </div>
                        <div className="col-rc">
                            <label htmlFor="formSignuplname" className="form-label visually-hidden">
                                {intl.formatMessage({ id: 'last_name', defaultMessage: 'Apellido' })}
                            </label>
                            <input
                                type="text"
                                name="apellido"
                                value={formData.apellido}
                                onChange={handleChange}
                                className={`form-control ${formErrors.apellido && 'is-invalid'}`}
                                id="formSignuplname"
                                placeholder={intl.formatMessage({ id: 'enter_last_name', defaultMessage: 'Ingresa tu apellido' })}
                                required
                            />
                            {formErrors.apellido && <div className="invalid-feedback">{formErrors.apellido}</div>}
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="formSignupEmail" className="form-label visually-hidden">
                            {intl.formatMessage({ id: 'email', defaultMessage: 'Email' })}
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`form-control ${formErrors.email && 'is-invalid'}`}
                            id="formSignupEmail"
                            placeholder={intl.formatMessage({ id: 'enter_email', defaultMessage: 'Ingresa tu email' })}
                            required
                        />
                        {formErrors.email && <div className="invalid-feedback">{formErrors.email}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="formSignupPassword" className="form-label visually-hidden">
                            {intl.formatMessage({ id: 'password', defaultMessage: 'Contraseña' })}
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={`form-control ${formErrors.password && 'is-invalid'}`}
                            id="formSignupPassword"
                            placeholder={intl.formatMessage({ id: 'enter_password', defaultMessage: 'Ingresa tu conttraseña' })}
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
                                {intl.formatMessage({ id: 'show_password', defaultMessage: 'Mostrar contraseña' })}
                            </label>
                        </div>
                        {formErrors.password && <div className="invalid-feedback">{formErrors.password}</div>}
                    </div>
                    {errorMessage && <div className="text-danger mt-3">{errorMessage}</div>}
                    <div className="mb-4">
                        <button type="submit" className="btn btn-amarillo" style={{ width: "100%" }}>
                            {intl.formatMessage({ id: 'register', defaultMessage: 'Registrar' })}
                        </button>
                    </div>
                </form>
                <div className="border-top"></div>
                <div className="registro-con mb-4 mt-4 d-flex flex-column align-items-center justify-content-center">
                    {intl.formatMessage({ id: 'or_signin_with', defaultMessage: 'o inicia sesión con:' })}
                    <div className="col-12 d-grid mb-2 mt-3">
                        <GoogleLoginButton />
                    </div>
                    <div className="col-12 d-grid">
                        <FacebookLoginButton />
                    </div>
                </div>
                <div className="border-top"></div>
                <div className="d-flex flex-column align-items-center justify-content-center mt-4 mb-2">
                    {intl.formatMessage({ id: 'already_have_account', defaultMessage: '¿Ya tenés una cuenta?' })}
                    <Link to="/signin/cuponero" className="btn btn-azul mt-3 w-100">
                        {intl.formatMessage({ id: 'signin', defaultMessage: 'Iniciar Sesión' })}
                    </Link>
                </div>
            </ContainerMap>
        </>
    );
}
