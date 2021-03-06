import { useState, useEffect } from 'react'
import {Container, Table, Row, Col, Image} from 'react-bootstrap';
import axios from 'axios';
import MasterQuote from '../components/MasterQuote.jsx';
import Header from '../components/Header.jsx';
import whovaLogo from "../static/whova-logo-white.png";

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
        <Container style={{color:"#184D62"}}>
            <Header/>
            {/* dark blue container */}
            <Container className="py-3 px-0 rounded"
                style={{backgroundColor:"#184D62"}}>
                {/* top of dark blue container */}
                <Container style={{color:"#F9C10A"}}>
                    <h3>Quote Inquiry</h3>
                    <p>Inquiry ID#: {myInquiry._id}</p>
                </Container>
                {/* offwhite document container */}
                <Container className="py-4 px-5" 
                    style={{backgroundColor:"#FAFAFA"}}>
                    <Row>
                        <Col md>
                            <h1 className="display-3">{myInquiry.contactName}</h1>
                        </Col>
                        <Col md>
                            <h3>{myInquiry.orgName}</h3>
                            <h6 classname="px-5">
                                <a href="">{myInquiry.contactEmail}</a>
                            </h6>
                            <h6>{myInquiry.orgAddress}</h6>
                        </Col>
                    </Row>
                    <hr/>
                    <Row>
                        <Col md>
                            {eventStartDate ?
                                <span className="h6">
                                    Next Event: <mark> {eventStartDate} </mark>
                                </span>
                                : 
                                <span>No event dates</span>
                            }
                            {eventStartDate && eventEndDate ?
                                <span className="h6">
                                    to
                                    <mark> {eventEndDate}</mark>
                                </span>
                                : null}
                        </Col>
                        <Col md>
                            <h6>
                                <mark>{myInquiry.numberOfEvents} </mark>
                                events requested</h6>
                        </Col>
                    </Row>
                    {/* <Table striped bordered hover variant="secondary">
                        <tbody>
                            <tr>
                                <td><b>{myInquiry.orgName}</b></td>
                                <td>{myInquiry.orgAddress} </td>
                            </tr>
                            <tr>
                                <td> {myInquiry.contactName}</td>
                                <td> <a href={"mailto:" + myInquiry.contactEmail}>{myInquiry.contactEmail}</a></td>
                            </tr>
                            <tr>
                                <td> Number of Events</td>
                                <td>{myInquiry.numberOfEvents}</td>
                            </tr>
                            <tr>
                                <td>Event Start: {eventStartDate}</td>
                                <td>Event End: {eventEndDate} </td>
                            </tr>
                        </tbody>
                    </Table> */}
                </Container>
                <MasterQuote masterQuote={myInquiry.masterQuote}/>
                <h1 style={{color:"#F9C10A"}}> Thank You For Choosing Whova!</h1>
            </Container>
        </Container>
    );
}
export default InquiryInfo;