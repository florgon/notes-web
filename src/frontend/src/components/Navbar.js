// Libraries.
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Navbar as BootstrapNavbar, Nav} from 'react-bootstrap';

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
    return (
        <BootstrapNavbar.Collapse id="navbarScroll">
            {isAuthenticated &&
                <Nav navbarScroll>
                    <Nav.Link href="/">{t("home-page")}</Nav.Link>
                    <Nav.Link href="/list">{t("my-notes")}</Nav.Link>
                    <Nav.Link disabled href="/create">{t("new-note")}</Nav.Link>
                    <Nav.Link href="/auth/logout">{t("log-out")}</Nav.Link>
                </Nav>
            }
            {!isAuthenticated &&
                <Nav navbarScroll>
                    <Nav.Link href="/">{t("home-page")}</Nav.Link>
                    <Nav.Link href="/auth/login">{t("log-in")}</Nav.Link>
                    <Nav.Link href="/auth/signup">{t("sign-up")}</Nav.Link>
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