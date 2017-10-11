import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import './index.css'
import { Router, browserHistory } from 'react-router'

import configureStore from './store/configureStore'
import routes from './routes'
import registerServiceWorker from './registerServiceWorker'

const store = configureStore()

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory} routes={routes} />
    </Provider>
    , document.getElementById('root'))
registerServiceWorker()
