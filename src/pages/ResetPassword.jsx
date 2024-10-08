import React, { useState, useEffect } from "react";
import { useIntl } from 'react-intl';
import { Link, useParams } from "react-router-dom";
import ContainerMap from "../components/ContainerMap";
import { getCuponeros, updateCuponero } from "../services/cuponerosService";
import { getVendedores, updateVendor } from "../services/vendedoresService";

export default function ResetPassword() {
    const intl = useIntl();
    const { token, userType } = useParams();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const findUserByToken = async () => {
            try {
                if (userType === 'cuponero') {
                    const cuponeros = await getCuponeros();
                    const user = cuponeros.find(cuponero => cuponero.tokenLink === token);
                    console.log('user: ', user)
                    if (user) {
                        setUserId(user.id);
                    } else {
                        setErrorMessage(intl.formatMessage({ id: 'invalid_token_or_user_not_found', defaultMessage: 'Token inválido o usuario no encontrado.' }));
                    }
                } else {
                    const vendedores = await getVendedores();
                    const user = vendedores.find(vendedor => vendedor.tokenLink === token);
                    console.log('user: ', user)
                    if (user) {
                        setUserId(user.ID);
                    } else {
                        setErrorMessage(intl.formatMessage({ id: 'invalid_token_or_user_not_found', defaultMessage: 'Token inválido o usuario no encontrado.' }));
                    }
                }
            } catch (error) {
                setErrorMessage(intl.formatMessage({ id: 'error_searching_for_user', defaultMessage: 'Error al buscar el usuario.' }));
            }
        };

        findUserByToken();
    }, [token, userType]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setErrorMessage(intl.formatMessage({ id: 'passwords_do_not_match', defaultMessage: 'Las contraseñas no coinciden' }));
            return;
        }

        try {
            if (userType === 'cuponero' && userId) {
                await updateCuponero(userId, { password });
                setSuccessMessage(intl.formatMessage({ id: 'password_reset_successfully', defaultMessage: 'Contraseña restablecida con éxito.' }));
            } else if (userType === 'vendedor' && userId) {
                await updateVendor(userId, { user_pass: password });
                setSuccessMessage(intl.formatMessage({ id: 'password_reset_successfully', defaultMessage: 'Contraseña restablecida con éxito.' }));
            } else {
                setErrorMessage(intl.formatMessage({ id: 'error_resetting_password', defaultMessage: 'Error al restablecer la contraseña' }));
            }
        } catch (error) {
            setErrorMessage(intl.formatMessage({ id: 'error_resetting_password', defaultMessage: 'Error al restablecer la contraseña' }));
        }
    };

    return (
        <>
            <ContainerMap title={intl.formatMessage({ id: 'reset_password', defaultMessage: 'Restablecer contraseña' })} subtitle={intl.formatMessage({ id: 'enter_new_password', defaultMessage: 'Ingresa tu nueva contraseña.' })} isSignIn="registro">
                <form className="needs-validation" onSubmit={handleSubmit}>
                    <div className="row g-3">
                        <div className="col-12">
                            <label htmlFor="formNewPassword" className="form-label">{intl.formatMessage({ id: 'new_password', defaultMessage: 'Nueva Contraseña' })}</label>
                            <input 
                                type="password" 
                                className="form-control" 
                                id="formNewPassword" 
                                placeholder={intl.formatMessage({ id: 'enter_new_password', defaultMessage: 'Ingresa tu nueva contraseña' })}
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                required 
                            />
                            <div className="invalid-feedback">{intl.formatMessage({ id: 'new_password_error_message', defaultMessage: 'Por favor, ingresá tu nueva contraseña' })}</div>
                        </div>
                        <div className="col-12">
                            <label htmlFor="formConfirmPassword" className="form-label">{intl.formatMessage({ id: 'confirm_password', defaultMessage: 'Confirmar Contraseña' })}</label>
                            <input 
                                type="password" 
                                className="form-control" 
                                id="formConfirmPassword" 
                                placeholder={intl.formatMessage({ id: 'enter_password_again', defaultMessage: 'Ingresa tu contraseña nuevamente' })} 
                                value={confirmPassword} 
                                onChange={(e) => setConfirmPassword(e.target.value)} 
                                required 
                            />
                            <div className="invalid-feedback">{intl.formatMessage({ id: 'confirm_password_error_message', defaultMessage: 'Por favor, confirmá tu nueva contraseña' })}</div>
                        </div>
                        {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
                        {successMessage && <div className="alert alert-success" role="alert">{successMessage}</div>}
                        <div className="col-12 d-grid gap-2">
                            <button type="submit" className="btn btn-rosa">{intl.formatMessage({ id: 'reset_password', defaultMessage: 'Restablecer contraseña' })}</button>
                        </div>
                        {successMessage &&
                        <div className="col-12 d-grid gap-2">
                            <Link to={`${userType === 'cuponero' ? '/signin/cuponero' : '/signin/vendedor'}`} className="btn btn-amarillo fw-bold">{intl.formatMessage({ id: 'login', defaultMessage: 'Iniciar Sesión' })}</Link>
                        </div>}
                    </div>
                </form>
            </ContainerMap>
        </>
    );
}
