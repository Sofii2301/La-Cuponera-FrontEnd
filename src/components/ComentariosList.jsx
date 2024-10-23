import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
import { getRaitingByVendor, getRaitingByCoupon, getCouponById } from '../services/CuponesService';
import { getCuponeroById, obtenerImagenPerfil } from '../services/cuponerosService';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import perfil_default from "../assets/logo_default.png";

const ComentariosList = ({ id, tipo }) => {
    const intl = useIntl();
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
                        let cuponero, cupon, perfil;
                        try {
                            cuponero = await getCuponeroById(comentario.rating.user_id);
                        } catch (error) {
                            console.error('Error al obtener el cuponero (id: ',comentario.rating.user_id,'): ', error);
                            return null;
                        }
                        try {
                            cupon = await getCouponById(comentario.rating.id_cupon);
                            if (!(cupon && cupon.length > 0 && cupon[0])) {
                                return null;
                            }
                        } catch (error) {
                            console.error('Error al obtener el cupon (id: ',comentario.rating.id_cupon,'): ', error);
                            return null;
                        }
                        try {
                            perfil = await obtenerImagenPerfil(comentario.rating.user_id);
                        } catch (error) {
                            console.error('Error al obtener la foto de perfil (id: ',comentario.rating.user_id,'): ', error);
                            return null;
                        }
                        const comentarioWCuponero = {
                            ...comentario.rating,
                            cuponeroName: cuponero.nombre,
                            cuponeroImage: perfil,
                            cuponTitle: cupon[0].title
                        };
                        
                        return comentarioWCuponero;
                    })
                );

                const comentariosFiltrados = comentariosWithUserInfo.filter(comentarios => comentarios !== null);
                
                // Ordenar los comentarios por fecha, del más reciente al más viejo
                comentariosFiltrados.sort((a, b) => new Date(b.date) - new Date(a.date));
                setComentarios(comentariosFiltrados);
                setError(null)
            } catch (error) {
                console.error('Error fetching comments:', error);
                setError(intl.formatMessage({ id: 'get_comments_error_message', defaultMessage: 'Error al obtener los comentarios.' }));
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
            <div className="container-comentarios">
            {comentarios.length === 0 ? (
                <p>{intl.formatMessage({ id: 'no_comments', defaultMessage: 'No hay comentarios.' })}</p>
            ) : (
                comentarios.map((comentario) => (
                    <div key={comentario.id}>
                        <div className="d-flex align-items-center justify-content-between">
                            <div className="d-flex">
                                <div className="d-flex h-100">
                                    <Avatar src={comentario.cuponeroImage} alt={comentario.cuponeroName} /> 
                                </div>
                                <div className="d-flex flex-column ml-3">
                                    <div className="d-flex">
                                        <h5><strong>{comentario.cuponeroName}</strong></h5> 
                                        <p className='text-muted ml-2'>{intl.formatMessage({ id: 'about', defaultMessage: 'Sobre' })}: {comentario.cuponTitle}</p>
                                    </div>
                                    <p>{comentario.comentarios}</p>
                                </div>
                            </div>
                            <div className="d-flex flex-column align-items-end mr-2">
                                <Rating value={comentario.raiting} precision={0.5} readOnly />
                                <p className='text-muted'>{new Date(comentario.date).toLocaleDateString()}</p>
                            </div>
                        </div>
                        <div className="border-top mt-3 mb-3"></div>
                    </div>
                ))
            )}
            </div>
        </Box>
    );
};

export default ComentariosList;
