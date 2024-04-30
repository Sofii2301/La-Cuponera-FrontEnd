import React from "react";
import { Link } from "react-router-dom";
import ContainerMap from "./ContainerMap"

export default function ForgotPassword(props) {

    return(
        <>
        <ContainerMap title="¿Olvidaste tu contraseña?" subtitle="Ingresá tu dirección de correo electrónico asociado a la cuenta y te enviaremos un enlace para que puedas restablecer tu contraseña." isSignIn="registro" >
            <form className="needs-validation" noValidate>
                <div className="row g-3">
                    <div className="col-12">
                        <label htmlFor="formForgetEmail" className="form-label visually-hidden">Email</label>
                        <input type="email" className="form-control" id="formForgetEmail" placeholder="Email" required />
                        <div className="invalid-feedback">Por favor, ingresá tu mail</div>
                    </div>
                    <div className="col-12 d-grid gap-2">
                        <button type="submit" style={{ backgroundColor: '#f9ec00', border: 'none', color: 'black' }} className="btn btn-primary">Restablecer contraseña</button>
                        <Link to="signin/" className="btn btn-light">Volver a Iniciar Sesión</Link>
                    </div>
                </div>
            </form>
        </ContainerMap>        
        </>
    )
}