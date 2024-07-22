import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
import { getRaitingByVendor, getRaitingByCoupon } from '../services/CuponesService';
import { getCuponeroById, /*getPerfil*/ } from '../services/cuponerosService';
import { useAuth } from '../services/AuthContext';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

const ComentariosList = ({ id, tipo }) => {
    const { user } = useAuth();
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
                        const cuponero = await getCuponeroById(comentario.user_id);
                        //const perfil = await getPerfil(comentario.user_id);
                        return {
                            ...comentario,
                            cuponeroName: cuponero.nombre,
                            //cuponeroImage: perfil.image,
                        };
                    })
                );

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
        return <Typography color="error">{error}</Typography>;
    }

    return (
        <Box>
            {comentarios.length === 0 ? (
                <Typography>No hay comentarios.</Typography>
            ) : (
                comentarios.map((comentario) => (
                    <Box key={comentario.id} display="flex" alignItems="center" mb={2}>
                        {/* <Avatar src={comentario.cuponeroImage} alt={comentario.cuponeroName} /> */}
                        <Box ml={2}>
                            <Typography variant="subtitle1">{comentario.cuponeroName}</Typography>
                            <Rating value={comentario.raiting} precision={0.5} readOnly />
                            <Typography variant="body2">{comentario.comentario}</Typography>
                            <Typography variant="caption" color="textSecondary">
                                {new Date(comentario.date).toLocaleDateString()}
                            </Typography>
                        </Box>
                    </Box>
                ))
            )}
        </Box>
    );
};

export default ComentariosList;
