// Libraries.
import React from 'react';
import {Dropdown} from 'react-bootstrap'

const SettingsListViewDropdown = function({t, settings, className, size, variant}){
    /// @description Notes list view as grid dropdown that allows user to select option.
    return (
        <Dropdown className={"mt-1 " + className}>
            <Dropdown.Toggle size={size || "lg"}  variant={variant || "outline-primary"}>
                {t("settings-list-view")}: {settings.notesListViewAsGrid && t("settings-list-view-option-grid")} {!settings.notesListViewAsGrid && t("settings-list-view-option-list")}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item className={!settings.notesListViewAsGrid && "active"} onClick={() => {settings.setNotesListViewAsGrid(false)}}>{t("settings-list-view-option-list")}</Dropdown.Item>
                <Dropdown.Item className={settings.notesListViewAsGrid && "active"} onClick={() => {settings.setNotesListViewAsGrid(true)}}>{t("settings-list-view-option-grid")}</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default SettingsListViewDropdown;

