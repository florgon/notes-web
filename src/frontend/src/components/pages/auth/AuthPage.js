import React from 'react';
import { useTranslation } from 'react-i18next';

const AuthPage = function() {
    const {t} = useTranslation();
    return (
        <div className="__auth__page">
            <div className="text-center">
                <p className="display-1">
                    {t("authorize-to-continue")}
                </p>
                <div>
                    <p>
                        <a className="btn btn-primary btn-lg" href="/auth/login">
                            {t("i-already-registered")}
                        </a>
                    </p>
                    <p>
                        {t("or")}
                    </p>
                    <p>
                        <a className="btn btn-primary btn-lg" href="/auth/signup">
                            {t("i-not-already-registered")}
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default AuthPage;