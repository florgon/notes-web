// Libraries.
import React, {useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {Link} from 'react-router-dom';


// Dissalowing already authenticated for settings page.
import RequireAuth from '../components/RequireAuth'

// Language dropdown for settings.
import LanguageDropdown from '../components/LanguageDropdown';
import SettingsListViewDropdown from '../components/SettingsListViewDropdown'

// API for fetching / updating.
import {ApiComponent, apiRequest, API_URL} from '../components/Api';
import {getAuthToken} from '../contexts/AuthContext'

// Settings context.
import {useSettings} from '../contexts/SettingsContext';

// Alert for messages.
import Alert from '../components/Alert';


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

        this.handleVkDisconnect = this.handleVkDisconnect.bind(this);
    }

    handleVkDisconnect(){
        /// @descrption Handles VK auth service disconnect.
        apiRequest("auth/service/vk/disconnect", "", (raw, response) => {
            if ("status" in response.success){
                let status = response.success.status;
                if (status == "disconnected"){
                    this.props.openPopup(this.props.t("vk-account-success-disconnect"), "success")
                    this.fetchAgain();
                    return;
                }

                this.props.openPopup(this.props.t("vk-account-failed-disconnect"), "danger")
            }
        }, () => {
            this.props.openPopup(this.props.t("vk-account-failed-disconnect"), "danger")
        })
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
                    <p className="display-6 mt-3">{this.props.t("external-accounts")}</p>
                    {user.services.vk === false &&
                        <form method="POST" action={API_URL + "auth/service/vk/connect?state=external"} className="inline">
                            <button type="submit" className="btn btn-lg btn-outline-primary">
                                {this.props.t("connect-vk-account")}
                            </button>
                        </form>
                    }
                    {user.services.vk === true && <div className="row justify-content-center">
                        <div className="col-md-auto">
                            <div className="btn btn-lg btn-outline-primary disabled">
                                {this.props.t("vk-account-connected")}
                            </div>
                        </div>
                        <div className="col-md-auto">
                            <button className="btn btn-lg btn-outline-primary" onClick={this.handleVkDisconnect}>
                                {this.props.t("vk-account-disconnect")}
                            </button>
                        </div>
                    </div>}
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

    // Popup.
    const [alertPopup, setAlertPopup] = useState({open: false});

    const openPopup = function(text, type){
        /// @description Opens popup.
        setAlertPopup({
            open: true,
            text, type
        })
    }
    
    // Opening note created popup if there is hash link in url.
    useEffect(() => {
        if (window.location.href.includes("#service-connected")){
            window.history.replaceState(null, "", window.location.href.replace("#service-connected", ""))
            openPopup(t("service-successfully-connected"));
        }
    }, [openPopup])

    document.title = t("page-title-settings");
    return (
        <div className="text-center">
            <RequireAuth/>
            <p className="display-1">{t("settings")}</p>
            <hr className="w-25 mx-auto"/>

            <div className="w-50 mx-auto">
                {alertPopup.open &&
                    <Alert text={alertPopup.text} type={alertPopup.type}/>
                }
            </div>


            <div className="row mt-5">
                <AccountSettings t={t} openPopup={openPopup}/>
                <SiteSettings t={t} settings={settings}/>
            </div>
        </div>
    )
}

export default SettingsPage;