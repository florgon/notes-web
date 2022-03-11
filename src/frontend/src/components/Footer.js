import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer = function(props) {
    const {t} = useTranslation();
    return (
        <footer className="__footer__ bg-light mt-auto">
          <div className="text-center p-2 border-top">
            <div className="mx-auto row">
                <span className="fw-bold text-muted col">
                    {t("built-with-love")}<a href="https://kirillzhosul.site" className="link-info">{t("author-name-by")}</a>.
                </span>
                <span className="text-muted col">
                    <a href="https://github.com/kirillzhosul/notes" className="text-reset">{t("source-code")}</a>.
                </span>
                <span className="text-muted col">
                    <a href="/dev/docs" className="text-reset">{t("for-developers")}</a>
                </span>
            </div>
          </div>
        </footer>
    )
}

export default Footer;