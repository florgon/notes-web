import React from 'react';
import { useTranslation } from 'react-i18next';

const NotFoundPage = function(props) {
    const {t} = useTranslation();

    return (
        <div className="__not__found__page text-center">
            <p className="__error__text display-1 text-danger">{t("page-not-found-header")}</p>
            <p className="__error__description display-3 text-black">{t("page-not-found-description")}</p>
        </div>
    )
}

export default NotFoundPage;