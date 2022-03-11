import React, {useState} from 'react';
import { useTranslation } from 'react-i18next';

const AuthLoginPage = function() {
    const {t} = useTranslation();
    const [isLoading, setIsLoading] = useState(false);

    const login = function(e){
        e.preventDefault();
        setIsLoading(true);
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
                            <label for="exampleInputUsername">Имя пользователя</label>
                            <input type="password" className="form-control" id="exampleInputUsername" placeholder="Введите имя пользователя"></input>
                        </div>
                        <div className='form-group w-75 mx-auto mt-4'>
                            <label for="exampleInputPassword">Ваш пароль</label>
                            <input type="password" className="form-control" id="exampleInputPassword" placeholder="Введите пароль"></input>
                        </div>
                        <button type="submit" onClick={login} className="btn btn-primary btn-lg mt-3 w-50 mx-auto">{t("log-in")}</button><br/>
                        <small className="form-text text-muted"><a href="/auth/signup">Ещё нет аккаунта?</a></small>
                    </form>
                </div>
            </div>}
        </div>
    )
}
export default AuthLoginPage;