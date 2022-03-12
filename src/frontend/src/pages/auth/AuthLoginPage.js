// Libraries.
import React, {useState, Fragment} from 'react';
import {useTranslation } from 'react-i18next';
import {Link} from 'react-router-dom';
import {t} from 'i18next';

// Auth context for working with auth.
import {useAuth} from '../../contexts/AuthContext';

// API for requesting API auth methods.
import {apiRequest} from '../../components/Api';

// Dissalow already authenticated users.
import DissalowAuth from '../../components/DissalowAuth';

// Alert for messages.
import Alert from '../../components/Alert';


const AuthLoginForm = function({loginHandler, username, password, setUsername, setPassword, t}) {
    /// @description Login form for auth.
    return (
        <form>
            <div className='form-group w-75 mx-auto'>
                <label>{t("auth-field-username")}</label>
                <input autoComplete="on" type="text" className="form-control" placeholder={t("auth-enter-username")} value={username} onChange={e => setUsername(e.target.value)}/>
            </div>
            <div className='form-group w-75 mx-auto mt-4'>
                <label>{t("auth-field-password")}</label>
                <PasswordInput password={password} setPassword={setPassword}/>
            </div>
            <button type="submit" onClick={loginHandler} className="btn btn-primary btn-lg mt-3 w-50 mx-auto">{t("log-in")}</button><br/>
            <small className="form-text text-muted"><Link to="/auth/signup">{t("auth-not-already-have-account")}</Link></small>
        </form>
    )
}

const IconEye = function (){
    /// @description Icon for Eye.
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
        </svg>
    )
}

const IconEyeSlashed = function(){
    /// @description Icon for slashed Eye.
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-eye-slash" viewBox="0 0 16 16">
            <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
            <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
            <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
        </svg>
    )
}

const PasswordInput = function({password, setPassword}) {
    /// @description Password input with toggle eye icon.
    const [isHidden, setIsHidden] = useState(true);
  
    const togglePassword = function(e){
        /// @description Toggles password visibility.
        e.preventDefault();
        setIsHidden(!isHidden);
    };
  
    return (
      <div className="input-group">
        <input 
            placeholder={t("auth-enter-password")} value={password} 
            autoComplete="on" className="form-control" type={isHidden ? "password" : "text"}
            onChange={e => setPassword(e.target.value)}
        />
        <button className="input-group-addon btn btn-outline-secondary" onClick={togglePassword}>
            {isHidden && <IconEyeSlashed/>}
            {!isHidden && <IconEye/>}
        </button>
      </div>
    );
};

const AuthLoginPage = function() {
    /// @description Auth login page with login form.

    // Is auth currently loading something with loader.
    const [isLoading, setIsLoading] = useState(false);

    // Popup.
    const [alertPopup, setAlertPopup] = useState({open: false});

    // Form inputs.
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    // Usings.
    const {t} = useTranslation();
    const {login} = useAuth();

    const openPopup = function(text, type){
        /// @description Opens popup.
        setAlertPopup({
            open: true,
            text, type
        })
    }
    
    const loginOnSuccess = function(result){
        /// @description Handler for login request success.
        setIsLoading(false);
        login(result.success.token.key);
    }

    const loginOnError = function(result){
        /// @description Handler for login request error.
        setIsLoading(false);
        openPopup(result.error.message, "danger");
    }

    const loginRequest = function(){
        /// @description Requests API for login.
        let params = "username=" + username + "&password=" + password;
        apiRequest("auth/token/get", params, loginOnSuccess, loginOnError)
    }

    const loginTryValidate = function(){
        /// @description Returns boolean is login valid or not, and shows popup if not.
        if (username.length < 1) return openPopup(t("username-required"), "danger") && false;
        if (username.length < 1) return openPopup(t("password-required"), "danger") && false;

        if (username.length < 4) return openPopup(t("username-too-short"), "danger") && false;
        if (password.length < 8) return openPopup(t("password-too-short"), "danger") && false;
        return true;
    }

    const loginWrapper = function(e){
        /// @description Login button click wrapper.
        e.preventDefault();

        if (loginTryValidate()){
            setIsLoading(true);
            loginRequest();
        }
    }

    document.title = t("page-title-auth-login");
    return (
        <Fragment>
            <DissalowAuth/>
            {isLoading && <div className='display-6 text-muted text-center'>{t("loading")}</div>}
            {!isLoading &&
                <div className="text-center">
                    <p className="display-1">
                        {t("log-in")}
                    </p>
                    <hr className="w-25 mx-auto"/>
                    <div className='mt-5 w-25 mx-auto'>
                        <div className="text-center">
                            {alertPopup.open &&
                                <Alert text={alertPopup.text} type={alertPopup.type}/>
                            }
                        </div>
                        <AuthLoginForm loginHandler={loginWrapper} 
                            password={password} setPassword={setPassword} 
                            username={username} setUsername={setUsername}
                            t={t}
                        />
                    </div>
                </div>
            }
        </Fragment>
    )
}

export default AuthLoginPage;