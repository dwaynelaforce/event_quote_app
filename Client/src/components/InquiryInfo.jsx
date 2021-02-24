import { useState, useEffect } from 'react'
import {Container, Table, Row, Col} from 'react-bootstrap';
import axios from 'axios';
import MasterQuote from './MasterQuote.jsx'
function InquiryInfo(props) {
    const [myInquiry, setMyInquiry] = useState(null);
    

    // request the inquiry from database based on its id
    useEffect(()=>{
        axios.get('http://localhost:8000/api/inquiry/'+props.id)
        .then(response => setMyInquiry(response.data))
        .catch(response =>console.log("error getting inquiry from db: ", response))
    },[])

    // checks to make sure we have myInquiry loaded before trying to render its data
    if (myInquiry === null) return <h1>loading...</h1>;

    // here we render myInquiry's data
    return (
        <Container>
            <Row>
                <Col>
                    <p><b>{myInquiry.orgName}</b></p>
                </Col>
                <Col>
                    <p>{myInquiry.orgAddress}</p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <p>{myInquiry.contactName}</p>
                </Col>
                <Col>
                    <a href={"mailto:" + myInquiry.contactEmail}>{myInquiry.contactEmail}</a>
                </Col>
            </Row>
            <Row>
                <Col>
                    <p>Number of Events</p>
                    <p>{myInquiry.numberOfEvents}</p>
                </Col>
                <Col>
                    <p>Event Start</p>
                    <p>{myInquiry.eventStart}</p>
                </Col>
                <Col>
                    <p> Event End:</p>
                    <p>{myInquiry.eventEnd}</p>
                </Col>
            </Row>
            <MasterQuote masterQuote={myInquiry.masterQuote}/>
        </Container>
    );
}
export default InquiryInfo;