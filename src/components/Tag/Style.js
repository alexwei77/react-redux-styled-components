import styled from 'styled-components'

export const Wrapper = styled.div`
    border: 1px solid #FFF;
    background-color: #c5eac5;
    color: #272525;
    border-radius: 50px;
    padding: 10px 30px;
    font-size: 16px;        
    margin: 7px 10px 7px 0;
    text-transform: capitalize;
    transition: 0.5s;
    -webkit-transition: 0.5s;

    &:hover, &:focus {
        background-color: #9eda9e;
        color: #FFF;
        cursor: pointer;
    }
    @media(max-width:767px){
        font-size: 15px;
        align-items: center;
        display: flex;
        // height: 35px;
        justify-content: center;
        // padding: 10px 60px;
        // width: calc(100% * (1/10) - 10px - 1px);
    }
`
export const Icon = styled.img`
    padding-left: 15px;
    width: 13px;
`