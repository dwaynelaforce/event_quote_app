import { useState, useEffect } from 'react'
import {Container, Table, Row, Col} from 'react-bootstrap';
import axios from 'axios';
import MasterQuote from './MasterQuote.jsx'
function InquiryInfo(props) {
    const [myInquiry, setMyInquiry] = useState(null);
    const [eventStartDate, setEventStartDate] = useState(null);
    const [eventEndDate, setEventEndDate] = useState(null);

    // request the inquiry from database based on its id
    useEffect(()=>{
        axios.get('http://localhost:8000/api/inquiry/'+props.id)
        .then(response => {
            let inquiry = response.data;
            if (inquiry.eventStart){
                let temp_start = new Date(inquiry.eventStart);
                temp_start = temp_start.toDateString();
                setEventStartDate(temp_start);
            } else {
                setEventStartDate("");
            }
            if (inquiry.eventEnd) {
                let temp_end = new Date(inquiry.eventEnd);
                temp_end = temp_end.toDateString();
                setEventEndDate(temp_end);
            } else {
                setEventEndDate("");
            }
            setMyInquiry(response.data)
        })
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
                    <p>{eventStartDate}</p>
                </Col>
                <Col>
                    <p> Event End:</p>
                    <p>{eventEndDate}</p>
                </Col>
            </Row>
            <MasterQuote masterQuote={myInquiry.masterQuote}/>
        </Container>
    );
}
export default InquiryInfo;