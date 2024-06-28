import React, { useState, useEffect } from 'react';
import { uploadLogoImage, updateLogoImage, deleteLogoImage, getLogoImage } from '../../services/vendedoresService';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../services/AuthContext";

const UploadLogo = ({ vendedorId }) => {
    const [image, setImage] = useState(null);
    const [existingImage, setExistingImage] = useState(null);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => { 
        const fetchLogo = async () => {
            try {
                const logoImg = await getLogoImage(vendedorId);
                setExistingImage(logoImg);
                console.log('existingImage: ', existingImage)
            } catch (error) {
                console.error('Error fetching logo:', error);
            }
        };

        fetchLogo();
    }, [vendedorId, existingImage]);

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
            console.log('existingImage: ', existingImage)
            console.log('image: ', image)
            console.log('vendedorId: ', vendedorId)
            
            if (existingImage) {
                console.log('actualizar')
                await updateLogoImage(vendedorId, image);
                setMessage('Imagen actualizada correctamente');
            } else {
                await uploadLogoImage(vendedorId, image);
                setMessage('Imagen subida correctamente');
            }
            navigate('/vendedor/perfil/vista-previa');
        } catch (error) {
            setMessage('Error al subir la imagen. Inténtalo de nuevo.');
        }
    };

    const handleDelete = async () => {
        setMessage('');
        try {
            await deleteLogoImage(vendedorId);
            setMessage('Imagen eliminada correctamente');
            setExistingImage(null);
        } catch (error) {
            setMessage('Error al eliminar la imagen. Inténtalo de nuevo.');
        }
    };

    return (
        <div>
            <h2 className='mb-4'>{'Subir Logo'}</h2>
            <form onSubmit={handleUpload}>
                <label className='mb-4'>Selecciona el archivo de imagen (jpeg, jpg, png, gif): </label>
                <input className='mb-4' type="file" onChange={handleImageChange} />
                <button className='mb-4 btn btn-rosa' type="submit">{'Subir'} Imagen</button>
                {existingImage && <button className='mb-4 ms-2 btn btn-danger' type="button" onClick={handleDelete}>Eliminar Imagen</button>}
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default UploadLogo;
