import React, { useState, useEffect } from 'react';
import { getVideoById, uploadVideo, deleteVideo } from '../../services/vendedoresService';
import { useAuth } from '../../context/AuthContext';
import Perfil from './Perfil';

const VideoUpload = () => {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        titulo: '',
        descripcion: '',
        video: null,
        duracion: '',
        formato: '',
        id_vendedor: user,
    });
    const [videoUrl, setVideoUrl] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        handleGetVideo();
    }, []);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        getVideoDuration(file).then((duration) => {
            setFormData(prevState => ({
                ...prevState,
                video: file,
                formato: file.type,
                duracion: duration,
            }));
        });
    };

    const getVideoDuration = (file) => {
        return new Promise((resolve) => {
            const video = document.createElement('video');
            video.preload = 'metadata';

            video.onloadedmetadata = function() {
                window.URL.revokeObjectURL(video.src);
                const duration = video.duration;
                const minutes = Math.floor(duration / 60);
                const seconds = Math.floor(duration % 60);
                resolve(`${minutes}:${seconds}`);
            };

            video.src = URL.createObjectURL(file);
        });
    };

    const handleUpload = async () => {
        if (!formData.video) {
            setMessage('Por favor selecciona un archivo de video.');
            return;
        }

        setLoading(true)

        const formDataObj = new FormData();
        Object.keys(formData).forEach(key => {
            formDataObj.append(key, formData[key]);
        });

        try {
            await uploadVideo(user, formDataObj);
            setLoading(false)
            setMessage('Video subido exitosamente');
            handleGetVideo();  // Refresh the video status after upload
        } catch (error) {
            console.error('Error subiendo el video:', error);
            setLoading(false)
            setMessage('Hubo un problema al subir el video.');
        }
    };

    const handleGetVideo = async () => {
        try {
            const response = await getVideoById(user);

            if (response.status === 404) {
                setMessage('Aún no has cargado un video.');
                setVideoUrl('');
                return;
            }

            setVideoUrl(response);
            setMessage('');
        } catch (error) {
            console.error('Error obteniendo el video:', error);
            setMessage('Hubo un problema al obtener el video.');
        }
    };

    const handleDelete = async () => {
        try {
            await deleteVideo(user);
            setMessage('Video eliminado exitosamente');
            setVideoUrl('');
        } catch (error) {
            console.error('Error eliminando el video:', error);
            setMessage('Hubo un problema al eliminar el video.');
        }
    };

    return (
        <Perfil>
        <div className="row row-sm">
                <div className="col-lg-12 col-md-12">
                    <div className="card custom-card main-content-body-profile">
                        <div className="tab-content">
                            <div className="main-content-body tab-pane p-4 border-top-0 active" id="about" role="tabpanel">
                                <h2>Gestión de Video</h2>
                                {!videoUrl ? (
                                    <div className='d-flex flex-column'>
                                        <input
                                            type="text"
                                            placeholder="Título"
                                            value={formData.titulo}
                                            onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                                            className='form-control mb-3'
                                        />
                                        <textarea
                                            placeholder="Descripción"
                                            value={formData.descripcion}
                                            onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                                            className='form-control mb-3'
                                        />
                                        <input
                                            type="file"
                                            accept="video/mp4,video/mov"
                                            onChange={handleFileChange}
                                            className='form-control mb-3'
                                        />
                                        <div onClick={handleUpload} className='btn btn-amarillo'>
                                            {loading ? 'Subiendo...' : 'Subir Video'}
                                        </div>
                                    </div>
                                ) : (
                                    <div className='p-3'>
                                        {videoUrl && (
                                            <div className='mt-3'>
                                                <h5>Video Cargado:</h5>
                                                <video src={videoUrl} controls width="600"></video>
                                            </div>
                                        )}
                                        <div className="d-flex mt-3">
                                            <div onClick={handleDelete} className='btn btn-danger'>Eliminar Video</div>
                                        </div>
                                    </div>
                                )}
                                {message && (
                                    <p style={{ color: 'red' }}>{message}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
        </Perfil>
    );
};

export default VideoUpload;
