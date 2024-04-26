import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../css/map.css";
import "../css/registro_cuponero.css";
import Map from "./Map";
import Nav from "./Nav.jsx";
import winwin from "../assets/winwin/NuevoWinWin.gif";

export default function RegistroCuponero(props) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        password: ''
    });
    const [formErrors, setFormErrors] = useState({
        email: '',
        firstName: '',
        lastName: '',
        password: ''
    });

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

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                const userType = 'cuponero';
                navigate(`/thank-you/${userType}`);
            } else {
                throw new Error('Error al registrar el usuario');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const validateForm = () => {
        let isValid = true;
        const errors = {};

        // Validar cada campo
        if (formData.firstName.trim() === '') {
            errors.firstName = 'Por favor, ingresa tu nombre';
            isValid = false;
        }

        if (formData.lastName.trim() === '') {
            errors.lastName = 'Por favor, ingresa tu apellido';
            isValid = false;
        }

        if (formData.email.trim() === '') {
            errors.email = 'Por favor, ingresa tu correo electrónico';
            isValid = false;
        }

        if (formData.password.trim() === '') {
            errors.password = 'Por favor, ingresa tu contraseña';
            isValid = false;
        }

        setFormErrors(errors);
        return isValid;
    };

    return(
        <>
            <Map/>
            <div className="overlay">
                <Nav isSignIn={"sesion"} />
                <main>
                    <img id="winwin1" src={winwin} alt="WinWin" className="img-fluid" />
                    <img id="winwin2" src={winwin} alt="WinWin" className="img-fluid" />
                    <div className="container-fluid d-flex justify-content-center align-items-center">
                        <div className="fila row justify-content-center align-items-center">
                            <div className="formulario col-11 col-md-8 col-lg-6 mx-auto">
                                <div className="mb-lg-9 mb-5 text-center">
                                    <h1 className="mb-1 h2 fw-bold titulo">Empezá a conseguir cupones</h1>
                                    <p id="subtitulo">¡Bienvenido a La Cuponera! Ingresá tu correo electrónico para comenzar.</p>
                                </div>
                                <form id="registration-form" className="needs-validation" onSubmit={handleRegister} noValidate>
                                    <div className="row row-form">
                                        <div className="col-12">
                                            <label htmlFor="formSignfname" className="form-label visually-hidden">Nombre</label>
                                            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className={`form-control ${formErrors.firstName && 'is-invalid'}`} id="formSignupfname" placeholder="Nombre" required />
                                            <div className="invalid-feedback">{formErrors.firstName}</div>
                                        </div>
                                        <div className="col-12">
                                            <label htmlFor="formSignuplname" className="form-label visually-hidden">Apellido</label>
                                            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className={`form-control ${formErrors.lastName && 'is-invalid'}`} id="formSignuplname" placeholder="Apellido" required />
                                            <div className="invalid-feedback">{formErrors.lastName}</div>
                                        </div>
                                        <div className="col-12">
                                            <label htmlFor="formSignupEmail" className="form-label visually-hidden">Email</label>
                                            <input type="email" name="email" value={formData.email} onChange={handleChange} className={`form-control ${formErrors.email && 'is-invalid'}`} id="formSignupEmail" placeholder="Correo electrónico" required />
                                            <div className="invalid-feedback">{formErrors.email}</div>
                                        </div>
                                        <div className="col-12">
                                            <label htmlFor="formSignupPassword" className="form-label visually-hidden">Contraseña</label>
                                            <input type="password" name="password" value={formData.password} onChange={handleChange} className={`form-control ${formErrors.password && 'is-invalid'}`} id="formSignupPassword" placeholder="Contraseña" required />
                                            <div className="invalid-feedback">{formErrors.password}</div>
                                        </div>
                                        <div className="col-12 d-grid">
                                            <button type="submit" style={{ backgroundColor: '#f9ec00', border: 'none', color: 'black' }} className="btn btn-primary">Registrar</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
