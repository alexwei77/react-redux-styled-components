import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './App'
import Home from './pages/LandingPage'
import TalentSignUp from './pages/SignUp/Talent'
import EmployerSignUp from './pages/SignUp/Employer'
import TalentPage from './pages/Profile/Talent'
import EmployerPage from './pages/Profile/Employer'
import Category from './pages/Profile/Talent/Category'
import Submition from './pages/Profile/Talent/Submition'
import Candidate from './pages/Profile/Talent/Candidate'
import Standard from './pages/About'
import Contact from './pages/Contact'
import Privacy from './pages/Privacy'
import FAQ from './pages/FAQ'
import TCA from './pages/TCA'

export default (
    <Route path="/" component={ App }>
        <IndexRoute component={ Home } />
        <Route path="/home" component={ Home } />        
        <Route path="/signup/talent" component={ TalentSignUp } />        
        <Route path="/signup/employer" component={ EmployerSignUp } />        
        <Route path="/profile/talent" component={ TalentPage }>
            <IndexRoute component={ Category } />
            <Route path="/profile/talent/category" component={ Category } />
            <Route path="/profile/talent/submition" component={ Submition } />            
            <Route path="/profile/talent/candidate" component={ Candidate } />            
        </Route>        
        <Route path="/profile/employer" component={ EmployerPage } />
        <Route path="/about" component={ Standard } />
        <Route path="/contact" component={ Contact } />
        <Route path="/faq" component={ FAQ } />
        <Route path="/privacy" component={ Privacy } />
        <Route path="/tca" component={ TCA } />
    </Route>
)