import * as Types from '../constants/actionType';
import { request } from '../services/request';

export function signUpRequest(step, userInfo){
    return function (dispatch) {
        return new Promise((resolve, reject) => {
            request(step, userInfo)
                .then(response => {                    
                    window.localStorage.setItem('profileId', response)                    
                    dispatch({
                        type: Types.SIGNUP_SUCCESS,
                        data: response
                    });
                    resolve(true);
                })
                .catch(error => {
                    console.log('Error', error)
                    dispatch({
                        type: Types.SIGNUP_FAIL,
                        error: error
                    });
                    reject(false);
                })
        })
    }
}

export function getUser(firstName, lastName, email){
    return {
        type: Types.GET_USER,
        firstName,
        lastName,
        email
    };
}

export function changeType(signUpType){
    return {
        type: Types.SIGNUP_TYPE,
        signUpType
    };
}

export function getEditState(flag){    
    return {
        type: Types.EDIT_TYPE,
        flag
    };
}