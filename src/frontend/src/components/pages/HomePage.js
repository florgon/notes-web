import React from 'react';
import { useTranslation } from 'react-i18next';
import { Dropdown } from 'react-bootstrap'
import i18next from 'i18next';

const LanguageDropdown = function(){
    const {t} = useTranslation();
    return (
        <Dropdown>
            <Dropdown.Toggle size="lg" variant="outline-primary">
                {t("change-language")}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item onClick={() => i18next.changeLanguage("en")}>{t("language-en")}</Dropdown.Item>
                <Dropdown.Item onClick={() => i18next.changeLanguage("ru")}>{t("language-ru")}</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

const HomePage = function(props) {
    const {t} = useTranslation();
    return (
        <div className="__home__page">
            <div className="__description w-75 mx-auto text-center">
                <p className="display-2 mb-5">{t("welcome-there")}</p>
                <p className="display-6 mb-5">{t("website-desription")}</p>
                <p className="display-6 mb-5">{t("website-is-free")}</p>
            </div>

            <div className="row text-center justify-content-center">
                <div className="col-auto mb-2">
                    <a className="btn btn-lg btn-outline-primary" href="/list">{t("my-notes")}</a>
                </div>
                <div className="col-auto">
                    <LanguageDropdown/>
                </div>
            </div>
        </div>
    )
}

export default HomePage;