import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import ContainerMap from "../components/ContainerMap"

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
        <ContainerMap title="Verificar Inicio de Sesión" subtitle="Ingresa el token de verificación que recibiste por correo electrónico para verificar tu inicio de sesión." >
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
                <button onClick={handleVerifyLogin} className="btn btn-rosa">Verificar Inicio de Sesión</button>
            </div>
        </ContainerMap>
        </>
    );
}
