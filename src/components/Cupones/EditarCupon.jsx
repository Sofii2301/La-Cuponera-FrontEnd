// src/components/EditCupon.js
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { getPlan, getVendedorById } from '../../services/vendedoresService';
import { getCouponById, getCouponImage, updateCoupon, updateCouponImage, uploadCouponImage } from '../../services/CuponesService';
import Vendedor from '../Vendedor/Vendedor';

const EditCupon = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [newCoupon, setNewCoupon] = useState({
        title: '',
        description: '',
        discount: '',
        expirationDate: '',
        price: '',
        categorias: '', 
        location: null
    });
    const [initialData, setInitialData] = useState(null);
    const [image, setImage] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    //const [plan, setPlan] = useState(null);
    const [vendorCategories, setVendorCategories] = useState(null);
    const [formErrors, setFormErrors] = useState({});
    const [message, setMessage] = useState('');
    const [isImageUpdated, setIsImageUpdated] = useState(null);

    const fetchVendorData = async () => {
        try {
            /*try {
                const dataplan = await getPlan(user);
                if (dataplan.plan === 3) {
                    navigate('/vendedor')
                }
                setPlan(dataplan);
            }   catch (error) {
                console.error('Error fetching vendor plan:', error);
                setError('Error al obtener el plan del vendedor.');
            }*/
            try {
                const vendorData = await getVendedorById(user, 'Complete');
                setVendorCategories(vendorData[0].categorias);
            }   catch (error) {
                console.error('Error fetching vendor categories:', error);
                setError('Error al obtener las categorias del vendedor.');
            }
            
        } catch (error) {
            console.error('Error fetching vendor data:', error);
            setError('Error al obtener los datos del vendedor.');
        }
    };

    const fetchCoupon = async () => {
        try {
            let data = await getCouponById(id);
            data = data[0];
            const couponDataBd = {
                title: data.title,
                description: data.description,
                discount: data.discount,
                expirationDate: data.expirationDate,
                price: data.price,
                categorias: data.categorias, 
                location: data.location
            }
            setInitialData(couponDataBd);
            setNewCoupon(couponDataBd);
        } catch (err) {
            setError(err.message);
        }
    };

    const fetchImage = async () => {
        try {
            const image = await getCouponImage(id);
            setImage(image);
        } catch (error) {
            console.error('Error al obtener la imagen del cupón:', error);
        }
    };

    useEffect(() => {
        fetchCoupon();
        fetchImage();
        fetchVendorData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewCoupon(prevState => ({
            ...prevState,
            [name]: name === 'discount' || name === 'price' ? Number(value) : value // Convertir 'discount' y 'price' a número
        }));
    };

    const handleCategoryChange = (e) => {
        setNewCoupon(prevState => ({
            ...prevState,
            categorias: e.target.value
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                setFormErrors({ image: 'La imagen no debe pesar más de 5 MB.' });
                return;
            }
            const img = new Image();
            img.src = URL.createObjectURL(file);
            img.onload = () => {
                if (img.width > 1024 || img.height > 1024) {
                    setFormErrors({ image: 'La imagen no debe medir más de 1024px x 1024px.' });
                } else {
                    setFormErrors({ image: '' });
                    setIsImageUpdated(file);
                }
            };
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        try {
            const updatedFields = getUpdatedFields();
            console.log('updatedFields: ', updatedFields)
            if (Object.keys(updatedFields).length > 0) {
                await updateCoupon(id, newCoupon);
                console.log('updatedFields.image: ', updatedFields.image)
                console.log('image: ', image)
                if (updatedFields.image) {
                    if (image) {
                        await updateCouponImage(id, updatedFields.image);
                    } else {
                        await uploadCouponImage(id, updatedFields.image);
                    }
                }
                navigate('/vendedor/cupones/mis-cupones');
            } else {
                setMessage('No hay cambios para actualizar.');
            }
        } catch (err) {
            setError(err.message);
        }
    };

    const validateForm = () => {
        const errors = {};
        if (!newCoupon.title) errors.title = 'El título es requerido.';
        if (!newCoupon.description) errors.description = 'La descripción es requerida.';
        if (newCoupon.discount <= 0) errors.discount = 'El descuento debe ser mayor a 0.';
        if (newCoupon.price <= 0) errors.price = 'El precio debe ser mayor a 0.';
        /*if (plan === 1 && newCoupon.price > 10) errors.price = (
            <>
                Para el Plan Basic, el precio no puede ser mayor a 10 dólares. 
                Pasate a <Link to="https://lacuponera.digital/plan-gold/">Gold</Link> o <Link to="https://lacuponera.digital/plan-premium/">Premium</Link> para subir productos de precios ilimitados.
            </>
        );*/
        //if (!newCoupon.expirationDate) errors.expirationDate = 'La fecha de expiración es requerida.';
        //if (!image) errors.image = 'La imagen es requerida.';
        if (!newCoupon.categorias) errors.categorias = 'La categoría es requerida.';
        return errors;
    };

    const getUpdatedFields = () => {
        const updatedFields = {};
        if (!initialData) return updatedFields;
        console.log('erfg')
        // Verificar si los campos de texto/numéricos cambiaron
        Object.keys(newCoupon).forEach(key => {
            if (newCoupon[key] !== initialData[key]) {
                updatedFields[key] = newCoupon[key];
            }
        });

        // Verificar si se cargó una nueva imagen
        if (isImageUpdated) {
            updatedFields.image = isImageUpdated;
        }

        return updatedFields;
    };

    return (
        <Vendedor>
            <div className="row row-sm">
                <div className="col-lg-12 col-md-12 mt-3">
                    <div className="card custom-card main-content-body-profile">
                        <div className="tab-content">
                            <div className="main-content-body tab-pane p-4 border-top-0 active" id="about" role="tabpanel">
                                <div className="border rounded-10">
                                    <div className="p-4">
                                        <div className="container-editar-perfil">
                                            <h1>Editar Cupón</h1>
                                            {error && <p style={{ color: 'red' }}>{error}</p>}
                                            <form onSubmit={handleSubmit} className="mt-3">
                                                <div className="mb-3">
                                                    <label>Título:</label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        name="title"
                                                        value={newCoupon.title}
                                                        onChange={handleChange}
                                                        placeholder="Título del cupón"
                                                        required
                                                    />
                                                    {formErrors.title && <p style={{ color: 'red' }}>{formErrors.title}</p>}
                                                </div>
                                                <div className="mb-3">
                                                    <label>Descripción:</label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        name="description"
                                                        value={newCoupon.description}
                                                        onChange={handleChange}
                                                        placeholder="Descripción del cupón"
                                                        required
                                                    />
                                                    {formErrors.description && <p style={{ color: 'red' }}>{formErrors.description}</p>}
                                                </div>
                                                <div className="mb-3">
                                                    <label>Descuento:</label>
                                                    <input
                                                        className="form-control"
                                                        type="number"
                                                        name="discount"
                                                        value={newCoupon.discount}
                                                        onChange={handleChange}
                                                        placeholder="Porcentaje de descuento"
                                                        required
                                                    />
                                                    {formErrors.discount && <p style={{ color: 'red' }}>{formErrors.discount}</p>}
                                                </div>
                                                <div className="mb-3">
                                                    <label>Precio:</label>
                                                    <input
                                                        className="form-control"
                                                        type="number"
                                                        name="price"
                                                        value={newCoupon.price}
                                                        onChange={handleChange}
                                                        placeholder="Agregue el precio original del producto"
                                                        required
                                                    />
                                                    <p className='text-muted fs-15'>Precio con descuento: {newCoupon.price - (newCoupon.price * newCoupon.discount)/100}</p>
                                                    {formErrors.price && <p style={{ color: 'red' }}>{formErrors.price}</p>}
                                                </div>
                                                {/* <div className="mb-3">
                                                    <label>Fecha de Expiración:</label>
                                                    <input
                                                        className="form-control"
                                                        type="date"
                                                        name="expirationDate"
                                                        value={newCoupon.expirationDate}
                                                        onChange={handleChange}
                                                        placeholder="Fecha de vencimiento"
                                                        required
                                                    />
                                                    {formErrors.expirationDate && <p style={{ color: 'red' }}>{formErrors.expirationDate}</p>}
                                                </div> */}
                                                <div className="mb-3 imagen-edC">
                                                    <label>Actualizar imagen:</label>
                                                    <input
                                                        className="btn-cargar-img-cc"
                                                        type="file"
                                                        name="image"
                                                        onChange={handleFileChange}
                                                        placeholder="Imagen del cupón"
                                                    />
                                                    <br />
                                                    <label>Imagen cargada:</label>
                                                    <img src={image} alt='Imagen del cupón' />
                                                    {formErrors.image && <p style={{ color: 'red' }}>{formErrors.image}</p>}
                                                </div>
                                                <div className="mb-3">
                                                    <label>Categoría:</label>
                                                    <select
                                                        className="form-control"
                                                        name="categorias"
                                                        value={newCoupon.categorias}
                                                        onChange={handleCategoryChange}
                                                        required
                                                    >
                                                        <option value="">Selecciona una categoría</option>
                                                        {vendorCategories && vendorCategories.map((categoria, index) => (
                                                            <option key={index} value={categoria}>{categoria}</option>
                                                        ))}
                                                    </select>
                                                    {formErrors.categorias && <p style={{ color: 'red' }}>{formErrors.categorias}</p>}
                                                </div>
                                                <button type="submit" className='btn btn-rosa'>Actualizar</button>
                                                {message && <div className="text mt-3">{message}</div>}
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Vendedor>
    );
};

export default EditCupon;