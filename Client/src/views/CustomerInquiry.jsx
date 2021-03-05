import { useState } from 'react';
import { Container, Form, Row, Col, Image, Button } from 'react-bootstrap';
import axios from 'axios';
import {navigate} from '@reach/router';

import QuoteForm from '../components/QuoteForm.jsx';
import Header from '../components/Header.jsx';

import downArrow from "../static/down_arrow.png";
import whovaLogo from "../static/whova-logo-white.png";

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
            .then(response => {                console.log("successfully added to db", response);
                window.alert("Thank you for submitting your inquiry! Cole Dillinger will get back to you shortly.  Your inquiry details are on the next page.");
                navigate(`/inquiry/${response.data._id}`);
            })
            .catch(err => console.log("there was an error adding to the db", err))
    }

    return (
        <Container>
            <Header/>
            <Form className="rounded"
                onSubmit={submitHandler}
                style={{backgroundColor:"#184D62"}}>
                <h1 className="py-3 px-3 text-center"
                    style={{color:"#FFC107"}}> Request a quote for your event</h1>
                <Container className="py-4 px-5"
                    style={{backgroundColor:"#FAFAFA",color:"#184D62"}}>
                    <p className="text-center mt-2 mb-4">Please indroduce yourself:</p>
                    <Row>
                        <Col md>
                            <Form.Group sm>
                                <Form.Control type="text" placeholder="Your Name" name="contactName" onChange={inquiryUpdateHandler} required/>
                            </Form.Group>
                            <Form.Group sm>
                                <Form.Control type="text" placeholder="Organization Name" name="orgName" onChange={inquiryUpdateHandler} required/>
                            </Form.Group>
                        </Col>
                        <Col md>
                            <Form.Group sm>
                                <Form.Control type="email" placeholder="you@email.org" name="contactEmail" onChange={inquiryUpdateHandler} required/>
                            </Form.Group>
                            <Form.Group sm>
                                <Form.Control type="text" placeholder="Organization Address" name="orgAddress" onChange={inquiryUpdateHandler} required/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <hr/>
                    <p className="text-center mt-2 mb-4">When is your next event?
                        <br/>
                        <i style={{color:"gray"}}>
                            (It's ok if you don't have a date in mind yet, just leave these fields blank)
                        </i>
                    </p>
                    <Row>
                        <Col sm>
                            <Form.Group>
                                <Form.Label>Event Start Date</Form.Label>
                                <Form.Control type="date" name="eventStart" onChange={inquiryUpdateHandler}/>
                            </Form.Group>
                        </Col>
                        <Col sm>
                            <Form.Group>
                                <Form.Label> Event End Date</Form.Label>
                                <Form.Control type="date" name="eventEnd" onChange={inquiryUpdateHandler}/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <hr/>
                    <h4 className="text-center mt-2 mb-4">Need a quote for a 
                        <span style={{color:"#2DACEE"}}> single </span>
                    event?</h4>
                    <p className="text-center mt-2 mb-4">Just hit submit and we'll get back to you to discuss your needs.</p>
                    <Row>
                        <Button type="submit" variant="warning" className="mx-auto" size="lg">
                            <b style={{color:"white"}}>Submit</b>
                        </Button>
                    </Row>
                </Container>
                <Container className="py-4 px-5">
                    <h4 className="text-center mt-2 mb-4">Interested in 
                        <span className="display-4"
                            style={{color:"#FFC107"}}> multiple </span>
                    events?</h4>
                    <p className="text-center mt-2 mb-4">Check out our
                        <b style={{color:"#FFC107"}}> quote calculator </b>
                    below!</p>
                    
                </Container>
            </Form>
            <Col style={{maxHeight:"400px"}} className="p-5">
                <Row fluid>
                    <Image src={downArrow} fluid className="mx-auto my-2"></Image>
                </Row>
                <Row fluid>
                    <Image src={downArrow} fluid className="mx-auto my-2"></Image>
                </Row>
                <Row fluid>
                    <Image src={downArrow} fluid className="mx-auto my-2"></Image>
                </Row>
            </Col>
            <QuoteForm inquiry={inquiry} setInquiry={setInquiry} 
                submitHandler={submitHandler}/>
            <Container>
                <Row style={{height:"25px", backgroundColor:"FAFAFA"}}>

                </Row>
                <Row>
                    <Image src={whovaLogo}
                        className="mx-auto"
                        style={{height:"105px", width:"315px"}}/>
                </Row>
            </Container>
        </Container>
    );
}
export default CustomerInquiry;