import { createStore, compose, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

import rootReducer from '../reducers'

const configureStore = (history) => {
    const middlewares = [
        thunkMiddleware
    ];

    return createStore(rootReducer , compose(
        applyMiddleware(...middlewares)
    ));
};
export default configureStore