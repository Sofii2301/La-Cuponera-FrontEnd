import './App.css'
import { Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Home from "./pages/Home"
import RegistroCuponero from "./pages/RegistroCuponero"
import RegistroVendedor from "./pages/RegistroVendedor";
import SignIn from "./pages/SignIn"
import ForgotPassword from "./pages/ForgotPassword"

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signup/cuponero/" element={<RegistroCuponero/>}/>
        <Route path="/signup/vendedor/" element={<RegistroVendedor/>}/>
        <Route path="/signin/" element={<SignIn/>}/>
        <Route path="/forgot-password/" element={<ForgotPassword/>}/>
      </Routes>
    </>
  )
}

export default App 
