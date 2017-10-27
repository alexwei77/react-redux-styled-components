import React, { Component } from 'react'

import Header from '../../components/Header'
import Footer from '../../components/Footer'

import { 
    Wrapper,
    Heading, 
    Info,
    FieldWrapper } from './Style'
import Images from '../../themes/images'

export default class Privacy extends Component {

    render() {
        return (
            <Wrapper>
                <Header />
                <Heading>GDPR</Heading>                
                <Info>
                    <h1>What is GDPR?</h1>
                    <p>
                        The General Data Protection Regulation (GDPR) (Regulation (EU) 2016/679) is a regulation by which
                        the European Parliament, the Council of the European Union and the European Commission intend to 
                        strengthen and unify data protection for all individuals within the European Union (EU).<br/>
                        It also addresses the export of personal data outside the EU.<br/>
                        The GDPR aims primarily to give control back to citizens and residents over their personal data and to simplify
                        the regulatory environment for international business by unifying the regulation within the EU.<br/>
                        It becomes enforceable from 25 May 2018 after a two-year transition period and, since GDPR is a Regulation, not a Directive, it does not 
                        require national governments to pass any enabling legislation, and is thus directly binding and applicable.
                    </p>                    
                </Info>
                <Info>
                    <h1>Is my company affected by GDPR?</h1>
                    <p>
                        If your company is based in the EU, or if you ever receive applications, review 
                        candidates or even contact candidates within the EU, then yes - your company is affected by GDPR.
                    </p>
                </Info> 
                <Info>
                    <h1>What happens if my company does not comply with GDPR?</h1>
                    <p>
                        Data security has always been important.<br/>
                        But despite the severe repercussions of compromised data security, until recently, the fines 
                        for breach of data protection regulations were limited and enforcement actions infrequent.<br/>
                        However, the introduction of a potentially revolutionary European General Data Protection Regulation (GDPR) is likely to transform the way 
                        data-driven companies handle customer data by exposing them to the risk of hefty fines and severe penalties in the event of incompliance and data breach.
                    </p>
                </Info>        
                <FieldWrapper>
                    <img src={Images.aboutUs} alt="about" />                
                    <p>Failure to comply with the new regulations will lead to significant fines of up to 20 million EUR or 4 percent of the company’s global turnover, whichever is higher.</p>                     
                </FieldWrapper>
                <Info>
                    <p>
                        The GDPR subjects data controllers and processors that fail to comply with its requirements to severe consequences.<br/>
                        These consequences, contrary to what most people believe, are not just limited to monetary penalties.<br/>
                        Instead, they can potentially damage a business’s reputation and bottom-line.<br/>
                        There are three factors that together make the GDPR the most stringent regulation in the European data protection regime.
                    </p>
                    <ul>
                        <li>
                            Reputational Risk — The reputational risks of any data breach is always severe.<br/> 
                            However, implementation of the GDPR with obligation to notify authorities in case of data breaches is likely to result in increased enforcement activity.
                            This will consequently bring data protection breaches to light, compromising a company’s market position and reputation.
                        </li>
                        <li>
                            Geographic Risk — All organisations offering goods or services to EU markets or monitoring the behaviour of EU citizens are subject to the GDPR.
                            This includes all data analytics companies as well.
                        </li>
                        <li>Huge Fines — Failure to comply with the new regulations will lead to significant <b>fines of up to 20 million EUR or 4 percent of the company’s global turnover</b>, whichever is higher.</li>
                    </ul>
                    <p>
                        To avoid the huge fines and severe penalties, businesses need to have complete and mature data governance in place. 
                        From revising the existing contracts in place to getting a buy in from the key people in organisations, businesses 
                        will be required to review their entire data process management approach in order to become compliant and mitigate reputational and financial risks.
                    </p>
                </Info> 
                <Info>
                    <h1>What can I do to comply with GDPR?</h1>
                    <p>
                        In the past candidate data has been stored, shared and made available on multiple platforms and media, 
                        often without any supervision and control. This would be considered a direct violation of GDPR from may 2018.
                    </p>
                    <p>
                        Amongst other areas your organisation must adopt a <b>Protection by Design Approach</b> — There are certain ‘protection by design’ 
                        techniques that businesses can use to protect the personal data of their customers. These include:
                    </p>
                    <ul>
                        <li>
                            Pseudonymisation — Pseudonymisation (such as encryption, tokenisation, hashing) is a technique that involves categorisation of the 
                            personal data of customers into two types in such a manner that one type can no longer be attributed to an individual unless 
                            accompanied by the second type of information which is kept separately and is subject to various data protection measures.
                        </li>
                        <li>
                            Data Minimisation — As the name implies, data minimisation is about ensuring that only the data 
                            that’s necessary for a specific purpose is processed, used, or stored.
                        </li>
                    </ul>
                    <p>
                        To comply with GDPR we suggest that you store and encrypt all data centrally, and process candidates through a feasible structure. 
                        GDPR regulations include the right to be erased / forgotten, the right to acquire a complete copy of candidate data on file for 
                        each individual and which roles in the organisation has the right to view candidate data.
                    </p>
                    <p>
                        We suggest you use a GDPR compliant ATS (Applicant Tracking System) to process, store and encrypt candidate data.
                    </p>
                </Info>            
                <Footer />
            </Wrapper>
        )
    }
}
