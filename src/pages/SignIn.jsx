import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/registro_cuponero.css";
import Nav from "./Nav";
import Map from "./Map";

export default function SignIn(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const response = await fetch('http://localhost:9000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data); // Manejar la respuesta según sea necesario
            } else {
                throw new Error('Error al iniciar sesión');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return(
        <>
            <Map/>
            <div className="overlay">
                <Nav isSignIn={false} />

                <main>
                    <div className="container-fluid d-flex justify-content-center align-items-center">
                    <div className="row justify-content-center align-items-center">
                        <div className="formulario col-11 col-md-8 col-lg-6 mx-auto">
                        <div className="mb-lg-9 mb-5">
                            <h1 className="mb-1 h2 fw-bold titulo">Ingresá a Cuponera</h1>
                            <p id="subtitulo">¡Bienvenido de nuevo a Cuponera! Ingresá tu correo electrónico para comenzar.</p>
                        </div>
                        <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                            <div className="row g-3">
                                <div className="col-12">
                                    <label htmlFor="formSigninEmail" className="form-label visually-hidden">Email</label>
                                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="formSigninEmail" placeholder="Email" required />
                                    <div className="invalid-feedback">Por favor, ingresá tu mail</div>
                                </div>
                                <div className="col-12">
                                    <div className="password-field position-relative">
                                        <label htmlFor="formSigninPassword" className="form-label visually-hidden">Contraseña</label>
                                        <div className="password-field position-relative">
                                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}  className="form-control fakePassword" id="formSigninPassword" placeholder="********" required />
                                            <span><i className="bi bi-eye-slash passwordToggler"></i></span>
                                            <div className="invalid-feedback">Por favor, ingresá tu contraseña</div>
                                        </div>
                                    </div>
                                 </div>
                                 <div className="d-flex justify-content-between">
                                    <div className="form-check">
                                          <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                          <label className="form-check-label" htmlFor="flexCheckDefault">Recordarme</label>
                                    </div>
                                    <div>
                                          <Link style={{ color:"#f9ec00"}} to="/forgot-password">¿Olvidaste tu contraseña?</Link>
                                    </div>
                                 </div>
                                <div className="col-12 d-grid">
                                    <button type="submit" id="sesion" style={{ backgroundColor: '#f9ec00', border: 'none', color: 'black' }} className="btn btn-primary">Iniciar Sesión</button>
                                </div>
                            <div>¿Aún no tenés una cuenta? <Link to="/" style={{ color: '#f9ec00' }}>Registrarse</Link></div>
                            </div>
                        </form>
                        </div>
                    </div>
                    </div>
                </main>
            </div>
        </>
    )
}
