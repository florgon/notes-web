// Libraries.
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Link} from 'react-router-dom';

// Dissalowing already authenticated for auth page.
import DissalowAuth from '../../components/DissalowAuth'

const AuthPage = function() {
    /// @description Auth page.
    const {t} = useTranslation();

    document.title = t("page-title-auth");
    return (
        <div className="text-center">
            <DissalowAuth/>
            <p className="display-1">
                {t("authorize-to-continue")}
            </p>
            <div>
                <p>
                    <Link className="btn btn-primary btn-lg" to="/auth/login">
                        {t("i-already-registered")}
                    </Link>
                </p>
                <p>{t("or")}</p>
                <p>

                    <Link className="btn btn-primary btn-lg" to="/auth/signup">
                        {t("i-not-already-registered")}
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default AuthPage;