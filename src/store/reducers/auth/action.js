import {getUserId, instance} from "../../../api/api";
import {SET_IS_AUTH} from "./const";


export const signUp = (email, password) => (dispatch) => {
    try {
        return instance.post('register',
            {
                email: email,
                password: password
            })
            .then(response => {
                    localStorage.setItem('accessToken', response.data.accessToken);
                }
            )

    } catch (error) {
        throw new Error(error)
    }

}
export const signIn = (email, password) => (dispatch) => {
    try {
        return instance.post('login',
            {
                email: email,
                password: password
            }
        ).then(response => {
                localStorage.setItem('accessToken', response.data.accessToken);
                dispatch(setIsAuth());
                instance.defaults.headers['Authorization'] = `Bearer ${response.data.accessToken}`
            }
        )
    } catch (e) {
        throw new Error(e)
    }
}

export const setIsAuth = () => {
    return ({
        type: SET_IS_AUTH,
        payload: getUserId()
    })
}



