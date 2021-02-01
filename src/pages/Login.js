import React, {useState} from 'react';
import {connect} from "react-redux";
import {useHistory} from "react-router-dom";
import {setIsAuth, signIn} from "../store/reducers/auth/action";
import {REGISTER} from "../api/routeConsts";
import syncAuth from "../api/syncAuth"
import {useInput} from "../api/validation";

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (email, password) => dispatch(signIn(email, password)),
        setIsAuth: () => dispatch(setIsAuth())
    }
}

const Login = (props) => {
    let history = useHistory();
    const email = useInput('', {isEmpty: true, emailError: false});
    const password = useInput('', {isEmpty: true, minLength: 4});
    const [error, setError] = useState('')


    const toRegisterPage = () => {
        history.push(REGISTER)
    }
    const handleSignIn = async (e) => {
        e.preventDefault()
        await props.signIn(email.value, password.value)
            .then(() => {
                toRegisterPage()
                }
            )
            .catch((error) => {
                setError(error)
            })
    }


    return (
        <div className='auth__body'>
            <div className='auth__wrapper'>
                <h1>Вход</h1>
                <form onSubmit={handleSignIn} className='auth__form'>
                    <div className='error__message'>{error}</div>
                    <label className='auth__input-wrapper'>
                        Введите почту
                        <input
                            type='text'
                            onBlur={e => email.onBlur(e)}
                            onChange={e => email.onChange(e)}
                            value={email.value}
                            className='auth__input'/>
                    </label>
                    <label className='auth__input-wrapper'>
                        Введите пароль
                        <input
                            type='password'
                            onBlur={e => password.onBlur(e)}
                            onChange={e => password.onChange(e)}
                            value={password.value}
                            className='auth__input'/>
                    </label>
                    <button disabled={!email.inputValid || !password.inputValid } onClick={handleSignIn} className='auth__btn'>
                        Войти
                    </button>
                </form>
                <div className='auth__btn-wrapper'>
                    <button onClick={toRegisterPage} className='auth__btn'>К окну регистрации</button>
                </div>
            </div>
        </div>
    );
};
const storeEnhancer = connect(undefined, mapDispatchToProps);
export default storeEnhancer(syncAuth(Login, false, '/contacts'));