import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const RedirectHandler = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => {
        const path = location.pathname;

        // Rutas públicas permitidas
        const publicPaths = [
            '/',
            '/signup/cuponero/',
            '/signup/vendedor/',
            '/signin/vendedor/',
            '/forgot-password/cuponero',
            '/forgot-password/vendedor',
            '/thank-you/cuponero',
            '/thank-you/vendedor',
            '/signup/verify/',
        ];

        // Verificar si es una ruta de restablecimiento de contraseña válida
        const isResetPasswordPath = /^\/reset-password\/.+\/(cuponero|vendedor)$/.test(path);

        // Redirigir solo si el usuario no está autenticado y la ruta no es pública ni de restablecimiento de contraseña
        if (!user && !publicPaths.includes(path) && !isResetPasswordPath) {
            navigate('/');
        }
    }, [location, navigate, user]);

    return null;
};

export default RedirectHandler;
