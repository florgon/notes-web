// Libraries.
import React from 'react';
import {Dropdown} from 'react-bootstrap'
import i18next from 'i18next';

const LanguageDropdown = function({t}){
    /// @description Language dropdown that allows user to select language.
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

export default LanguageDropdown;