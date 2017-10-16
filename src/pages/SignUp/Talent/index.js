import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import TextField from 'material-ui/TextField'
import GoogleLogin from 'react-google-login'
import FacebookLogin from 'react-facebook-login'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux' 
import ReactLoading from 'react-loading'

import Header from '../../../components/Header'
import { 
    Wrapper, 
    Content, 
    Heading, 
    ButtonWrapper,
    SpinWrapper, 
    GoogleButton, 
    FacebookButton, 
    CircleButton, 
    Text, 
    Form, 
    UnderLine, 
    Img, 
    SignUpButton } from './Style'
import Images from '../../../themes/images'
import { request } from '../../../services/request'
import { signUpRequest, getUser } from '../../../actions/auth'
import * as Validate from '../../../constants/validate'

const styles = {
    floatingLabelStyle: {
        error : {
            color: '#f7be28'
        },
        success : {
            color: '#565252'
        }        
    },
    focusStyle: {
        error : {
            color: '#f7be28',
            fontWeight: 700,
            transform: 'scale(0.75) translate(0px, -35px)'
        },
        success : {
            color: '#333',
            fontWeight: 700,
            transform: 'scale(0.75) translate(0px, -35px)'
        }         
    }
}

class SignUp extends Component {
    constructor(props){
        super(props)        
        this.state = {
            isValidate: false,
            isFullName: false,
            isEmail: false,
            isLocation: false, 
            isLoading: false           
        }
    }

    responseGoogle(response) {
        console.log('google-response', response) 
        const profile = response.profileObj
        const name = profile.name.split(" ")
        const obj = {
            Email: profile.email,  
            FirstName: name[0],
            LastName: name[1], 
            Location: null                     
            // picture: profile.imageUrl
        }        
        request('Signup1', obj)
            .then(response => {
                window.localStorage.setItem('profileId', response)
                browserHistory.push('/profile/talent')
            }).catch(() => {
                // TODO: any processing
            })  
    }

    responseFacebook(response) { 
        console.log('facebook-response', response)       
        const name = response.name.split(" ")
        const obj = {
            Email: response.email,
            FirstName: name[0],
            LastName: name[1],       
            Location: null     
            // accessToken: response.accessToken,
            // picture: response.picture.data.url
        }         
        request('Signup1', obj)
            .then(response => {
                window.localStorage.setItem('profileId', response)
                browserHistory.push('/profile/talent')
            }).catch(() => {
                // TODO: any processing
            })  
    }

    getValue = (e) => {
        let { name, value } = e.target
        this.setState({ [name]: value})
        if(name === 'fullname'){
            this.setState({ isFullName: Validate.fullnameValidate(value)})
        }
        if(name === 'email'){
            this.setState({ isEmail: Validate.emailValidate(value)})
        }
        if(name === 'location'){
            this.setState({ isLocation: Validate.palceValidate(value)})
        }
        e.preventDefault()
    }

    handleSignUp = () => {                       
        const { isFullName, isEmail, isLocation } = this.state
        this.setState({ isValidate: true })
        if(!isFullName || !isEmail || !isLocation ){
            return
        }
        this.setState({ isLoading: true })
        const obj = {
            Email: this.state.email,
            FirstName: this.state.fullname.split(' ')[0],
            LastName: this.state.fullname.split(' ')[1],
            Location: this.state.location
        }
        this.props.actions.getUser(obj.FirstName, obj.LastName, obj.Email)
        this.props.actions.signUpRequest('Signup1', obj)
            .then(() => {                
                setTimeout(() => {
                    browserHistory.push('/profile/talent')
                }, 5000)                    
            })
            .catch(() => {
                this.setState({ isLoading: false })
            })               
    }

