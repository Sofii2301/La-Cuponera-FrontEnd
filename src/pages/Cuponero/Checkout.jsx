import React, { useState, useEffect } from "react";
import Carrito from "../../components/Cuponero/Carrito";
import Cuponeros from "../../components/Cuponero/Cuponeros";
import FormCheckout from "../../components/Cuponero/FormCheckout";
import ValorarCheckout from "../../components/Cuponero/ValorarCheckout";
import OrdenCheckout from "../../components/Cuponero/OrdenCheckout";
import { useAuth } from '../../services/AuthContext';

import { addRaiting, getCouponById, getCouponImage } from '../../services/CuponesService';
import { getVendedorById, getLogoImage } from '../../services/vendedoresService';

import logo from "../../assets/logo.png";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';

import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import { getCuponeroById, updateCuponero } from "../../services/cuponerosService";
import { useNavigate } from "react-router-dom";

const steps = ['Datos personales', 'Valorar', 'Tu orden'];

function getStepContent(step, cartCoupons, reviews, setReviews, comments, setComments, user, cuponero, 
                        formData, setFormData, errors, setErrors, errorsValorar, setErrorsValorar ) {
    switch (step) {
        case 0:
            return <FormCheckout 
                cuponero={cuponero} 
                formData={formData} 
                setFormData={setFormData} 
                errors={errors} 
                setErrors={setErrors} />;
        case 1:
            return <ValorarCheckout 
                cartCoupons={cartCoupons} 
                reviews={reviews} 
                setReviews={setReviews} 
                comments={comments} 
                setComments={setComments}
                errors={errorsValorar} 
                setErrors={setErrorsValorar} />;
        case 2:
            return <OrdenCheckout 
                cartCoupons={cartCoupons} 
                reviews={reviews} 
                comments={comments} 
                user={user} />;
        default:
            throw new Error('Unknown step');
    }
}

