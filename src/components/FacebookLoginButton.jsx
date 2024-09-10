// src/components/FacebookLoginButton.jsx
import React, { useEffect } from 'react';
import { FACEBOOK_APP_ID } from '../../config';
import face from "../assets/icon-face.png" 
//import FacebookLogin from 'react-facebook-login';

const FacebookLoginButton = () => {
    useEffect(() => {
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
        FB.getLoginStatus(function(response) {
            if (response.status === 'connected') {
                statusChangeCallback(response);

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
/*
const FacebookLoginButton = () => {
    const responseFacebook = (response) => {
        console.log(response);
        if (response.accessToken) {
            // Redirigir al usuario a una URL después del inicio de sesión exitoso
            const accessToken = response.authResponse.accessToken;
            console.log('Access Token:', accessToken);
            console.log('Access Token:', response.accessToken);
            //window.location.href = 'https://lacuponera.app/';
            window.location.href = 'https://storied-gnome-5f7ac7.netlify.app/';
            console.log('Access Token:', accessToken);
            console.log('Access Token:', response.accessToken);
        } else {
            console.log('Usuario canceló el inicio de sesión o no autorizó.');
        }
    };

    return (
        <div>
            <FacebookLogin
                appId= {FACEBOOK_APP_ID}
                fields="name,email,picture"
                callback={responseFacebook} 
                icon="fa-facebook"
                textButton="Iniciar sesión con Facebook :)"
                cssClass="btnFacebook"
            />
            <fb:login-button 
                scope="public_profile,email"
                onlogin="checkLoginState();"
            >
            </fb:login-button>
        </div>
    );
};
*/
export default FacebookLoginButton;

/* {
    status: 'connected',
    authResponse: {
        accessToken: '...',
        expiresIn:'...',
        signedRequest:'...',
        userID:'...'
    }
}*/