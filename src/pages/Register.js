import React, {useState} from 'react';
import {connect} from "react-redux";
import {useHistory} from "react-router-dom";
import {signUp} from "../store/reducers/auth/action";
import {LOGIN} from "../assets/routeConsts";
import syncAuth from "../api/syncAuth";
import {getIsAuth} from "../store/reducers/auth/getters";
import './auth.scss'
import {useInput} from "../api/validation";

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (email, password) => dispatch(signUp(email, password))
    }
}


const mapStateToProps = (state) => {
    return {
        isAuth: getIsAuth(state)
    }
}


const Register = (props) => {
    let history = useHistory();

    const email = useInput('', {isEmpty: true, emailError: true});
    const password = useInput('', {isEmpty: true, minLength: 4});

    const [error, setError] = useState('')

    const toLoginPage = () => {
        history.push(LOGIN)
    }

    const handleSignUp = async (e) => {
        e.preventDefault()
        await props.signUp(email.value, password.value)
            .then(() => {
                toLoginPage()
            })
            .catch((error) => {
                setError(error)
            })
    }

    return (
        <div className='auth__body'>
            <div className='auth__wrapper'>
                <h1>Регистрация</h1>
                <form onSubmit={handleSignUp} className='auth__form'>
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
                    <button disabled={!email.inputValid || !password.inputValid} onClick={handleSignUp}
                            className='auth__btn'>
                        Зарегистрироваться
                    </button>

                </form>
                <div className='auth__btn-wrapper'>
                    <button onClick={toLoginPage} className='auth__btn'>К окну входа</button>
                </div>
            </div>
        </div>
    );
};
const storeEnhancer = connect(mapStateToProps, mapDispatchToProps);
export default storeEnhancer(syncAuth(Register, false));