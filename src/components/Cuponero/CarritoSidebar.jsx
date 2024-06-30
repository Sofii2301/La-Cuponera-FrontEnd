import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Offcanvas } from "react-bootstrap";
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carrito from './Carrito';
import { useAuth } from "../../services/AuthContext";

export default function CarritoSidebar() {
    const [showSidebar, setShowSidebar] = useState(false);
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => {
        const fetchCart = () => {
            try {
                const cartData = JSON.parse(localStorage.getItem('cart')) || [];
                setCart(cartData);
            } catch (error) {
                console.error('Error al obtener los datos del carrito:', error);
            }
        };

        fetchCart();
    }, []);

    const handleClose = () => setShowSidebar(false);
    const handleShow = () => setShowSidebar(true);

    const handleContinue = () => {
        navigate('/cuponero/cupones/');
    };

    return (
        <>
            <button className="" type="button" onClick={handleShow}>
                <IconButton size="large" color="inherit">
                    {cart.length > 0 ? <Badge badgeContent={cart.length} color="error"></Badge> : ""}
                    <ShoppingCart />
                </IconButton>
            </button>
            <Offcanvas className="offcanvas-end" placement="end" show={showSidebar} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Carrito</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Carrito />
                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <div className="mt-6">
                            <Link 
                                to="/cuponero/checkout"
                                className={`${cart.length > 0 ? '' : 'disabled'} flex items-center justify-center rounded-md border border-transparent btn btn-amarillo px-6 py-3 text-base font-medium shadow-sm hover:bg-indigo-700`}
                            >
                                Realizar compra
                            </Link>
                        </div>
                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                            <p>
                                o{' '}
                                <button
                                    type="button"
                                    className="font-medium text-blue-600 hover:text-indigo-500"
                                    onClick={() => handleContinue()}
                                >
                                    Continuar comprando
                                </button>
                            </p>
                        </div>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}
