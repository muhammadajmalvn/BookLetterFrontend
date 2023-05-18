import React, { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import GridViewIcon from '@mui/icons-material/GridView';
import { useNavigate } from 'react-router-dom';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import StorefrontIcon from '@mui/icons-material/Storefront';
import SummarizeIcon from '@mui/icons-material/Summarize';
import CategoryIcon from '@mui/icons-material/Category';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LogoutIcon from '@mui/icons-material/Logout';
import AssignmentReturnedIcon from '@mui/icons-material/AssignmentReturned';
import { adminLogout } from '../../../Redux/Actions/adminActions/adminLoginActions';
import { useDispatch } from 'react-redux';

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBarWrapper = styled(AppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerWrapper = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    })
);


function Sidebar() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const logOut = () => {
        console.log('Hiii');
        dispatch(adminLogout())
        navigate("/admin")
    }
    const theme = useTheme();
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: 'flex', position: 'fixed', zIndex: '10' }}>
            <CssBaseline />
            <AppBarWrapper position="fixed" open={open} sx={{ backgroundColor: 'rgb(53, 91, 62)' }}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Hi LetterBox Admin👋
                    </Typography>
                </Toolbar>
            </AppBarWrapper>

            <DrawerWrapper variant="permanent" open={open} >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List style={{ color: 'rgb(53, 91, 62)' }}>

                    {[
                        { name: 'Dashboard', icon: <GridViewIcon /> },
                        { name: 'Users', icon: <PeopleAltIcon /> },
                        { name: 'Books', icon: <LibraryBooksIcon /> },
                        { name: 'Add-Book', icon: <BookmarkAddIcon /> },
                        { name: 'Genres', icon: <CategoryIcon /> },
                        { name: 'Orders', icon: <LocalShippingIcon /> },
                        { name: 'Returns', icon: <AssignmentReturnedIcon /> },
                        { name: 'Sell-Request', icon: <StorefrontIcon /> },
                        { name: 'Report', icon: <SummarizeIcon /> },
                        { name: 'Logout', icon: <LogoutIcon /> },
                    ].map((text, index) => (
                        <ListItem key={text.name} disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                    fontWeight: 'bolder'
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                        color: 'rgb(53, 91, 62)'
                                    }}
                                >
                                    {text.icon}
                                </ListItemIcon>
                                <ListItemText primary={text.name} sx={{ opacity: open ? 1 : 0 }}
                                    onClick={() => {
                                        let text2 = text.name.toLowerCase()
                                        text2 === "users" && navigate('/admin/users')
                                        text2 === "dashboard" && navigate('/admin')
                                        text2 === "books" && navigate('/admin/books')
                                        text2 === "add-book" && navigate('/admin/add-book')
                                        text2 === "genres" && navigate('/admin/genre')
                                        text2 === "orders" && navigate('/admin/orders')
                                        text2 === "returns" && navigate('/admin/returns')
                                        text2 === "sell-request" && navigate('/admin/sell-request')
                                        text2 === "report" && navigate('/admin/sales-report')
                                        text2 === "logout" && logOut()
                                    }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>

                <Divider />
            </DrawerWrapper>
        </Box >
    );
}

export default Sidebar
