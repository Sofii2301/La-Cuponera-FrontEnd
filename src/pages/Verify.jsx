import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { sendVerificationEmailC, verifyTokenC } from '../services/cuponerosService';
import { sendVerificationEmailV, verifyTokenV } from '../services/vendedoresService';
import ContainerMap from "../components/ContainerMap"

export default function Verify() {
    const { userType, email } = useParams();
    const navigate = useNavigate();
    const [token, setToken] = useState("");
    const [verificationStatus, setVerificationStatus] = useState(null);
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState("");
    const location = useLocation();


    useEffect(() => {
        if (email) {
            if (userType === "vendedor") {
                sendVerificationEmailV(email).then(data => {
                    if (data.success) {
                        setMessage('Correo de verificación enviado. Revisa tu bandeja de entrada.');
                    } else {
                        setMessage('Error al enviar el correo de verificación.');
                    }
                });
            }
            if (userType === "cuponero") {
                sendVerificationEmailC(email).then(data => {
                    if (data.success) {
                        setMessage('Correo de verificación enviado. Revisa tu bandeja de entrada.');
                    } else {
                        setMessage('Error al enviar el correo de verificación.');
                    }
                });
            }
        }
    }, [email]);

    const handleVerifyToken = () => {
        if (userType === "vendedor") {
            verifyTokenV(email, token).then(data => {
                if (data.success) {
                    setVerificationStatus("verified");
                    setMessage('Token verificado con éxito.');
                    navigate(`/${userType}`)
                    //navigate(`/thank-you/${userType}?verified=true`);
                } else {
                    setVerificationStatus("failed");
                    setErrorMessage(data.message);
                    setMessage('Token inválido. Inténtalo de nuevo.');
                }
            });
        }
        if (userType === "cuponero") {
            verifyTokenC(email, token).then(data => {
                if (data.success) {
                    setVerificationStatus("verified");
                    setMessage('Token verificado con éxito.');
                    navigate(`/${userType}`)
                    //navigate(`/thank-you/${userType}?verified=true`);
                } else {
                    setVerificationStatus("failed");
                    setErrorMessage(data.message);
                    setMessage('Token inválido. Inténtalo de nuevo.');
                }
            });
        }    
    };

    const handleLater = () => {
        // Si el usuario desea verificar en otro momento
        // Redirigir a la página de agradecimiento indicando que no se verificó la cuenta
        //navigate(`/thank-you/${userType}?verified=false`);
        navigate(`/${userType}`)
    };

    /*useEffect(() => {
        if (userType === "vendedor") {
            const vendedorData = JSON.parse(localStorage.getItem("vendedorData"));
            if (!vendedorData.registroVendedor) {
                console.log("Verify-registro ppal: ", vendedorData.registroVendedor);
                navigate("/signup/vendedor");
            }
        }
        /*if (userType==="vendedor"){
            Verificar si el registro principal del vendedor está completo
            /*else {// Verificar si el registro total del vendedor está completo
                if (vendedorData.registroVendedorCompleto) {
                    console.log("Verify-registro total: ", vendedorData.registroVendedorCompleto);
                    navigate("/vendedor/");
                } 
            }
        }
    }, []);*/

    return (
        <>
            <ContainerMap 
                title="Verificar Cuenta" 
                /*subtitle="Ingresa el código de verificación que recibiste por correo electrónico para verificar tu cuenta" */
                subtitle="Estamos trabajando en el proceso de veriificación, por ahora selecciona 'Verificar en otro momento', te avisaremos cuando puedas verificar tu correo" 
                isSignIn="sesion" 
            >
                {message && <p>{message}</p>}
                {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
                <div className="mb-3">
                    <label htmlFor="verificationToken" className="form-label visually-hidden">Código de Verificación</label>
                    <input
                        type="text"
                        className="form-control"
                        id="verificationToken"
                        placeholder="Código de Verificación"
                        value={token}
                        onChange={(e) => setToken(e.target.value)}
                        required
                    />
                </div>
                <div className="d-grid gap-2">
                    <button onClick={handleVerifyToken} className="btn btn-secondary">Verificar Cuenta</button>
                    <button onClick={handleLater} className="btn btn-azul">Verificar en otro momento</button>
                </div>
                {verificationStatus === "failed" && <p>Error: No se pudo verificar el token.</p>}
                {verificationStatus === "error" && <p>{errorMessage}</p>}
            </ContainerMap>
        </>
    );
}
