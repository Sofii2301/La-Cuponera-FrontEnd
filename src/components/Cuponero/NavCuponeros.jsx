import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
//import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
/*import NotificationsIcon from '@mui/icons-material/Notifications';
import MailIcon from '@mui/icons-material/Mail';
import Favorite from '@mui/icons-material/Favorite';*/

import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import MenuNav from "./MenuNav";
import CarritoSidebar from "./CarritoSidebar";
import MenuSidebar from "./MenuSidebar";
import { useAuth } from '../../services/AuthContext';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { getCoupons } from '../../services/CuponesService';



const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

const SuggestionsContainer = styled('div')(({ theme }) => ({
    position: 'absolute',
    backgroundColor: 'white',
    zIndex: 1,
    width: '100%',
    maxHeight: '200px',
    overflowY: 'auto',
    boxShadow: theme.shadows[3],
    color: 'black',
}));

export default function PrimarySearchAppBar() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [position, setPosition] = useState(0);
    const [search, setSearch] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const gotoMyAccount = () => {
        navigate(`/cuponero/mi-cuenta/${user}`);
    };

    const gotoHistorial = () => {
        navigate(`/cuponero/historial`);
    };

    const handleLogout = () => {
        const res = logout();
        if (res) {
            navigate("/");
        }
    };

    const handleSearchChange = async (event) => {
        setSearch(event.target.value);
        if (event.target.value) {
            const allCoupons = await getCoupons();
            const filteredCoupons = allCoupons.filter((coupon) =>
                coupon.title.toLowerCase().includes(event.target.value.toLowerCase()) ||
                coupon.categorias.toLowerCase().includes(event.target.value.toLowerCase())
            );
            setSuggestions(filteredCoupons);
        } else {
            setSuggestions([]);
        }
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        if (search.trim()) {
            navigate(`/search?q=${search}`);
        }
    };

    window.addEventListener('scroll', function() {
        const scrollY = this.scrollY;
        setPosition(scrollY);
    });

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={gotoMyAccount}>Mi cuenta</MenuItem>
            <MenuItem onClick={gotoHistorial}>Historial pedidos</MenuItem>
            <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position={position <= 0 ? 'static' : 'fixed'} sx={{ backgroundColor: '#0088ff', display: 'flex', alignItems: 'center' }}>
                <Toolbar sx={{ width: '90%' }}>
                    <Link to="/cuponero" className="navbar-brand-logo pt-1 pb-1">
                        <img src={logo} alt="" className="d-inline-block align-text-top logo-navbar" />
                    </Link>
                    <form onSubmit={handleSearchSubmit}>
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Encontrá ofertas..."
                                inputProps={{ 'aria-label': 'search' }}
                                value={search}
                                onChange={handleSearchChange}
                            />
                        </Search>
                        {suggestions.length > 0 && (
                            <SuggestionsContainer>
                                {suggestions.map((suggestion, index) => (
                                    <div key={index} onClick={() => navigate(`/search?q=${suggestion.title}`)} style={{ padding: '8px', cursor: 'pointer' }}>
                                        {suggestion.title} {suggestion.category}
                                    </div>
                                ))}
                            </SuggestionsContainer>
                        )}
                    </form>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <CarritoSidebar />
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <MenuSidebar />
                        <CarritoSidebar />
                    </Box>
                </Toolbar>
                <MenuNav />
            </AppBar>
            {renderMenu}
        </Box>
    );
}
