import { Row, Container, Table, Button } from 'react-bootstrap';
function FinalQuote(props){
    const {total, discounts,subtotal, submitHandler}= props
    if ( total > 0 ) {
        return (
            <Container className="text-center py-3 px-5"
                style={{color:"#184D62", backgroundColor: "#FAFAFA"}}>
                <h1>...good news, </h1>
                <h4 className="py-1">
                    It looks like we can offer you a 
                    <span className="h5" style={{color:"#2DACEE"}}> lower </span> 
                    price!
                </h4>
                <hr/>
                <h5 className="py-1 text-center">Here are the details of your unofficial* quote:</h5>
                <Row className="my-3">
                    <Table className="text-left mx-auto"
                        hover size="lg"
                        style={{maxWidth:"500px", color:"#184D62"}}>
                        <tbody>
                            <tr>
                                <td>Subtotal:</td>
                                <td className="text-right">${subtotal}.00</td>
                            </tr>
                            {Object.keys(discounts).map((key,idx)=>(
                                <tr key={idx}  style={{color:"#2DACEE"}}>
                                    <td >{key}</td>
                                    <td className="text-right">- ${discounts[key]}.00</td>
                                </tr>
                            ))} 
                            <tr>
                                <td><strong>Total:</strong></td>
                                <td className="text-right h2">${total}.00</td>
                            </tr>
                        </tbody>
                    </Table>
                </Row>
                <p className="mx-auto"
                    style={{maxWidth:"500px"}}>
                    <small>*This is not an official quote or offer.  We'll double check this quote for accuracy and get back to you to discuss your needs in fuller detail.</small>
                </p>
                <hr/>
                <Container>
                    <h1 className="my-4">Last thing, click ... </h1>
                    <Button size="lg" variant="warning"
                        className="px-4 py-2 mb-3"
                        onClick={submitHandler}>
                        <strong className="display-4 font-weight-bold"
                            style={{color:"#184D62"}}>
                            Submit
                        </strong>
                    </Button>
                    <h5> 
                        ...to send us a copy of this quote along with your info 
                        so we can get back to you! 
                    </h5>
                </Container>
            </Container>
        );
    } else return null;
}
export default FinalQuote;