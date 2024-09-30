import { useState, useEffect } from "react";
import { useIntl } from 'react-intl';
import { useNavigate } from "react-router-dom";
import { getCuponeroById, updateCuponero } from '../services/cuponerosService';
import { getVendedorById, updateVendor } from '../services/vendedoresService';
import { useAuth } from '../context/AuthContext';
import ContainerMap from "../components/ContainerMap";
import Loading from '../components/LoadingOverlay';

export default function Verify() {
    const intl = useIntl();
    const { authState } = useAuth();
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        email: '',
        estadoVerificacion: '',
        tokenValidacion: ''
    });
    const [enteredToken, setEnteredToken] = useState('');
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!authState.user) {
            navigate(`/signup/${authState.userType}`);
            return;
        }

        const fetchUserData = async () => {
            try {
                let data;
                if (authState.userType === 'vendedor') {
                    data = await getVendedorById(authState.user);
                    const userData = {
                        email: data.user_email,
                        estadoVerificacion: data.estadoVerificacion,
                        tokenValidacion: data.tokenValidacion
                    };
                    setUserData(userData);
                } else if (authState.userType === 'cuponero') {
                    data = await getCuponeroById(authState.user);
                    setUserData(data);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error al cargar los datos del usuario:', error);
                setErrorMessage(intl.formatMessage({ id: 'error_loading_user_data', defaultMessage: 'Error al cargar los datos del usuario.' }));
                setLoading(false);
            }
        };

        fetchUserData();
    }, [authState.user, authState.userType, navigate, intl]);

    const handleVerifyToken = async () => {
        setErrorMessage('');
        setMessage('');
        try {
            const isValid = verifyToken(enteredToken, userData.tokenValidacion);
            if (isValid) {
                await updateUserData('Aprobada');
                setUserData(prevState => ({ ...prevState, estadoVerificacion: 'Aprobada' }));
                setMessage(intl.formatMessage({ id: 'token_verified_successfully', defaultMessage: 'Token verificado con éxito.' }));
                if (authState.userType === 'vendedor') {
                    navigate(`/vendedor/perfil/vista-previa`);
                } else {
                    navigate(`/`);
                }
            } else {
                await updateUserData('Desaprobada');
                setUserData(prevState => ({ ...prevState, estadoVerificacion: 'Desaprobada' }));
                setMessage(intl.formatMessage({ id: 'invalid_token', defaultMessage: 'Token inválido. Inténtalo de nuevo.' }));
            }
        } catch (error) {
            console.error('Error al verificar el token:', error);
            setErrorMessage(intl.formatMessage({ id: 'error_verifying_token', defaultMessage: 'Error al verificar el token.' }));
        }
    };

    const verifyToken = (enteredToken, tokenValidacion) => {
        return enteredToken.trim() === tokenValidacion.toString();
    };

    const updateUserData = async (estadoVerificacion) => {
        try {
            const updatedUserData = { estadoVerificacion };
            if (authState.userType === 'vendedor') {
                await updateVendor(authState.user, updatedUserData);
            } else if (authState.userType === 'cuponero') {
                await updateCuponero(authState.user, updatedUserData);
            }
        } catch (error) {
            console.error('Error al actualizar el usuario:', error);
            setErrorMessage(intl.formatMessage({ id: 'error_updating_user', defaultMessage: 'Error al actualizar el usuario' }));
        }
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <>
            <ContainerMap
                title={intl.formatMessage({ id: 'verify_account', defaultMessage: 'Verificar Cuenta' })}
                subtitle={intl.formatMessage({ id: 'verification_code_instructions_1', defaultMessage: `Ingresa el código de verificación que recibiste al correo electrónico `+userData.email+ intl.formatMessage({ id: 'verification_code_instructions_2', defaultMessage: ` para verificar tu cuenta.`})})}
                isSignIn="sesion"
            >
                {message && <p>{message}</p>}
                {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
                <div className="mb-3">
                    <label htmlFor="verificationToken" className="form-label visually-hidden">
                        {intl.formatMessage({ id: 'verification_code', defaultMessage: 'Código de Verificación' })}
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="verificationToken"
                        placeholder={intl.formatMessage({ id: 'enter_verification_code', defaultMessage: 'Ingrese el código de verificación' })}
                        value={enteredToken}
                        onChange={(e) => setEnteredToken(e.target.value)}
                        required
                    />
                </div>
                <div className="d-grid gap-2 p-2">
                    <button onClick={handleVerifyToken} className="btn btn-rosa">
                        {intl.formatMessage({ id: 'verify_account', defaultMessage: 'Verificar Cuenta' })}
                    </button>
                </div>
                {userData.estadoVerificacion === "Desaprobada" && (
                    <p>{intl.formatMessage({ id: 'verification_failed', defaultMessage: 'Error: No se pudo verificar el token.' })}</p>
                )}
            </ContainerMap>
        </>
    );
}
