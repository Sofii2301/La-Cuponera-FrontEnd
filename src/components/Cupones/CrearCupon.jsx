// src/components/CreateCupon.js
import React, { useState } from 'react';
import { createCoupon } from '../../services/CuponesService';
import { useNavigate } from 'react-router-dom';
import Vendedor from '../Vendedor/Vendedor';

const CreateCupon = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        discount: '',
        expirationDate: '',
        image: null,
        createdAt: new Date().toISOString(),
        createdBy: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        setFormData(prevState => ({
            ...prevState,
            image: e.target.files[0]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const cuponesData = [];
        cuponesData.add(formData);
        JSON.parse(localStorage.setItem(cuponesData));
        /*try {
            const newCoupon = {
                ...formData,
            };
            await createCoupon(newCoupon);
            navigate('/vendedor/cupones/mis-cupones');
        } catch (err) {
            setError(err.message);
        }*/
    };

    return (
        <>
            <Vendedor>
            <div className="row row-sm">
                <div className="col-lg-12 col-md-12 mt-3">
                    <div className="card custom-card main-content-body-profile">
                        <div className="tab-content">
                            <div class="main-content-body tab-pane p-4 border-top-0 active" id="about" role="tabpanel">
                                <div class="border rounded-10"> 
                                    <div class="p-4"> 
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
                                                    value={formData.title}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label>Descripción:</label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    name="description"
                                                    value={formData.description}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label>Descuento:</label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    name="discount"
                                                    value={formData.discount}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label>Fecha de Expiración:</label>
                                                <input
                                                    className="form-control"
                                                    type="date"
                                                    name="expirationDate"
                                                    value={formData.expirationDate}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label>Imagen:</label>
                                                <input
                                                    className="btn-cargar-img-cc"
                                                    type="file"
                                                    name="image"
                                                    onChange={handleFileChange}
                                                />
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
