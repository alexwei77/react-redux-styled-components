import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import TextField from 'material-ui/TextField'
import { browserHistory } from 'react-router'
import {Form, Checkbox, Radio, RadioGroup } from 'react-form'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ReactLoading from 'react-loading'

import { getSubRolesAndTechs, postSignup2Data } from '../../../actions/talent'
import Header from '../../../components/Header'
import TagList from '../../../components/TagList'
import Images from '../../../themes/images'
import { 
    Wrapper, 
    Content, 
    Heading, 
    FieldWrapper, 
    SubHeading, 
    ButtonWrapper, 
    RadioButton, 
    Input, 
    UnderLine, 
    TagWrapper, 
    Navigation, 
    PrevButton,
    NextButton, 
    Img,
    FormButton,
    FormButtonWrapper,
    FormWrapper } from './Style'

const styles = {
    floatingLabelStyle: {
      color: '#565252'
    },
    floatingLabelShrinkStyle: {                
        display: 'none'
    }
}

// let subRolesForSave

class Category extends Component {
    constructor(props){
        super(props)        
        this.state = {     
            initSubRole: {},                         
            tags: this.props.techs,
            engineering: "Backend Engineer, Frontend Engineer, Fullstack Engineer, Mobile, DevOps and Tooling, QA",
            sales: "Sales Representative, Account Executive, Sales Manager, Sales Director",
            product: "Product Analyst, Product Marketign Manager, Product Manager, Product Line Director",
            marketing: "Growth Hacker, marketing Manager, SEO Manager, Community Manager, Copy",
            design: "UX Researcher, UI Designer, UI/UX Designer, Art Director, Digital Designer",
            finance: "Analyst, Accountant, Controller, Finance Manager, CEO",
            isLoading: false  
        }
    }

    componentWillMount(){        
        // subRolesForSave = {}
        let temp = {}   
        if(this.props.subRoles){
            this.props.subRoles.map(subRole => {                 
                let tempSubRole
                subRole === 'UI/UX Designer' ? tempSubRole = (subRole.substring(3, 14)).replace(" ", '_') : tempSubRole = subRole.replace(" ", '_')          
                return temp[tempSubRole] = true
            })
        }        
        this.setState({
            initSubRole: temp
        })
    }

    addTag = (text) => {        
        let temp = this.state.tags.slice()        
        temp.push(text)
        this.setState({ tags: temp })
    }

    removeTag = (index) => {
        let temp = this.state.tags.slice()
        temp.splice(index, 1)
        this.setState({ tags: temp })
    }

    getText = (e) => {                
        if(e.keyCode === 13 && e.target.value) {            
            e.preventDefault()
            this.addTag(e.target.value)            
            e.target.value = ''
        }
    }

    pageNavigation = (path) => {
        if(window.localStorage.getItem('profileId')){
            browserHistory.push('/')
        } else {
            browserHistory.push(path)
        }        
    }

    getSubRoles = (values) => {
        let subRoles = []
        let roles = []        
        Object.entries(values).forEach((value) =>{
            if(value[1] === true){                
                value[0] === 'UX_Designer' ? subRoles.push(('UI/'+value[0]).replace(/_/g, " ")) 
                : subRoles.push(value[0].replace(/_/g, " "))
            }  
        })   
        subRoles.forEach((subRole) => {            
            if(this.state.engineering.indexOf(subRole) !== -1){
                if(roles.indexOf("Engineering") === -1){
                    roles.push("Engineering")
                }                
            }
            else if(this.state.sales.indexOf(subRole) !== -1){
                if(roles.indexOf("Sales") === -1){
                    roles.push("Sales")
                }                
            }
            else if(this.state.product.indexOf(subRole) !== -1){
                if(roles.indexOf("Product") === -1){
                    roles.push("Product")
                }                
            }
            else if(this.state.marketing.indexOf(subRole) !== -1){
                if(roles.indexOf("Marketing") === -1){
                    roles.push("Marketing")
                }                
            }
            else if(this.state.design.indexOf(subRole) !== -1){
                if(roles.indexOf("Design") === -1){
                    roles.push("Design")
                }                
            }
            else if(this.state.finance.indexOf(subRole) !== -1){
                if(roles.indexOf("Finance") === -1){
                    roles.push("Finance")
                }                
            }
        })
        const obj = {
            ProfileId: window.localStorage.getItem('profileId'),
            Roles: roles,
            SubRoles: subRoles,
            Technologies: this.state.tags
        }
        this.setState({ isLoading: true })
        this.props.actions.getSubRolesAndTechs(roles, subRoles, this.state.tags)
        this.props.actions.postSignup2Data('Signup2', obj)
            .then(() => {
                setTimeout(() => {
                    browserHistory.push('/profile/talent/submition')
                }, 3000)                  
            }).catch(() => {
                setTimeout(() => {
                    this.setState({ isLoading: false })
                    alert("Failed!")                    
                }, 2000) 
            })  
    }

