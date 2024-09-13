import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCuponeroById, updateCuponero } from '../services/cuponerosService';
import { getVendedorById, updateVendor } from '../services/vendedoresService';
import { useAuth } from '../services/AuthContext';
import ContainerMap from "../components/ContainerMap";

export default function Verify() {
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
                    }
                    setUserData(userData);
                } else if (authState.userType === 'cuponero') {
                    data = await getCuponeroById(authState.user);
                    setUserData(data);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error al cargar los datos del usuario:', error);
                setErrorMessage('Error al cargar los datos del usuario.');
                setLoading(false);
            }
        };

        fetchUserData();
    }, [authState.user, authState.userType, navigate]);

    const handleVerifyToken = async () => {
        setErrorMessage('');
        setMessage('');
        try {
            const isValid = verifyToken(enteredToken, userData.tokenValidacion);
            if (isValid) {
                await updateUserData('Aprobada');
                setUserData(prevState => ({ ...prevState, estadoVerificacion: 'Aprobada' }));
                setMessage('Token verificado con éxito.');
                if (authState.userType === 'vendedor') {
                    navigate(`/vendedor/perfil/vista-previa`);
                } else {
                    navigate(`/`);
                }
            } else {
                await updateUserData('Desaprobada');
                setUserData(prevState => ({ ...prevState, estadoVerificacion: 'Desaprobada' }));
                setMessage('Token inválido. Inténtalo de nuevo.');
            }
        } catch (error) {
            console.error('Error al verificar el token:', error);
            setErrorMessage('Error al verificar el token.');
        }
    };

    const verifyToken = (enteredToken, tokenValidacion) => {
        // Asegurarse de que ambos sean tratados como cadenas para la comparación
        return enteredToken.trim() === tokenValidacion.toString();
    };

    const updateUserData = async (estadoVerificacion) => {
        try {
            // Solo actualizamos el campo estadoVerificacion
            const updatedUserData = { estadoVerificacion };
            if (authState.userType === 'vendedor') {
                await updateVendor(authState.user, updatedUserData);
            } else if (authState.userType === 'cuponero') {
                await updateCuponero(authState.user, updatedUserData);
            }
        } catch (error) {
            console.error('Error al actualizar el usuario:', error);
            setErrorMessage('Error al actualizar el usuario');
        }
    };

    if (loading) {
        return <p>Cargando...</p>;
    }

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
                        value={enteredToken}
                        onChange={(e) => setEnteredToken(e.target.value)}
                        required
                    />
                </div>
                <div className="d-grid gap-2 p-2">
                    <button onClick={handleVerifyToken} className="btn btn-rosa">Verificar Cuenta</button>
                </div>
                {userData.estadoVerificacion === "Desaprobada" && <p>Error: No se pudo verificar el token.</p>}
            </ContainerMap>
        </>
    );
}
