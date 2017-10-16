import React, { Component } from 'react'
import { persistStore } from 'redux-persist'

import configureStore from './store/configureStore'

const store = configureStore()

class App extends Component {
    constructor(){
        super();
        this.state = { rehydrated: false }
    }

    componentWillMount(){
        persistStore(store, {}, () => {
            this.setState({ rehydrated: true })
        })
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

export default App
