import React, { Component } from 'react'
import { persistStore } from 'redux-persist'
import PropTypes from 'prop-types'

import configureStore from './store/configureStore'

const store = configureStore()

class App extends Component {
    constructor(){
        super();
        this.state = { rehydrated: false }
    }

    componentWillMount() {
        persistStore(store, {}, () => {
            this.setState({ rehydrated: true })
        })
    }
    
    conponentDidMount() {
        this.context.mixpanel.track('App did mount')
    }

    render() {
        if(!this.state.rehydrated){
            return null
        }
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}

App.contextTypes = {
    mixpanel: PropTypes.object.isRequired
}

export default App
