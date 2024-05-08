import React from "react";

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        for (const key in formData) {
            formDataToSend.append(key, formData[key]);
        }

        try {
            const response = await fetch('/api/cupones', {
            method: 'POST',
            body: formDataToSend
            });
            if (response.ok) {
            // Si el cupón se crea correctamente, actualizamos la lista de cupones
            // Puedes implementar una función para refrescar la lista aquí
            } else {
            throw new Error('Error al crear el cupón');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return(
        <>
            <div>
                <h2>Crear Nuevo Cupón</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="title">Título:</label>
                        <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required />
                    </div>
                    <div>
                        <label htmlFor="description">Descripción:</label>
                        <textarea id="description" name="description" value={formData.description} onChange={handleChange} required />
                    </div>
                    <div>
                        <label htmlFor="discount">Descuento (%):</label>
                        <input type="number" id="discount" name="discount" value={formData.discount} onChange={handleChange} required />
                    </div>
                    <div>
                        <label htmlFor="expirationDate">Fecha de vencimiento:</label>
                        <input type="date" id="expirationDate" name="expirationDate" value={formData.expirationDate} onChange={handleChange} required />
                    </div>
                    <div>
                        <label htmlFor="image">Imagen:</label>
                        <input type="file" id="image" name="image" accept="image/*" onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })} />
                    </div>
                    <button type="submit">Crear Cupón</button>
                </form>
            </div>
        </>
    )
}