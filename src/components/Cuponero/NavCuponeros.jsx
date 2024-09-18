import React, { useState, useEffect, useRef } from "react";
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
import CloseIcon from '@mui/icons-material/Close';
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import cuponero from '../../assets/cuponero.png'
import MenuNav from "./MenuNav";
import CarritoSidebar from "./CarritoSidebar";
import MenuSidebar from "./MenuSidebar";
import { useAuth } from '../../services/AuthContext';
import { useNavigate } from "react-router-dom";
import { getCoupons } from '../../services/CuponesService';
import { useMediaQuery } from '@mui/material';
//import { useTranslation } from 'react-i18next';
import useCheckIfIsLogged from '../../services/PrivateRoute';
import vendedor from '../../assets/vendedor.png'
import logo_hb from '../../assets/HumanBeing/logo-horizontal.png'
import LanguageSwitcher from '../LanguageSwitcher';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#0088ff',
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('md')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        marginRight: theme.spacing(2),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
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

const SuggestionsContainer = styled('div')(({ theme }) => ({
    position: 'absolute',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: 'white',
    zIndex: 1,
    width: '100%',
    marginLeft: 0,
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
        marginLeft: theme.spacing(3),
        width: '22ch',
        marginTop: '5px',
        minWidth: 'auto',
    },
    [theme.breakpoints.down('md')]: {
        marginLeft: theme.spacing(3),
        width: '23.5ch',
        marginTop: '5px',
        minWidth: 'auto',
    },
    maxHeight: '200px',
    overflowY: 'auto',
    boxShadow: theme.shadows[3],
    color: 'black',
}));

