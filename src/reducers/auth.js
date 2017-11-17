import * as Types from '../constants/actionType'

const initialState = {
    isLoggedIn: false,    
    type: 'talent',
    isEditable: false
}

const auth_reducer = (state = initialState, action) => {
    switch(action.type){
        case Types.SIGNUP_SUCCESS:                                  
            return Object.assign({}, state, { profileId: action.data, isLoggedIn: true});
        case Types.SIGNUP_FAIL:            
            return state;
        case Types.GET_USER:            
            return Object.assign({}, state, { fullName: action.data.fullName, email: action.data.email});
        case Types.SIGNUP_TYPE:            
            return Object.assign({}, state, { type: action.signUpType })
        case Types.EDIT_TYPE:              
            return Object.assign({}, state, { isEditable: action.flag })
        default:
            return state;
    }   
}

export default auth_reducer