    render() {
        const { isFullName, isEmail, isLocation, isValidate, isLoading } = this.state             
        return (
            <Wrapper>                      
                <Header visible percent={1}/>                       
                <Content>
                    <Heading>Sign up now</Heading>
                    <ButtonWrapper>
                        <GoogleLogin
                            clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                            onSuccess={this.responseGoogle}
                            onFailure={this.responseGoogle}
                        >
                            <GoogleButton google>
                                <img src={Images.google} alt="google" />
                                <p>Sign up with Google</p>
                            </GoogleButton>
                        </GoogleLogin>                        
                        <FacebookButton>
                            <FacebookLogin
                                appId="459046371113157"
                                autoLoad={false}
                                fields="name,email,picture,location"
                                callback={this.responseFacebook}
                                cssClass='test'
                                textButton="Sign up with Facebook"
                            />                            
                        </FacebookButton>
                    </ButtonWrapper>
                    <CircleButton>Or</CircleButton>
                    { isValidate && (!isFullName || !isEmail || !isLocation ) ?
                        <Text>Please fill in required fields</Text> : null
                    }                    
                    <Form>
                        <MuiThemeProvider>
                            <TextField
                                name="fullname"
                                onChange={this.getValue}
                                floatingLabelText="Full Name"
                                floatingLabelStyle={ isValidate && !isFullName ? styles.floatingLabelStyle.error : styles.floatingLabelStyle.success}
                                floatingLabelShrinkStyle={ isValidate && !isFullName ? styles.focusStyle.error : styles.focusStyle.success }
                                underlineShow={false}
                                />              
                        </MuiThemeProvider> 
                        { isFullName && <Img src={Images.check} alt="checked"></Img> }
                        { isValidate && !isFullName && <Img src={Images.warnning} alt="warnning"></Img> }
                        { !isFullName && !isValidate && <Img empty></Img> }                                                                        
                    </Form> 
                    { !isFullName && isValidate ?
                        <UnderLine error></UnderLine> : <UnderLine></UnderLine>
                    }
                    <Form>
                        <MuiThemeProvider>
                            <TextField
                                name="email"
                                onChange={this.getValue}
                                floatingLabelText="E-mail"
                                floatingLabelStyle={ isValidate && !isEmail ? styles.floatingLabelStyle.error : styles.floatingLabelStyle.success}
                                floatingLabelShrinkStyle={ isValidate && !isEmail ? styles.focusStyle.error : styles.focusStyle.success }
                                underlineShow={false}
                                />              
                        </MuiThemeProvider> 
                        { isEmail && <Img src={Images.check} alt="checked"></Img> }
                        { isValidate && !isEmail && <Img src={Images.warnning} alt="warnning"></Img> }
                        { !isEmail && !isValidate && <Img empty></Img> } 
                    </Form> 
                    { !isEmail && isValidate ?
                        <UnderLine error></UnderLine> : <UnderLine></UnderLine>
                    }
                    <Form>
                        <MuiThemeProvider>
                            <TextField
                                name="location"
                                onChange={this.getValue}
                                floatingLabelText="Where do you live?"
                                floatingLabelStyle={ isValidate && !isLocation ? styles.floatingLabelStyle.error : styles.floatingLabelStyle.success}
                                floatingLabelShrinkStyle={ isValidate && !isLocation ? styles.focusStyle.error : styles.focusStyle.success }
                                underlineShow={false}
                                />              
                        </MuiThemeProvider> 
                        { isLocation && <Img src={Images.check} alt="checked"></Img> }
                        { isValidate && !isLocation && <Img src={Images.warnning} alt="warnning"></Img> }
                        { !isLocation && !isValidate && <Img empty></Img> } 
                    </Form> 
                    { !isLocation && isValidate ?
                        <UnderLine error></UnderLine> : <UnderLine></UnderLine>
                    }
                    { isLoading ? <SpinWrapper><ReactLoading type="spinningBubbles" color="#4cbf69" height='70' width='70' /></SpinWrapper> :
                        <ButtonWrapper signup>
                            { !isValidate || (isFullName && isEmail && isLocation) ?
                                <SignUpButton active onClick={this.handleSignUp}>Sign up</SignUpButton> :
                                <SignUpButton onClick={this.handleSignUp}>Sign up</SignUpButton>
                            }
                        </ButtonWrapper>
                    }                    
                </Content>
            </Wrapper>
        )
    }
}

// Map state to props
const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.auth.isLoggedIn
    }
}

// Map action to props
const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({
            getUser, signUpRequest
        }, dispatch)
    }
}

/* Connect Component with Redux */
export default connect(mapStateToProps, mapDispatchToProps)(SignUp)