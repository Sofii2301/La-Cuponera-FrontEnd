import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Cuponeros from "../../components/Cuponero/Cuponeros";
import { getCuponeroById, obtenerImagenPerfil, updateCuponero, deleteCuponero } from "../../services/cuponerosService"; 
import useCheckIfIsLogged from '../../services/PrivateRoute';
import { useAuth } from '../../services/AuthContext';
import { isNil } from "lodash";
import UploadImage, { uploadTypes } from '../../components/Vendedor/UploadImage';
import logoDefault from "../../assets/logo_default.png";
import GenericModal from '../../components/Modal';
import AddIcon from '@mui/icons-material/Add';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export default function Account() {
    const { idParam } = useParams(); 
    const { logout, user } = useAuth();
    const id = idParam || user;
    const [initialUserData, setInitialUserData] = useState(null);
    const [userData, setUserData] = useState({
        nombre: '',
        apellido: '',
        email: '',
    })
    const [formErrors, setFormErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const [message, setMessage] = useState('');
    const [errorMessagePass, setErrorMessagePass] = useState('');
    const [messagePass, setMessagePass] = useState('');
    const [errorMessageAcc, setErrorMessageAcc] = useState('');
    const [error, setError] = useState(null);
    const [perfil, setPerfil] = useState(null);
    const [showModalImage, setShowModalImage] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
    const isLogged = useCheckIfIsLogged();

    const fetchCuponero = async () => {
        if (!id) {
            setError(new Error("ID de cuponero no proporcionado"));
            return;
        }

        try {
            const data = await getCuponeroById(id);  // Usar el ID del cuponero
            const userDataBd = {
                nombre: data.nombre || '',
                apellido: data.apellido || '',
                email: data.email || '',
            }
            setInitialUserData(userDataBd);
            setUserData(userDataBd);
        } catch (err) {
            setError(err);
        }
    };

    const fetchPerfil = async () => {
        try {
            const perfilImg = await obtenerImagenPerfil(id);
            setPerfil(perfilImg);
        } catch (error) {
            console.error('Error fetching foto de perfil:', error);
        }
    };
    
    useEffect(() => {
        if (!isLogged){
            navigate('/signin/cuponero');
        }
        fetchCuponero();
        fetchPerfil();
        console.log('userData: ', userData)
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevUserData) => ({
            ...prevUserData,
            [name]: name === value
        }));
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        if (name === 'newPassword') setNewPassword(value);
        if (name === 'confirmPassword') setConfirmPassword(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validateForm();
        if (!isValid) {
            return; // No enviar el formulario si hay errores
        }
        try {
            const updatedFields = getUpdatedFields();
            console.log('updatedFields: ', updatedFields)
            if (Object.keys(updatedFields).length > 0) {
                await updateCuponero(id, updatedFields);
                setMessage('Datos actualizados correctamente.');
                navigate('/');
            } else {
                setMessage('No hay cambios para actualizar.');
            }
        } catch (err) {
            console.error('Error:', err);
            setErrorMessage(err.message);
        }
    };

    const getUpdatedFields = () => {
        const updatedFields = {};
        if (!initialUserData) return updatedFields;

        Object.keys(userData).forEach(key => {
            if (userData[key] !== initialUserData[key]) {
                updatedFields[key] = userData[key];
            }
        });

        return updatedFields;
    };

    const validateForm = () => {
        let isValid = true;
        const errors = {};

        // Validar cada campo
        if (String(userData.nombre).trim() === '') {
            errors.nombre = 'Por favor, ingresa tu nombre';
            isValid = false;
        }

        if (String(userData.apellido).trim() === '') {
            errors.apellido = 'Por favor, ingresa tu apellido';
            isValid = false;
        }

        setFormErrors(errors);
        return isValid;
    };

    const validatePassword = () => {
        if (newPassword !== confirmPassword) {
            setErrorMessagePass('Las contraseñas no coinciden');
            return false;
        }
        return true;
    };

    const handlePasswordSubmit = async () => {
        if (!validatePassword()) return;

        try {
            const updatePass = { password: newPassword }
            await updateCuponero(id, updatePass);
            setShowPasswordModal(false);
            setMessagePass('Contraseña actualizada correctamente.');
        } catch (error) {
            console.error('Error:', error);
            setErrorMessagePass(error.message);
        }
    };

    const handleDeleteAccount = async () => {
        try {
            await deleteCuponero(id);
            logout();
            setShowDeleteModal(false);
            navigate('/');
        } catch (error) {
            console.error('Error:', error);
            setErrorMessageAcc(error.message);
        }
    };

    const handleOpenModalImage = () => {
        setShowModalImage(true);
    }
    const handleCloseModalImage = () => setShowModalImage(false);

    const onRefetch = (type) => {
        if(type == uploadTypes.PERFIL) {
            fetchPerfil();
        } 
    }

    return (
        <Cuponeros>
            <div className="row row-sm mt-3">
                <div className="col-lg-12 col-md-12">
                    <div className="card custom-card main-content-body-profile">
                        <div className="tab-content">
                            <div className="main-content-body tab-pane p-4 border-top-0 active" id="about" role="tabpanel">
                                <div className="border rounded-10">
                                    <div className="row p-4 d-flex justify-content-center">
                                        <div className="col-4">
                                            <div className="profile-cuponero">
                                                <div className="logo-button-plus">
                                                    {perfil ? (
                                                        <img src={perfil} alt="Perfil" className="rounded-circle img-perfil-v" />
                                                    ) : (
                                                        <img src={logoDefault} alt="Perfil" className="img-perfil-v" />
                                                    )}
                                                    <>
                                                        <button type="button" className="upload-button-plus perfil-button-plus" onClick={() => handleOpenModalImage('logo')}>
                                                            <AddIcon fontSize="large"></AddIcon>
                                                        </button>
                                                        <GenericModal
                                                            show={showModalImage}
                                                            handleClose={handleCloseModalImage}
                                                            title="Actualizar Foto de Perfil"
                                                        >
                                                            <UploadImage
                                                                cuponeroId={id}
                                                                type={uploadTypes.PERFIL}
                                                                existingImage={!isNil(perfil)}
                                                                refetch={ () => onRefetch(uploadTypes.PERFIL)}
                                                                onDelete={ () => { setPerfil(null) }}
                                                                />
                                                        </GenericModal>
                                                    </>
                                                </div>
                                            </div>
                                        </div>
                                        <form onSubmit={handleSubmit}>
                                            <div className="row p-4">
                                                <div className="row row-1-home g-3">
                                                    <div className="col-md-6 col-sm-12 mb-3">
                                                        <label htmlFor="name" className="form-label">
                                                            Nombre
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className={`form-control ${formErrors.nombre && 'is-invalid'}`}
                                                            id="nombre"
                                                            name="nombre"
                                                            value={userData.nombre}
                                                            onChange={handleChange}
                                                            placeholder="Ingresa tu nombre"
                                                            required
                                                        />
                                                        <div className="invalid-feedback">
                                                            {formErrors.name}
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 col-sm-12 mb-3">
                                                        <label htmlFor="lastName" className="form-label">
                                                            Apellido
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className={`form-control ${formErrors.apellido && 'is-invalid'}`}
                                                            id="apellido"
                                                            name="apellido"
                                                            value={userData.apellido}
                                                            onChange={handleChange}
                                                            placeholder="Ingresa tu apellido"
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row p-3">
                                                <div className="col col-rv mb-3">
                                                    <label htmlFor="email" className="form-label">
                                                        Email
                                                    </label>
                                                    <input
                                                        type="email"
                                                        className={`form-control`}
                                                        id="email"
                                                        name="email"
                                                        value={userData.email}
                                                        onChange={handleChange}
                                                        placeholder="Email"
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                            <div className="col col-rv-12 d-grid">
                                                <button
                                                    type="submit"
                                                    className="btn btn-amarillo"
                                                >
                                                    Guardar Cambios
                                                </button>
                                            </div>
                                            {errorMessage && <div className="text-danger mt-3">{errorMessage}</div>}
                                            {message && <div className="text mt-3">{message}</div>}
                                        </form>
                                    </div>
                                    <div className="border-top"></div>
                                    <div className="p-4">
                                        <Button variant="outline-primary" className="w-full mb-3" onClick={() => setShowPasswordModal(true)}>Cambiar de contraseña</Button>
                                        <Button variant="outline-danger" className="w-full mb-3" onClick={() => setShowDeleteModal(true)}>Eliminar cuenta</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal para cambiar contraseña */}
            <GenericModal
                show={showPasswordModal}
                handleClose={() => setShowPasswordModal(false)}
                title="Cambiar Contraseña"
            >
                <div className="form-group">
                    <label htmlFor="newPassword" className="mb-2">Nueva Contraseña</label>
                    <input
                        type="password"
                        className="form-control mb-3"
                        id="newPassword"
                        name="newPassword"
                        value={newPassword}
                        onChange={handlePasswordChange}
                        placeholder="Ingresa tu nueva contraseña"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword" className="mb-2">Confirmar Nueva Contraseña</label>
                    <input
                        type="password"
                        className="form-control mb-3"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={handlePasswordChange}
                        placeholder="Confirma tu nueva contraseña"
                    />
                </div>
                {errorMessagePass && <div className="text-danger mt-3">{errorMessagePass}</div>}
                {messagePass && <div className="text mt-3">{messagePass}</div>}
                <Button className="btn-azul w-100" onClick={handlePasswordSubmit}>Actualizar Contraseña</Button>
            </GenericModal>

            {/* Modal para confirmar eliminación de cuenta */}
            <GenericModal
                show={showDeleteModal}
                handleClose={() => setShowDeleteModal(false)}
                title="Eliminar Cuenta"
            >
                <p>¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.</p>
                {errorMessageAcc && <div className="text-danger mt-3">{errorMessageAcc}</div>}
                <Button variant="danger" className="mt-3 w-100" onClick={handleDeleteAccount}>Eliminar Cuenta</Button>
            </GenericModal>
        </Cuponeros>
    );
}
