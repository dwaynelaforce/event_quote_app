import { useState } from 'react';
import FinalQuote from '../components/FinalQuote.jsx';
import QuoteForm from '../components/QuoteForm.jsx';
import { Container, Form, Row, Col, Image, Button } from 'react-bootstrap';
import axios from 'axios';


function CustomerInquiry(props) {
    const [inquiry, setInquiry] = useState({numberOfEvents:1, masterQuote:null});
    
    function inquiryUpdateHandler(e){
        e.preventDefault();
        let key = e.target.name;
        let val;
        if (key === "numberOfEvents") {
            val = parseInt(e.target.value)
        } else {
            val = e.target.value;
        }
        inquiry[key]= val;
        setInquiry(inquiry);
    }

    function submitHandler(e) {
        e.preventDefault();
        console.log("submitHandler: inquiry is ", inquiry);
        axios.post('http://localhost:8000/api/create', inquiry)
            .then(response => console.log("successfully added to db", response))
            .catch(err => console.log("there was an error adding to the db", err))
    }

    return (
        <Container fluid>
            <Row>
                <Image style={{margin: "0 auto", width: "50%", maxWidth: "500px"}} src="https://whova.com/wp-content/uploads/2015/11/whova-logo-white.png" fluid />
            </Row>
            <h1 className="my-3 text-center">Customer Inquiry</h1>
            <Form onSubmit={submitHandler}>
                <Row>
                    <Form.Group as={Col}>
                        <Form.Control type="text" placeholder="Contact Name" name="contactName" onChange={inquiryUpdateHandler}/>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Control type="text" placeholder="Organization Name" name="orgName" onChange={inquiryUpdateHandler}inline />
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col}>
                        <Form.Control type="email" placeholder="Contact Email" name="contactEmail" onChange={inquiryUpdateHandler}inline />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Control type="text" placeholder="Organization Address" name="orgAddress" onChange={inquiryUpdateHandler}inline />
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col}>
                        <Form.Label> Event Start Date</Form.Label>
                        <Form.Control type="date" name="eventStart" onChange={inquiryUpdateHandler}/>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label> Event End Date</Form.Label>
                        <Form.Control type="date" name="eventEnd" onChange={inquiryUpdateHandler}/>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col}>
                        <Form.Label>Number of Events</Form.Label>
                        <Form.Control type="number" name="numberOfEvents" min={1} max={100} defaultValue={1} onChange={inquiryUpdateHandler}/>
                    </Form.Group>
                    <Col>
                        <Button variant="success" type="submit"> Request Quote for Single Event</Button>
                    </Col>
                </Row>
            </Form>
            <QuoteForm inquiry={inquiry} setInquiry={setInquiry}/>
            <Button variant="success" onClick={submitHandler}>Send to Whova</Button>
        </Container>
    );
}
export default CustomerInquiry;