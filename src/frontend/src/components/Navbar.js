// Libraries.
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Navbar as BootstrapNavbar, Nav} from 'react-bootstrap';
import {Link, useLocation} from 'react-router-dom';

// Auth context for checking is user authenticated.
import {useAuth} from '../contexts/AuthContext';

const NavbarBrand = function({t}){
    /// @description Brand for navbar.
    return (
        <BootstrapNavbar.Brand>
            <span className="display-6 text-center">{t("brand")}</span>
        </BootstrapNavbar.Brand>
    )
}

const NavbarButtons = function({t, isAuthenticated}){
    /// @description Buttons for navbar.
    const location = useLocation();
    return (
        <BootstrapNavbar.Collapse id="navbarScroll">
            {isAuthenticated &&
                <Nav navbarScroll>
                    <Link to="/" className="nav-link">{t("home-page")}</Link>
                    <Link to="/list" className="nav-link">{t("my-notes")}</Link>
                    {location.pathname != "/list" && location.pathname != "/list/" && <Link to="/create" className="nav-link">{t("new-note")}</Link>}
                    <Link to="/auth/logout" className="nav-link">{t("log-out")}</Link>
                </Nav>
            }
            {!isAuthenticated &&
                <Nav navbarScroll>
                    <Link to="/" className="nav-link">{t("home-page")}</Link>
                    <Link to="/auth/signup" className="nav-link">{t("sign-up")}</Link>
                    <Link to="/auth/login" className="nav-link">{t("log-in")}</Link>
                </Nav>
            }
        </BootstrapNavbar.Collapse>
    )
}

const Navbar = function() {
    /// @description Navigation bar.
    const {t} = useTranslation();
    const {isAuthenticated} = useAuth();
    return (
        <BootstrapNavbar bg="light" expand="md" className="__navbar border-bottom container-fluid">
            <NavbarBrand t={t}/>
            <BootstrapNavbar.Toggle aria-controls="navbarScroll" />
            <NavbarButtons t={t} isAuthenticated={isAuthenticated}/>
        </BootstrapNavbar>
    )
}

export default Navbar;