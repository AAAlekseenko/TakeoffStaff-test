import React, {useState} from 'react';
import {connect} from "react-redux";
import {useHistory} from "react-router-dom";
import {setIsAuth, signIn} from "../store/reducers/auth/action";
import {REGISTER} from "../assets/routeConsts";
import syncAuth from "../assets/checkAuth"

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (email, password) => dispatch(signIn(email, password)),
        setIsAuth: () => dispatch(setIsAuth())
    }
}


const mapStateToProps = (state) => {
    return {}
}

const Login = (props) => {

    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');

    const history = useHistory();

    const handleChangePassword = (e) => {
        return setPassword(e.target.value.trim())
    }

    const handleChangeEmail = (e) => {
        return setEmail(e.target.value.trim())
    }

    const toRegisterPage = () => {
        history.push(REGISTER)
    }
    const handleSignIn = async (e) => {
        e.preventDefault()
        await props.signIn(email, password)
            .then(() => {
                    history.push('/contacts');
                }
            )
            .catch(Error)
    }


    return (
        <div>
            <div>
                <h1>Вход</h1>
                <form onSubmit={handleSignIn}>

                    <label>
                        Введите почту
                        <input type='text' onChange={handleChangeEmail} value={email}/>
                    </label>
                    <label>
                        Введите пароль
                        <input type='password' onChange={handleChangePassword} value={password}/>
                    </label>
                    <button onClick={handleSignIn}>
                        Войти
                    </button>

                </form>
                <div>
                    <button onClick={toRegisterPage}>К окну регистрации</button>
                </div>
            </div>
        </div>
    );
};
const storeEnhancer = connect(mapStateToProps, mapDispatchToProps);
export default storeEnhancer(syncAuth(Login, false, '/contacts'));