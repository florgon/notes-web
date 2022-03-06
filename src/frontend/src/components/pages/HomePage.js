import React from 'react';
import { useTranslation } from 'react-i18next';
import { Dropdown } from 'react-bootstrap'
import i18next from 'i18next';

const LanguageDropdown = function(){
    const {t} = useTranslation();
    return (
        <Dropdown>
            <Dropdown.Toggle variant="outline-primary">
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
        <div className="__home__page text-center">
            <div className="__description w-50 mx-auto">
                <p className="display-2 mb-5">{t("welcome-there")}</p>
                <p className="display-6 mb-5">{t("website-desription")}</p>
                <p className="display-6 mb-5">{t("website-is-free")}</p>

                <div className="row">
                    <a className="btn btn-outline-primary col-3 mx-auto" href="/list">{t("my-notes")}</a>
                    <div className="col-2 mx-auto"><LanguageDropdown/></div>
                </div>

            </div>
        </div>
    )
}

export default HomePage;