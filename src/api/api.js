import axios from "axios";
import jwt_decode from "jwt-decode";


export const instance = axios.create({
    baseURL: 'http://localhost:8000/',
    timeout: 1000,
    headers: {'Authorization': `Bearer ${localStorage.getItem('accessToken')}`}
});


export const getUserId = () => {
    try {
        const token = localStorage.getItem('accessToken');
        const accessToken = jwt_decode(token);
        return accessToken.sub
    } catch (e) {
        return ''
    }
};

