import React from 'react';
import '../css/loading.css';
import logo from '../assets/logo.png'
import winwin from '../assets/winwin/PoseWinWin2.gif'

const LoadingOverlay = () => {
    return (
        <div className="row loading-overlay">
            <div className="row loading-content">
                <div className="row d-flex justify-content-center">
                    <div className="col col-xl-2 col-lg-4 col-md-4 col-sm-6 col-xs-10 h-100">
                        <img src={logo} alt="La Cuponera" className='loading-content-logo'/>
                    </div>
                </div>
                <div className="row d-flex justify-content-center">
                    <div className="col col-xl-4 col-lg-6 col-md-8 col-sm-12 h-100">
                        <img src={winwin} alt="Win Win" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoadingOverlay;
