import { useState, useEffect } from 'react';
import FinalQuote from './FinalQuote.jsx';
import PassportContest from'./PassportContest.jsx';
import { Form, FormControl, Row, Col, Button, Container, InputGroup } from 'react-bootstrap';
import axios from 'axios';
import solarPanel from '../static/panel.png';

function QuoteForm(props) {
    const [quote, setQuote] = useState({});
    const [subtotal, setSubtotal] = useState(0);
    const [discounts, setDiscounts] = useState({});
    const [total, setTotal] = useState(0);
    const [masterQuote, setMasterQuote] = useState({});
    const [showFinalQuote, setShowFinalQuote] = useState(false);
    
    const { inquiry, setInquiry, submitHandler } = props;

    function quoteUpdateHandler(key, val) {
        setShowFinalQuote(false);
        setTotal(0);
        setDiscounts({});
        setMasterQuote({});
        if (key === "Exhibitors" || val === 0) {
            delete quote["Premium Exhibitor Features"];
        }
        if (masterQuote) {
            for (let key in masterQuote) {
                delete masterQuote[key];
            }
            setMasterQuote({});
        };
        quote[key] = val;
        let sum = 0;
        for (let key in quote) {
            sum += quote[key];
        }
        setSubtotal(sum);
        console.log("hello from quoteUpdateHandler");
    }
    
    function selectHandler(e) {
        let key = e.target.name;
        let val = parseInt(e.target.value);
        quoteUpdateHandler(key, val);
    }
    
    function checkboxHandler(e) {
        let key = e.target.name;
        let val;
        if (e.target.checked === false) {
            val = 0;
        } else {
            val = parseInt(e.target.value);
        }
        quoteUpdateHandler(key, val);
        console.log("hello from checkboxHandler");
    }

    function numberHandler(e) {
        let key = e.target.name;
        let multiplier = parseInt(e.target.attributes.multiplier.value);
        let qty = parseInt(e.target.value);
        let val = qty * multiplier
        quoteUpdateHandler(key, val);
    }

    function finalQuoteHandler(e) {
        let tierDiscount = Math.ceil(quote.Tier * 0.2);
        discounts["20% tier discount"] = tierDiscount;
        console.log("tier discount is: ", tierDiscount)
        let finalDiscount = 0;
        // spend $5000 = 10% discount
        if (subtotal >= 5000 && subtotal < 8000) {
            finalDiscount = Math.ceil(subtotal * 0.1)
            discounts["spend $5,000 for 10% discount"] = finalDiscount;
            // spend $8000 = 15% discount
        } else if (subtotal >= 8000 && subtotal < 14000) {
            finalDiscount = Math.ceil(subtotal * 0.15)
            discounts["spend $8,000 for 15% discount"] = finalDiscount;
            //  spend $14,000 = 20% discount
        } else if (subtotal >= 14000 && subtotal < 20000) {
            finalDiscount = Math.ceil(subtotal * 0.2)
            discounts["spend $14,000 for 20% discount"] = finalDiscount;
            // spend $20,000 =25% discount
        } else if (subtotal >= 20000 && subtotal < 30000) {
            finalDiscount = Math.ceil(subtotal * 0.25)
            discounts["spend $20,000 for 25% discount"] = finalDiscount;
            // spend $30,000 = 30% discount
        } else if (subtotal >= 30000 && subtotal < 50000) {
            finalDiscount = Math.ceil(subtotal * 0.3)
            discounts["spend $30,000 for 30% discount"] = finalDiscount;
            //spend $50,000 = 35% discount
        } else if (subtotal >= 50000) {
            finalDiscount = Math.ceil(subtotal * 0.35)
            discounts["spend $50,000 for 35% discount"] = finalDiscount;
        }
        let temp_total = subtotal;
        // apply tier discount
        temp_total -= tierDiscount;
        // apply final discount
        temp_total -= finalDiscount;
        setTotal(temp_total);
        console.log("subtotal:", subtotal);
        for (let key in discounts) {
            console.log(key, discounts[key])
        }
        setDiscounts(discounts);
        console.log("temp_total is ", temp_total);
        console.log("total is: ", total);
        masterQuoteHandler(temp_total);
    }
    function masterQuoteHandler(temp_total){
        masterQuote.quote = quote;
        masterQuote.subtotal = subtotal;
        masterQuote.discounts = discounts;
        masterQuote.total = temp_total;
        setMasterQuote(masterQuote);
        inquiry.masterQuote = masterQuote;
        setInquiry(inquiry);
        console.log("masterQuoteHandler: inquiry is ",inquiry);
        setShowFinalQuote(true);
    }

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

    return (
        <Form className="rounded"
            style={{backgroundColor:"#184D62"}}>
            
            <Container className="py-3 px-5">
                <h1 className="text-center mb-3" style={{color:"#FFC107"}}>
                    Quote Calculator
                </h1>
            </Container>
            
            <Container className="py-4 px-5"
                style={{backgroundColor:"#FAFAFA", color:"#184D62"}}>
                <h4 className="text-center mb-3">Tell me about your event needs:</h4>
                <Row>
                    <InputGroup as={Col} xl className="my-1">
                        <InputGroup.Prepend>
                            <InputGroup.Text>Event size?</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl name="Tier" as="select" onChange={selectHandler} required>
                            <option selected disabled>--- Choose from list ---</option>
                            <option value="1599">$1,599 | Tier 1 - up to 500 attendees</option>
                            <option value="2399">$2,399 | Tier 2 - up to 1,500 attendees</option>
                            <option value="3899">$3,899 | Tier 3 - up to 3,000 attendees</option>
                            <option value="5399">$5,399 | Tier 4 - up to 5,000 attendees</option>
                        </FormControl>
                    </InputGroup>
                    <InputGroup as={Col} xl className="my-1">
                        <FormControl value="How many events?" readOnly/>
                        <FormControl type="number"
                            name="numberOfEvents"
                            min={1} max={100} defaultValue={1} 
                            onChange={inquiryUpdateHandler}
                            style={{maxWidth:"75px"}}/>
                    </InputGroup>
                </Row>
                <Row>
                    <InputGroup as={Col} xl className="my-1">
                        <FormControl value="Pre/Post-Event Surveys ($80.00 ea.)" readOnly/>
                        <FormControl type="number" 
                            name="Pre/Post-Event Surveys" 
                            multiplier="80" 
                            defaultValue="0" min="0"
                            onChange={numberHandler}
                            style={{maxWidth:"75px"}}/>
                    </InputGroup>
                    <InputGroup as={Col} xl className="my-1">
                        <FormControl value="Networking Sessions ($150.00 ea.)" readOnly/>
                        <Form.Control type="number" 
                            name="30-min Networking Sessions" 
                            multiplier="150"
                            defaultValue="0" min="0"
                            onChange={numberHandler}
                            style={{maxWidth:"75px"}}/>
                    </InputGroup>
                </Row>
                <Row>
                    <InputGroup as={Col} xl className="my-1">
                        <InputGroup.Prepend>
                            <InputGroup.Text>Exhibitors?</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control name="Exhibitors" as="select" onChange={selectHandler}>
                            <option value="0" selected>No Exhibitors</option>
                            <option value="500">Up to 10 Exhibitors ($500) </option>
                            <option value="800">Unlimited Exhibitors($800) </option>
                        </Form.Control>
                    </InputGroup>
                    <InputGroup as={Col} xl className="my-1">
                        <PassportContest quote={quote} setQuote={setQuote} checkboxHandler={checkboxHandler} quoteUpdateHandler={quoteUpdateHandler}/>
                    </InputGroup>
                </Row>
                <Row>
                    <InputGroup as={Col} xl className="my-1">
                        <InputGroup.Checkbox 
                            name="Speaker/Session Feedback" 
                            value="300" onChange={checkboxHandler}/>
                        <FormControl value="Speaker/Session Feedback" readOnly/>
                        <InputGroup.Append>
                            <InputGroup.Text>($300.00)</InputGroup.Text>
                        </InputGroup.Append>
                    </InputGroup>
                    <InputGroup as={Col} xl className="my-1">
                        <InputGroup.Checkbox value="800" 
                            name="Unlimited Sponsor Profiles and Tiers" 
                            onChange={checkboxHandler} />
                        <FormControl value="Sponsor Profiles and Tiers (unlimited)" readOnly/>
                        <InputGroup.Append>
                            <InputGroup.Text>($800.00)</InputGroup.Text>
                        </InputGroup.Append>
                    </InputGroup>
                </Row>
                <Row>
                    <InputGroup as={Col} xl className="my-1">
                        <InputGroup.Checkbox value="800" 
                            name="Career Fair Tools" 
                            onChange={checkboxHandler} />
                        <FormControl value="Career Fair Tools" readOnly/>
                        <InputGroup.Append>
                            <InputGroup.Text>($800.00)</InputGroup.Text>
                        </InputGroup.Append>
                    </InputGroup>
                    <InputGroup as={Col} xl className="my-1">
                        <InputGroup.Checkbox onChange={checkboxHandler} value="600" name="Artifact Center"  />
                        <FormControl value="Artifact Center" readOnly/>
                        <InputGroup.Append>
                            <InputGroup.Text>($600.00)</InputGroup.Text>
                        </InputGroup.Append>
                    </InputGroup>
                </Row>
                <Row>
                    <InputGroup as={Col} xl className="my-1">
                        <InputGroup.Checkbox onChange={checkboxHandler} value="200" name="Branded Event URL"/>
                        <FormControl value="Branded Event URL" readOnly/>
                        <InputGroup.Append>
                            <InputGroup.Text> ($600.00) </InputGroup.Text>
                        </InputGroup.Append>
                    </InputGroup>
                    <InputGroup as={Col} xl className="my-1">
                        <InputGroup.Checkbox onChange={checkboxHandler} value="300" name="Session Attendance Manager/Ticket Session Mapping or Capping"/>
                        <FormControl value="Session Attendance Manager" readOnly/>
                        <InputGroup.Append>
                            <InputGroup.Text> ($300.00) </InputGroup.Text>
                        </InputGroup.Append>
                    </InputGroup>
                </Row>
                <InputGroup className="my-2">
                    <InputGroup.Checkbox onChange={checkboxHandler} value="200" name="Video Access Control of Recorded Content"/>
                    <FormControl value="Video Access Control of Recorded Content" readOnly/>
                    <InputGroup.Append>
                        <InputGroup.Text> ($200.00) </InputGroup.Text>
                    </InputGroup.Append>
                </InputGroup>
                <InputGroup className="my-2">
                    <InputGroup.Checkbox onChange={checkboxHandler} value="80" name="Whova Direct Video Uploading"/>
                    <FormControl value="Whova Direct Video Uploading additional 5GB (3 GB for free)" readOnly/>
                    <InputGroup.Append>
                        <InputGroup.Text>( $ 80.00)</InputGroup.Text>
                    </InputGroup.Append>
                </InputGroup>
                <InputGroup className="my-2">
                    <InputGroup.Checkbox onChange={checkboxHandler} value="500" name="Document Uploading for Speakers and Admins(unlimited)"/>
                    <FormControl value="Document Uploading for Speakers and Admins(unlimited)" readOnly/>
                    <InputGroup.Append>
                        <InputGroup.Text> ($500.00) </InputGroup.Text>
                    </InputGroup.Append>
                </InputGroup>
                <InputGroup className="my-2">
                    <InputGroup.Checkbox onChange={checkboxHandler} value="75" name="Additional Attendees (50 more antendees)"/>
                    <FormControl value="Additional Attendees (50 more antendees)" readOnly/>
                    <InputGroup.Append>
                        <InputGroup.Text> ( $ 75.00) </InputGroup.Text>
                    </InputGroup.Append>
                </InputGroup>
            </Container>
            <Container className="pt-3 pb-1 px-5"
                style={{backgroundColor:"#FFC107"}}>
                <InputGroup size="lg" className="mb-3"> 
                    <InputGroup.Prepend>
                        <InputGroup.Text className="px-5">
                            Subtotal: 
                        </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl value={"$ " + subtotal + " .00"} readOnly 
                        className="text-right font-weight-bold px-5"/>
                </InputGroup>
            </Container>
            
            {showFinalQuote
                ? <FinalQuote total={total}
                    subtotal={subtotal} 
                    discounts={discounts} 
                    submitHandler={submitHandler}/>
                : <Container className="py-3 px-5 text-center">
                    <h4 className="text-center mt-2 mb-4">
                        You might be eligible for a  
                        <span style={{color:"#FFC107"}}> discount </span>
                        .
                    </h4>
                    <Button className="mb-2" 
                        size="lg" variant="warning"
                        onClick={finalQuoteHandler}>
                        <strong style={{color:"#184D62"}}>Calculate total</strong>
                    </Button>
                    <p className="text-center mt-2 mb-4">
                        and 
                        <b style={{color:"#FFC107"}}> find out </b>
                        (results below) !
                    </p>
                </Container>
            }
            
        </Form>
    );
}
export default QuoteForm;


