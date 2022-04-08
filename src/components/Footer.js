// Libraries.
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Link} from 'react-router-dom';

const FooterButtons = function(){
    /// @description Buttons on the footer.
    const {t} = useTranslation();
    return (
        <div className="mx-auto row">
            <span className="fw-bold text-muted col">
                {t("built-with-love")}<a href="https://kirillzhosul.site" className="link-info">{t("author-name-by")}</a>.
            </span>
            <span className="text-muted col">
                <a href="https://github.com/florgon/notes-web" className="text-reset" target="_blank" rel="noreferrer">{t("source-code")}</a>.
            </span>
            <span className="text-muted col">
                <Link to="/dev/docs" className="text-reset">{t("for-developers")}</Link>.
            </span>
        </div>
    )
}

const Footer = function() {
    /// @description Page footer.
    return (
        <footer className="bg-light mt-auto">
          <div className="text-center p-2 border-top">
            <FooterButtons/>
          </div>
        </footer>
    )
}

export default Footer;