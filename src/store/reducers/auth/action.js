import {getUserId, instance} from "../../../api/api";
import {SET_IS_AUTH} from "./const";


export const signUp = (email, password) => () => {
    return instance.post('register',
        {
            email: email,
            password: password
        })
        .then(response => {
                localStorage.setItem('accessToken', response.data.accessToken);
            }
        ).catch((response) => {
            throw response.response.data
        })


}
export const signIn = (email, password) => (dispatch) => {
    return instance.post('login',
        {
            email: email,
            password: password
        }
    ).then(response => {
        localStorage.setItem('accessToken', response.data.accessToken);
        dispatch(setIsAuth());
        instance.defaults.headers['Authorization'] = `Bearer ${response.data.accessToken}`
    })
        .catch((response) => {
            throw response.response.data
        })

}

export const setIsAuth = () => {
    return ({
        type: SET_IS_AUTH,
        payload: getUserId()
    })
}




