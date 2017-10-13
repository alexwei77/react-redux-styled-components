import * as Types from '../constants/actionType'
import { request } from '../services/request'

export const getSubRolesAndTechs = (roles, subRoles1, subRoles2, techs) => {
    return {
        type: Types.GET_ROLES_TECH,
        roles,
        subRoles1,
        subRoles2,
        techs,
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
                    resolve(true);
                })
                .catch(error => {
                    console.log('Error', error)                    
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
                    resolve(true);
                })
                .catch(error => {
                    console.log('Error', error)                    
                    reject(false);
                })
        })
    }
}