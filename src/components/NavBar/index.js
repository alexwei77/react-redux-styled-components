import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import $ from 'jquery'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Model from '../Model'
import { 
    Wrapper,
    ModelWrapper,
    SaveButton, 
    EditButton,
    Img, 
    Nav, 
    Menu, 
    LoginButton, 
    Container } from './Style'
import Images from '../../themes/images'
import { getEditState } from '../../actions/auth'

class Navigation extends Component {
    constructor() {
        super()
        this.state = {
            isActive: false,
            isHover: false,
            switched: false,
            isEditable: false
        }      
    }
    
    toggleNavigation = () => {
        this.setState({
            isActive: !this.state.isActive
        })
  
        if(!this.state.isActive){
            $("body").css({"overflow": "hidden"})
        } else {
            $("body").css("overflow", "visible")
        }        
    }
    
    navigationPage = (path) => {
        this.setState({
            isActive: !this.state.isActive
        })
        $("body").css("overflow", "visible")
        browserHistory.push(path)
    } 
    
    toggleEdit = () => {
        let isEditable = this.state.isEditable ? false : true
        console.log('afdsf', isEditable, this.state.isEditable)
        this.props.actions.getEditState(isEditable);
        this.setState({
            isEditable: isEditable
        })
    }

    toggleAction = () => {
        if(this.props.type === 'talent'){
            if(window.localStorage.getItem('profileId')){
                window.localStorage.removeItem('profileId')                
            }
            browserHistory.push('/signup/talent')
        } else {
            browserHistory.push('/signup/employer')
        }
    }

    render() {
        const { landing, save, edit } = this.props
        return (
            <Wrapper>
                <ModelWrapper landing={landing}>
                    <Model />
                </ModelWrapper>
                <SaveButton save={save}>Save for later</SaveButton>
                <EditButton edit={edit} onClick={() =>this.toggleEdit()}>Edit profile</EditButton>
                { !this.state.isActive ? 
                    <Menu save={save} edit={edit} onClick={this.toggleNavigation}/> :  <Img onClick={this.toggleNavigation} src={Images.xButton} alt="" style={{width:'42px'}}/>
                }                                             
                <Nav className={this.state.isActive ? "active" : ""} >
                    <li><a onClick={() => this.navigationPage('/home')}>Home</a></li>
                    <li><a onClick={() => this.navigationPage('/about')}>About</a></li>
                    <li><a onClick={() => this.navigationPage('/contact')}>Contact</a></li>
                    <li><a onClick={() => this.navigationPage('/')}>Privacy and GDPR</a></li>
                    <li><a onClick={() => window.location.assign('https://www.linkedin.com')}>LinkedIn</a></li>
                    <li><a onClick={() => window.location.assign('https://www.facebook.com')}>Facebook</a></li>
                </Nav>
                <Container save={save} edit={edit}>
                    <LoginButton onClick={() =>this.toggleAction()}/>
                </Container>                                          
            </Wrapper>
        )
    }
}

// Map state to props
const mapStateToProps = (state) => {
    return {
        type: state.auth.type
    }
}

// Map action to props
const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({
            getEditState
        }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)