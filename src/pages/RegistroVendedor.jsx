import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../css/registro_vendedor.css";
import Nav from "./Nav";
import cuponik from "../assets/cuponik/web2.png";

export default function RegistroVendedor(props) {
    const navigate = useNavigate(); // Utiliza el hook useNavigate para la navegación
    
    const [formData, setFormData] = useState({
        storeName: '',
        storeAddress: '',
        phoneNumber: '',
        storeDescription: '',
        email: '',
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
                console.log(data); // Manejar la respuesta según sea necesario
                const userType = 'vendedor'; // O 'vendedor' según corresponda
                navigate(`/thank-you/${userType}`); // Navega a la página de agradecimiento con el tipo de usuario
            } else {
                throw new Error('Error al registrar el vendedor');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return(
        <>
            <div className="bottom-image">
                <img src={cuponik} alt="cuponik" className="cuponik" />
            </div>
            <Nav isSignIn={"sesion"} />
            <div className="overlay-r">
                <section className="my-lg-14 my-8">
                    <div className="container">
                        <div className="row justify-content-center align-items-center">
                            <div className="container mt-5">
                                <div className="mb-lg-9 mb-5 text-center">
                                    <h1 className="mb-1 h2 fw-bold titulo">¡Hola Vendedor!</h1>
                                    <p id="subtitulo">
                                        ¡Bienvenido a La Cuponera! Registra tu Tienda on-line de OFERTAS
                                    </p>
                                </div>
                                <form id="storeRegistrationForm" className="needs-validation" onSubmit={handleRegister} noValidate>
                                    <div className="row g-3">
                                        <div className="col mb-3">
                                            <label htmlFor="storeName" className="form-label">
                                                Nombre de la tienda
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="storeName"
                                                name="storeName"
                                                value={formData.storeName}
                                                onChange={handleChange}
                                                placeholder="Ingresa el nombre de tu tienda"
                                                required
                                            />
                                            <div className="invalid-feedback">
                                                Por favor, ingresa el nombre de tu tienda
                                            </div>
                                        </div>
                                        <div className="col mb-3">
                                            <label htmlFor="storeAddress" className="form-label">
                                                Tienda Física
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="storeAddress"
                                                name="storeAddress"
                                                value={formData.storeAddress}
                                                onChange={handleChange}
                                                placeholder="Dirección de tu tienda física"
                                                required
                                            />
                                            <div className="invalid-feedback">
                                                Por favor, ingresa la dirección de tu tienda
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row g-3">
                                        <div className="col mb-3">
                                            <label htmlFor="phoneNumber" className="form-label">
                                                Teléfono de Contacto
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="phoneNumber"
                                                name="phoneNumber"
                                                value={formData.phoneNumber}
                                                onChange={handleChange}
                                                placeholder="Número de Contacto / Whatsapp Business"
                                                required
                                            />
                                            <div className="invalid-feedback">
                                                Por favor, ingresa un número de teléfono
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row g-3">
                                        <div className="col mb-3">
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
                                        <div className="col mb-3">
                                            <label htmlFor="formSignupEmail" className="form-label">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                id="formSignupEmail"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="Correo electrónico"
                                                required
                                            />
                                            <div className="invalid-feedback">
                                                Por favor, ingresa el correo electrónico de tu marca
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row g-3">
                                        <div className="col mb-3">
                                            <div className="password-field position-relative">
                                                <label htmlFor="formSignupPassword" className="form-label">
                                                    Contraseña
                                                </label>
                                                <div className="password-field position-relative">
                                                    <input
                                                        type="password"
                                                        className="form-control fakePassword"
                                                        id="formSignupPassword"
                                                        name="password"
                                                        value={formData.password}
                                                        onChange={handleChange}
                                                        placeholder="********"
                                                        required
                                                    />
                                                    <span><i className="bi bi-eye-slash passwordToggler"></i></span>
                                                    <div className="invalid-feedback">
                                                        Por favor, ingresa tu contraseña
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 d-grid">
                                        <button
                                            type="submit"
                                            id="registro"
                                            style={{ backgroundColor: "#F9ED48", border: "none", color: "black" }}
                                            className="btn btn-primary"
                                        >
                                            Registrar
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
