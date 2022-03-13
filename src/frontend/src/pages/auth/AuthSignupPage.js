// Libraries.
import React, {useState, Fragment} from 'react';
import {useTranslation} from 'react-i18next';
import {Link} from 'react-router-dom';
import isEmail from 'validator/lib/isEmail';
import isLowercase from 'validator/lib/isLowercase';
import isStrongPassword from 'validator/lib/isStrongPassword';

// Auth context for working with auth.
import {useAuth} from '../../contexts/AuthContext';

// Dissalow already authenticated users.
import DissalowAuth from '../../components/DissalowAuth';

// API for requesting API auth methods.
import {apiRequest} from '../../components/Api';

// Alert for messages.
import Alert from '../../components/Alert';


const AuthSignupForm = function({
    signupHandler, t,
    username, email, password, passwordConfirmation, setUsername, setEmail, setPassword, setPasswordConfirmation
}) {
    /// @description Signup form for auth.
    return (
        <form>
            <div className='form-group w-75 mx-auto'>
                <label>{t("auth-field-username")}</label>
                <input autoComplete="on" type="text" className="form-control" placeholder={t("auth-enter-username")} 
                    value={username} onChange={e => setUsername(e.target.value)}
                />
                <small className="form-text text-muted">{t("auth-username-lowercase")}</small>
            </div>
            <div className='form-group mt-3 w-75 mx-auto'>
                <label>{t("auth-field-email")}</label>
                <input autoComplete="on" type="email" className="form-control" placeholder={t("auth-enter-email")}
                    value={email} onChange={e => setEmail(e.target.value)}/>
                <small className="form-text text-muted">{t("auth-email-is-not-leaked")}</small>
            </div>
            <div className='row'>
                <div className='form-group col mt-3 w-25'>
                    <label>{t("auth-field-password")}</label>
                    <input autoComplete="off" type="password" className="form-control"placeholder={t("auth-enter-password")}
                        value={password} onChange={e => setPassword(e.target.value)}/>
                </div>
                <div className='form-group col mt-3 w-25'>
                    <label>{t("auth-field-password-confirmation")}</label>
                    <input autoComplete="off" type="password" className="form-control" placeholder={t("auth-enter-password-confirmation")}
                        value={passwordConfirmation} onChange={e => setPasswordConfirmation(e.target.value)}/>
                    <small className="form-text text-muted">{t("auth-enter-password-confirmation-help")}.</small>
                </div>
            </div>
            <button type="submit" onClick={signupHandler} className="btn btn-primary btn-lg mt-3 w-50 mx-auto">{t("sign-up")}</button><br/>
            <small className="form-text text-muted">{t("auth-by-continue-you-agree")}</small><br/>
            <small className="form-text text-muted"><Link to="/auth/login">{t("auth-already-have-account")}</Link></small>
        </form>
    )
}

const AuthSignupPage = function() {
    // Is auth currently loading something with loader.
    const [isLoading, setIsLoading] = useState(false);

    // Popup.
    const [alertPopup, setAlertPopup] = useState({open: false});

    // Form inputs.
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    
    // Usings.
    const {t} = useTranslation();
    const {login} = useAuth();

    const usernameValidator = function(username){
        return setUsername(username.toLowerCase());
    }
    const openPopup = function(text, type){
        /// @description Opens popup.
        setAlertPopup({
            open: true,
            text, type
        })
    }

    const signUpOnSuccess = function(result){
        /// @description Handler for signup request success.
        setIsLoading(false);
        login(result.success.token.key);
    }

    const signUpOnError = function(result){
        /// @description Handler for signup request error.
        setIsLoading(false);
        console.log(result);
        openPopup(result.error.message, "danger");
    }

    const signupRequest = function(){
        /// @description Requests API for signup.
        let params = "username=" + username + "&email=" + email + "&password=" + password + "&password_confirmation=" + passwordConfirmation;
        apiRequest("auth/signup", params, signUpOnSuccess, signUpOnError)
    }

    const signupTryValidate = function(){
        /// @description Returns boolean is signup valid or not, and shows popup if not.
        if (username.length < 1) return openPopup(t("username-required"), "danger") && false;
        if (username.length < 4) return openPopup(t("username-too-short"), "danger") && false;
        if (!isLowercase(username)) return openPopup(t("username-not-lowercase"), "danger") && false;

        if (email.length < 1) return openPopup(t("email-required"), "danger") && false;
        if (!isEmail(email)) return openPopup(t("email-invalid"), "danger") && false;

        if (password.length < 1) return openPopup(t("password-required"), "danger") && false;
        if (password.length < 8) return openPopup(t("password-too-short"), "danger") && false;
        if (!isStrongPassword(password)) return openPopup(t("password-too-easy"), "danger") && false;
        if (passwordConfirmation.length < 1) return openPopup(t("password-confirmation-required"), "danger") && false;
        if (password !== passwordConfirmation) return openPopup(t("passwords-not-same"), "danger") && false;
        return true;
    }

    const signupWrapper = function(e){
        /// @description Signup button click wrapper.
        e.preventDefault();

        if (signupTryValidate()){
            setIsLoading(true);
            signupRequest();
        }
    }

    document.title = t("page-title-auth-signup");
    return (
        <Fragment>
            <DissalowAuth/>
            {isLoading && <div className='display-6 text-muted text-center'>{t("loading")}</div>}
            {!isLoading &&
                <div className="text-center">
                    <p className="display-1">
                        {t("sign-up")}
                    </p>
                    <div className='mt-5 w-25 mx-auto'>
                        <div className="text-center">
                            {alertPopup.open &&
                                <Alert text={alertPopup.text} type={alertPopup.type}/>
                            }
                        </div>
                        <AuthSignupForm signupHandler={signupWrapper} t={t} 
                            username={username} email={email} password={password} passwordConfirmation={passwordConfirmation}
                            setUsername={usernameValidator} setEmail={setEmail} setPassword={setPassword} 
                            setPasswordConfirmation={setPasswordConfirmation}
                        />
                    </div>
                </div>
            }
        </Fragment>
    )
}
export default AuthSignupPage;