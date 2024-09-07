// src/components/FacebookLoginButton.jsx
import React, { useEffect } from 'react';
import { FACEBOOK_APP_ID } from '../../config';
import face from "../assets/icon-face.png" 

const FacebookLoginButton = () => {
    useEffect(() => {
        // Inicializar el SDK de Facebook
        window.fbAsyncInit = function() {
            window.FB.init({
                appId: FACEBOOK_APP_ID,
                cookie: true,
                xfbml: true,
                version: 'v12.0'
            });
    
            FB.AppEvents.logPageView();   
        };
    
        (function(d, s, id){
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); 
            js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }, [FACEBOOK_APP_ID]);
    
    const handleLogin = () => {
        window.FB.login(function(response) {
            if (response.status === 'connected') {
                window.FB.api('/me', { fields: 'name,email,picture' }, function (userInfo) {
                    console.log('User Info:', userInfo);
                });
                // Obtener el token
                const accessToken = response.authResponse.accessToken;
                console.log('Access Token:', accessToken);
                
                // Redirigir al usuario
                window.location.href = 'https://lacuponera.app/';
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
