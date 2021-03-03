import { Form, Row, Col } from 'react-bootstrap';
function PassportContext(props){
    const {quote, setQuote, checkboxHandler, quoteUpdateHandler} = props;
    
    const name = "Premium Exhibitor Features";
    
    if (!quote.Exhibitors || quote.Exhibitors === 0) {
        let tempQuote = quote;
        tempQuote[name]=0;
        quote[name] = 0;
        setQuote(tempQuote);
        return null;
    }
    return(
        <>
            <Col>
                <Form.Check type="checkbox" onChange={checkboxHandler} value="300" name={name} />
            </Col>
            <Col>
                <Form.Label >Premium Exhibitor Features / Passport Contest</Form.Label></Col>
            <Col>
                <Form.Label>$300.00</Form.Label>
            </Col>
        </>
    )
}
export default PassportContext;
