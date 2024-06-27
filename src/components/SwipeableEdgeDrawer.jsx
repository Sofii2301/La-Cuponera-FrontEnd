import * as React from 'react';
import PropTypes from 'prop-types';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { grey } from '@mui/material/colors';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import '../App.css'

const drawerBleeding = 56;

const Root = styled('div')(({ theme }) => ({
    height: '0%',
    backgroundColor: theme.palette.mode === 'light' ? grey[100] : theme.palette.background.default,
}));

const StyledBox = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[1000],
}));

const Puller = styled('div')(({ theme }) => ({
    width: 30,
    height: 6,
    backgroundColor: theme.palette.mode === 'light' ? '#f9ec00' : grey[900],
    borderRadius: 3,
    position: 'absolute',
    top: 8,
    left: 'calc(50% - 15px)'
}));

function SwipeableEdgeDrawer({ window, vendedores, onStoreClick }) {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Root>
            <CssBaseline />
            <Global
                styles={{
                    '.MuiDrawer-root > .MuiPaper-root': {
                        height: `calc(80% - ${drawerBleeding}px)`,
                        overflow: 'visible',
                    },
                }}
            />
            <SwipeableDrawer
                container={container}
                anchor="bottom"
                open={open}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
                swipeAreaWidth={drawerBleeding}
                disableSwipeToOpen={false}
                ModalProps={{
                    keepMounted: true,
                }}
            >
                <StyledBox
                    sx={{
                        position: 'absolute',
                        top: -drawerBleeding-10,
                        borderTopLeftRadius: 15,
                        borderTopRightRadius: 15,
                        visibility: 'visible',
                        right: 0,
                        left: 0,
                        boxShadow: '0px -2px 10px 0px rgba(0, 0, 0, 0.3)'
                    }}
                    >
                    <Puller />
                    <Typography sx={{ p: 2, color: '#0088ff', fontFamily: 'Protest Riot Regular', fontSize: 25, textAlign: 'center', fontWeight: 300 }}>Tiendas</Typography>
                </StyledBox>
                <StyledBox
                    sx={{
                        px: 2,
                        pb: 2,
                        height: '100%',
                        width:'100%',
                        overflow: 'auto',
                    }}
                    >
                    <List>
                        {vendedores.map((vendedor) => (
                            <ListItem key={vendedor.id}>
                                <ListItemButton onClick={() => onStoreClick(vendedor)}>
                                    <ListItemText
                                        primary={vendedor.nombreTienda}
                                        secondary={`Calificación: ${String(vendedor.rating)}`}
                                        sx={{
                                            fontFamily: 'Protest Riot Regular'
                                        }}
                                    />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </StyledBox>
            </SwipeableDrawer>
        </Root>
    );
}

SwipeableEdgeDrawer.propTypes = {
    window: PropTypes.func,
    vendedores: PropTypes.array.isRequired,
    onStoreClick: PropTypes.func.isRequired,
};

export default SwipeableEdgeDrawer;
