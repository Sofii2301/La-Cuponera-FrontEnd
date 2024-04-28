import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import "../css/verify.css";
import Nav from "./Nav";
import Map from "./Map";

export default function VerifyLogin() {
    const { token } = useParams();
    const [verificationToken, setVerificationToken] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const history = useHistory();

    const handleVerifyLogin = async () => {
        try {
            const response = await fetch(`http://localhost:9000/verify-login/${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token: verificationToken })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }

            history.push("/dashboard"); // Redirige al dashboard después de verificar el inicio de sesión
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage(error.message);
        }
    };

    return (
        <>
            <Map />
            <div className="overlay">
                <Nav isSignIn={false} />
                <main>
                    <div className="container-fluid d-flex justify-content-center align-items-center">
                        <div className="row justify-content-center align-items-center">
                            <div className="col-11 col-md-8 col-lg-6 mx-auto">
                                <div className="mb-lg-9 mb-5 text-center">
                                    <h1 className="mb-1 h2 fw-bold titulo">Verificar Inicio de Sesión</h1>
                                    <p className="subtitulo">Ingresa el token de verificación que recibiste por correo electrónico para verificar tu inicio de sesión.</p>
                                </div>
                                {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
                                <div className="mb-3">
                                    <label htmlFor="verificationToken" className="form-label visually-hidden">Token de Verificación</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="verificationToken"
                                        placeholder="Token de Verificación"
                                        value={verificationToken}
                                        onChange={(e) => setVerificationToken(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="d-grid">
                                    <button onClick={handleVerifyLogin} className="btn btn-primary">Verificar Inicio de Sesión</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
