import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { sendVerificationEmailC, verifyTokenC } from '../services/cuponerosService';
import { sendVerificationEmailV, verifyTokenV } from '../services/vendedoresService';
import { getVendedorById, updateVendor } from "../services/vendedoresService";
import { getCuponeroById, updateCuponero } from "../services/cuponerosService";
import { useAuth } from '../services/AuthContext';
import ContainerMap from "../components/ContainerMap"

export default function Verify() {
    const { authState, user } = useAuth();
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        email: '',
        estadoVerificacion: ''
    });
    const [token, setToken] = useState("");
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (!user) {
            navigate('/');
            return
        }

        const fetchData = async () => {
            try {
                let data;
                if (authState.userType === 'vendedor') {
                    data = await getVendedorById(user);
                } else {
                    data = await getCuponeroById(user);
                }
                setUserData(data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        /*
        if(authState.userType === 'vendedor'){
            const fetchVendedorData = async () => {
                try {
                    const data = await getVendedorById(user);
                    console.log('data: ',data);
                    setUserData(data);
                } catch (error) {
                    console.error('Error fetching vendor data:', error);
                }
            };
            
            fetchVendedorData();
        }
        
        if(authState.userType === 'cuponero'){
            const fetchCuponeroData = async () => {
                try {
                    const data = await getCuponeroById(user);
                    console.log('data: ',data);
                    userData.email === data.email;
                    userData.estadoVerificacion === data.estadoVerificacion;
                } catch (error) {
                    console.error('Error fetching vendor data:', error);
                }
            };
            
            fetchCuponeroData();
        }
        */
        console.log('email: ',userData.email);
        console.log('verify: ',userData.estadoVerificacion)
        fetchData();
    }, [authState.userType, user, navigate]);

    useEffect(() => {

        if (userData.estadoVerificacion === 'Aprobada') {
            navigate(`/${authState.userType}`);
        }

        if (userData.email) {
            if (authState.userType === "vendedor") {
                sendVerificationEmailV(userData.email).then(data => {
                    if (data.success) {
                        setMessage('Correo de verificación enviado. Revisa tu bandeja de entrada.');
                    } else {
                        setMessage('Error al enviar el correo de verificación.');
                    }
                });
            }
            if (authState.userType === "cuponero") {
                sendVerificationEmailC(userData.email).then(data => {
                    if (data.success) {
                        setMessage('Correo de verificación enviado. Revisa tu bandeja de entrada.');
                    } else {
                        setMessage('Error al enviar el correo de verificación.');
                    }
                });
            }
        }
    }, [authState.userType]);

    const handleVerifyToken = async () => {
        if (authState.userType === "vendedor") {
            verifyTokenV(userData.email, token).then(data => {
                if (data.success) {
                    userData.estadoVerificacion = 'Aprobada';
                    setMessage('Token verificado con éxito.');
                    updateV();
                    navigate(`/${authState.userType}`)
                    //navigate(`/thank-you/${userType}`);
                } else {
                    userData.estadoVerificacion = 'Desaprobada';
                    setErrorMessage(data.message);
                    setMessage('Token inválido. Inténtalo de nuevo.');
                }
            });
        }
        if (authState.userType === "cuponero") {
            verifyTokenC(userData.email, token).then(data => {
                if (data.success) {
                    userData.estadoVerificacion = 'Aprobada';
                    setMessage('Token verificado con éxito.');
                    updateC();
                    //navigate(`/${authState.userType}`)
                    navigate(`/thank-you/${userType}`);
                } else {
                    userData.estadoVerificacion = 'Desaprobada';
                    setErrorMessage(data.message);
                    setMessage('Token inválido. Inténtalo de nuevo.');
                }
            });
        }    
    };

    const handleLater = () => {
        // Si el usuario desea verificar en otro momento
        // Redirigir a la página de agradecimiento indicando que no se verificó la cuenta
        userData.estadoVerificacion = 'Aprobada';
        updateC();
        //navigate(`/thank-you/${userType}`);
        navigate(`/${authState.userType}`);
    };

    const updateV = async (e) => {
        e.preventDefault();
        try {
            await updateVendor({ user, userData });
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('Error al actualizar el usuario');
        }
    }

    const updateC = async (e) => {
        e.preventDefault();
        try {
            await updateCuponero({ user, userData });
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('Error al actualizar el usuario');
        }
    }

    return (
        <>
            <ContainerMap 
                title="Verificar Cuenta" 
                subtitle={`Ingresa el código de verificación que recibiste al correo electrónico ${userData.email} para verificar tu cuenta.`}
                //subtitle="Estamos trabajando en el proceso de veriificación, por ahora selecciona 'Verificar en otro momento', te avisaremos cuando puedas verificar tu correo" 
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
                {<p>{errorMessage}</p>}
            </ContainerMap>
        </>
    );
}
