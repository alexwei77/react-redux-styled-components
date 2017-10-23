import React, { Component } from 'react'
import Switch from 'react-toggle-switch'
import "../../../../../node_modules/react-toggle-switch/dist/css/switch.min.css" 
import { RangeSlider } from 'reactrangeslider'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import CircularProgressbar from '../../../../components/CircularProgressbar'
import Header from '../../../../components/Header'
import Footer from '../../../../components/Footer'
import Tags from '../../../../components/Tags'
import { updateStatus, updateCategory } from '../../../../actions/talent'
import { 
    Wrapper,
    Heading,
    UserWrapper,
    Avatar,
    User,
    ToggleWrapper,
    DetailWrapper,
    CircleWrapper,
    BgCircle,
    Detail,
    TagWrapper,
    FieldWrapper,
    Slider,
    Info,
    Contact } from './Style'
import Images from '../../../../themes/images'

class TagList extends Component {
    constructor(props){
        super(props)        
        this.state = {
            tags: this.props.data
        }
    }

    addTag = (text) => {
        let temp = this.state.tags.slice()
        temp.push(text)
        this.setState({ tags: temp })        
        this.props.update(this.props.type, temp)
    }

    removeTag = (index) => {
        let temp = this.state.tags.slice()
        temp.splice(index, 1)        
        this.setState({ tags: temp })
        this.props.update(this.props.type, temp)
    }   

    render() {                
        return (
            <Tags data={ this.state.tags } editable={this.props.editable} removeTag={(index) => this.removeTag(index)} addTag={ (text) => this.addTag(text) } />
        )
    }
}

class Candidate extends Component {
    constructor(props){
        super(props)
        this.state = {
            percentage: 65,
            switched: this.props.status === 2,
            opportunities: this.props.subRoles,
            skills: this.props.techs,
            locations: this.props.locations,
            value : {
                start: 30,
                end: 80
            },            
        }
    }

    componentWillReceiveProps(nextProps) {
        const { subRoles, techs, locations } = nextProps
        this.setState({
            opportunities: subRoles,
            skills: techs,
            locations: locations
        })
    }

    toggleSwitch = () => {        
        let status        
        if(this.props.status !== 2){
            status = 2
        } else {
            status = 1
        }        
        this.props.actions.updateStatus(status)        
        this.setState(prevState => {
            return {
                switched: !prevState.switched
            }
        })
    }

    onChange = (value) => {
        this.setState({ value })
    }

    pageNavigation = (path) => {
        browserHistory.push(path)
    }

    getPercentage = (opp, skills, locations, social) => {        
        let percentage = 0
        if(opp.length !== 0){
            percentage = percentage + 25
        }
        if(skills.length !== 0){
            percentage = percentage + 25
        }
        if(locations.length !== 0){
            percentage = percentage + 25
        }
        if(social.length !== 0){
            percentage = percentage + 25
        }
        return percentage
    }

    render() {                
        const { opportunities, skills, locations, value } = this.state            
        const { isEditable } = this.props  
        let fullName = this.props.user.firstName + ' ' + this.props.user.lastName 
        let percentage = this.getPercentage(opportunities, skills, locations, this.props.social)              
        return (
            <Wrapper>
                <Header edit/>
                <Heading>Your Profile</Heading>
                <UserWrapper>
                    <Avatar src={Images.user} alt="user" />
                    <User>
                        <h1>{fullName}</h1>
                        { this.props.roles &&
                            <p>{this.props.roles[0]}</p>                                     
                        }                        
                        <ToggleWrapper>
                            <p>Active</p>                            
                                <Switch onClick={this.toggleSwitch} on={this.state.switched}/>                            
                            <p>Passive</p>
                        </ToggleWrapper>                        
                    </User>
                </UserWrapper>
                <DetailWrapper>
                    <CircleWrapper>
                        <BgCircle>
                            <CircularProgressbar
                                percentage={percentage}
                                strokeWidth="12"
                                sqSize="140"/>                            
                        </BgCircle>
                        <p>complete</p>
                    </CircleWrapper>                    
                    <Detail>
                        <h1>Contacts details</h1>
                        <div>
                            <div>
                                <p>E-mail</p>
                                <p>Phone</p>
                                <p>Skype</p>    
                            </div>
                            <div>
                                <p>{this.props.user.email}</p>
                                <p>+45 66778899</p>
                                <p>codewizard_dk</p>    
                            </div>
                        </div>                                              
                    </Detail>
                </DetailWrapper>                
                <FieldWrapper>
                    <h1>Social media</h1>  
                    <div>
                        <div>                  
                        { this.props.social && this.props.social.map((social, index) => {
                            let socialUrl
                            if(social.indexOf('github.com') !== -1){
                                socialUrl = <img key={index} src={Images.github} alt="git" />
                            } 
                            else if(social.indexOf('linkedin.com') !== -1){
                                socialUrl = <img key={index} src={Images.linkedin} alt="linkedin" />
                            }
                            else if(social.indexOf('facebook.com') !== -1){
                                socialUrl = <img key={index} src={Images.facebook} alt="facebook" />
                            } 
                            else if(social.indexOf('google.com') !== -1){
                                socialUrl = <img key={index} src={Images.google1} alt="google" />
                            } 
                            else if(social.indexOf('behance.com') !== -1){
                                socialUrl = <img key={index} src={Images.behance} alt="behance" />
                            } 
                            return socialUrl                                                              
                        })} 
                        </div>    
                        <div>                  
                        { this.props.social && this.props.social.map((social, index) => {                            
                            return <p key={index}>{social}</p>                                                                                   
                        })} 
                        </div>  
                    </div>                                                                                          
                </FieldWrapper>                
                <TagWrapper>
                    <h1>Opportunities I'm interested in</h1>
                    { opportunities && isEditable ?
                        <TagList type="role" editable={isEditable} data={opportunities} update={this.props.actions.updateCategory}/> : <TagList data={opportunities} />
                    }                    
                </TagWrapper>
                <TagWrapper>
                    <h1>My Skills</h1>
                    { skills && isEditable ?
                        <TagList type="tech" editable={isEditable} data={skills} update={this.props.actions.updateCategory}/> : <TagList data={skills} />
                    }                    
                </TagWrapper>
                <TagWrapper>
                    <h1>Locations I'm interested in</h1>
                    { locations && isEditable ?
                        <TagList type="location" editable={isEditable} data={locations} update={this.props.actions.updateCategory}/> : <TagList data={locations} />
                    }                    
                </TagWrapper>
                <Slider>
                    <h1>Salary range</h1>
                    <RangeSlider
                        step={1}
                        value={value}
                        min={0}
                        max={100}
                        onChange={this.onChange}                                                
                    /> 
                    <div>
                        <a>eur {value.start}.000</a>    
                        <a>eur {value.end}.000</a>
                    </div>               
                </Slider>
                <Info>
                    <h1>Additional info</h1>
                    <p>
                    You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
                    </p>
                </Info>
                <Contact >
                    <a onClick={() => this.pageNavigation('/contact')}>Contact my agent</a>
                </Contact>
                <Footer />
            </Wrapper>
        )
    }
}

// Map state to props
const mapStateToProps = (state) => {
    const { roles, subRoles, locations, status, social, techs } = state.talent
    return {  
        user: state.auth,
        isEditable: state.auth.isEditable,  
        roles,
        subRoles,
        locations,
        status,
        social,
        techs    
    }
}

// Map action to props
const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({
            updateStatus,
            updateCategory
        }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Candidate)