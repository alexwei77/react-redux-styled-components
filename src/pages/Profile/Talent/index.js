import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'

// import { session } from '../../../services/session'

class TalentPage extends Component {

    componentWillMount(){        
        if(window.localStorage.getItem('profileId') === null){
           this.props.type === 'talent' ? browserHistory.push('/signup/talent') : browserHistory.push('signup/employer') 
        }
    }

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}

// Map state to props
const mapStateToProps = (state) => {
    return {        
        type: state.auth.type
    }
}

export default connect(mapStateToProps)(TalentPage)