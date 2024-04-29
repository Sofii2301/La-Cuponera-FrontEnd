import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../css/map.css";
import "../css/registro_cuponero.css";
import Map from "./Map";
import Nav from "./Nav.jsx";
import winwin from "../assets/winwin/NuevoWinWin.gif";
import google from "../assets/icon-google.png"
import face from "../assets/icon-face.png"

export default function RegistroCuponero(props) {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });
    const [formErrors, setFormErrors] = useState({
        firstName: '',
        lastName: '',
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

            const data = await response.json();

            if (response.ok) {
                console.log(data.message);
                const userType = 'cuponero'; // o 'vendedor', dependiendo del tipo de registro
                navigate(`/signup/verify/${userType}/${formData.email}`); // Navega a la página verificacion del correo
            } else {
                setErrorMessage(data.message);
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
        if (formData.firstName.trim() === '') {
            setErrorMessage('Por favor, ingresa tu nombre');
            isValid = false;
        }

        if (formData.lastName.trim() === '') {
            setErrorMessage('Por favor, ingresa tu apellido');
            isValid = false;
        }

        if (formData.email.trim() === '') {
            setErrorMessage('Por favor, ingresa tu correo electrónico');
            isValid = false;
        }

        if (formData.password.trim() === '') {
            setErrorMessage('Por favor, ingresa tu contraseña');
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
                                <form className="needs-validation">
                                    <div className="mb-3 fila-rc">
                                        <div className="col-rc">
                                            <label htmlFor="formSignupfname" className="form-label visually-hidden">Nombre</label>
                                            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className={`form-control ${formErrors.firstName && 'is-invalid'}`} id="formSignupfname" placeholder="Nombre" required />
                                            <div className="invalid-feedback">{formErrors.firstName}</div>
                                        </div>
                                        <div className="col-rc">
                                            <label htmlFor="formSignuplname" className="form-label visually-hidden">Apellido</label>
                                            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className={`form-control ${formErrors.lastName && 'is-invalid'}`} id="formSignuplname" placeholder="Apellido" required />
                                            <div className="invalid-feedback">{formErrors.lastName}</div>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="formSignupEmail" className="form-label visually-hidden">Email</label>
                                        <input type="email" name="email" value={formData.email} onChange={handleChange} className={`form-control ${formErrors.email && 'is-invalid'}`} id="formSignupEmail" placeholder="Correo electrónico" required />
                                        <div className="invalid-feedback">{formErrors.email}</div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="formSignupPassword" className="form-label visually-hidden">Contraseña</label>
                                        <input type="password" name="password" value={formData.password} onChange={handleChange} className={`form-control ${formErrors.password && 'is-invalid'}`} id="formSignupPassword" placeholder="Contraseña" required />
                                        <div className="invalid-feedback">{formErrors.password}</div>
                                    </div>
                                    {errorMessage && <div className="text-danger mt-3">{errorMessage}</div>}
                                    <div className="mb-3">
                                        <button type="submit" onClick={handleRegister} style={{ backgroundColor: '#f9ec00', border: 'none', color: 'black', width: "100%" }} className="btn btn-primary">Registrar</button>
                                    </div>
                                    <div className="registro-con">
                                        <div className="col-12 d-grid">
                                            <button type="button" id="registro-google" className="btn btn-primary">
                                            <img src={google} alt="Google" />
                                            <p>Registrate con Google</p>
                                            </button>
                                        </div>
                                        <div className="col-12 d-grid">
                                            <button type="button" id="registro-facebook" className="btn btn-primary">
                                            <img src={face} alt="Facebook" />
                                            <p>Registrate con Facebook</p>
                                            </button>
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
