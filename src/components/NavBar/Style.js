import styled from 'styled-components'
import Images from '../../themes/images'

export const Wrapper = styled.div`
    align-items: center;
    display: flex;
    justify-content: center;
    @media(max-width:592px){
        margin-right: -15px;
    }
`
export const ModelWrapper = styled.div`
    ${props =>props.landing ? '' : 'display: none;'}
    @media(max-width:700px){
        display:none;
    }
`
export const SaveButton = styled.a`
    ${props =>props.save ? '':'display:none;'}
    border: 1px solid #fff;
    color: #fff;
    border-radius: 50px;
    padding: 10px 30px;
    background-color: transparent;
    margin-right: 12px;
    @media(max-width:992px){
        margin-right: 0;
    }
    @media(max-width:462px){
        padding: 7px 20px;
    }
    @media(max-width:392px){
        padding: 5px 15px;
        font-size: 12px;
    }
    &:hover {
        cursor: pointer;
    }
`
export const EditButton = styled.a`
    ${props =>props.edit ? '':'display:none;'}
    border: 1px solid #fff;
    color: #fff;
    border-radius: 50px;
    padding: 10px 30px;
    background-color: transparent;
    margin-right: 12px;
    @media(max-width:572px){
        margin-right: 0;
    }
    @media(max-width:462px){
        padding: 7px 20px;
    }
    @media(max-width:392px){
        padding: 5px 15px;
        font-size: 12px;
    }
    &:hover {
        cursor: pointer;
        background-color: #333;
    }
`

export const Menu = styled.div`
    background: url(${Images.hambugerButton});
    background-size: cover;
    width: 50px;
    height: 50px;
    margin-right: 10px;
    &:hover {
        background: url(${Images.hoverMenu});
        cursor: pointer;
    }
    @media(max-width:992px){
        ${props =>props.save? 'display:none':''}        
    }
    @media(max-width:572px){
        ${props =>props.edit? 'display:none':''}
    }
    @media(max-width:392px){
        margin-right: 5px;
    }
`
export const Img = styled.img`
    z-index: 6;
    margin-right: 15px;
    &:hover {
        cursor: pointer;
    }
`
export const Nav = styled.ul`
    align-items: center;
    background: #7F3B7C;
    bottom: 0;
    color: #fff;
    display: none;
    font-size: 32px;
    justify-content: center;
    left: 0;
    list-style: none;
    margin: 0 0 0 -40px;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 5;

    &.active {
        display: flex;
        flex-direction: column;
    }

    li {
        padding: 10px 0;
        a {
            color: #fff;
            text-decoration: none;
            transition: opacity 0.5s;
            -webkit-transition: opacity 0.5s;

            &:hover, &:focus {
                cursor: pointer;
                opacity: 0.5
            }
        }
    }
    @media(max-width:392px){
        font-size: 8.2vw;
    }
`

export const LoginButton = styled.div`
    background: url(${Images.login});
    background-size: cover;
    width: 18px;
    height: 25px;
    display: block !important;
    &:hover {
        margin-left: 1px;
        cursor: pointer;
    }
`
export const Container = styled.div`
    border: 1px solid #fff;
    border-radius: 50px;
    height: 38px;
    width: 38px;
    z-index: 6;
    display: flex;
    justify-content: center;
    align-items: center;
    
    &:hover {
        border: none;
        margin-left: 2px;
        div {
            background: url(${Images.loginHover});
            width: 51px;
            height: 51px;
            background-size: cover;
            margin-left: -9px;
            display: block !important;
        }
    }  
    @media(max-width:992px){
        ${props =>props.save? 'display:none;':''}      
    }  
    @media(max-width:572px){
        ${props =>props.edit? 'display:none;':''}
    }
`
