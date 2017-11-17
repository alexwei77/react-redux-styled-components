import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import TextField from 'material-ui/TextField'
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
    SocialButton, 
    CircleButton, 
    Text, 
    Form, 
    UnderLine, 
    Img, 
    SignUpButton } from './Style'
import Images from '../../../themes/images'
import firebase from '../../../services/firebase'
import { signUpRequest } from '../../../actions/auth'
import { reset } from '../../../reducers'
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

    componentWillMount() {
        if(this.props.isLoggedIn){
            browserHistory.push('/profile/talent')
        }
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

    handleSocialLogin = (social) => {        
        const provider = (social === 'google' ? new firebase.auth.GoogleAuthProvider() : new firebase.auth.FacebookAuthProvider())        
        firebase.auth().signInWithPopup(provider)
        .then(result => {
            const user = result.user;  
            const obj = {
                Email: user.email,
                FirstName: user.displayName.split(' ')[0],
                LastName: user.displayName.split(' ')[1],
                Location: null
            }  
            this.props.actions.reset()                                       
            this.props.actions.signUpRequest('Profile/Signup1', obj)
            .then(() => {  
                // this.props.actions.getUser(obj.FirstName, obj.LastName, obj.Email)                              
                browserHistory.push('/profile/talent')    
                alert('login success')             
            })
            .catch(() => {
                // TODO: any processing
            }) 
        }, error => {
            const email = error.email;                
            const credential = error.credential;
            console.log('error', email, credential)
            alert('Login Failed! Please try again.')
            if (error.code === 'auth/account-exists-with-different-credential') {
                firebase.auth().fetchProvidersForEmail(email)
                .then(providers => {
                    // TODO: any processing
                });
            }
        });
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
        this.props.actions.reset()     
        this.props.actions.signUpRequest('Profile/Signup1', obj)
            .then(() => {               
                this.props.actions.getUser(this.state.fullname, obj.Email) 
                setTimeout(() => {
                    browserHistory.push('/profile/talent')
                }, 3000)                    
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
                        <SocialButton google onClick={() =>this.handleSocialLogin('google')}>
                            <img src={Images.google} alt="google" />
                            <p>Sign up with Google</p>
                        </SocialButton>
                        <SocialButton onClick={() =>this.handleSocialLogin('facebook')}>
                            <img src={Images.facebook1} alt="facebook" />
                            <p>Sign up with Facebook</p>
                        </SocialButton>                                                               
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
            signUpRequest, reset
        }, dispatch)
    }
}

/* Connect Component with Redux */
export default connect(mapStateToProps, mapDispatchToProps)(SignUp)