    render() {
        const { initSubRole, tags, isLoading } = this.state        
        return (
            <Wrapper>   
                <Form 
                    defaultValues={initSubRole}
                    onSubmit={(values => {                        
                        this.getSubRoles(values)
                    })}
                >
                    { ({ submitForm, values }) => {                          
                        // subRolesForSave = values                        
                        return (
                            <form onSubmit={submitForm}>
                            <Header visible percent={2} save/>                
                            <Content>                    
                                <Heading>Help us by answering<br/>a few questions</Heading>                                        
                                <FieldWrapper>
                                    <SubHeading>Where do you see yourself?</SubHeading>
                                    <SubHeading small>(Choose up to three)</SubHeading>                                    
                                    <RadioGroup field="role">
                                        <ButtonWrapper>
                                            <RadioButton active={values.role === 'Engineering'}><Radio value="Engineering"/>Engineering</RadioButton>
                                            <RadioButton active={values.role === 'Sales'}><Radio value="Sales"/>Sales</RadioButton>
                                            <RadioButton active={values.role === 'Product'}><Radio value="Product"/>Product</RadioButton>
                                            <RadioButton active={values.role === 'Marketing'}><Radio value="Marketing"/>Marketing</RadioButton>
                                            <RadioButton active={values.role === 'Design'}><Radio value="Design"/>Design</RadioButton>
                                            <RadioButton active={values.role === 'Finance'}><Radio value="Finance"/>Finance</RadioButton>
                                            <RadioButton active={values.role === 'Other'}><Radio value="Other"/>Other</RadioButton> 
                                        </ButtonWrapper>
                                    </RadioGroup>                                                              
                                </FieldWrapper>
                                <FormWrapper>                                                         
                                    <div style={values.role === 'Engineering' ? { display: 'block'} : { display: 'none' }}>
                                        <SubHeading>{values.role}</SubHeading>                        
                                        <FormButtonWrapper>
                                            <FormButton active={values.Backend_Engineer}><Checkbox field="Backend_Engineer" value="Backend_Engineer"/>Backend Engineer</FormButton>
                                            <FormButton active={values.Frontend_Engineer}><Checkbox field="Frontend_Engineer" value="Frontend_Engineer"/>Frontend Engineer</FormButton>
                                            <FormButton active={values.Fullstack_Engineer}><Checkbox field="Fullstack_Engineer" value="fullstack"/>Fullstack Engineer</FormButton>                                                                        
                                            <FormButton active={values.Mobile}><Checkbox field="Mobile" value="Mobile"/>Mobile</FormButton>
                                            <FormButton active={values.DevOps_and_Tooling}><Checkbox field="DevOps_and_Tooling" value="DevOps_and_Tooling"/>DevOps and Tooling</FormButton>
                                            <FormButton active={values.QA}><Checkbox field="QA" value="QA"/>QA</FormButton>
                                            {/* <Button active={values.other}><Checkbox field="other" value="other"/>Other</Button> */}
                                        </FormButtonWrapper>
                                    </div>                                                               
                                    <div style={values.role === 'Sales' ? { display: 'block'} : { display: 'none' }}>
                                        <SubHeading>{values.role}</SubHeading>                        
                                        <FormButtonWrapper>
                                            <FormButton active={values.Sales_Representative}><Checkbox field="Sales_Representative" value="Sales_Representative"/>Sales Representative</FormButton>
                                            <FormButton active={values.Account_Executive}><Checkbox field="Account_Executive" value="Account_Executive"/>Account Executive</FormButton>
                                            <FormButton active={values.Sales_Manager}><Checkbox field="Sales_Manager" value="Sales_Manager"/>Sales Manager</FormButton>                                                                                     
                                            <FormButton active={values.Sales_Director}><Checkbox field="Sales_Director" value="Sales_Director"/>Sales Director</FormButton>                                                              
                                            {/* <Button active={values.other}><Checkbox field="other" value="other"/>other</Button> */}
                                        </FormButtonWrapper>
                                    </div>                               
                                    <div style={values.role === 'Product' ? { display: 'block'} : { display: 'none' }}>
                                        <SubHeading>{values.role}</SubHeading>                        
                                        <FormButtonWrapper>
                                            <FormButton active={values.Product_Analyst}><Checkbox field="Product_Analyst" value="Product_Analyst"/>Product Analyst</FormButton>
                                            <FormButton active={values.Product_Marketing_Manager}><Checkbox field="Product_Marketing_Manager" value="Product_Marketing_Manager"/>Product Marketing Manager</FormButton>
                                            <FormButton active={values.Product_Manager}><Checkbox field="Product_Manager" value="Product_Manager"/>Product Manager</FormButton>                                                                           
                                            <FormButton active={values.Product_Line_Director}><Checkbox field="Product_Line_Director" value="Product_Line_Director"/>Product Line Director</FormButton>                                 
                                            {/* <Button active={values.other}><Checkbox field="other" value="other"/>other</Button> */}
                                        </FormButtonWrapper>
                                    </div>                               
                                    <div style={values.role === 'Marketing' ? { display: 'block'} : { display: 'none' }}>
                                        <SubHeading>{values.role}</SubHeading>                        
                                        <FormButtonWrapper>
                                            <FormButton active={values.Growth_Hacker}><Checkbox field="Growth_Hacker" value="Growth_Hacker"/>Growth Hacker</FormButton>
                                            <FormButton active={values.Marketing_Manager}><Checkbox field="Marketing_Manager" value="Marketing_Manager"/>Marketing Manager</FormButton>
                                            <FormButton active={values.SEO_Manager}><Checkbox field="SEO_Manager" value="SEO_Manager"/>SEO Manager</FormButton>                                   
                                            <FormButton active={values.Community_Manager}><Checkbox field="Community_Manager" value="Community_Manager"/>Community Manager</FormButton>
                                            <FormButton active={values.Copy}><Checkbox field="Copy" value="Copy"/>Copy</FormButton>                            
                                            {/* <Button active={values.other}><Checkbox field="other" value="other"/>other</Button> */}
                                        </FormButtonWrapper>
                                    </div>                                
                                    <div style={values.role === 'Design' ? { display: 'block'} : { display: 'none' }}>
                                        <SubHeading>{values.role}</SubHeading>                        
                                        <FormButtonWrapper>
                                            <FormButton active={values.UX_Researcher}><Checkbox field="UX_Researcher" value="UX_Researcher"/>UX Researcher</FormButton>
                                            <FormButton active={values.UI_Designer}><Checkbox field="UI_Designer" value="UI_Designer"/>UI Designer</FormButton>
                                            <FormButton active={values.UX_Designer}><Checkbox field="UX_Designer" value="UX_Designer"/>UI/UX Designer</FormButton>                                  
                                            <FormButton active={values.Art_Director}><Checkbox field="Art_Director" value="Art_Director"/>Art Director</FormButton>
                                            <FormButton active={values.Digital_Designer}><Checkbox field="Digital_Designer" value="Digital_Designer"/>Digital Designer</FormButton>
                                            {/* <Button active={values.other}><Checkbox field="other" value="other"/>other</Button> */}
                                        </FormButtonWrapper>
                                    </div>                               
                                    <div style={values.role === 'Finance' ? { display: 'block'} : { display: 'none' }}>
                                        <SubHeading>{values.role}</SubHeading>                        
                                        <FormButtonWrapper>
                                            <FormButton active={values.Analyst}><Checkbox field="Analyst" value="Analyst"/>Analyst</FormButton>
                                            <FormButton active={values.Accountant}><Checkbox field="Accountant" value="Accountant"/>Accountant</FormButton>
                                            <FormButton active={values.Controller}><Checkbox field="Controller" value="Controller"/>Controller</FormButton>                                
                                            <FormButton active={values.Finance_Manager}><Checkbox field="Finance_Manager" value="Finance_Manager"/>Finance Manager</FormButton>
                                            <FormButton active={values.CEO}><Checkbox field="CEO" value="CEO"/>CEO</FormButton>
                                            {/* <Button active={values.other}><Checkbox field="other" value="other"/>other</Button>                  */}
                                        </FormButtonWrapper>
                                    </div> 
                                </FormWrapper>  
                                <FieldWrapper>
                                    <SubHeading>Preferred technology</SubHeading> 
                                    <Input>
                                        <MuiThemeProvider>
                                            <TextField                                                
                                                onKeyDown={this.getText}                                                       
                                                floatingLabelText="Type here..."
                                                floatingLabelStyle={styles.floatingLabelStyle}  
                                                floatingLabelShrinkStyle={styles.floatingLabelShrinkStyle}                                
                                                underlineShow={false}
                                            />              
                                        </MuiThemeProvider>                         
                                    </Input>                                            
                                    <UnderLine ></UnderLine>                      
                                </FieldWrapper>
                                <TagWrapper>
                                    <TagList data={ tags } removeTag={(index) => this.removeTag(index)} />
                                </TagWrapper>
                                { isLoading ? <Navigation><ReactLoading type="spinningBubbles" color="#4cbf69" height='70' width='70' /></Navigation> :
                                    <Navigation>
                                        <PrevButton prev onClick={() => this.pageNavigation('/signup/talent')}><Img src={Images.leftArrow} alt="left" /></PrevButton>
                                        <NextButton type="submit">Next<Img right src={Images.wRightArrow} alt="right" /></NextButton>                       
                                    </Navigation>
                                }
                            </Content>                     
                            </form>
                        )
                    }}
                </Form>   
            </Wrapper>
        )
    }
}

// Map state to props
const mapStateToProps = (state) => {
    return {        
        subRoles: state.talent.subRoles,
        techs: state.talent.techs
    }
}

// Map action to props
const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({
            getSubRolesAndTechs,
            postSignup2Data
        }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Category)