// src/components/FacebookLoginButton.jsx
import React, { useEffect } from 'react';
import { FACEBOOK_APP_ID } from '../../config';
import face from "../assets/icon-face.png" 
//import FacebookLogin from 'react-facebook-login';

const FacebookLoginButton = () => {
    useEffect(() => {
        //Add the Facebook SDK
        (function(d, s, id){
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); 
            js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));

        // Inicializar el SDK de Facebook
        window.fbAsyncInit = function() {
            window.FB.init({
                appId: FACEBOOK_APP_ID,
                cookie: true,
                xfbml: true,
                version: 'v19.0'
            });
    
            FB.AppEvents.logPageView();   
        };
    }, []);

    const statusChangeCallback = (response) => {
        console.log('Facebook login status:', response);

        if (response.status === 'connected') {
            // Usuario autenticado correctamente
            window.FB.api('/me', { fields: 'name,email,picture' }, function(userInfo) {
                console.log('User Info:', userInfo);
            });

            // Obtener el ID de usuario y el token de acceso
            const uid = response.authResponse.userID;
            const accessToken = response.authResponse.accessToken;
            console.log('Access Token:', accessToken);
            console.log('User ID:', uid);

            // Redirigir al usuario
            window.location.href = 'https://lacuponera.app/';
        } else if (response.status === 'not_authorized') {
            console.log('El usuario está conectado a Facebook, pero no ha autorizado la aplicación.');
        } else {
            console.log('El usuario no ha iniciado sesión en Facebook.');
        }
    };
    
    const handleLogin = () => {
        if (!FB) {
            console.error('Facebook SDK not loaded.');
            return;
        }

        FB.login(function(response) {
            if (response.authResponse) {
                console.log('Welcome!  Fetching your information.... ');
                FB.api('/me', function(response) {
                    console.log('Good to see you, ' + response.name + '.');
                });

                statusChangeCallback(response);
            } else {
                console.log('User cancelled login or did not fully authorize.');
            }
        }, { scope: 'public_profile,email' });
    };

    return (
        <button type="button" id="registro-facebook" className="fb-login-button p-2 rounded-md" onClick={handleLogin} data-width="100%" data-size="" data-button-type="" data-layout="" data-auto-logout-link="false" data-use-continue-as="true">
            <img src={face} alt="Facebook" />
            <div className="text-center w-100">
                <p>Iniciar sesión con Facebook</p>
            </div>
        </button>
    );
};

export default FacebookLoginButton;
/*
// Función para enviar el token al servidor
    const sendTokenToServer = (accessToken, userID, userInfo) => {
        fetch('/api/auth/facebook', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                accessToken: accessToken,
                userID: userID,
                userInfo: userInfo
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Token enviado al servidor exitosamente:', data);
            // Redirigir al usuario
            window.location.href = 'https://lacuponera.app/';
        })
        .catch(error => {
            console.error('Error al enviar el token al servidor:', error);
        });
    };
*/

/* {
    status: 'connected',
    authResponse: {
        accessToken: '...',
        expiresIn:'...',
        signedRequest:'...',
        userID:'...'
    }
}*/