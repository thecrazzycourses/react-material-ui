import React, {useEffect, useState} from 'react';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import {makeStyles, useTheme} from "@material-ui/styles";
import logo from '../../assets/logo.svg';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {Button} from "@material-ui/core";
import {Link} from "react-router-dom";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

function ElevationScroll(props) {
    const {children} = props;
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}

const useStyles = makeStyles(theme => ({
    toolbarMargin: {
        ...theme.mixins.toolbar,
        marginBottom: "3em",
        [theme.breakpoints.down("md")]: {
            marginBottom: "3em"
        },
        [theme.breakpoints.down("xs")]: {
            marginBottom: "2em"
        }
    },
    logo: {
        height: "8em",
        [theme.breakpoints.down("md")]: {
            height: "7em"
        },
        [theme.breakpoints.down("xs")]: {
            height: "5.5em"
        }
    },
    tabContainer: {
        marginLeft: "auto"
    },
    tab: {
        ...theme.typography.tab,
        minWidth: 10,
        marginLeft: "25px"
    },
    button: {
        ...theme.typography.estimate,
        borderRadius: "50px",
        marginLeft: "50px",
        marginRight: "25px",
        height: "45px"
    },
    logoContainer: {
        padding: 0
    },
    menu: {
        background: theme.palette.common.blue,
        color: "white",
        borderRadius: "0px"
    },
    menuItem: {
        ...theme.typography.tab,
        opacity: 0.7,
        "&:hover": {
            opacity: 1
        }
    },
    drawerIconContainer: {
        marginLeft: "auto",
        "&:hover": {
            backgroundColor: "transparent"
        }
    },
    drawerIcon: {
        height: "50px",
        width: "50px",
    },
    drawer: {
        backgroundColor: theme.palette.common.blue
    },
    drawerItem: {
        ...theme.typography.tab,
        color: "white",
        opacity: 0.7
    },
    estimate: {
        backgroundColor: theme.palette.common.orange
    },
    drawerItemSelected: {
        opacity: 1
    }
}))

