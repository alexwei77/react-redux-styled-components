import { combineReducers } from 'redux'
import auth from './auth'
import talent from './talent'
import employer from './employer'

export const reset = () =>{ return { type: 'RESET' }}

const reducers = combineReducers({
    auth,
    talent,
    employer
});

const rootReducer = (state, action) => action.type === 'RESET' ? reducers({}, action) : reducers(state, action)

export default rootReducer