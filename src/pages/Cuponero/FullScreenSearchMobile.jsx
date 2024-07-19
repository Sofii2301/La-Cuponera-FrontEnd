import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from 'react';
import { getCoupons } from '../../services/CuponesService';

const FullScreenContainer = styled(Box)(({ theme }) => ({
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.common.white,
    zIndex: 1300,
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2),
}));

const SearchContainer = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#f0f0f0',
    marginBottom: theme.spacing(2),
    width: '100%',
    display: 'flex',
    alignItems: 'center',
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
    width: '100%',
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
}));

const SuggestionsContainer = styled('div')(({ theme }) => ({
    flex: 1,
    overflowY: 'auto',
    backgroundColor: theme.palette.common.white,
}));

export default function FullScreenSearch() {
    const navigate = useNavigate();
    const location = useLocation();
    const [search, setSearch] = useState(new URLSearchParams(location.search).get('q') || '');
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        const fetchSuggestions = async () => {
            const allCoupons = await getCoupons();
            const filteredCoupons = allCoupons.filter((coupon) =>
                coupon.title.toLowerCase().includes(search.toLowerCase()) ||
                coupon.categorias.toLowerCase().includes(search.toLowerCase())
            );
            setSuggestions(filteredCoupons);
        };
        fetchSuggestions();
    }, [search]);

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        navigate(`/search?q=${search}`);
    };

    return (
        <FullScreenContainer>
            <form onSubmit={handleSearchSubmit} style={{ width: '100%' }}>
                <SearchContainer>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Encontrá ofertas..."
                        inputProps={{ 'aria-label': 'search' }}
                        value={search}
                        onChange={handleSearchChange}
                        autoFocus
                    />
                </SearchContainer>
            </form>
            <SuggestionsContainer>
                {suggestions.length > 0 && suggestions.map((suggestion, index) => (
                    <div key={index} onClick={() => navigate(`/search?q=${suggestion.title}`)} style={{ padding: '8px', cursor: 'pointer' }}>
                        {suggestion.title} ({suggestion.categorias})
                    </div>
                ))}
            </SuggestionsContainer>
        </FullScreenContainer>
    );
}
