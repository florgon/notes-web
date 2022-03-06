import React from 'react';
import { useTranslation } from 'react-i18next';

const Navbar = function(props) {
    const {t} = useTranslation();
    return (
        <div className="__navbar navbar border-bottom navbar-expand-sm container-fluid bg-light">
            <div className="navbar-brand">
                <span className="display-6 text-center">{t("brand")}</span>
            </div>
            <div className="navbar-nav">
                <a className="nav-item nav-link " href="/">{t("home-page")}</a>
                <a className="nav-item nav-link" href="/list">{t("my-notes")}</a>
                <a className="nav-item nav-link text-reset disabled" href="/create">{t("new-note")}</a>
                <a className="nav-item nav-link text-reset disabled" href="/auth/login">{t("log-in")}</a>
                <a className="nav-item nav-link text-reset disabled" href="/auth/signup">{t("sign-up")}</a>
            </div>
        </div>
    )
}

export default Navbar;