const Header = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
    const matches = useMediaQuery(theme.breakpoints.down("md"));


    const [openDrawer, setOpenDrawer] = useState(false);
    const [value, setValue] = useState(0);
    const [anchorEl, setAnchorEl] = useState(null);
    const [openMenu, setOpenMenu] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const menuItemOptions = [
        {name: "Services", link: "/services", activeIndex: 1, selectedIndex: 0},
        {name: "Custom Software Development", link: "/custom-software", activeIndex: 1, selectedIndex: 1},
        {name: "Mobile App Development", link: "/mobile-apps", activeIndex: 1, selectedIndex: 2},
        {name: "Website Development", link: "/website", activeIndex: 1, selectedIndex: 3}
    ];

    const routes = [
        {name: "Home", link: "/", activeIndex: 0},
        {name: "Services", link: "/services", activeIndex: 1},
        {name: "The Revolution", link: "/revolution", activeIndex: 2},
        {name: "About Us", link: "/about", activeIndex: 3},
        {name: "Contact Us", link: "/contact", activeIndex: 4}
    ];

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setOpenMenu(true);
    };

    const handleMenuItemClick = (event, index) => {
        setAnchorEl(null);
        setOpenMenu(true);
        setSelectedIndex(index);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setOpenMenu(false);
    };

    useEffect(() => {
        [...menuItemOptions, ...routes].forEach(route => {
            switch (window.location.pathname) {
                case `${route.link}`:
                    if (value !== route.activeIndex) {
                        setValue(route.activeIndex);
                        if (route.selectedIndex && route.selectedIndex !== selectedIndex) {
                            setSelectedIndex(route.selectedIndex);
                        }
                    }
                    break;
                default:
                    break;
            }
        });

    }, [value, menuItemOptions, selectedIndex, routes])

    const tabs = (
        <React.Fragment>
            <Tabs value={value} onChange={handleChange} className={classes.tabContainer}>
                <Tab className={classes.tab} label="Home" component={Link} to="/"/>
                <Tab className={classes.tab} label="Services" component={Link} to="/services"
                     aria-owns={anchorEl ? "simple-menu" : undefined}
                     aria-haspopup={openMenu ? "true" : undefined}
                     onMouseOver={event => handleClick(event)}/>
                <Tab className={classes.tab} label="The Revolution" component={Link} to="/revolution"/>
                <Tab className={classes.tab} label="About Us" component={Link} to="/about"/>
                <Tab className={classes.tab} label="Contact Us" component={Link} to="/contact"/>
            </Tabs>
            <Button color="secondary" variant="contained" className={classes.button}>Free Estimate</Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleClose}
                MenuListProps={{onMouseLeave: handleClose}}
                classes={{paper: classes.menu}}
                elevation={0}
            >
                {menuItemOptions.map((option, index) => (
                    <MenuItem key={index}
                              classes={{root: classes.menuItem}}
                              onClick={(event) => {
                                  handleMenuItemClick(event, index);
                                  setValue(index);
                                  handleClose();
                              }}
                              component={Link}
                              to={option.link}
                              selected={index === selectedIndex && value === index}
                    >
                        {option.name}
                    </MenuItem>
                ))}
            </Menu>
        </React.Fragment>
    );

    const drawer = (
        <React.Fragment>
            <SwipeableDrawer disableBackdropTransition={!iOS}
                             disableDiscovery={iOS}
                             open={openDrawer}
                             onClose={() => setOpenDrawer(false)}
                             onOpen={() => setOpenDrawer(true)}
                             classes={{paper: classes.drawer}}
            >
                <List disablePadding>
                    <ListItem divider
                              onClick={() => {
                                  setOpenDrawer(false);
                                  setValue(0)
                              }}
                              button
                              component={Link}
                              selected={value === 0}
                              to="/">
                        <ListItemText
                            className={value === 0 ? [classes.drawerItemSelected, classes.drawerItem] : classes.drawerItem}
                            disableTypography
                        >Home</ListItemText>
                    </ListItem>
                    <ListItem divider
                              onClick={() => {
                                  setOpenDrawer(false);
                                  setValue(1)
                              }}
                              button
                              component={Link}
                              selected={value === 1}
                              to="/services">
                        <ListItemText
                            className={value === 1 ? [classes.drawerItemSelected, classes.drawerItem] : classes.drawerItem}
                            disableTypography>Services</ListItemText>
                    </ListItem>
                    <ListItem divider
                              onClick={() => {
                                  setOpenDrawer(false);
                                  setValue(2)
                              }}
                              button
                              component={Link}
                              selected={value === 2}
                              to="/revolution">
                        <ListItemText
                            className={value === 2 ? [classes.drawerItemSelected, classes.drawerItem] : classes.drawerItem}
                            disableTypography>The Revolution</ListItemText>
                    </ListItem>
                    <ListItem divider
                              onClick={() => {
                                  setOpenDrawer(false);
                                  setValue(3)
                              }}
                              button
                              component={Link}
                              selected={value === 3}
                              to="/about">
                        <ListItemText
                            className={value === 3 ? [classes.drawerItemSelected, classes.drawerItem] : classes.drawerItem}
                            disableTypography>About Us</ListItemText>
                    </ListItem>
                    <ListItem divider
                              onClick={() => {
                                  setOpenDrawer(false);
                                  setValue(4)
                              }}
                              button
                              component={Link}
                              selected={value === 4}
                              to="/contact">
                        <ListItemText
                            className={value === 4 ? [classes.drawerItemSelected, classes.drawerItem] : classes.drawerItem}
                            disableTypography>Contact Us</ListItemText>
                    </ListItem>
                    <ListItem className={classes.estimate}
                              onClick={() => {
                                  setOpenDrawer(false);
                                  setValue(5)
                              }} divider
                              button
                              component={Link}
                              selected={value === 5}
                              to="/estimate">
                        <ListItemText
                            className={value === 5 ? [classes.drawerItemSelected, classes.drawerItem] : classes.drawerItem}
                            disableTypography>Estimate</ListItemText>
                    </ListItem>
                </List>
            </SwipeableDrawer>

            <IconButton className={classes.drawerIconContainer} onClick={() => setOpenDrawer(!openDrawer)}
                        disableRipple>
                <MenuIcon className={classes.drawerIcon}/>
            </IconButton>
        </React.Fragment>
    );

    return (
        <React.Fragment>
            <ElevationScroll>
                <AppBar position="fixed">
                    <Toolbar disableGutters>
                        <Button component={Link} to="/"
                                className={classes.logoContainer}
                                onClick={() => setValue(0)}
                                disableRipple={true}>
                            <img src={logo}
                                 alt="logo"
                                 className={classes.logo}/>
                        </Button>
                        {matches ? drawer : tabs}
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
            <div className={classes.toolbarMargin}></div>
        </React.Fragment>
    );
};

export default Header;
