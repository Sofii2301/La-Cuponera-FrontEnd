import React, { useState } from 'react';

const socialMediaPlatforms = [
    { name: 'Facebook', icon: 'bi-facebook' },
    { name: 'X', icon: 'bi-twitter-x' },
    { name: 'Instagram', icon: 'bi-instagram' },
    { name: 'LinkedIn', icon: 'bi-linkedin' },
    { name: 'YouTube', icon: 'bi-youtube' },
    { name: 'TikTok', icon: 'bi-tiktok' },
    { name: 'Threads', icon: 'bi-threads' },
];

export default function SocialMediaInput({ onSave }) {
    const [selectedPlatforms, setSelectedPlatforms] = useState([]);
    const [socialMedia, setSocialMedia] = useState({});

    const handlePlatformSelect = (platform) => {
        if (!selectedPlatforms.includes(platform)) {
            setSelectedPlatforms([...selectedPlatforms, platform]);
        }
    };

    const handleChange = (e, platform) => {
        const { name, value } = e.target;
        setSocialMedia({
            ...socialMedia,
            [platform]: { ...socialMedia[platform], [name]: value }
        });
    };

    const handleRemovePlatform = (platform) => {
        setSelectedPlatforms(selectedPlatforms.filter((p) => p !== platform));
        const updatedSocialMedia = { ...socialMedia };
        delete updatedSocialMedia[platform];
        setSocialMedia(updatedSocialMedia);
    };

    const handleSave = () => {
        const socialMediaString = JSON.stringify(socialMedia);
        onSave(socialMediaString);
    };

    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-12">
                    <h5>Seleccioná tus Redes Sociales</h5>
                    <div className="d-flex flex-wrap">
                        {socialMediaPlatforms.map((platform) => (
                            <button
                                key={platform.name}
                                type="button"
                                className="btn btn-outline-primary m-1"
                                onClick={() => handlePlatformSelect(platform.name)}
                            >
                                <i className={`bi ${platform.icon} me-2`}></i>{platform.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-12">
                    {selectedPlatforms.map((platform) => (
                        <div key={platform} className="mb-3 d-flex align-items-center flex-column">
                            <div className="d-flex w-100 align-items-center justify-content-between mb-2">
                                <label className="form-label me-3 fw-bold">{platform}</label>
                                <button
                                    type="button"
                                    className="btn btn-danger ms-3"
                                    onClick={() => handleRemovePlatform(platform)}
                                >
                                    Eliminar
                                </button>
                            </div>
                            <div className="d-flex flex-column w-100">
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    value={socialMedia[platform]?.username || ''}
                                    onChange={(e) => handleChange(e, platform)}
                                    className="form-control mb-2"
                                />
                                <input
                                    type="text"
                                    name="link"
                                    placeholder="Link"
                                    value={socialMedia[platform]?.link || ''}
                                    onChange={(e) => handleChange(e, platform)}
                                    className="form-control"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-12">
                    <button className="btn btn-rosa" onClick={handleSave}>
                        Guardar Redes Sociales
                    </button>
                </div>
            </div>
        </div>
    );
}
