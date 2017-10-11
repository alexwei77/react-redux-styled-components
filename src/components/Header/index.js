import React from 'react'
import Logo from '../Logo'
import NavBar from '../NavBar'
import Progress from '../Progress'
import Model from '../Model'
import { 
    Container, 
    Wrapper, 
    ModelWrapper } from './Style'

export default ({landing, percent, visible, save, edit}) => {    
    return (
        <Container>
            <Wrapper landing={landing} percent={percent}>
                <Logo />
                <Progress visible={visible} percent={percent} save={save}/>
                <NavBar landing={landing} save={save} edit={edit}/>            
            </Wrapper>
            <ModelWrapper landing={landing}>
                <Model />
            </ModelWrapper>
        </Container>
    )
}