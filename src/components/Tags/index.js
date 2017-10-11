import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import TextField from 'material-ui/TextField'

import Tag from '../Tag'
import { 
    Wrapper,
    AddButton,
    Input } from './Style'

const hide = {
    display: 'none'
}

class Tags extends Component {
    constructor(props){
        super(props)
        this.state =  {
            addtag: false
        }
    }

    componentDidUpdate() {
        if (this.state.addtag){
            this.tagInput.focus()
        }
    }

    onInputTag = (e) => {
        if (e.keyCode === 13) {
            this.props.addTag(e.target.value)            
            this.showHideTagInput()
        }
    } 

    showHideTagInput = () => {
        this.setState({ addtag: !this.state.addtag })
    }

    remove = (index) => {        
        this.props.removeTag(index)
    }

    render() {          
        const { data } = this.props        
        return (
            <Wrapper>                
                { data && data.map((name, index) => {
                        return (
                            <Tag name={name} key={index} onRemove={ () => this.remove(index) } />
                        )
                    }) 
                }                
                <AddButton onClick={ this.showHideTagInput } style={ this.state.addtag? hide:null }>Add</AddButton>                
                { this.state.addtag &&
                    <Input>
                        <MuiThemeProvider>
                            <TextField   
                                ref={ (input) => { this.tagInput = input }} 
                                onKeyDown={this.onInputTag}                                                                                                                      
                            />              
                        </MuiThemeProvider>
                    </Input>
                }
            </Wrapper>
        )
    }
}

export default Tags