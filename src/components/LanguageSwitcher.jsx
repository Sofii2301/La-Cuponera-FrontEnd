import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext'; 
import { Menu, MenuItem, IconButton, Avatar } from '@mui/material';
import es from '../assets/flags/es.jpg';
import en from '../assets/flags/en.jpg';

const LanguageSwitcher = () => {
    const { locale, switchLanguage } = useLanguage(); 
    const [anchorEl, setAnchorEl] = useState(null);

    const languages = [
        { code: 'en', name: 'English', flag: en },
        { code: 'es', name: 'Español', flag: es },
    ];

    const currentLanguage = languages.find(lang => lang.code === locale);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLanguageChange = (code) => {
        switchLanguage(code);
        handleMenuClose();
    };

    return (
        <div className="language-switcher">
            <IconButton onClick={handleMenuOpen} size="small">
                <Avatar src={currentLanguage.flag} alt={currentLanguage.name} />
            </IconButton>
            <Menu
                id="language-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                {languages.map((lang) => (
                    <MenuItem 
                        key={lang.code} 
                        onClick={() => handleLanguageChange(lang.code)}
                    >
                        <Avatar src={lang.flag} alt={lang.name} sx={{ marginRight: 1 }} />
                        {lang.name}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
};

export default LanguageSwitcher;
