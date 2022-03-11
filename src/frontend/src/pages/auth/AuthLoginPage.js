import React, {useState} from 'react';
import {Navigate} from 'react-router-dom';
import {useTranslation } from 'react-i18next';
import {useAuth} from '../../contexts/AuthContext';
import {apiRequest} from '../../components/Api';

const AuthLoginPage = function() {
    const [isLoading, setIsLoading] = useState(false);
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    const {t} = useTranslation();
    const {isAuthenticated} = useAuth();
    const {login} = useAuth();

    const authLogin = function(e){
        e.preventDefault();
        setIsLoading(true);

        let params = "username=" + username + "&password=" + password;
        apiRequest("auth/token/get", params, (result) => {
            // Success.
            setIsLoading(false);
            login(result.success.token.key);
        }, () => {
            // Error.
            setIsLoading(false);
        })

    }

    if (isAuthenticated){
        return (<Navigate to="/list"/>)
    }

    return (
        <div className="__auth__login__page">
            {isLoading && <div className='display-6 text-muted text-center'>{t("loading")}</div>}
            {!isLoading &&
            <div className="text-center">
                <p className="display-1">
                    {t("log-in")}
                </p>
                <div className='mt-5 w-25 mx-auto'>
                    <form>
                        <div className='form-group w-75 mx-auto'>
                            <label for="username">Имя пользователя</label>
                            <input type="text" className="form-control" id="username" placeholder="Введите имя пользователя" value={username} onChange={e => setUsername(e.target.value)}/>
                        </div>
                        <div className='form-group w-75 mx-auto mt-4'>
                            <label for="v">Ваш пароль</label>
                            <input type="password" className="form-control" id="password" placeholder="Введите пароль" value={password} onChange={e => setPassword(e.target.value)}/>
                        </div>
                        <button type="submit" onClick={authLogin} className="btn btn-primary btn-lg mt-3 w-50 mx-auto">{t("log-in")}</button><br/>
                        <small className="form-text text-muted"><a href="/auth/signup">Ещё нет аккаунта?</a></small>
                    </form>
                </div>
            </div>}
        </div>
    )
}

export default AuthLoginPage;