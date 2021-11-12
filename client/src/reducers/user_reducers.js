import {
    LOGIN_USER,
    REGISTER_USER
} from '../actions/types';


export default function(state = { }, action ){
    switch (action.type){
        case LOGIN_USER: 

        //next state를 리턴 해주는 곳이다.
            return{ ...state, loginSuccess: action.payload}
            break;
        case REGISTER_USER:
        return {...state, register: action.payload}

        
        default:
            return state;
    }
}