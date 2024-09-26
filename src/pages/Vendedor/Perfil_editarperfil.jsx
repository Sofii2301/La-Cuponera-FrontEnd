import React, { useState, useEffect } from "react";
import { useIntl } from 'react-intl';
import { useNavigate, useLocation, Link } from "react-router-dom";
import Multiselect from "multiselect-react-dropdown";
import Perfil from "./Perfil";
import GenericModal from '../../components/Modal';
import SocialMediaDisplay from '../../components/Vendedor/SocialMediaDisplay';
import SocialMediaInput from "../../components/Vendedor/SocialMediaInput";
import { useAuth } from '../../context/AuthContext';
import { getVendedorById, updateVendor } from "../../services/vendedoresService";
import MapMarker from "../../components/MapMarker";
import MapLatLong from "../../components/MapLatLong";
import HorarioSelector from "../../components/Vendedor/HorarioSelector";
import HorarioDisplay from "../../components/Vendedor/HorarioDisplay";

export default function Perfil_editarPerfil() {
    const intl = useIntl();
    const { user } = useAuth();
    const [initialUserData, setInitialUserData] = useState(null);
    const [userData, setUserData] = useState({
        nombreTienda: "",
        dirTiendaFisica: "",
        telefono: "",
        descripcion: "",
        redesSociales: '',
        paginaWeb: "",
        horariosTiendaFisica: "",
        representanteLegal: "",
        Nit: "",
        categorias: [],
        location: null
    });
    const [formErrors, setFormErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const [message, setMessage] = useState('');
    const vendedorId = String(user);
    const [showModalSocial, setShowModalSocial] = useState(false);
    const [showModalMap, setShowModalMap] = useState(false);
    const [socialMediaString, setSocialMediaString] = useState('');
    const [coordinates, setCoordinates] = useState([0,0]);
    const [horarios, setHorarios] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchVendedorData = async () => {
            try {
                const dat = await getVendedorById(vendedorId,'Complete');
                const data = dat[0];
                const userDataBd = {
                    nombreTienda: data.nombreTienda,
                    dirTiendaFisica: data.dirTiendaFisica,
                    telefono: data.telefono,
                    descripcion: data.descripcion,
                    redesSociales: data.redesSociales,
                    paginaWeb: data.paginaWeb,
                    horariosTiendaFisica: JSON.parse(data.horariosTiendaFisica),
                    representanteLegal: data.representanteLegal,
                    Nit: data.Nit,
                    categorias: data.categorias,
                    location: data.location
                };
                setInitialUserData(userDataBd);
                setUserData(userDataBd);
                setHorarios(JSON.parse(data.horariosTiendaFisica));
                setSocialMediaString(data.redesSociales || '');
                if (data.location && data.location.coordinates && data.location.coordinates[0] && data.location.coordinates[1]) {
                    setCoordinates(data.location.coordinates);
                }
            } catch (error) {
                console.error('Error fetching vendor data:', error);
            }
        };
        fetchVendedorData();
    }, [vendedorId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevUserData) => ({
            ...prevUserData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validateForm();
        if (!isValid) {
            return; // No enviar el formulario si hay errores
        }
        try {
            const updatedFields = getUpdatedFields();
            if (Object.keys(updatedFields).length > 0) {
                await updateVendor(vendedorId, updatedFields,'Complete');
                setMessage(intl.formatMessage({ id: 'data_updated_successfully', defaultMessage: 'Datos actualizados correctamente.' }));
                navigate('/vendedor/perfil/vista-previa');
            } else {
                setMessage(intl.formatMessage({ id: 'no_changes_to_update', defaultMessage: 'No hay cambios para actualizar.' }));
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

        if (JSON.stringify(horarios) !== initialUserData.horariosTiendaFisica) {
            updatedFields.horariosTiendaFisica = JSON.stringify(horarios);
        }

        if (socialMediaString !== initialUserData.redesSociales) {
            updatedFields.redesSociales = socialMediaString;
        }

        if (coordinates && (!initialUserData.location || coordinates[0] !== initialUserData.location.coordinates[0] || coordinates[1] !== initialUserData.location.coordinates[1])) {
            updatedFields.location = {
                type: "Point",
                coordinates: coordinates,
            };
        }

        return updatedFields;
    };

    const validateForm = () => {
        let isValid = true;
        const errors = {};

        // Validar cada campo
        if (userData.nombreTienda.trim() === '') {
            errors.storeName = intl.formatMessage({ id: 'store_name_error_message', defaultMessage: 'Por favor, ingresa el nombre de tu tienda' });
            isValid = false;
        }

        if (String(userData.telefono).trim() === '') {
            errors.phoneNumber = intl.formatMessage({ id: 'telephone_number_error_message', defaultMessage: 'Por favor, ingresa un número de teléfono' });
            isValid = false;
        }

        if (userData.representanteLegal.trim() === '') {
            errors.representativeName = intl.formatMessage({ id: 'legal_representative_error_message', defaultMessage: 'Por favor, ingresá los datos del Representante Legal de la tienda' });
            isValid = false;
        }

        if (String(userData.Nit).trim() === '') {
            errors.companyNIT = intl.formatMessage({ id: 'nit_error_message', defaultMessage: 'Por favor, ingresá tu Número de identificación tributaria (NIT)' });
            isValid = false;
        }

        if (!Array.isArray(userData.categorias) || userData.categorias.length === 0) {
            errors.categorias = intl.formatMessage({ id: 'category_error_message', defaultMessage: 'Por favor, selecciona al menos una categoría' });
            isValid = false;
        }

        setFormErrors(errors);
        return isValid;
    };

    const handleOpenModalSocial = () => setShowModalSocial(true);
    const handleCloseModalSocial = () => setShowModalSocial(false);
    const handleOpenModalMap = () => setShowModalMap(true);
    const handleCloseModalMap = () => setShowModalMap(false);

    const handleSaveSocialMedia = (string) => {
        setSocialMediaString(string);
        handleCloseModalSocial();
    };

    const category = [
        intl.formatMessage({ id: 'for_you', defaultMessage: 'Para ti' }),
        intl.formatMessage({ id: 'pets', defaultMessage: 'Para los peludos' }),
        intl.formatMessage({ id: 'to_enjoy', defaultMessage: 'Para disfrutar' }),
        intl.formatMessage({ id: 'for_your_palate', defaultMessage: 'Para tu paladar' }),
        intl.formatMessage({ id: 'for_who_you_love', defaultMessage: 'Para quien amas' }),
        intl.formatMessage({ id: 'for_your_home', defaultMessage: 'Para tu hogar' }),
        intl.formatMessage({ id: 'for_your_wellbeing', defaultMessage: 'Para tu bienestar' }),
        intl.formatMessage({ id: 'for_your_mind', defaultMessage: 'Para tu mente' }),
        intl.formatMessage({ id: 'real_estate', defaultMessage: 'Inmobiliaria & Automotriz' }),
        intl.formatMessage({ id: 'technology', defaultMessage: 'Tecnología' }),
        intl.formatMessage({ id: 'for_your_table', defaultMessage: 'Para tu mesa' }),
        intl.formatMessage({ id: 'rulers', defaultMessage: 'Para los gobernantes' }),
        intl.formatMessage({ id: 'services', defaultMessage: 'Servicios Profesionales' }),
        intl.formatMessage({ id: 'recycle_and_earn', defaultMessage: 'Reciclá & Ganá' })
    ];

    const handleCategoryChange = (selectedList) => {
        setUserData(prevState => ({
            ...prevState,
            categorias: selectedList
        }));
    };

    const handleSaveMapCoordinates = (coords) => {
        setCoordinates(coords);
        handleCloseModalMap();
    };

    return (
        <Perfil>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card custom-card">
                            <div className="card-body">
                                <div className="panel profile-cover">
                                    <div className="container-editar-perfil">
                                        <h2 className="mb-5 titulo-editar-perfil">Editar Datos del Usuario{/*t('edit_user_data')*/}</h2>
                                        <form id="editStoreForm" onSubmit={handleSubmit}>
                                            <div className="row row-1-home g-3">
                                                <div className="col col-rv mb-3">
                                                    <label htmlFor="storeName" className="form-label">
                                                    {intl.formatMessage({ id: 'store_name', defaultMessage: 'Nombre de la tienda' })}
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className={`form-control ${formErrors.storeName && 'is-invalid'}`}
                                                        id="storeName"
                                                        name="nombreTienda"
                                                        value={userData.nombreTienda}
                                                        onChange={handleChange}
                                                        placeholder="Ingresa el nombre de tu tienda"
                                                        required
                                                    />
                                                    <div className="invalid-feedback">
                                                        {formErrors.storeName}
                                                    </div>
                                                </div>
                                                <div className="col col-rv mb-3">
                                                    <label htmlFor="storeAddress" className="form-label">
                                                    {intl.formatMessage({ id: 'physical_store', defaultMessage: 'Tienda Física' })}
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className={`form-control ${formErrors.storeAddress && 'is-invalid'}`}
                                                        id="storeAddress"
                                                        name="dirTiendaFisica"
                                                        value={userData.dirTiendaFisica}
                                                        onChange={handleChange}
                                                        placeholder={intl.formatMessage({ id: 'store_address', defaultMessage: 'Dirección de tu tienda física' })}
                                                    />
                                                </div>
                                            </div>
                                            <div className="row g-3">
                                                <div className="col col-rv mb-3">
                                                    <label htmlFor="phoneNumber" className="form-label">
                                                    {intl.formatMessage({ id: 'contact_phone', defaultMessage: 'Teléfono de Contacto' })}
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className={`form-control ${formErrors.phoneNumber && 'is-invalid'}`}
                                                        id="phoneNumber"
                                                        name="telefono"
                                                        value={userData.telefono}
                                                        onChange={handleChange}
                                                        placeholder={intl.formatMessage({ id: 'contact_number_whatsapp', defaultMessage: 'Número de Contacto / Whatsapp Business' })}
                                                        required
                                                    />
                                                    <div className="invalid-feedback">
                                                        {formErrors.phoneNumber}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row g-3">
                                                <div className="col col-rv mb-3">
                                                    <label htmlFor="storeDescription" className="form-label">
                                                    {intl.formatMessage({ id: 'commercial_description', defaultMessage: 'Descripción Comercial' })}
                                                    </label>
                                                    <textarea
                                                        className="form-control"
                                                        id="storeDescription"
                                                        name="descripcion"
                                                        value={userData.descripcion}
                                                        onChange={handleChange}
                                                        rows="3"
                                                        placeholder={intl.formatMessage({ id: 'about_us', defaultMessage: 'Quiénes son? Qué hacen?' })}
                                                    ></textarea>
                                                </div>
                                            </div>
                                            <div className="row g-3">
                                                <div className="col mb-3">
                                                    <label htmlFor="horariosTiendaFisica" className="form-label">{intl.formatMessage({ id: 'store_hours', defaultMessage: 'Horarios de la tienda física' })}</label>
                                                    <div className="horario-selector-rcv">
                                                        <HorarioSelector
                                                            horarios={horarios}
                                                            setHorarios={setHorarios}
                                                        />
                                                    </div>
                                                    <HorarioDisplay horarios={horarios} />
                                                </div>
                                            </div>
                                            <div className="row g-3">
                                                <div className="col mb-3">
                                                    <label htmlFor="representativeName" className="form-label">
                                                        {intl.formatMessage({ id: 'legal_representative_name', defaultMessage: 'Nombre y Apellidos del Representante Legal' })}
                                                    </label>
                                                    <input 
                                                        type="text" 
                                                        onChange={handleChange} 
                                                        value={userData.representanteLegal} 
                                                        name="representanteLegal" 
                                                        className={`form-control ${formErrors.representativeName && 'is-invalid'}`} 
                                                        id="representativeName" 
                                                        placeholder={intl.formatMessage({ id: 'legal_representative', defaultMessage: 'Representante Legal' })}
                                                        required 
                                                    />
                                                    <div className="invalid-feedback">{formErrors.representativeName}</div>
                                                </div>
                                            </div>
                                            <div className="row g-3">
                                                <div className="col mb-3">
                                                    <label htmlFor="companyNIT" className="form-label">
                                                        {intl.formatMessage({ id: 'company_nit', defaultMessage: 'NIT De empresa' })}
                                                    </label>
                                                    <input 
                                                        type="number" 
                                                        onChange={handleChange} 
                                                        value={userData.Nit} 
                                                        name="Nit" 
                                                        className={`form-control ${formErrors.companyNIT && 'is-invalid'}`} 
                                                        id="companyNIT" 
                                                        placeholder={intl.formatMessage({ id: 'nit', defaultMessage: 'NIT' })}
                                                        required 
                                                    />
                                                    <div className="invalid-feedback">{formErrors.companyNIT}</div>
                                                </div>
                                            </div>
                                            <div className="row g-3">
                                                <div className="col mb-3">
                                                    <label htmlFor="location" className="form-label mt-2 ">{intl.formatMessage({ id: 'store_location', defaultMessage: 'Ubicación de la tienda física' })}</label>
                                                    <br />
                                                    <button type="button" className="btn btn-azul" onClick={handleOpenModalMap}>
                                                    {intl.formatMessage({ id: 'load_physical_store_location', defaultMessage: 'Cargar Ubicación Física de la tienda' })}
                                                    </button>
                                                    <GenericModal
                                                        show={showModalMap}
                                                        handleClose={handleCloseModalMap}
                                                        title={intl.formatMessage({ id: 'load_physical_store_location', defaultMessage: 'Cargar Ubicación Física de la tienda' })}
                                                    >
                                                        <MapMarker
                                                            initialCoordinates={coordinates}
                                                            onSave={handleSaveMapCoordinates}
                                                            handleClose={handleCloseModalMap}
                                                        />
                                                    </GenericModal>
                                                    {coordinates && (
                                                        <div className="col mb-3 mt-4">
                                                            <strong>{intl.formatMessage({ id: 'selected_coordinates', defaultMessage: 'Coordenadas seleccionadas: ' })}</strong>
                                                            <MapLatLong coordinates={coordinates} />
                                                            <p>{intl.formatMessage({ id: 'latitude', defaultMessage: 'Latitud: ' })} {coordinates[0]} {intl.formatMessage({ id: 'longitude', defaultMessage: 'Longitud:' })} {coordinates[1]}</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="row g-3">
                                                <div className="col mb-3">
                                                    <label htmlFor="socialMedia" className="form-label">
                                                        {intl.formatMessage({ id: 'social_media', defaultMessage: 'Redes Sociales' })}
                                                    </label>
                                                    <div className="mb-3">
                                                        <button type="button" className="btn btn-rosa" onClick={handleOpenModalSocial}>
                                                        {intl.formatMessage({ id: 'upload_social_media', defaultMessage: 'Cargar Redes Sociales' })}
                                                        </button>
                                                    </div>
                                                    <label htmlFor="saveSocialMedia" className="form-label">
                                                        {intl.formatMessage({ id: 'saved_social_media', defaultMessage: 'Redes Sociales Guardadas:' })}
                                                    </label>
                                                    <SocialMediaDisplay socialMediaString={socialMediaString} />
                                                    <GenericModal
                                                        show={showModalSocial}
                                                        handleClose={handleCloseModalSocial}
                                                        title={intl.formatMessage({ id: 'upload_social_media', defaultMessage: 'Cargar Redes Sociales' })}
                                                    >
                                                        <SocialMediaInput onSave={handleSaveSocialMedia} />
                                                    </GenericModal>
                                                </div>
                                            </div>
                                            <div className="row g-3">
                                                <div className="col mb-3">
                                                    <label htmlFor="websiteLink" className="form-label">
                                                        {intl.formatMessage({ id: 'website_link', defaultMessage: 'Página web Link' })}
                                                    </label>
                                                    <input 
                                                        type="text" 
                                                        onChange={handleChange} 
                                                        value={userData.paginaWeb} 
                                                        name="paginaWeb" 
                                                        className={`form-control ${formErrors.websiteLink && 'is-invalid'}`} 
                                                        id="websiteLink" 
                                                        placeholder={intl.formatMessage({ id: 'website_link_text', defaultMessage: 'Link a la pagina web' })}
                                                    />
                                                    <div className="invalid-feedback">{formErrors.websiteLink}</div>
                                                </div>
                                            </div>
                                            <div className="row g-3">
                                                <label htmlFor="categories" className="form-label">
                                                    {intl.formatMessage({ id: 'categories', defaultMessage: 'Categorías' })}
                                                </label>
                                            </div>
                                            <div className="row g-3">
                                                <div className="col mb-3">
                                                    <Multiselect
                                                        isObject={false}
                                                        onRemove={handleCategoryChange}
                                                        onSelect={handleCategoryChange}
                                                        options={category}
                                                        selectedValues={userData.categorias}
                                                    />
                                                    {formErrors.categorias && (
                                                        <div className="invalid-feedback d-block">
                                                            {formErrors.categorias}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="col col-rv-12 d-grid">
                                                <button
                                                    type="submit"
                                                    className="btn btn-amarillo"
                                                >
                                                    {intl.formatMessage({ id: 'save_changes', defaultMessage: 'Guardar Cambios' })}
                                                </button>
                                            </div>
                                            {errorMessage && <div className="text-danger mt-3">{errorMessage}</div>}
                                            {message && <div className="text mt-3">{message}</div>}
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Perfil>
    );
}
