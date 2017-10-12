import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import TextField from 'material-ui/TextField'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Header from '../../../components/Header'
import TagList from '../../../components/TagList'
import Images from '../../../themes/images'
import { 
    Wrapper,
    Content,
    FieldWrapper, 
    ButtonWrapper,
    Button,
    Input, 
    Heading, 
    SubHeading, 
    TagWrapper, 
    Img, 
    Navigation,
    PrevButton, 
    NavigationButton, 
    UnderLine,
    TextFieldWrapper,
    FlexWrapper,
    AddButton,
    IconWrapper } from './Style'
import { getSubmitionData, postSubmitionData } from '../../../actions/talent'
import * as Validate from '../../../constants/validate'

const styles = {
    floatingLabelStyle: {
      color: '#565252'
    },
    floatingLabelShrinkStyle: {                
        display: 'none'
    }
}

class Submition extends Component {
    constructor(props){
        super(props)
        this.state = {
            locations: this.props.locations,
            beverage: this.props.beverage,
            status: this.props.status,
            urls: [],
            url: '',
            isValidate: false
        }
    }

    addLocation = (text) => {        
        let temp = this.state.locations.slice()
        temp.push(text)
        this.setState({ locations: temp })        
    }

    removeLocation = (index) => {
        let temp = this.state.locations.slice()
        temp.splice(index, 1)
        this.setState({ locations: temp })
    }

    getBeverage = (beverage) => {
        console.log('beverage')
        this.setState({
            beverage: beverage
        })
    }

    getStatus = (num) => {
        console.log('status')
        this.setState({
            status: num
        })
    }

    getText = (e) => {        
        if(e.keyCode === 13 && e.target.value) {            
            this.addLocation(e.target.value)  
            e.target.value = ''          
        }
    }

    getUrl = (e) => {        
        this.setState({
            isValidate: Validate.socialValidate(e.target.value),
            url: e.target.value
        })
    }

    addUrl = () => {
        let temp = this.state.urls.slice()
        temp.push(this.state.url)
        this.setState({
            urls: temp,
            isValidate: false
        })
        console.log('input', this.urlInput)
        this.urlInput.input.value = 'https://'
        this.urlInput.focus()
    }

    pageNavigation = (path) => {
        const data = {
            ProfileId: window.localStorage.getItem('profileId'),
            Locations: this.state.locations,
            Beverage: this.state.beverage,
            Social: this.state.urls,
            Status: this.state.status
        }
        console.log('submit', data)
        this.props.actions.getSubmitionData(data.profileID, data.Locations, data.Beverage, data.Social, data.Status)
        this.props.actions.postSubmitionData('Signup3', data)
            .then(() => {
                browserHistory.push(path)
            }).catch(() => {
                // TODO: any processing
            })         
    }

    render() {        
        const { locations, beverage, status, isValidate } = this.state        
        return (
            <Wrapper>
                <Header visible percent={3} save/>
                <Content>
                    <Heading>Almost there...</Heading>
                    <FieldWrapper>
                        <SubHeading>Where would you like to work?</SubHeading> 
                        <Input>
                            <MuiThemeProvider>
                                <TextField   
                                    ref={(input) => {this.tagInput = input}} 
                                    onKeyDown={this.getText}                                                       
                                    floatingLabelText="Type city"
                                    floatingLabelStyle={styles.floatingLabelStyle}  
                                    floatingLabelShrinkStyle={styles.floatingLabelShrinkStyle}                                
                                    underlineShow={false}
                                />              
                            </MuiThemeProvider>                         
                        </Input>                                            
                        <UnderLine ></UnderLine>                      
                    </FieldWrapper>
                    <TagWrapper>
                        <TagList data={ locations } removeTag={(index) => this.removeLocation(index)} />
                    </TagWrapper>
                    <FieldWrapper>
                        <SubHeading>What is your preffered coffee?</SubHeading>                        
                        <ButtonWrapper>
                            <Button active={beverage === 'Espresso'} onClick={() => this.getBeverage('Espresso')}>Espresso</Button>
                            <Button active={beverage === 'Cappucino'} onClick={() => this.getBeverage('Cappucino')}>Cappucino</Button>
                            <Button active={beverage === 'Flat white'} onClick={() => this.getBeverage('Flat white')}>Flat white</Button>                                
                            <Button active={beverage === 'Cortado'} onClick={() => this.getBeverage('Cortado')}>Cortado</Button>
                            <Button active={beverage === 'Caffe latte'} onClick={() => this.getBeverage('Caffe latte')}>Caffe latte</Button>
                            <Button active={beverage === 'Macchiato'} onClick={() => this.getBeverage('Macchiato')}>Macchiato</Button>                 
                            <Button active={beverage === 'Tea'} onClick={() => this.getBeverage('Tea')}>Tea</Button>                 
                            <Button active={beverage === 'Undecided'} onClick={() => this.getBeverage('Undecided')}>Undecided<img src={Images.remove} alt="" /></Button>                 
                        </ButtonWrapper>
                    </FieldWrapper>
                    <FieldWrapper>
                        <SubHeading>Please help us understand your profile</SubHeading> 
                        <IconWrapper>
                            <img src={Images.github} alt="github" />
                            <img src={Images.google1} alt="google" /> 
                            <img src={Images.facebook} alt="facebook" />
                            <img src={Images.linkedin} alt="linkedin" />
                            <img src={Images.behance} alt="behance" />                                                                                  
                        </IconWrapper>
                        <FlexWrapper>
                            <TextFieldWrapper>    
                                <Input add>
                                    <MuiThemeProvider>
                                        <TextField      
                                            ref={ (input) => {this.urlInput = input;}}                                    
                                            onChange={this.getUrl}                                                       
                                            floatingLabelText="https://"
                                            floatingLabelStyle={styles.floatingLabelStyle}  
                                            floatingLabelShrinkStyle={styles.floatingLabelShrinkStyle}                                
                                            underlineShow={false}
                                        />              
                                    </MuiThemeProvider>                         
                                </Input>                                            
                                <UnderLine add></UnderLine> 
                            </TextFieldWrapper>
                            { isValidate ? <AddButton active onClick={this.addUrl}>Add</AddButton> : <AddButton >Add</AddButton> }                            
                        </FlexWrapper>                     
                    </FieldWrapper>
                    <FieldWrapper>
                        <SubHeading>What's your current status?</SubHeading>                        
                        <ButtonWrapper>
                            <Button active={status === 1} onClick={() => this.getStatus(1)}>Active</Button>
                            <Button active={status === 2} onClick={() => this.getStatus(2)}>Passive</Button>
                            <Button active={status === 3} onClick={() => this.getStatus(3)}>It's complicated</Button>                                                                                                                
                            <Button active={status === 4} onClick={() => this.getStatus(4)}>Undecided<img src={Images.remove} alt="" /></Button>                    
                        </ButtonWrapper>
                    </FieldWrapper>
                    <Navigation>
                        <PrevButton prev onClick={() => this.pageNavigation('/profile/talent/category')}><Img src={Images.leftArrow} alt="left" /></PrevButton>
                        <NavigationButton onClick={() => this.pageNavigation('/profile/talent/candidate')}>Submit<Img right src={Images.wRightArrow} alt="right" /></NavigationButton>                       
                    </Navigation>
                </Content>
            </Wrapper>
        )
    }
}

// Map state to props
const mapStateToProps = (state) => {
    const { locations, beverage, status, social } = state.talent
    return {
        // profileID: state.auth.profileID,
        locations, beverage, status, social
    }
}

// Map action to props
const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({
            getSubmitionData,
            postSubmitionData
        }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Submition)