export default function PrimarySearchAppBar() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorLg, setAnchorLg] = useState(null);
    const [anchorTd, setAnchorTd] = useState(null);
    const [position, setPosition] = useState(0);
    const [search, setSearch] = useState('');
    //const { t } = useTranslation();
    const { user, logout } = useAuth();
    const [suggestions, setSuggestions] = useState([]);
    const navigate = useNavigate();
    const isMenuOpen = Boolean(anchorEl);
    const isLogOpen = Boolean(anchorLg);
    const isTiendaOpen = Boolean(anchorTd);
    const esPantallaMobile = useMediaQuery('(max-width: 899px)');
    const isLogged = useCheckIfIsLogged();
    const cuponeroButtonRef = useRef(null);
    const vendedorButtonRef = useRef(null);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleLoggedMenuOpen = (event) => {
        setAnchorLg(event.currentTarget);
    };
    const handleTiendaMenuOpen = (event) => {
        setAnchorTd(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const handleLogClose = () => {
        setAnchorLg(null);
    };
    const handleTiendaClose = () => {
        setAnchorTd(null);
    };

    const gotoMyAccount = () => {
        navigate(`/cuponero/mi-cuenta/${user}`);
    };
    const gotoHistorial = () => {
        navigate(`/cuponero/historial`);
    };
    const gotoSignUp = () => {
        navigate(`/signup/cuponero`);
    };
    const gotoSignIn = () => {
        navigate(`/signin/cuponero`);
    };
    const gotoSignUpV = () => {
        navigate(`/signup/vendedor`);
    };
    const gotoSignInV = () => {
        navigate(`/signin/vendedor`);
    };

    const handleLogout = () => {
        const res = logout();
        if (res) {
            navigate("/signin/cuponero");
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
        if (esPantallaMobile) {
            navigate('/search-mb');
        }
    };

    window.addEventListener('scroll', function() {
        const scrollY = this.scrollY;
        setPosition(scrollY);
    });

    const menuId = 'primary-search-account-menu';
    const logId = 'button-to-log-or-signup'
    const tiendaId = 'button-to-log-or-signup-vendedor'
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
            <MenuItem onClick={gotoMyAccount}>Mi cuenta{/*t("my_account")*/}</MenuItem>
            <MenuItem onClick={gotoHistorial}>Historial pedidos{/*t("history_orders")*/}</MenuItem>
            <MenuItem onClick={handleLogout}>Cerrar sesión{/*t("logout")*/}</MenuItem>
        </Menu>
    );

    const renderLog = (
        <Menu
            anchorEl={anchorLg}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            id={logId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
            open={isLogOpen}
            onClose={handleLogClose}
            sx={{
                '.MuiPaper-root': {
                    width: cuponeroButtonRef.current ? cuponeroButtonRef.current.offsetWidth : 'auto',
                    textAlign: 'center',
                },
            }}
        >
            <MenuItem onClick={gotoSignUp}>Registrate{/*t("sign_up")*/}</MenuItem>
            <MenuItem onClick={gotoSignIn}>Inicia Sesión{/*t("login")*/}</MenuItem>
        </Menu>
    );

    const renderTienda = (
        <Menu
            anchorEl={anchorTd}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            id={tiendaId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
            open={isTiendaOpen}
            onClose={handleTiendaClose}
            sx={{
                '.MuiPaper-root': {
                    width: vendedorButtonRef.current ? vendedorButtonRef.current.offsetWidth : 'auto',
                    textAlign: 'center',
                },
            }}
        >
            <MenuItem onClick={gotoSignUpV}>Registrate{/*t('sign_up')*/}</MenuItem>
            <MenuItem onClick={gotoSignInV}>Inicia Sesión{/*t('login')*/}</MenuItem>
            <Link to='https://lacuponera.digital/'><MenuItem>Información{/*t('more_information')*/}</MenuItem></Link>
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
                        <Search onClick={handleMobileSearchClick}>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            {/*t('find_offers')*/}
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
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} />
                    <Box sx={{ display: 'flex' }}>
                        <CarritoSidebar />
                        {/* <LanguageSwitcher /> */}
                        {isLogged ? ( 
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
                        ):(
                            <IconButton
                                size="large"
                                edge="end"
                                aria-controls={logId}
                                aria-haspopup="true"
                                onClick={handleLoggedMenuOpen}
                                ref={cuponeroButtonRef}
                            >
                                <div className='btn btn-amarillo btn-log d-flex align-items-center'>
                                    <img className="img-fluid mr-2" src={cuponero} alt="Soy Cuponero" />
                                    Quiero ser cuponero{/*t("be_cuponero")*/}
                                </div>
                            </IconButton>
                        )}
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <MenuSidebar />
                    </Box>
                </Toolbar>
                <div className="bottom-nav d-flex row w-100 align-items-center justify-content-center">
                    <div className="col-3 btn-nav-hb">
                        <Link to='/cuponero/humanbeing/comingsoon' className='btn btn-hb' variant='success'>
                            <img src={logo_hb} alt="Human Being" />
                        </Link>
                    </div>
                    <div className="col-xl-5 col-lg-6 w-auto">
                        <MenuNav />
                    </div>
                    <div className="col-xl-4 col-lg-3 w-auto">
                        <div className="barra-link-vendedor">
                            <p className='mr-2 text-link-vendedor'>¿Tienes una tienda?{/*t("do_you_have_a_store")*/}</p>
                            <IconButton
                                size="small"
                                edge="end"
                                aria-controls={tiendaId}
                                aria-haspopup="true"
                                onClick={handleTiendaMenuOpen}
                                ref={vendedorButtonRef}
                            >
                                <div target="_blank" className="btn btn-amarillo d-flex align-items-center">
                                    <img src={vendedor} alt="Icono Vendedor" className='img-fluid mr-2 me-2'/>
                                    <p className='d-flex'>Ser Vendedor{/*t("be_seller")*/}</p>
                                </div>
                            </IconButton>
                        </div>
                    </div>
                </div>
            </AppBar>
            {renderMenu}
            {renderLog}
            {renderTienda}
        </Box>
    );
}
