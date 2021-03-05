import { useState, useEffect } from 'react'
import {Container, Table, Row, Col, Image} from 'react-bootstrap';
import axios from 'axios';
import MasterQuote from '../components/MasterQuote.jsx';
import Header from '../components/Header.jsx';
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
        <>
        <Container>
        <Header/>
        </Container>
        <Container className="py-3 px-3"
            style={{backgroundColor:"#184D62", borderRadius:"10px", textAlign:"center"}}>
                <h1 style={{color:"#F9C10A"}}> Inquiry Information</h1>
            <Container className="py-3 px-3" style={{backgroundColor:"#FAFAFA", color:"black"}}>
            <Table striped bordered hover variant="secondary">
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
            </Table>
            </Container>
            
            <MasterQuote masterQuote={myInquiry.masterQuote}/>
            <h1 style={{color:"#F9C10A"}}> Thank You For Choosing Whova!</h1>
        </Container>
        </>
    );
}
export default InquiryInfo;