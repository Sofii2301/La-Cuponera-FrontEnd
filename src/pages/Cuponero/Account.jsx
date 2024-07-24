import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Cuponeros from "../../components/Cuponero/Cuponeros";
import { getCuponeroById, obtenerImagenPerfil, updateCuponero } from "../../services/cuponerosService"; 
import { isNil } from "lodash";
import UploadImage, { uploadTypes } from '../../components/Vendedor/UploadImage';
import logoDefault from "../../assets/logo_default.png";
import GenericModal from '../../components/Modal';
import AddIcon from '@mui/icons-material/Add';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const paises = {
    Colombia: ["Chia", "Bogotá", "Medellín"],
    // Añadir más países y ciudades según sea necesario
};

export default function Account() {
    const { id } = useParams(); 
    const [initialUserData, setInitialUserData] = useState(null);
    const [userData, setUserData] = useState({
        nombre: '',
        apellido: '',
        email: '',
    })
    const [raitingData, setRaitingData] = useState({
        telefono: '',
        pais: '',
        ciudad: ''
    })
    const [formErrors, setFormErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState(null);
    const [perfil, setPerfil] = useState(null);
    const [showModalImage, setShowModalImage] = useState(false);
    const [cities, setCities] = useState(paises['Colombia']);
    const navigate = useNavigate();

    const fetchCuponero = async () => {
        if (!id) {
            setError(new Error("ID de cuponero no proporcionado"));
            return;
        }

        try {
            const data = await getCuponeroById(id);  // Usar el ID del cuponero
            const userDataBd = {
                nombre: data.nombre,
                apellido: data.apellido,
                email: data.email,
            }
            setInitialUserData(userDataBd);
            setUserData(userDataBd);
        } catch (err) {
            setError(err);
        }

        /*try {
            const data = await getRaitingDataById(id);
            const raitingDataBd = {
                telefono: data.telefono,
                ciudad: data.ciudad,
                pais: data.pais,
            }
            setInitialRaitingData(userDataBd);
            setlRaitingData(userDataBd);
        } catch (err) {
            setError(err);
        }*/
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
        fetchCuponero();
        fetchPerfil();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevUserData) => ({
            ...prevUserData,
            [name]: name === 'telefono' ? Number(value) : value
        }));
    };

    const handleCountryChange = (e) => {
        const pais = e.target.value;
        setFormData((prevData) => ({
            ...prevData,
            pais,
            ciudad: ''
        }));
        setCities(paises[pais]);
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
                navigate('/cuponero');
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
        if (userData.nombre.trim() === '') {
            errors.name = 'Por favor, ingresa tu nombre';
            isValid = false;
        }

        if (String(userData.apellido).trim() === '') {
            errors.lastName = 'Por favor, ingresa tu apellido';
            isValid = false;
        }

        setFormErrors(errors);
        return isValid;
    };

    const changePassword = () => {
        // lógica para cambiar la contraseña
    };

    const deleteAccount = () => {
        // lógica para eliminar la cuenta
    };

    const handleOpenModalImage = (type) => {
        setShowModalImage(true);
    }
    const handleCloseModalImage = () => setShowModalImage(false);

    const onRefetch = (type) => {
        if(type == uploadTypes.PORTADA) {
            fetchLogo();
        } else {
            fetchPortada();
        }
    }

    return (
        <Cuponeros>
            <div className="row row-sm">
                <div className="col-lg-12 col-md-12">
                    <div className="card custom-card main-content-body-profile">
                        <div className="tab-content">
                            <div className="main-content-body tab-pane p-4 border-top-0 active" id="about" role="tabpanel">
                                <div className="border rounded-10">
                                    <form onSubmit={handleSubmit}>
                                        <div className="row p-4">
                                            <div className="col-4">
                                                <div className="profile-cuponero logo-perfil-circulo-nombre">
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
                                            <div className="col-8 p-4">
                                                <div className="row row-1-home g-3">
                                                    <div className="mb-3">
                                                        <label htmlFor="name" className="form-label">
                                                            Nombre
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className={`form-control ${formErrors.name && 'is-invalid'}`}
                                                            id="name"
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
                                                    <div className="mb-3">
                                                        <label htmlFor="lastName" className="form-label">
                                                            Apellido
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className={`form-control ${formErrors.lastName && 'is-invalid'}`}
                                                            id="lastName"
                                                            name="apellido"
                                                            value={userData.apellido}
                                                            onChange={handleChange}
                                                            placeholder="Ingresa tu apellido"
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
                                            <div className="row row-1-home p-3">
                                                <div className="col col-rv mb-3">
                                                    <label htmlFor="pais" className="form-label mr-2">
                                                        Pais
                                                    </label>
                                                    <Select
                                                        id="pais"
                                                        name="pais"
                                                        value={userData.pais}
                                                        onChange={handleCountryChange}
                                                    >
                                                        {Object.keys(paises).map((pais) => (
                                                            <MenuItem key={pais} value={pais}>
                                                                {pais}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </div>
                                                <div className="col col-rv mb-3">
                                                    <label htmlFor="ciudad" className="form-label mr-2">
                                                        Ciudad
                                                    </label>
                                                    <Select
                                                        id="ciudad"
                                                        name="ciudad"
                                                        value={userData.ciudad}
                                                        onChange={handleChange}
                                                    >
                                                        {cities.map((ciudad) => (
                                                            <MenuItem key={ciudad} value={ciudad}>
                                                                {ciudad}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </div>
                                            </div>
                                            <div className="row p-3">
                                                <div className="col col-rv mb-3">
                                                    <label htmlFor="phoneNumber" className="form-label">
                                                        Teléfono de Contacto
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className={`form-control`}
                                                        id="phoneNumber"
                                                        name="telefono"
                                                        value={userData.telefono}
                                                        onChange={handleChange}
                                                        placeholder="Número de Contacto / Whatsapp"
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
                                        </div>
                                    </form>
                                    <div className="border-top"></div>
                                    <div className="p-4">
                                        <Button variant="outline-primary" className="w-full mb-3" onClick={changePassword}>Cambiar de contraseña</Button>
                                        <Button variant="outline-danger" className="w-full mb-3" onClick={deleteAccount}>Eliminar cuenta</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Cuponeros>
    );
}
