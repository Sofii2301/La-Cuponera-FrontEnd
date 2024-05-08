import React from "react";
import { useState, useEffect } from "react";
import "../App.css"

export default function SeccionCargaCupones(props) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        discount: '',
        expirationDate: '',
        image: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const [cupones, setCupones] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        for (const key in formData) {
            formDataToSend.append(key, formData[key]);
        }
        actualizarListaCupones(formDataToSend);
        try {
            const response = await fetch('/api/cupones', {
            method: 'POST',
            body: formDataToSend
            });
            if (response.ok) {
                actualizarListaCupones(formDataToSend);
            } else {
            throw new Error('Error al crear el cupón');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const actualizarListaCupones = (nuevoCupon) => {
        setCupones([...cupones, nuevoCupon]);
    };

    return(
        <>
            <div className="container">
                <div className="row justify-content-between">
                    <div className="col-5">
                        <h2>Crear Nuevo Cupón</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Título:</label>
                                <input type="text" className="form-control" id="title" name="title" value={formData.title} onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Descripción:</label>
                                <textarea className="form-control" id="description" name="description" value={formData.description} onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="discount" className="form-label">Descuento (%):</label>
                                <input type="number" className="form-control" id="discount" name="discount" value={formData.discount} onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="expirationDate" className="form-label">Fecha de vencimiento:</label>
                                <input type="date" className="form-control" id="expirationDate" name="expirationDate" value={formData.expirationDate} onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="image" className="form-label">Imagen:</label>
                                <input type="file" className="form-control" id="image" name="image" accept="image/*" onChange={handleFileChange} />
                            </div>
                            <button type="submit" className="btn btn-primary">Crear Cupón</button>
                        </form>
                    </div>
                    <div className="col-5">
                        <h2>Cupones Agregados</h2>
                        <ul className="list-group">
                            {cupones.map((cupon, index) => (
                                <li key={index} className="list-group-item">
                                    <h5>{cupon.title}</h5>
                                    <p>{cupon.description}</p>
                                    <p>Descuento: {cupon.discount}%</p>
                                    <p>Fecha de vencimiento: {cupon.expirationDate}</p>
                                    {cupon.image && <img src={URL.createObjectURL(cupon.image)} alt="Cupón" style={{ maxWidth: "100px" }} />}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}