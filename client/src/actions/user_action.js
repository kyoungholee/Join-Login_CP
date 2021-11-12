import axios from "axios";
import {
    LOGIN_USER,
    REGISTER_USER
} from './types';

export function loginUser(dataToSubmit){
    const request = axios.post('/api/user/login',dataToSubmit)
                .then(res => res.data);


    //리듀서에 넘겨주는 작업 ~ 
    return {
        type: LOGIN_USER,
        payload: request
    }
}


export function registerUser(dataToSubmit){
    const request = axios.post('/api/user/register',dataToSubmit)
                .then(response => response.data);


    //리듀서에 넘겨주는 작업 ~ 
    return {
        type: REGISTER_USER,
        payload: request
    }
}
