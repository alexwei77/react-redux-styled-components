import * as Types from '../constants/actionType'
import { request } from '../services/request'

export const getSubRolesAndTechs = (data) => {
    return {
        type: Types.GET_ROLES_TECH,
        data,
    }
}

export const getSubmitionData = (data) => {
    return {
        type: Types.GET_SUBMITION_DATA,
        data
    }
}

export const updateStatus = (status) => {
    return {
        type: Types.UPDATE_STATUS,
        status
    }
}

export const updateCategory = (key, data) => {    
    return {
        type: Types.UPDATE_CATEGORY,
        key,
        data
    }
}

export function postSignup2Data(step, data){
    return function () {
        return new Promise((resolve, reject) => {
            request(step, data, "POST")
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
    return function () {
        return new Promise((resolve, reject) => {
            request(step, data, "POST")
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

export function getProfileInfo(step){
    return function () {
        return new Promise((resolve, reject) => {
            request(step, null, "GET")
                .then(response => {                  
                    resolve(response);
                })
                .catch(error => {
                    console.log('Error', error)                    
                    reject(false);
                })
        })
    }
}

export function updateProfileInfo(step, data){
    return function () {
        return new Promise((resolve, reject) => {
            request(step, data, "PUT")
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