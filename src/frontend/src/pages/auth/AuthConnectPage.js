// Libraries.
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useSearchParams, Navigate} from 'react-router-dom';


// Auth context for getting token.
import {getAuthToken} from '../../contexts/AuthContext';

// Dissalowing not authenticated for auth page.
import RequireAuth from '../../components/RequireAuth'

// API for redirect.
import {API_URL} from '../../components/Api';


const AuthConnectPage = function() {
    /// @description Auth page.

    // States.
    const [serviceUserId, setServiceUserId] = useState(0);
    const [state, setState] = useState("");

    // Usings.
    const {t} = useTranslation();
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        setServiceUserId(searchParams.get("service_user_id"))
        setState(searchParams.get("state"))
        setSearchParams("")
    }, [setSearchParams, setServiceUserId, setState]);
   

    document.title = t("page-title-auth");
    return (
        <div className="text-center">
            <RequireAuth/>
            {state == "success" && <Navigate to="/settings#service-connected"/>}
            {state == "error" && <Navigate to="/settings#service-connect-error"/>}
            {state != "success" && state != "error" && state != "confirm" && <Navigate to="/settings"/>}

            <p className="display-1">
                {t("connect-external-account")}
            </p>

            <div>
                {state == "confirm" &&
                    <form method="post" action={API_URL + "auth/service/vk/connect?state=confirm_external"} className="inline">
                        <input type="hidden" name="service_user_id" value={serviceUserId}/>
                        <input type="hidden" name="token" value={getAuthToken()}/>
                        <button type="submit" className="btn btn-lg btn-success">
                            {t("confirm-connect-external-account")}
                        </button>
                    </form>
                }
            </div>
        </div>
    )
}

export default AuthConnectPage;