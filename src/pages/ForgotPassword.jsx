import React, { useState } from "react";
import { useIntl } from 'react-intl';
import { Link, useParams } from "react-router-dom";
import ContainerMap from "../components/ContainerMap";
import { getCuponeros, requestPasswordReset as requestPasswordResetCuponero } from "../services/cuponerosService";
import { getVendedores, requestPasswordReset as requestPasswordResetVendedor } from "../services/vendedoresService";

export default function ForgotPassword() {
    const { type } = useParams();
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const intl = useIntl(); 

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validación de email simple antes de enviar la solicitud
        if (!email) {
            setErrorMessage(intl.formatMessage({ id: 'email_error_message', defaultMessage: 'Por favor, ingresá tu mail' }));
            return;
        }

        try {
            if (type === 'cuponero') {
                const cuponeros = await getCuponeros();
                const user = cuponeros.find(cuponero => cuponero.email === email);
                if (user) {
                    const cuponeroData = { email: user.email, password: user.password };
                    await requestPasswordResetCuponero(cuponeroData, user.id);
                    setSuccessMessage(intl.formatMessage({ id: 'check_email', defaultMessage: 'Revisa tu correo para las instrucciones de restablecimiento.' }));
                    setErrorMessage('');
                } else {
                    setErrorMessage(intl.formatMessage({ id: 'user_not_found_cuponero', defaultMessage: 'No se encontró un usuario cuponero con ese email.' }));
                }
            } else {
                const vendedores = await getVendedores();
                const user = vendedores.find(vendedor => vendedor.user_email === email);
                if (user) {
                    const vendedorData = {
                        user_email: user.user_email,
                        user_pass: user.user_pass
                    };
                    await requestPasswordResetVendedor(vendedorData, user.ID);
                    setSuccessMessage(intl.formatMessage({ id: 'check_email', defaultMessage: 'Revisa tu correo para las instrucciones de restablecimiento.' }));
                    setErrorMessage('');
                } else {
                    setErrorMessage(intl.formatMessage({ id: 'user_not_found_vendedor', defaultMessage: 'No se encontró un usuario vendedor con ese email.' }));
                }
            }
        } catch (error) {
            setErrorMessage(intl.formatMessage({ id: 'reset_error', defaultMessage: 'Error al solicitar restablecimiento de contraseña' }));
        }
    };

    return (
        <ContainerMap title={intl.formatMessage({ id: 'forgot_password', defaultMessage: '¿Olvidaste tu contraseña?' })} 
                      subtitle={intl.formatMessage({ id: 'enter_email_reset', defaultMessage: 'Ingresá tu dirección de correo electrónico asociado a la cuenta y te enviaremos un enlace para que puedas restablecer tu contraseña.' })} 
                      isSignIn="registro">
            <form className="needs-validation" noValidate onSubmit={handleSubmit}>
                <div className="row g-3">
                    <div className="col-12">
                        <label htmlFor="formForgetEmail" className="form-label visually-hidden">
                            {intl.formatMessage({ id: 'email', defaultMessage: 'Email' })}
                        </label>
                        <input 
                            type="email" 
                            className="form-control" 
                            id="formForgetEmail" 
                            placeholder={intl.formatMessage({ id: 'email', defaultMessage: 'Email' })} 
                            value={email} 
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setErrorMessage('');  // Resetea los errores al cambiar el email
                                setSuccessMessage('');  // Resetea el mensaje de éxito
                            }} 
                            required 
                        />
                        <div className="invalid-feedback">
                            {intl.formatMessage({ id: 'email_error_message', defaultMessage: 'Por favor, ingresá tu mail' })}
                        </div>
                    </div>
                    {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
                    {successMessage && <div className="alert alert-success" role="alert">{successMessage}</div>}
                    <div className="col-12 d-grid gap-2">
                        <button type="submit" className="btn btn-rosa">
                            {intl.formatMessage({ id: 'reset_password', defaultMessage: 'Restablecer contraseña' })}
                        </button>
                        <Link to={type === 'vendedor' ? "/signin/vendedor" : '/signin/cuponero'} className="btn btn-azul">
                            {intl.formatMessage({ id: 'back_to_signin', defaultMessage: 'Volver a Iniciar Sesión' })}
                        </Link>
                    </div>
                </div>
            </form>
        </ContainerMap>
    );
}
