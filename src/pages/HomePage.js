// Libraries.
import React, {Fragment} from 'react';
import {useTranslation} from 'react-i18next';
import {Link} from 'react-router-dom'

// Checking if user is authenticated.
import {useAuth} from '../contexts/AuthContext';

const AuthenticatedButtons = function({t}){
    /// @description Home page buttons when user is authenticated.
    return (
        <div className="col-auto mb-2">
            <Link className="btn btn-lg btn-outline-primary" to="/list">{t("my-notes")}</Link>
        </div>
    )
}

const NotAuthenticatedButtons = function ({t}){
    /// @description Home page buttons when user is not authenticated.
    return (
        <div className="col-auto mb-2">
            <Link className="btn btn-lg btn-outline-primary" to="/auth">{t("authorize")}</Link>
        </div>
    )
}

const HomePage = function() {
    /// @description Home root page.
    const {t} = useTranslation();
    const {isAuthenticated} = useAuth();

    document.title = t("page-title-home");
    return (
        <Fragment>
            <div className="__description w-75 mx-auto text-center">
                <p className="display-2 mb-5">{t("welcome-there")}</p>
                <p className="display-6 mb-5">{t("website-desription")}</p>
                <p className="display-6 mb-5">{t("website-is-free")}</p>
            </div>

            <div className="row text-center justify-content-center">
                {isAuthenticated && <AuthenticatedButtons t={t}/>}
                {!isAuthenticated && <NotAuthenticatedButtons t={t}/>}

                <div className="col-auto">
                    <Link className="btn btn-lg btn-outline-secondary" to="/download">{t("download-clients")}</Link>
                </div>
            </div>
        </Fragment>
    )
}

export default HomePage;