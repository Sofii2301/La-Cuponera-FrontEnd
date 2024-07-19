import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import MenuNav from "./MenuNav";
import CarritoSidebar from "./CarritoSidebar";
import MenuSidebar from "./MenuSidebar";
import { useAuth } from '../../services/AuthContext';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { getCoupons } from '../../services/CuponesService';
import { useMediaQuery } from '@mui/material';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#0088ff',
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('md')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        marginRight: theme.spacing(2),
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
        width: '0',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

export default function PrimarySearchAppBar() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [position, setPosition] = useState(0);
    const [search, setSearch] = useState('');
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const isMenuOpen = Boolean(anchorEl);
    const esPantallaMobile = useMediaQuery('(min-width: 768px)');

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

    const handleMobileSearchClick = () => {
        navigate('/search-mb');
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
                    <Link to="/" className="navbar-brand-logo pt-1 pb-1">
                        <img src={logo} alt="" className="d-inline-block align-text-top logo-navbar" />
                    </Link>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }} />
                    <form onSubmit={handleSearchSubmit}>
                        <Search onClick={esPantallaMobile && handleMobileSearchClick}>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Encontrá ofertas..."
                                inputProps={{ 'aria-label': 'search' }}
                                value={search}
                                onChange={handleSearchChange}
                                readOnly
                            />
                        </Search>
                    </form>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} />
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
