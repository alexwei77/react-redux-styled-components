import * as Types from '../constants/actionType'

const initialState = {
    isLoggedIn: false,    
    type: 'talent',
    isEditable: false
}

const auth_reducer = (state = initialState, action) => {
    switch(action.type){
        case Types.SIGNUP_SUCCESS:
            console.log('SIGNUP_SUCCESS');                       
            return Object.assign({}, state, { profileId: action.data});
        case Types.SIGNUP_FAIL:
            console.log('SIGNUP_FAIL');
            return state;
        case Types.GET_USER:
            console.log('GET_USER');
            return Object.assign({}, state, { isLoggedIn: true, firstName: action.firstName, lastName: action.lastName, email: action.email});
        case Types.SIGNUP_TYPE:
            console.log('SIGNUP_TYPE');
            return Object.assign({}, state, { type: action.signUpType })
        case Types.EDIT_TYPE:
            console.log('EDIT_TYPE');        
            return Object.assign({}, state, { isEditable: action.flag })
        default:
            return state;
    }   
}

export default auth_reducer