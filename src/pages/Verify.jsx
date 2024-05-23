import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ContainerMap from "../components/ContainerMap"

export default function Verify() {
  const { userType, email } = useParams();
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  /*const handleVerify = async () => {
    try {
      // Realizar la verificación del token
      const response = await fetch("http://localhost:9000/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          token: token
        })
      });
      const data = await response.json();

      if (response.ok) {
        // Si la verificación fue exitosa
        setVerificationStatus("verified");
        // Redirigir a la página de agradecimiento indicando que se verificó la cuenta
        
        navigate(`/${userType}`)
        //navigate(`/thank-you/${userType}?verified=true`);
      } else {
        // Si la verificación falló
        setVerificationStatus("failed");
        setErrorMessage(data.message); // Usar el mensaje de error recibido del servidor
      }
    } catch (error) {
      console.error("Error al verificar el token:", error);
      // Manejar el error de verificación
      setVerificationStatus("error");
      setErrorMessage("Error interno del servidor. Inténtalo de nuevo más tarde.");
    }
  };*/

  const handleLater = () => {
    // Si el usuario desea verificar en otro momento
    // Redirigir a la página de agradecimiento indicando que no se verificó la cuenta
    //navigate(`/thank-you/${userType}?verified=false`);
    navigate(`/${userType}`)
  };

  useEffect(() => {
      if (userType === "vendedor") {
        const vendedorData = JSON.parse(localStorage.getItem("vendedorData"));
        if (!vendedorData.registroVendedor) {
          console.log("Verify-registro ppal: ", vendedorData.registroVendedor);
          navigate("/signup/vendedor");
        }
      }
      /*if (userType==="vendedor"){
      // Verificar si el registro principal del vendedor está completo
        /*else {// Verificar si el registro total del vendedor está completo
          if (vendedorData.registroVendedorCompleto) {
              console.log("Verify-registro total: ", vendedorData.registroVendedorCompleto);
              navigate("/vendedor/");
          } 
        }
      }*/
}, []);

  return (
      <>
      <ContainerMap 
        title="Verificar Cuenta" 
        /*subtitle="Ingresa el código de verificación que recibiste por correo electrónico para verificar tu cuenta" */
        subtitle="Estamos trabajando en el proceso de veriificación, por ahora selecciona 'Verificar en otro momento', te avisaremos cuando puedas verificar tu correo" 
        isSignIn="sesion" >
          {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
          <div className="mb-3">
            <label htmlFor="verificationToken" className="form-label visually-hidden">Código de Verificación</label>
            <input
              type="text"
              className="form-control"
              id="verificationToken"
              placeholder="Código de Verificación"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              required
              disabled
            />
          </div>
          <div className="d-grid gap-2">
            <button /*onClick={handleVerify}*/ className="btn btn-secondary">Verificar Cuenta</button>
            <button onClick={handleLater} className="btn btn-azul">Verificar en otro momento</button>
          </div>
          {/*verificationStatus === "failed" && <p>Error: No se pudo verificar el token.</p>*/}
          {/*verificationStatus === "error" && <p>{errorMessage}</p>*/}
      </ContainerMap>
    </>
  );
}
