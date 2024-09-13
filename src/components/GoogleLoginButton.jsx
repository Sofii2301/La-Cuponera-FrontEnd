// src/components/GoogleLoginButton.jsx
import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import google from "../assets/icon-google.png"
import { GOOGLE_CLIENT_ID } from '../../config';

const GoogleLoginButton = () => {
    const onSuccess = (response) => {
        console.log('Login Success:', response);
        console.log("Google User Data: ", response.profileObj);
        //window.location.href = 'https://lacuponera.app/';
        window.location.href = 'https://storied-gnome-5f7ac7.netlify.app/';
    };

    const onFailure = (response) => {
        console.log('Login failed:', response);
    };

    return (
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            <GoogleLogin
                onSuccess={onSuccess}
                onError={onFailure}
                useOneTap={false} 
                ux_mode="popup" 
                render={(renderProps) => (
                    <button
                        type="button"
                        className="btn"
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                    >
                        <img src={google} alt="Google" />
                        <p>Registrate con Google</p>
                    </button>
                )}
            />
        </GoogleOAuthProvider>
    );
};

export default GoogleLoginButton;


/*
Configurar boton sin react-google

import React, { useEffect } from 'react';


<!-- index.html -->
<script src="https://accounts.google.com/gsi/client" async defer></script>


const GoogleLoginButton = () => {
    useEffect(() => {
        // Cargar el SDK de Google 
        window.google.accounts.id.initialize({
          client_id: 'YOUR_GOOGLE_CLIENT_ID', // Reemplaza con tu Client ID de Google
          callback: handleCredentialResponse, // Función callback después del login
      });

      // Renderiza el botón de Google
      window.google.accounts.id.renderButton(
          document.getElementById("googleSignInButton"),
          { theme: "outline", size: "large" } // Opciones del botón
      );
  }, []);

  // Manejar la respuesta del inicio de sesión
  const handleCredentialResponse = (response) => {
      console.log("Google ID Token: ", response.credential);
      // Aquí puedes redirigir al usuario a tu página deseada
      window.location.href = "https://www.tu-dominio.com/dashboard";
  };

  return (
      <div>
          <div id="googleSignInButton"></div>
      </div>
  );
};


*/
