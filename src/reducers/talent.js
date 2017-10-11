import * as Types from '../constants/actionType'

const initialState = {
    techs: [],
    roles: '',
    subRoles: { "role": "Engineering" },
    locations : [],
    beverage: '',
    social: [],
    status: 0
}

const talent_reducer = (state = initialState, action) => {
    switch(action.type){
        case Types.GET_ROLES_TECH:
            console.log('GET_ROLES_TECH');
            return Object.assign({}, state, { roles: action.roles, techs: action.techs, subRoles: action.subRoles});
        case Types.GET_SUBMITION_DATA:
            console.log('GET_SUBMITION_DATA')                        
            return Object.assign({}, state, { locations: action.locations, beverage: action.beverage, social: action.social, status: action.status})            
        default:
            return state;
    }   
}

export default talent_reducer