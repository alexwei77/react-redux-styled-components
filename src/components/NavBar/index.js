import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import $ from 'jquery'

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

class Navigation extends Component {
    constructor() {
        super()
        this.state = {
            isActive: false,
            isHover: false,
            switched: false
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
    
    render() {
        const { landing, save, edit } = this.props
        return (
            <Wrapper>
                <ModelWrapper landing={landing}>
                    <Model />
                </ModelWrapper>
                <SaveButton save={save}>Save for later</SaveButton>
                <EditButton edit={edit}>Edit profile</EditButton>
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
                    <LoginButton />
                </Container>                                          
            </Wrapper>
        )
    }
}

export default Navigation