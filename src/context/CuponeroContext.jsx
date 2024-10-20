import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';
import { getCuponeroById } from '../services/cuponerosService';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Loading from "../components/Loading";

const CuponeroContext = createContext();

export const useCuponero = () => {
    return useContext(CuponeroContext);
};

export const CuponeroProvider = ({ children }) => {
    const [cuponero, setCuponero] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isVerificationChecked, setIsVerificationChecked] = useState(false);
    const { authState } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCuponero = async () => {
            if (authState.token && authState.userType === 'cuponero' && !isVerificationChecked) {
                try {
                    const data = await getCuponeroById(authState.user);
                    setIsVerificationChecked(true);
                    if (data.estadoVerificacion !== 'Aprobada') {
                        navigate('/signup/verify/');
                    } else {
                        setCuponero(data);
                    }
                } catch (error) {
                    console.error('Error al obtener los datos del cuponero:', error);
                } finally {
                    setLoading(false);
                }
            } else if (authState.token && authState.userType === 'vendedor') {
                navigate('/vendedor');
                setLoading(false);
            } else {
                // Si el usuario no es cuponero ni vendedor, simplemente detenemos la carga.
                setLoading(false);
            }
        };

        fetchCuponero();
    }, [authState, navigate, isVerificationChecked]);

    // Usar useMemo para evitar que el objeto cambie en cada renderizado
    const value = useMemo(() => ({
        cuponero,
        loading
    }), [cuponero, loading]);

    if (loading) {
        return <Loading />;
    }

    return (
        <CuponeroContext.Provider value={value}>
            {children}
        </CuponeroContext.Provider>
    );
};

CuponeroProvider.propTypes = {
    children: PropTypes.node.isRequired
};