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
        image: null
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
        try {
            const newCoupon = {
                ...formData,
                createdAt: new Date().toISOString()
            };
            console.log(newCoupon);
            await createCoupon(newCoupon);
            navigate('/vendedor/cupones/mis-cupones');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <>
            <Vendedor>
                <div className="container-editar-perfil">
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
                                className="btn btn-rosa"
                                type="file"
                                name="image"
                                onChange={handleFileChange}
                            />
                        </div>
                        <button type="submit">Crear</button>
                    </form>
                </div>
                
            </Vendedor>
        </>
    );
};

export default CreateCupon;
