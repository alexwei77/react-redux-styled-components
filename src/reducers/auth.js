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
            return Object.assign({}, state, { isLoggedIn: true, profileID: action.data});
        case Types.SIGNUP_FAIL:
            console.log('SIGNUP_FAIL');
            return state;
        case Types.SIGNUP_TYPE:
            console.log('SIGNUP_TYPE');
            return Object.assign({}, state, { type: action.signUpType })
        case Types.EDIT_TYPE:
            console.log('EDIT_TYPE', action.flag);        
            return Object.assign({}, state, { isEditable: action.flag })
        default:
            return state;
    }   
}

export default auth_reducer