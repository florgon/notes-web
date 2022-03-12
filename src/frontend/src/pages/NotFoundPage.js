// Libraries.
import React from 'react';
import {useTranslation} from 'react-i18next';

const NotFoundPage = function() {
    /// @description Page with 404 not found error.
    const {t} = useTranslation();

    document.title = t("page-title-not-found");
    return (
        <div className="text-center">
            <p className="display-1 text-danger">{t("page-not-found-header")}</p>
            <p className="display-3 text-black">{t("page-not-found-description")}</p>
        </div>
    )
}

export default NotFoundPage;