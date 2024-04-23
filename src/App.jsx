import './App.css'
import { Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Home from "./pages/Home"
import RegistroCuponero from "./pages/RegistroCuponero"
import RegistroVendedor from "./pages/RegistroVendedor";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/registro/cuponero" element={<RegistroCuponero/>}/>
        <Route path="/registro/vendedor" element={<RegistroVendedor/>}/>
      </Routes>
    </>
  )
}

export default App 
