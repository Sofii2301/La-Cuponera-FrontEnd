import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { createCoupon, uploadCouponImage, getCouponsByVendor, deleteCoupon } from '../../services/CuponesService';
import { useNavigate, Link } from 'react-router-dom';
import { getPlan, getVendedorById } from '../../services/vendedoresService';
import Vendedor from '../Vendedor/Vendedor';

const CreateCupon = () => {
    const { user } = useAuth();
    const [newCoupon, setNewCoupon] = useState({
        title: '',
        description: '',
        discount: '',
        expirationDate: '',
        price: '',
        createdAt: '',
        createdBy: String(user),
        categorias: '', 
        location: null
    });
    const [error, setError] = useState('');
    const [plan, setPlan] = useState(null);
    const [vendorCategories, setVendorCategories] = useState(null);
    const [image, setImage] = useState(null);
    const [couponCount, setCouponCount] = useState(0);
    const [formErrors, setFormErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchVendorData = async () => {
            try {
                try {
                    const dataplan = await getPlan(user);
                    setPlan(dataplan);
                    if (dataplan.plan === 1) {
                        const coupons = await getCouponsByVendor(user);
                        setCouponCount(coupons.length);
                    }
                    if (dataplan.plan === 3) {
                        navigate('/vendedor')
                    }
                }   catch (error) {
                    console.error('Error fetching vendor plan:', error);
                    setError('Error al obtener el plan del vendedor.');
                }
                try {
                    const vendorData = await getVendedorById(user, 'Complete');
                    setVendorCategories(vendorData[0].categorias);
                }   catch (error) {
                    console.error('Error fetching vendor categories:', error);
                    setError('Error al obtener las categorías del vendedor.');
                }
                
            } catch (error) {
                console.error('Error fetching vendor data:', error);
                setError('Error al obtener los datos del vendedor.');
            }
        };

        fetchVendorData();
    }, [user]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        /*if (file) {
            if (file.size > 5 * 1024 * 1024) {
                setFormErrors({ image: 'La imagen no debe pesar más de 5 MB.' });
                setImage(null);
                return;
            }
            const img = new Image();
            img.src = URL.createObjectURL(file);
            img.onload = () => {
                if (img.width > 1024 || img.height > 1024) {
                    setFormErrors({ image: 'La imagen no debe medir más de 1024px x 1024px.' });
                    setImage(null);
                } else {
                    setFormErrors({ image: '' });
                    setImage(file);
                }
            };
        }*/
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
                Pasate a <Link to="https://lacuponera.digital/plan-gold/" target='_blank'>Gold</Link> o <Link to="https://lacuponera.digital/plan-premium/" target='_blank'>Premium</Link> para subir productos de precios ilimitados.
            </>
        );*/
        //if (!newCoupon.expirationDate) errors.expirationDate = 'La fecha de expiración es requerida.';
        if (!image) errors.image = 'La imagen es requerida.';
        if (!newCoupon.categorias) errors.categorias = 'La categoría es requerida.';
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        if (plan === 1 && couponCount >= 30) {
            setError('Has alcanzado el límite de 20 cupones para tu plan.');
            return;
        }

        try {
            const createdCoupon = await createCoupon(newCoupon);

            try {
                await uploadCouponImage(createdCoupon.id, image);
                setNewCoupon({
                    title: '',
                    description: '',
                    discount: 0,
                    expirationDate: '',
                    createdAt: '',
                    createdBy: String(user),
                    categorias: '',
                    location: null,
                    price: 0
                });
                navigate('/vendedor/cupones/mis-cupones');
            } catch (uploadError) {
                await deleteCoupon(createdCoupon.id);
                setError('Error al subir la imagen. Por favor, inténtalo de nuevo.');
            }
        } catch (createError) {
            console.error('Error al crear cupón:', createError);
            setError('Error al crear cupón. Por favor, inténtalo de nuevo.');
        }
    };

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

    return (
        <>
            <Vendedor>
                <div className="row row-sm">
                    <div className="col-lg-12 col-md-12 mt-3">
                        <div className="card custom-card main-content-body-profile">
                            <div className="tab-content">
                                <div className="main-content-body tab-pane p-4 border-top-0 active" id="about" role="tabpanel">
                                    <div className="border rounded-10">
                                        <div className="p-4">
                                            <div className="titulo-form">
                                                <h1>Crear Cupón</h1>
                                                {error && <p style={{ color: 'red' }}>{error}</p>}
                                            </div>
                                            <form onSubmit={handleSubmit} className="mt-2">
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
                                                <div className="mb-3">
                                                    <label>Imagen:</label>
                                                    <input
                                                        className="btn-cargar-img-cc"
                                                        type="file"
                                                        name="image"
                                                        onChange={handleFileChange}
                                                        placeholder="Imagen del cupón"
                                                        required
                                                    />
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
                                                <button type="submit" className='btn btn-rosa'>Crear</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Vendedor>
        </>
    );
};

export default CreateCupon;
