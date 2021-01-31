import React, {useState} from 'react';
import {connect} from "react-redux";
import {useHistory} from "react-router-dom";
import {signUp} from "../store/reducers/auth/action";
import {LOGIN} from "../assets/routeConsts";
import syncAuth from "../assets/checkAuth";
import {getIsAuth} from "../store/reducers/auth/getters";

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

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleChangePassword = (e) => {
        return setPassword(e.target.value.trim())
    }

    const handleChangeEmail = (e) => {
        return setEmail(e.target.value.trim())
    }


    const toLoginPage = () => {
        history.push(LOGIN)
    }

    const handleSignUp = async (e) => {
        e.preventDefault()
        await props.signUp(email, password).then(
            history.push(LOGIN)
        ).catch(console.log(Error))
    }

    return (
        <div>
            <div>
                <h1>Регистрация</h1>
                <form onSubmit={handleSignUp}>

                    <label>
                        Введите почту
                        <input type='text' onChange={handleChangeEmail} value={email}/>
                    </label>
                    <label>
                        Введите пароль
                        <input type='password' onChange={handleChangePassword} value={password}/>
                    </label>
                    <button onClick={handleSignUp}>
                        Зарегистрироваться
                    </button>

                </form>
                <div>
                    <button onClick={toLoginPage}>К окну входа</button>
                </div>
            </div>
        </div>
    );
};
const storeEnhancer = connect(mapStateToProps, mapDispatchToProps);
export default storeEnhancer(syncAuth(Register, false));