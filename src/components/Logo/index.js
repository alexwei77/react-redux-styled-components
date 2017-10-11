import React from 'react'
import { browserHistory } from 'react-router'
import $ from 'jquery'

import { Heading, Img } from './Style'
import Images from '../../themes/images'

class Logo extends React.Component {
    constructor(){
        super()
        this.state = {
            isEnable: false
        }
    }

    gotoHome = (path) => {       
       setTimeout(function() {
            $('.logo').addClass("animation")
        }, 100) 
       setTimeout(function() {
           $('.logo').removeClass("animation")     
           browserHistory.push(path) 
        }, 300)             
    }

    render() {
        return (                    
            <Heading onClick={() =>this.gotoHome("/")}>
                <Img className="logo" src={Images.logo_home} alt="logo" />
            </Heading>        
        )
    }
}
    
export default Logo