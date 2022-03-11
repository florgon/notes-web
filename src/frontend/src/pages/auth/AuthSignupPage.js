import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Navigate} from 'react-router-dom';
import {useAuth} from '../../contexts/AuthContext';

const AuthSignupPage = function() {
    const {t} = useTranslation();
    const {isAuthenticated} = useAuth();
    const [isLoading, setIsLoading] = useState(false);

    const signup = function(e){
        e.preventDefault();
        setIsLoading(true);
    }

    if (isAuthenticated){
        return (<Navigate to="/list"/>)
    }

    return (
        <div className="__auth__signup__page">
            {isLoading && <div className='display-6 text-muted text-center'>{t("loading")}</div>}
            {!isLoading &&
            <div className="text-center">
                <p className="display-1">
                    {t("sign-up")}
                </p>
                <div className='mt-5 w-25 mx-auto'>
                    <form>
                        <div className='form-group w-75 mx-auto'>
                            <label for="exampleInputUsername">Имя пользователя</label>
                            <input type="password" className="form-control" id="exampleInputUsername" placeholder="Введите имя пользователя"></input>
                        </div>
                        <div className='form-group mt-3 w-75 mx-auto'>
                            <label for="exampleInputEmail">Адрес электронной почты</label>
                            <input type="email" className="form-control" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Введите почту"></input>
                            <small id="emailHelp" className="form-text text-muted">Мы не передаём ваши данные третьим лицам.</small>
                        </div>
                        <div className='row'>
                            <div className='form-group col mt-3 w-25'>
                                <label for="exampleInputPassword">Ваш пароль</label>
                                <input type="password" className="form-control" id="exampleInputPassword" placeholder="Введите пароль"></input>
                            </div>
                            <div className='form-group col mt-3 w-25'>
                                <label for="exampleInputPasswordConfirmation">Подтверждение пароля</label>
                                <input type="password" className="form-control" id="exampleInputPasswordConfirmation" aria-describedby="passwordConfirmationHelp" placeholder="Введите пароль ещё раз"></input>
                                <small id="passwordConfirmationHelp" className="form-text text-muted">Повторите ваш пароль.</small>
                            </div>
                        </div>
                        <button type="submit" onClick={signup} className="btn btn-primary btn-lg mt-3 w-50 mx-auto">{t("sign-up")}</button><br/>
                        <small className="form-text text-muted">Продолжая, вы соглашатесь с нашими правилами.</small><br/>
                        <small className="form-text text-muted"><a href="/auth/login">Уже есть аккаунта?</a></small>
                    </form>
                </div>
            </div>}
        </div>
    )
}
export default AuthSignupPage;