import React, { useState, useEffect } from "react";

export default function SeccionCargaCupones({ onCuponAdded }) {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        discount: "",
        expirationDate: "",
        image: null,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { title, description, discount, expirationDate, image } = formData;
        const newCupon = { title, description, discount, expirationDate, image };
        onCuponAdded(newCupon);
        setFormData({
            title: "",
            description: "",
            discount: "",
            expirationDate: "",
            image: null,
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <input type="text" className="form-control" name="title" value={formData.title} onChange={handleInputChange} placeholder="Título" required />
            </div>
            <div className="mb-3">
                <textarea className="form-control" name="description" value={formData.description} onChange={handleInputChange} placeholder="Descripción" required />
            </div>
            <div className="mb-3">
                <input type="number" className="form-control" name="discount" value={formData.discount} onChange={handleInputChange} placeholder="Descuento (%)" required />
            </div>
            <div className="mb-3">
                <input type="date" className="form-control" name="expirationDate" value={formData.expirationDate} onChange={handleInputChange} required />
            </div>
            <div className="mb-3">
                <input type="file" className="form-control" name="image" onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })} />
            </div>
            <button type="submit" className="btn btn-primary">Agregar Cupón</button>
        </form>
    );
}