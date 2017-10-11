import * as Types from '../constants/actionType'
import { request } from '../services/request'

export const getSubRolesAndTechs = (roles, subRoles, techs) => {
    return {
        type: Types.GET_ROLES_TECH,
        roles,
        subRoles,
        techs
    }
}

export const getSubmitionData = (locations, beverage, social, status) => {
    return {
        type: Types.GET_SUBMITION_DATA,
        locations,
        beverage,
        social,
        status
    }
}

export function postSignup2Data(step, data){
    return function (dispatch) {
        return new Promise((resolve, reject) => {
            request(step, data)
                .then(response => {
                    // dispatch({
                    //     type: Types.SIGNUP_SUCCESS,
                    //     data: response.data
                    // });
                    resolve(true);
                })
                .catch(error => {
                    console.log('Error', error)
                    // dispatch({
                    //     type: Types.SIGNUP_FAIL,
                    //     error: error
                    // });
                    reject(false);
                })
        })
    }
}

export function postSubmitionData(step, data){
    return function (dispatch) {
        return new Promise((resolve, reject) => {
            request(step, data)
                .then(response => {
                    // dispatch({
                    //     type: Types.SIGNUP_SUCCESS,
                    //     data: response.data
                    // });
                    resolve(true);
                })
                .catch(error => {
                    console.log('Error', error)
                    // dispatch({
                    //     type: Types.SIGNUP_FAIL,
                    //     error: error
                    // });
                    reject(false);
                })
        })
    }
}