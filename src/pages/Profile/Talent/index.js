import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'

class TalentPage extends Component {

    componentWillMount(){        
        if(!this.props.isLoggedIn){
           this.props.type === 'talent' ? browserHistory.push('/signup/talent') : browserHistory.push('signup/employer') 
        }
        if(this.props.isLoggedIn && this.props.isCompleted){
            browserHistory.push('/profile/talent/candidate')
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
        type: state.auth.type,
        isLoggedIn: state.auth.isLoggedIn,
        isCompleted: state.talent.isCompleted
    }
}

export default connect(mapStateToProps)(TalentPage)