import React, {useEffect, useState} from 'react';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import {makeStyles} from "@material-ui/styles";
import logo from '../../assets/logo.svg';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {Button} from "@material-ui/core";
import {Link} from "react-router-dom";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

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
        marginBottom: "3em"
    },
    logo: {
        height: "8em"
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
    }
}))

const Header = (props) => {
    const classes = useStyles();

    const [value, setValue] = useState(0);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const menuItemOptions = [
        {name: "Services", link: "/"},
        {name: "Custom Software Development", link: "/custom-software"},
        {name: "Mobile App Development", link: "/mobile-apps"},
        {name: "Website Development", link: "/website"}
    ]

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setOpen(true);
    };

    const handleMenuItemClick = (event, index) => {
        setAnchorEl(event.currentTarget);
        setOpen(true);
        setSelectedIndex(index);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setOpen(false);
    };

    useEffect(() => {
        switch (window.location.pathname) {
            case "/":
                if (value !== 0) {
                    setValue(0);
                }
                break;
            case "/services":
                if (value !== 1) {
                    setValue(1);
                    setSelectedIndex(0);
                }
                break;
            case "/custom-software":
                if (value !== 1) {
                    setValue(1);
                    setSelectedIndex(1);
                }
                break;
            case "/mobile-apps":
                if (value !== 1) {
                    setValue(1);
                    setSelectedIndex(2);
                }
                break;
            case "/website":
                if (value !== 1) {
                    setValue(1);
                    setSelectedIndex(3);
                }
                break;
            case "/revolution":
                if (value !== 2) {
                    setValue(2);
                }
                break;
            case "/about":
                if (value !== 3) {
                    setValue(3);
                }
                break;
            case "/contact":
                if (value !== 4) {
                    setValue(4);
                }
                break;
            case "/estimate":
                if (value !== 5) {
                    setValue(5);
                }
                break;
            default:
                break;
        }
    }, [value])

    return (
        <React.Fragment>
            <ElevationScroll>
                <AppBar position="fixed">
                    <Toolbar disableGutters>
                        <Button component={Link} to="/" className={classes.logoContainer} onClick={() => setValue(0)}
                                disableRipple={true}>
                            <img src={logo} alt="logo" className={classes.logo}/>
                        </Button>
                        <Tabs value={value} onChange={handleChange} className={classes.tabContainer}>
                            <Tab className={classes.tab} label="Home" component={Link} to="/"/>
                            <Tab className={classes.tab} label="Services" component={Link} to="/services"
                                 aria-owns={anchorEl ? "simple-menu" : undefined}
                                 aria-haspopup={open ? "true" : undefined}
                                 onMouseOver={event => handleClick(event)}/>
                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                open={open}
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
                                                  setValue(1);
                                                  handleClose()
                                              }}
                                              component={Link}
                                              to={option.link}
                                              selected={index === selectedIndex && value === 1}
                                    >
                                        {option.name}
                                    </MenuItem>
                                ))}
                                {/*<MenuItem classes={{root: classes.menuItem}} onClick={() => {handleClose(); setValue(1)}} component={Link} to="/services">Services</MenuItem>
                                <MenuItem classes={{root: classes.menuItem}} onClick={() => {handleClose(); setValue(1)}} component={Link} to="/custom-software">Custom Software Development</MenuItem>
                                <MenuItem classes={{root: classes.menuItem}} onClick={() => {handleClose(); setValue(1)}} component={Link} to="/mobile-apps">Mobile App Development</MenuItem>
                                <MenuItem classes={{root: classes.menuItem}} onClick={() => {handleClose(); setValue(1)}} component={Link} to="/website">Website Development</MenuItem>*/}
                            </Menu>
                            <Tab className={classes.tab} label="The Revolution" component={Link} to="/revolution"/>
                            <Tab className={classes.tab} label="About Us" component={Link} to="/about"/>
                            <Tab className={classes.tab} label="Contact Us" component={Link} to="/contact"/>
                            <Tab className={classes.tab} label="Estimate" component={Link} to="/estimate"/>
                        </Tabs>
                        <Button color="secondary" variant="contained" className={classes.button}>Free Estimate</Button>
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
            <div className={classes.toolbarMargin}></div>
        </React.Fragment>
    );
};

export default Header;
