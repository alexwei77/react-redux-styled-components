import React from 'react'
import { browserHistory } from 'react-router'
import $ from 'jquery'
import { 
    Container, 
    Logo, 
    List, 
    ListItems, 
    Link, 
    MobileList } from './Style'
import Images from '../../themes/images'

class Footer extends React.Component {

    gotoPage = (path) => {
        browserHistory.push(path);
        $('body,html').animate({
            scrollTop: 0,
        }, 1000);
    }

    render() {        
        return (
            <Container>
                <Logo src={Images.logo_footer} alt="footer" />
                <List>
                    <ListItems>
                        <Link onClick={() =>this.gotoPage('/home')}>Home</Link>
                        <Link onClick={() =>this.gotoPage('/about')}>About</Link>
                        <Link onClick={() =>this.gotoPage('/contact')}>Contact</Link>
                        <Link href="">Privacy and GDPR</Link>
                    </ListItems>
                    <ListItems social>
                        <Link social onClick={() =>window.location.assign('https://www.linkedin.com')}><img src={Images.linkedin_home} alt="linkedin"/></Link>
                        <Link social onClick={() =>window.location.assign('https://www.facebook.com')}><img src={Images.facebook_home} alt="facebook"/></Link>
                    </ListItems>
                </List>
                <MobileList>
                    <ListItems>
                        <Link onClick={() =>this.gotoPage('/home')}>Home</Link>
                        <Link onClick={() =>this.gotoPage('/about')}>About</Link>
                        <Link onClick={() =>this.gotoPage('/contact')}>Contact</Link>
                    </ListItems>
                    <ListItems><Link href="">Privacy and GDPR</Link></ListItems>
                    <ListItems social>
                        <Link social onClick={() =>window.location.assign('https://www.linkedin.com')}><img src={Images.linkedin_home} alt="linkedin"/></Link>
                        <Link social onClick={() =>window.location.assign('https://www.facebook.com')}><img src={Images.facebook_home} alt="facebook"/></Link>
                    </ListItems>
                </MobileList>
            </Container>
        )
    }
}

export default Footer