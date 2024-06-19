import React, { useState } from 'react';
import { uploadCoverImage, updateCoverImage, deleteCoverImage, getCoverImage } from '../../services/vendedoresService';
import { useNavigate } from 'react-router-dom';

const UploadPortada = ({ vendedorId }) => {
    const [image, setImage] = useState(null);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        setMessage('');

        if (!image) {
            setMessage('Por favor, seleccione una imagen para subir.');
            return;
        }

        try {
            await uploadCoverImage(vendedorId, image);
            setMessage('Imagen subida correctamente');
            navigate('/vendedor/perfil/vista-previa');
        } catch (error) {
            setMessage('Error al subir la imagen. Inténtalo de nuevo.');
        }
    };

    /*const handleDelete = async () => {
        setMessage('');
        try {
            await deleteCoverImage(vendedorId);
            setMessage('Imagen eliminada correctamente');
        } catch (error) {
            setMessage('Error al eliminar la imagen. Inténtalo de nuevo.');
        }
    };*/

    return (
        <div>
            <h2 className='mb-4'>{'Subir Portada'}</h2>
            <form onSubmit={handleUpload}>
                <label className='mb-4'>Selecciona el archivo de imagen (jpeg, jpg, png, gif): </label>
                <input className='mb-4' type="file" onChange={handleImageChange} />
                <button className='mb-4 btn btn-rosa' type="submit">{'Subir'} Imagen</button>
                {/* {existingImage && <button className='mb-4 btn btn-danger' type="button" onClick={handleDelete}>Eliminar Imagen</button>} */}
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default UploadPortada;