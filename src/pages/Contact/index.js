import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import TextField from 'material-ui/TextField'

import { 
    Wrapper, 
    Heading, 
    Info, 
    MapContainer, 
    Form, 
    UnderLine, 
    Button } from './Style'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import MapView from '../../components/Map'

const styles = {
    floatingLabelStyle: {
      color: '#565252'
    },
    floatingLabelShrinkStyle: {                
        display: 'none'        
    }
}

class Contact extends Component {
    getText = (e) => {        
        if(e.keyCode === 13 && e.target.value) {            
            console.log(e.target.value)            
        }
    }

    render() {
        return (
            <Wrapper>
                <Header />
                <Heading>Contact</Heading>
                <Info>
                    <h1>Agentify ApS</h1>
                    <p>August Bournonvilles Passage 1<br/>1055 København K</p>                    
                    <a onClick={() =>window.location.assign('https://hello@agnetify.me')}>hello@agnetify.me</a>
                </Info>
                <MapContainer><MapView/></MapContainer>
                <Form>
                    <MuiThemeProvider>
                        <TextField    
                            onKeyDown={this.getText}                                                       
                            floatingLabelText="Name"
                            floatingLabelStyle={styles.floatingLabelStyle}  
                            floatingLabelShrinkStyle={styles.floatingLabelShrinkStyle}                                
                            underlineShow={false}
                        />              
                    </MuiThemeProvider>                         
                </Form>                                            
                <UnderLine ></UnderLine> 
                <Form>
                    <MuiThemeProvider>
                        <TextField    
                            onKeyDown={this.getText}                                                       
                            floatingLabelText="E-mail"
                            floatingLabelStyle={styles.floatingLabelStyle}  
                            floatingLabelShrinkStyle={styles.floatingLabelShrinkStyle}                                
                            underlineShow={false}
                        />              
                    </MuiThemeProvider>                         
                </Form>                                            
                <UnderLine ></UnderLine>
                <Form>
                    <MuiThemeProvider>
                        <TextField    
                            onKeyDown={this.getText}                                                       
                            floatingLabelText="Comment"
                            floatingLabelStyle={styles.floatingLabelStyle}  
                            floatingLabelShrinkStyle={styles.floatingLabelShrinkStyle}                                
                            underlineShow={false}
                            multiLine={true}
                            rows={5}
                        />              
                    </MuiThemeProvider>                         
                </Form>                                            
                <UnderLine ></UnderLine> 
                <Button><a>Send</a></Button>
                <Footer />
            </Wrapper>
        )
    }
}

export default Contact