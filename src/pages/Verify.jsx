import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { sendVerificationEmailC, verifyTokenC, getCuponeroById, updateCuponero } from '../services/cuponerosService';
import { sendVerificationEmailV, verifyTokenV, getVendedorById, updateVendor } from '../services/vendedoresService';
import { useAuth } from '../services/AuthContext';
import ContainerMap from "../components/ContainerMap";

export default function Verify() {
    const { authState } = useAuth();
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        email: '',
        estadoVerificacion: ''
    });
    const [token, setToken] = useState("");
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        console.log("AuthState in Verify: ", authState);
        if (!authState.user) {
            navigate('/');
            return;
        }

        const fetchUserData = async () => {
            try {
                let data;
                if (authState.userType === 'vendedor') {
                    data = await getVendedorById(authState.user);
                } else if (authState.userType === 'cuponero') {
                    data = await getCuponeroById(authState.user);
                }
                setUserData(data);
                console.log('data: ', data);

                if (data.email) {
                    if (authState.userType === "vendedor") {
                        const response = await sendVerificationEmailV(data.email);
                        setMessage(response.success ? 'Correo de verificación enviado. Revisa tu bandeja de entrada.' : 'Error al enviar el correo de verificación.');
                    } else if (authState.userType === "cuponero") {
                        const response = await sendVerificationEmailC(data.email);
                        setMessage(response.success ? 'Correo de verificación enviado. Revisa tu bandeja de entrada.' : 'Error al enviar el correo de verificación.');
                    }
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                setErrorMessage('Error al cargar los datos del usuario.');
            }
        };

        fetchUserData();
    }, [authState.user, authState.userType, navigate]);

    useEffect(() => {
        console.log('email: ', userData.email);
        console.log('verify: ', userData.estadoVerificacion);
        if (userData.estadoVerificacion === 'Aprobada') {
            navigate(`/${authState.userType}`);
        }
    }, [userData, authState.userType, navigate]);

    const handleVerifyToken = async () => {
        try {
            let response;
            if (authState.userType === "vendedor") {
                response = await verifyTokenV(userData.email, token);
            } else if (authState.userType === "cuponero") {
                response = await verifyTokenC(userData.email, token);
            }
            
            if (response.success) {
                setUserData(prevState => ({ ...prevState, estadoVerificacion: 'Aprobada' }));
                setMessage('Token verificado con éxito.');
                await updateUserData();
                navigate(`/${authState.userType}`);
            } else {
                setUserData(prevState => ({ ...prevState, estadoVerificacion: 'Desaprobada' }));
                setErrorMessage(response.message);
                setMessage('Token inválido. Inténtalo de nuevo.');
            }
        } catch (error) {
            console.error('Error verifying token:', error);
            setErrorMessage('Error al verificar el token.');
        }
    };

    const handleLater = async () => {
        setUserData(prevState => ({ ...prevState, estadoVerificacion: 'Aprobada' }));
        await updateUserData();
        navigate(`/${authState.userType}`);
    };

    const updateUserData = async () => {
        try {
            if (authState.userType === 'vendedor') {
                await updateVendor(authState.user, userData);
            } else if (authState.userType === 'cuponero') {
                await updateCuponero(authState.user, userData);
            }
        } catch (error) {
            console.error('Error updating user data:', error);
            setErrorMessage('Error al actualizar el usuario');
        }
    };

    return (
        <>
            <ContainerMap 
                title="Verificar Cuenta" 
                subtitle={`Ingresa el código de verificación que recibiste al correo electrónico ${userData.email} para verificar tu cuenta.`}
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
                    <button onClick={handleVerifyToken} className="btn btn-rosa">Verificar Cuenta</button>
                    <button onClick={handleLater} className="btn btn-azul">Verificar en otro momento</button>
                </div>
                {userData.estadoVerificacion === "Desaprobada" && <p>Error: No se pudo verificar el token.</p>}
                {errorMessage && <p>{errorMessage}</p>}
            </ContainerMap>
        </>
    );
}
