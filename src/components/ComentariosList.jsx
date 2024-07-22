import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
import { getRaitingByVendor, getRaitingByCoupon } from '../services/CuponesService';
import { getCuponeroById, /*getPerfil*/ } from '../services/cuponerosService';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

const ComentariosList = ({ id, tipo }) => {
    const [comentarios, setComentarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchComentarios = async () => {
            try {
                let response;
                if (tipo === 'vendedor') {
                    response = await getRaitingByVendor(id);
                } else if (tipo === 'cupon') {
                    response = await getRaitingByCoupon(id);
                }

                const comentariosWithUserInfo = await Promise.all(
                    response.map(async (comentario) => {
                        console.log('comentario.rating.user_id: ', comentario.rating.user_id)
                        const cuponero = await getCuponeroById(comentario.rating.user_id);
                        //const perfil = await getPerfil(comentario.user_id);
                        const comentarioWCuponero = {
                            ...comentario.rating,
                            cuponeroName: cuponero.nombre,
                            //cuponeroImage: perfil.image,
                        };
                        console.log('comentarioWCuponero: ', comentarioWCuponero)
                        return comentarioWCuponero;
                    })
                );

                // Ordenar los comentarios por fecha, del más reciente al más viejo
                comentariosWithUserInfo.sort((a, b) => new Date(b.date) - new Date(a.date));

                setComentarios(comentariosWithUserInfo);
            } catch (error) {
                console.error('Error fetching comments:', error);
                setError('Error al obtener los comentarios.');
            } finally {
                setLoading(false);
            }
        };

        fetchComentarios();
    }, [id, tipo]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return <p color="error">{error}</p>;
    }

    return (
        <Box>
            {comentarios.length === 0 ? (
                <p>No hay comentarios.</p>
            ) : (
                comentarios.map((comentario) => (
                    <>
                    <div className="d-flex align-items-center justify-content-between" key={comentario.id}>
                        <div className="d-flex">
                            <div className="d-flex h-100">
                                <Avatar src={comentario.cuponeroImage} alt={comentario.cuponeroName} /> 
                            </div>
                            <div className="d-flex flex-column ml-3">
                                <h5><strong>{comentario.cuponeroName}</strong></h5>
                                <p>{comentario.comentarios}</p>
                            </div>
                        </div>
                        <div className="d-flex flex-column align-items-end">
                            <Rating value={comentario.raiting} precision={0.5} readOnly />
                            <p className='text-muted'>{new Date(comentario.date).toLocaleDateString()}</p>
                        </div>
                    </div>
                    <div className="border-top mt-3 mb-3"></div>
                    </>
                ))
            )}
        </Box>
    );
};

export default ComentariosList;
