import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';

const platformIcons = {
    facebook: 'bi-facebook',
    x: 'bi-x',
    instagram: 'bi-instagram',
    linkedin: 'bi-linkedin',
    youtube: 'bi-youtube',
    tiktok: 'bi-tiktok'
};

export default function SocialMediaDisplay({ socialMediaString }) {
    let socialMedia = {};
    try {
        socialMedia = socialMediaString ? JSON.parse(socialMediaString) : {};
    } catch (error) {
        console.error("Failed to parse social media string:", error);
    }

    return (
        <div>
            {Object.keys(socialMedia).length > 0 ? (
                Object.keys(socialMedia).map(platform => (
                    socialMedia[platform].username && (
                        <div key={platform} className="mb-2 main-profile-social-list">
                            <div class="media"> 
                                <div class="media-icon bg-primary-transparent text-primary"> 
                                    <i className={`bi ${platformIcons[platform.toLowerCase()]}`}></i>
                                </div> 
                                <div class="media-body"> 
                                    <Link to={socialMedia[platform].link} target="_blank" rel="noopener noreferrer">
                                        {socialMedia[platform].username}
                                    </Link>
                                </div> 
                            </div>
                        </div>
                    )
                ))
            ) : (
                <p>No hay links a redes sociales añadidos</p>
            )}
        </div>
    );
}
