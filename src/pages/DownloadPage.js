// Libraries.
import React, {Fragment} from 'react';
import {useTranslation} from 'react-i18next';

const HomePage = function() {
    /// @description Home root page.
    const {t} = useTranslation();

    document.title = t("page-title-download");
    return (
        <Fragment>
            <div className="__description w-75 mx-auto text-center">
                <p className="display-2 ">{t("download-clients")}</p>
                <p className="display-6 text-danger">{t("download-clients-wip")}</p>
                <a className="display-6 mb-5 btn btn-primary btn-lg" href=" https://github.com/florgon/notes-mobile/releases">{t("download-android-releases")}</a>
               
            </div>

        </Fragment>
    )
}

export default HomePage;