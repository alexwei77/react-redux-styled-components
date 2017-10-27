import * as Types from '../constants/actionType'

const initialState = {    
    roles: [],
    techs: [],
    subRoles: [],
    locations : [],
    beverage: '',
    social: [],
    status: 0,
    isCompleted: false  
}

const talent_reducer = (state = initialState, action) => {
    switch(action.type){
        case Types.GET_ROLES_TECH:
            return Object.assign({}, state, { 
                roles: action.data.Roles, techs: action.data.Technologies, subRoles: action.data.SubRoles
            });
        case Types.GET_SUBMITION_DATA:                                              
            return Object.assign({}, state, { 
                locations: action.data.Locations, beverage: action.data.Beverage, social: action.data.Social, status: action.data.Status, isCompleted: true
            })
        case Types.UPDATE_STATUS:                        
            return Object.assign({}, state, { 
                status: action.status
            })   
        case Types.UPDATE_CATEGORY:            
            if(action.key === 'role')                
                return Object.assign({}, state, { subRoles: action.data})                  
            else if(action.key === 'tech')
                return Object.assign({}, state, { techs: action.data})          
            else
                return Object.assign({}, state, { locations: action.data})                
        default:
            return state;
    }   
}

export default talent_reducer