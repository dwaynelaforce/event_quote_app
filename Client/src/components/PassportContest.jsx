import { Form, Row, Col, InputGroup, FormControl } from 'react-bootstrap';
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
            <InputGroup.Checkbox onChange={checkboxHandler} value="300" name={name}/>
            <FormControl value="Passport Contest" readOnly/>
            <InputGroup.Append>
                <InputGroup.Text>($300.00)</InputGroup.Text>
            </InputGroup.Append>
        </>
    )
}
export default PassportContext;
