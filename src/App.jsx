import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './services/AuthContext';
import { CartProvider } from "./services/CartContext";
//import { PrivateRoute }  from './services/PrivateRoute';
import RegistroCuponero from './pages/RegistroCuponero';
import RegistroVendedor from './pages/RegistroVendedor';
import SignInCuponero from './pages/SignInCuponero';
import SignInVendedor from './pages/SignInVendedor';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import PreLanzamiento from './pages/PreLanzamiento';
import Verify from './pages/Verify';

import Home_V from './pages/Vendedor/Home_V';
import Perfil_vistaPrevia from './pages/Vendedor/Perfil_vistaPrevia';
import Perfil_misCuponeros from './pages/Vendedor/Perfil_misCuponeros';
import Perfil_editarPerfil from './pages/Vendedor/Perfil_editarperfil';
import Perfil_Video from './pages/Vendedor/Perfil_Video';
import Cupones_misCupones from './pages/Vendedor/Cupones_misCupones';
import CrearCupon from './components/Cupones/CrearCupon';
import EditarCupon from './components/Cupones/EditarCupon';
import Cupones_descargas from './pages/Vendedor/Cupones_descargas';
import Estadisticas from './pages/Vendedor/Estadisticas';
import Pagos_FormasPago from './pages/Vendedor/Pago_FormasPago';
import Pagos_CambiarPlan from './pages/Vendedor/Pago_CambiarPlan';
import Pagos_CuentasBancarias from './pages/Vendedor/Pago_CuentasBancarias';
import Pagos_ResumenPlan from './pages/Vendedor/Pago_ResumenPlan2y3';
import Pagos_MiPagWeb from './pages/Vendedor/Pago_MiPagWeb';

import CercaAVos from './pages/Cuponero/CercaAVos';
import Tiendas from './pages/Cuponero/Tiendas';
import Account from './pages/Cuponero/Account';
import Cupones from './pages/Cuponero/Cupones';
import CuponPage from './components/Cupones/CuponPage';
import Checkout from "./pages/Cuponero/Checkout";
import Historial from './pages/Cuponero/Historial';
import VendedorC from './pages/Cuponero/VendedorC';
import SearchResults from './pages/Cuponero/SearchResults';
import FullScreenSearchMobile from './pages/Cuponero/FullScreenSearchMobile';

import ComingSoonHB_C from './pages/HumanBeing/ComingSoonHB_C';
import ComingSoonHB_V from './pages/HumanBeing/ComingSoonHB_V';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

//CSS
import './App.css';
import './css/home.css';
import './css/map_fondo.css';
import './css/nav.css';
import './css/registro_cuponero.css';
import './css/registro_vendedor.css';
import './css/lanzamiento.css';
import './css/container_map.css';
import './css/signin.css';
import './css/modal.css';
import './css/cupones.css';

import './css/Vendedor/vendedor.css';
import './css/Vendedor/nav_vendedor.css';
import './css/Vendedor/completar_registro.css';
import './css/Vendedor/home.css';
import './css/Vendedor/perfil.css';
import './css/Vendedor/pagos.css';

import './css/Cuponero/nav_cuponero.css';
import './css/Cuponero/cerca_a_vos.css'
import './css/Cuponero/vendedores.css'
import './css/Cuponero/footer.css'
import './css/Cuponero/cupon_page.css'
import './css/Cuponero/checkout.css'
import "./css/Cuponero/account.css"

import "./css/HumanBeing/comingsoon.css"

function App() {
    
    return (
        <>
            <AuthProvider>
            <CartProvider>
                <Routes>
                    <Route path="/signup/cuponero/" element={<RegistroCuponero />} />
                    <Route path="/signup/vendedor/" element={<RegistroVendedor />} />
                    <Route path="/signin/vendedor/" element={<SignInVendedor />} />
                    <Route path="/signin/cuponero/" element={<SignInCuponero />} />
                    <Route path="/forgot-password/:type" element={<ForgotPassword />} />
                    <Route path="/reset-password/:userType/:token" element={<ResetPassword />} />
                    <Route path="/thank-you/:type" element={<PreLanzamiento />} />
                    <Route path="/signup/verify/" element={<Verify />} />

                    {/* Vendedor */}
                    {/* 
                    <Route element={<PrivateRoute />}>*/}
                        <Route path="/vendedor" element={<Home_V />} />
                        <Route path="/vendedor/perfil/vista-previa" element={<Perfil_vistaPrevia />} />
                        <Route path="/vendedor/perfil/editar-perfil" element={<Perfil_editarPerfil />} />
                        <Route path="/vendedor/perfil/video" element={<Perfil_Video />} />
                        <Route path="/vendedor/cupones/mis-cuponeros" element={<Perfil_misCuponeros />} />
                        <Route path="/vendedor/cupones/mis-cupones" element={<Cupones_misCupones />} />
                        <Route path="/vendedor/cupones/mis-cupones/agregar-cupon" element={<CrearCupon />} />
                        <Route path="/vendedor/cupones/mis-cupones/editar-cupon/:id" element={<EditarCupon />} />
                        <Route path="/vendedor/cupones/descargas" element={<Cupones_descargas />} />
                        <Route path="/vendedor/estadisticas" element={<Estadisticas />} />
                        <Route path="/vendedor/pagos/formas" element={<Pagos_FormasPago />} />
                        <Route path="/vendedor/pagos/cambiar-plan" element={<Pagos_CambiarPlan />} />
                        <Route path="/vendedor/pagos/cuentas-bancarias" element={<Pagos_CuentasBancarias />} />
                        <Route path="/vendedor/pagos/resumen-plan" element={<Pagos_ResumenPlan />} />
                        <Route path="/vendedor/pagos/pagina-web" element={<Pagos_MiPagWeb/>} />
                        <Route path="/vendedor/perfil-vendedor/:id" element={<VendedorC />} />
                    {/*</Route> */}
                    
                    
                    {/* Cuponero */}
                    {/*<Route element={<PrivateRoute/>}>*/}
                        <Route path="/" element={<CercaAVos />} />
                        <Route path="/cuponero/cupones" element={<Cupones />} />
                        <Route path="/cuponero/tiendas" element={<Tiendas />} />
                        <Route path="/cuponero/mi-cuenta/:id" element={<Account />} />
                        <Route path="/cuponero/checkout/" element={<Checkout />} />
                        <Route path="/cuponero/historial/" element={<Historial />} />
                        <Route path="/search" element={<SearchResults />} />
                        <Route path="/search-mb" element={<FullScreenSearchMobile />} />
                        <Route path="/cuponero/perfil-vendedor/:id" element={<VendedorC />} />
                    {/**</Routes></Route>/}

                    {/* Cupones */}
                    {/*<Route element={<PrivateRoute />}>*/}
                        <Route path="/cupon/:id" element={<CuponPage />} />
                    {/*</Route> */}
                    
                    {/* HumanBeing */}
                    <Route path="/cuponero/humanbeing/comingsoon" element={<ComingSoonHB_C />} />
                    <Route path="/vendedor/humanbeing/comingsoon" element={<ComingSoonHB_V />} />
                </Routes>
            </CartProvider>
            </AuthProvider>
        </>
    );
}

export default App;
