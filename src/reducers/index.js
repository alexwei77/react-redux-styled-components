import { combineReducers } from 'redux'
import auth from './auth'
import talent from './talent'
import employer from './employer'

export default combineReducers({
    auth,
    talent,
    employer
});