export default function Checkout() {
    const [activeStep, setActiveStep] = useState(0);
    const [reviews, setReviews] = useState({});
    const [comments, setComments] = useState({});
    const { user } = useAuth();
    const [cartCoupons, setCartCoupons] = useState([]);
    const [cuponero, setCuponero] = useState({});
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
        ciudad: 'Chia',
        pais: 'Colombia'
    });
    const [errors, setErrors] = useState({});
    const [errorsValorar, setErrorsValorar] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCuponero = async () => {
            try {
                const data = await getCuponeroById(user);
                setCuponero(data);
            } catch (error) {
                console.error('Error al obtener los datos del cuponero:', error);
            }
        };

        fetchCuponero();
    }, [user]);

    useEffect(() => {
        const fetchCartCoupons = async () => {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];

            if (cart.length > 0) {
                try {
                    const couponsPromises = cart.map(async (couponId) => {
                        let coupon, image, vendor, vendorLogo;
                        try {
                            coupon = await getCouponById(couponId);
                        } catch (error) {
                            console.error('Error al obtener los datos del cupon:', error);
                        }
                        try {
                            image = await getCouponImage(couponId);
                        } catch (error) {
                            console.error('Error al obtener la imagen del cupon:', error);
                        }
                        try {
                            vendor = await getVendedorById(coupon[0].createdBy, 'Complete');
                        } catch (error) {
                            console.error('Error al obtener los datos del vendedor:', error);
                        }
                        try {
                            vendorLogo = await getLogoImage(coupon[0].createdBy);
                        } catch (error) {
                            console.error('Error al obtener el logo del vendedor:', error);
                        }
                        return {
                            ...coupon[0],
                            image,
                            vendorName: vendor[0].nombreTienda,
                            vendorRating: vendor[0].raiting,
                            vendorPhone: vendor[0].telefono,
                            vendorLogo
                        };
                    });
                    const coupons = await Promise.all(couponsPromises);
                    setCartCoupons(coupons);

                } catch (error) {
                    console.error('Error al obtener los datos del checkout:', error);
                }
            } else {
                setCartCoupons([]);
            }
        };

        fetchCartCoupons();
    }, []);

    const handleNext = async () => {
        if (activeStep === 0) {
            const newErrors = {};
            if (!formData.nombre) newErrors.nombre = 'El nombre es requerido';
            if (!formData.apellido) newErrors.apellido = 'El apellido es requerido';
            if (!formData.email) newErrors.email = 'El email es requerido';
            if (!formData.ciudad) newErrors.ciudad = 'La ciudad es requerida';
            if (!formData.pais) newErrors.pais = 'El país es requerido';
            setErrors(newErrors);
            if (Object.keys(newErrors).length === 0) {
                try {
                    const dataCuponero = {
                        nombre: formData.nombre,
                        apellido:formData.apellido,
                        email: formData.email,
                        //telefono: formData.telefono,
                        //ciudad: formData.ciudad,
                        //pais: formData.pais
                    }
                    await updateCuponero(user, dataCuponero);
                    setActiveStep((prevActiveStep) => prevActiveStep + 1);
                } catch (error) {
                    console.error('Error al actualizar el cuponero:', error);
                }
            }
        } else if (activeStep === 1) {
            const newErrorsV = { reviews: {}, comments: {} };
            cartCoupons.forEach(coupon => {
                if (!reviews[coupon.id]) newErrorsV.reviews[coupon.id] = 'La valoración es requerida';
                if (!comments[coupon.id]) newErrorsV.comments[coupon.id] = 'El comentario es requerido';
            });
            setErrorsValorar(newErrorsV);
            if (Object.keys(newErrorsV.reviews).length === 0 && Object.keys(newErrorsV.comments).length === 0) {
                try {
                    await Promise.all(cartCoupons.map(coupon => { 
                        const dataRaiting = {
                            user_id: user,
                            id_cupon: coupon.id,
                            raiting: reviews[coupon.id],
                            comentarios: comments[coupon.id]
                        }
                        addRaiting(coupon.createdBy, dataRaiting)
                    }));
                    setActiveStep((prevActiveStep) => prevActiveStep + 1);
                } catch (error) {
                    console.error('Error al agregar raitings:', error);
                }
            }
        } else if (activeStep === 2) {
            const updatedCart = [];
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            navigate('/cuponero/')
        } else {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    /*if (loading) {
        return <div>Loading...</div>;
    }*/

    return (
        <>
            <Cuponeros>
                <div className="container-checkout">
                    <div className="row row-checkout">
                        <div className="col-md-4 col-sm-12 card m-3 d-flex align-items-start">
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'end',
                                    height: 150,
                                }}
                            >
                                <Button
                                    startIcon={<ArrowBackRoundedIcon />}
                                    component="a"
                                    href="/cuponero/"
                                    sx={{ 
                                        ml: '2px',
                                        display: { xs: 'flex', md: 'flex' },
                                        alignItems: 'center',
                                        justifyContent: 'flex-end'
                                    }}
                                >
                                    Volver a 
                                    <img
                                        src={logo}
                                        alt="La Cuponera"
                                        sx={{ms:'2px'}}
                                    />
                                </Button>
                            </Box> 
                            <div className="carrito-checkout">
                                <Carrito />
                            </div>
                        </div>
                        <div className="col-md-7 col-sm-12 card m-3 p-lg-5 p-md-3 p-sm-5 p-xs-3">
                            <Box
                                sx={{
                                    display: { xs: 'flex', md: 'flex' },
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    alignItems: 'flex-end',
                                    flexGrow: 1,
                                }}
                            >
                                <Stepper
                                    id="desktop-stepper"
                                    activeStep={activeStep}
                                    sx={{
                                        width: '100%',
                                        height: 40,
                                        mb: 3
                                    }}
                                >
                                    {steps.map((label) => (
                                        <Step
                                            sx={{
                                                ':first-child': { pl: 0 },
                                                ':last-child': { pr: 0 },
                                            }}
                                            key={label}
                                        >
                                            <StepLabel>{label}</StepLabel>
                                        </Step>
                                    ))}
                                </Stepper>
                            </Box>
                            <React.Fragment>
                                {getStepContent(activeStep, cartCoupons, reviews, setReviews, comments, setComments, user, cuponero, formData, setFormData, errors, setErrors, errorsValorar, setErrorsValorar)}
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: { xs: 'column-reverse', sm: 'row' },
                                        justifyContent: activeStep !== 0 ? 'space-between' : 'flex-end',
                                        alignItems: 'end',
                                        flexGrow: 1,
                                        gap: 1,
                                        pb: { xs: 12, sm: 0 },
                                        mt: { xs: 2, sm: 2 },
                                        mb: '60px',
                                    }}
                                >
                                    {activeStep !== 0 && (
                                        <Button
                                            startIcon={<ChevronLeftRoundedIcon />}
                                            onClick={handleBack}
                                            variant="text"
                                            sx={{
                                                display: { xs: 'none', sm: 'flex' },
                                            }}
                                        >
                                            Anterior
                                        </Button>
                                    )}
                                    {activeStep !== 0 && (
                                        <Button
                                            startIcon={<ChevronLeftRoundedIcon />}
                                            onClick={handleBack}
                                            variant="outlined"
                                            fullWidth
                                            sx={{
                                                display: { xs: 'flex', sm: 'none' },
                                            }}
                                        >
                                            Anterior
                                        </Button>
                                    )}
                                    <Button
                                        variant="contained"
                                        endIcon={<ChevronRightRoundedIcon />}
                                        onClick={handleNext}
                                        className="btn btn-azul"
                                        sx={{
                                            width: { xs: '100%', sm: 'fit-content' },
                                        }}
                                    >
                                        {activeStep === steps.length - 1 ? 'Finalizar' : 'Siguiente'}
                                    </Button>
                                </Box>
                            </React.Fragment>
                        </div>
                    </div>
                </div>
            </Cuponeros>
        </>
    );
}
