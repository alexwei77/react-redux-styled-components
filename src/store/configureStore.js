import { createStore, compose, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { persistStore, autoRehydrate } from 'redux-persist'

import rootReducer from '../reducers'

const configureStore = () => {
    const middlewares = [
        thunkMiddleware
    ];

    const store = createStore(rootReducer , compose(
        applyMiddleware(...middlewares), autoRehydrate()
    ));
    persistStore(store)
    return store
};
export default configureStore