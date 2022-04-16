// Libraries.
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Link} from 'react-router-dom';


// Dissalowing already authenticated for settings page.
import RequireAuth from '../../components/RequireAuth'

// Language dropdown for settings.
import LanguageDropdown from '../../components/LanguageDropdown';
import SettingsListViewDropdown from '../../components/SettingsListViewDropdown'

// API for fetching / updating.
import {ApiComponent} from '../../components/Api';
import {getAuthToken} from '../../contexts/AuthContext'

// Settings context.
import {useSettings} from '../../contexts/SettingsContext';



class AccountSettings extends ApiComponent{
    /// @description Fetched with API notes list component.
    constructor(props){
        super(props);

        // API component method (fetch notes).
        this.method = "auth/token/resolve";
        this.params = "token=" + getAuthToken();

        // Messages.
        this.error_message = {text: this.props.t("error-occured"), className: "text-danger"};
        this.empty_message = {text: this.props.t("error-unknown"), className: "text-danger"};
        this.loading_message = {text: this.props.t("loading"), className: "text-muted"};
    }

    render_body(result, message){
        /// @description Rendering body with ApiComponent supplied data.

        // Get user from result.
        const user = result ? result.user : undefined;

        return (
            <div className="col">
                <p className="display-4 mt-3">{this.props.t("account")}</p>
                <hr className="w-50 mx-auto"/>
                {user && <>
                    <div className="text-center">
                        <div className="display-4 text-muted">{user.username}</div>
                        <div>{this.props.t("user-index")} {user.id}</div>
                        <div>{this.props.t("email")} {user.email}</div>
                    </div>
                </>}

                {!user && <div className="text-center display-6">
                    <span className={message.className}>{message.text}</span>
                </div>}
            </div>
        );
    }
}

const SiteSettings = function({t, settings}){
    /// @description Settings block for site related settings.
    return (
        <div className="col">
            <p className="display-4 mt-3">{t("site")}</p>
            <hr className="w-50 mx-auto"/>
            <div className="row justify-content-center">
                <div className="col-md-auto">
                    <LanguageDropdown t={t}/>
                </div>
                <div className="col-md-auto">
                    <Link to="/auth/logout" className="btn btn-lg btn-outline-warning">{t("log-out")}</Link>
                </div>
                <div className="col-md-auto">
                    {false && 
                        <SettingsListViewDropdown t={t} settings={settings}/>
                    }
                </div>
            </div>
        </div>
    )
}

const SettingsPage = function() {
    /// @description Settings page with account information.
    const {t} = useTranslation();
    const settings = useSettings()

    document.title = t("page-title-settings");
    return (
        <div className="text-center">
            <RequireAuth/>
            <p className="display-1">{t("settings")}</p>
            <hr className="w-25 mx-auto"/>

            <div className="row mt-5">
                <AccountSettings t={t}/>
                <SiteSettings t={t} settings={settings}/>
            </div>
        </div>
    )
}

export default SettingsPage;