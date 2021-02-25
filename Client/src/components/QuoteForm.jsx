import { useState, useEffect } from 'react';
import FinalQuote from './FinalQuote.jsx';
import { Form, Row, Col, Image, Button } from 'react-bootstrap';
import axios from 'axios';

function QuoteForm(props) {
    const [quote, setQuote] = useState({});
    const [subtotal, setSubtotal] = useState(0);
    const [discounts, setDiscounts] = useState({});
    const [total, setTotal] = useState(0);
    const [masterQuote, setMasterQuote] = useState({});
    
    const { inquiry, setInquiry } = props;

    function quoteUpdateHandler(key, val) {
        quote[key] = val;
        let sum = 0;
        for (let key in quote) {
            sum += quote[key];
        }
        setSubtotal(sum);
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
    }
    return (

        <Form onSubmit={masterQuoteHandler}>
            <Form.Label> If more than one event, fill out the rest of the form</Form.Label>
            <Form.Group>
                <Form.Control name="Tier" as="select" onChange={selectHandler}>
                    <option selected> --- Choose a starting tier --- </option>
                    <option value="1599">Tier 1 - up to 500 attendees | $1,599 </option>
                    <option value="2399">Tier 2 - up to 1,500 attendees | $2,399</option>
                    <option value="3899">Tier 3 - up to 3,000 attendees | $3,899</option>
                    <option value="5399">Tier 4 - up to 5,000 attendees | $5,399</option>
                </Form.Control>
            </Form.Group>
            <Form.Group as={Row}>
                <Col>
                    <Form.Check name="Speaker/Session Feedback" type="checkbox" value="300" onChange={checkboxHandler} inline />
                </Col>
                <Col>
                    <Form.Label>Speaker/Session Feedback</Form.Label>
                </Col>
                <Col>
                    <Form.Label>$300.00</Form.Label>
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Col>
                    <Form.Control type="number" name="Pre/Post-Event Surveys" onChange={numberHandler} multiplier="80" />
                </Col>
                <Col>
                    <Form.Label>Pre/Post-Event Surveys</Form.Label>
                </Col>
                <Col>
                    <Form.Label>$80.00 each</Form.Label>
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Col>
                    <Form.Control type="number" name="30-min Networking Sessions" onChange={numberHandler} multiplier="150" />
                </Col>
                <Col>
                    <Form.Label> 30-min Networking Sessions </Form.Label>
                </Col>
                <Col>
                    <Form.Label>$150.00 each</Form.Label>
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Col>
                    <Form.Check type="checkbox" value="800" onChange={checkboxHandler} name="Unlimited Sponsor Profiles and Tiers" />
                </Col>
                <Col>
                    <Form.Label>Unlimited Sponsor Profiles and Tiers </Form.Label>
                </Col>
                <Col>
                    <Form.Label>$800.00</Form.Label>
                </Col>
            </Form.Group>
            <Form.Group>
                <Form.Control name="Exhibits" as="select" onChange={selectHandler}>
                    <option selected disabled> --- Exhibitor Packages --- </option>
                    <option value="0">No Exhibitors</option>
                    <option value="500">Up to 10 Exhibitors ($500) </option>
                    <option value="800">Unlimited Exhibitors($800) </option>
                </Form.Control>
            </Form.Group>
            <Form.Group as={Row}>
                <Col><Form.Check type="checkbox" onChange={checkboxHandler} value="800" name="Premium Exhibitor features" /></Col>
                <Col><Form.Label >Premium Exhibitor features</Form.Label></Col>
                <Col>
                    <Form.Label>$800.00</Form.Label>
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Col>
                    <Form.Check type="checkbox" onChange={checkboxHandler} value="800" name="Career Fair Tools" />
                </Col>
                <Col>
                    <Form.Label > Career Fair Tools</Form.Label>
                </Col>
                <Col>
                    <Form.Label>$800.00</Form.Label>
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Col>
                    <Form.Check type="checkbox" onChange={checkboxHandler} value="600" name="Artifact Center" />
                </Col>
                <Col>
                    <Form.Label > Artifact Center</Form.Label>
                </Col>
                <Col>
                    <Form.Label>$600.00</Form.Label>
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Col>
                    <Form.Check type="checkbox" onChange={checkboxHandler} value="200" name="Branded Event URL" inline />
                </Col>
                <Col>
                    <Form.Label inline> Branded Event URL </Form.Label>
                </Col>
                <Col>
                    <Form.Label>$600.00</Form.Label>
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Col>
                    <Form.Check type="checkbox" onChange={checkboxHandler} value="300" name="Session Attendance Manager/Ticket Session Mapping or Capping" />
                </Col>
                <Col>
                    <Form.Label > Session Attendance Manager/Ticket Session Mapping or Capping</Form.Label>
                </Col>
                <Col>
                    <Form.Label>$300.00</Form.Label>
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Col>
                    <Form.Check type="checkbox" onChange={checkboxHandler} value="200" name="Video Access Control of Recorded Content" inline />
                </Col>
                <Col>
                    <Form.Label inline> Video Access Control of Recorded Content </Form.Label>
                </Col>
                <Col>
                    <Form.Label>$200.00</Form.Label>
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Col>
                    <Form.Check type="checkbox" onChange={checkboxHandler} value="80" name="Whova Direct Video Uploading" inline />
                </Col>
                <Col>
                    <Form.Label inline> Whova Direct Video Uploading</Form.Label>
                </Col>
                <Col>
                    <Form.Label>$80.00 for additional 5GB (3 GB for free)</Form.Label>
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Col>
                    <Form.Check type="checkbox" onChange={checkboxHandler} value="500" name="Document Uploading for Speakers and Admins(unlimited)" inline />
                </Col>
                <Col>
                    <Form.Label inline>Document Uploading for Speakers and Admins(unlimited) </Form.Label>
                </Col>
                <Col>
                    <Form.Label>$500.00</Form.Label>
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Col>
                    <Form.Check type="checkbox" onChange={checkboxHandler} value="75" name="Additional Attendees (50 more antendees)" />
                </Col>
                <Col>
                    <Form.Label> Additional Attendees (50 more antendees)</Form.Label>
                </Col>
                <Col>
                    <Form.Label>$75.00 </Form.Label>
                </Col>
            </Form.Group>
            <h3> Subtotal: ${subtotal}.00</h3>
            <Button variant="success" onClick={finalQuoteHandler}> Calculate </Button>
            <FinalQuote total={total} subtotal={subtotal} quote={quote} discounts={discounts} />
        </Form>
    );
}
export default QuoteForm;


