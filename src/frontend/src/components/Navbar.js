import React from 'react';
import {useTranslation} from 'react-i18next';
import {Navbar as BootstrapNavbar, Nav} from 'react-bootstrap';
import {useAuth} from '../contexts/AuthContext';

const Navbar = function() {
    const {t} = useTranslation();
    const {isAuthenticated} = useAuth();
    return (
        <BootstrapNavbar bg="light" expand="md" className="__navbar border-bottom container-fluid">
            <BootstrapNavbar.Brand>
                <span className="display-6 text-center">{t("brand")}</span>
            </BootstrapNavbar.Brand>
            <BootstrapNavbar.Toggle aria-controls="navbarScroll" />
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
        </BootstrapNavbar>
    )
}

export default Navbar;