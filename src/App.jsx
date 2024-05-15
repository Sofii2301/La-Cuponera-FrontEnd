import { Routes, Route } from 'react-router-dom'

import Home from "./pages/Home"
import RegistroCuponero from "./pages/RegistroCuponero"
import RegistroVendedor from "./pages/RegistroVendedor";
import SignIn from "./pages/SignIn"
import ForgotPassword from "./pages/ForgotPassword"
import PreLanzamiento from './pages/PreLanzamiento'
import Verify from './pages/Verify'
import Cuponeros from "./pages/Cuponeros"
import SignInMicroservicios from './pages/SignInMicroservicios';
import Home_V from "./pages/Vendedor/Home_V";
import Perfil_vistaPrevia from "./pages/Vendedor/Perfil_vistaPrevia";
import Perfil_misCuponeros from "./pages/Vendedor/Perfil_misCuponeros";
import Perfil_editarPerfil from "./pages/Vendedor/Perfil_editarperfil";
import Cupones_misCupones from "./pages/Vendedor/Cupones_misCupones";
import Cupones_editarCupones from "./pages/Vendedor/Cupones_editarCupones";
import Cupones_descargas from "./pages/Vendedor/Cupones_descargas";
import Estadisticas from "./pages/Vendedor/Estadisticas";

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css';

//CSS
import './App.css'
import "./css/home.css"
import "./css/map_fondo.css"
import "./css/nav.css"
import "./css/registro_cuponero.css"
import "./css/registro_vendedor.css"
import "./css/lanzamiento.css"
import "./css/container_map.css"
import "./css/vendedor.css"
import "./css/signin.css"
import RegistroCompletoV from './components/Vendedor/RegistroCompletoV';


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signup/cuponero/" element={<RegistroCuponero/>}/>
        <Route path="/signup/vendedor/" element={<RegistroVendedor/>}/>
        <Route path="/signup/verify/:userType/:email" element={<Verify />} />
        <Route path="/signin/" element={<SignIn/>}/>
        <Route path="/signin/microservicios" element={<SignInMicroservicios/>}/>
        <Route path="/forgot-password/" element={<ForgotPassword/>}/>
        <Route path="/thank-you/:type" element={<PreLanzamiento/>}/>
        <Route path="/cuponero" element={<Cuponeros/>}/>
        {/* Vendedor */}
        <Route path="/vendedor/completar-registro" element={<RegistroCompletoV/>}/>
        <Route path="/vendedor" element={<Home_V/>}/>
        <Route path="/vendedor/perfil/vista-previa" element={<Perfil_vistaPrevia/>}/>
        <Route path="/vendedor/perfil/mis-cuponeros" element={<Perfil_misCuponeros/>}/>
        <Route path="/vendedor/perfil/editar-perfil" element={<Perfil_editarPerfil/>}/>
        <Route path="/vendedor/cupones/mis-cupones" element={<Cupones_misCupones/>}/>
        <Route path="/vendedor/cupones/editar-cupones" element={<Cupones_editarCupones/>}/>
        <Route path="/vendedor/cupones/descargas" element={<Cupones_descargas/>}/>
        <Route path="/vendedor/estadisticas" element={<Estadisticas/>}/>
      </Routes>
    </>
  )
}

export default App 
