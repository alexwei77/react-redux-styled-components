import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import './index.css'
import { Router, browserHistory } from 'react-router'

import configureStore from './store/configureStore'
import routes from './routes'
import registerServiceWorker from './registerServiceWorker'
import ReactGA from 'react-ga'
import mixpanel from 'mixpanel-browser'
import MixpanelProvider from 'react-mixpanel'

mixpanel.init("***")

ReactGA.initialize('UA-***', {
    debug: false
})

const logPageView = () => {    
    ReactGA.set({ page: window.location.pathname + window.location.search })
    ReactGA.pageview(window.location.pathname + window.location.search)
}

const store = configureStore()

ReactDOM.render(
    <MixpanelProvider mixpanel={mixpanel}>
        <Provider store={store}>
            <Router history={browserHistory} routes={routes} onUpdate={logPageView}/>
        </Provider>
    </MixpanelProvider>
    , document.getElementById('root'))
registerServiceWorker()
