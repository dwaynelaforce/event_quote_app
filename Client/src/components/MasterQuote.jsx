import { Container, Table, Row, Col } from 'react-bootstrap';
function MasterQuote(props) {
    const { masterQuote } = props;
    if (!masterQuote) {
        console.log("no masterQuote found in inquiry");
        return null;
    };
    return (
        <>
            <Container 
                className="py-3 px-3"
                style={{ backgroundColor: "#184D62", color: "black", borderRadius:"30px"}}>
                <h4> *This is an unofficial quote. This is an estimate. This information has been sent to  <a href="mailto:cole.dillinger@whova.com">cole.dillinger@whova.com</a> who will get back to you for an official quote</h4>
                <h2 style={{ color: "lightGreen" }}>Subtotal: ${masterQuote.subtotal}.00</h2>
                <h3>Discounts:</h3>
                <ul>
                    {Object.keys(masterQuote.discounts).map((key, idx) => (
                        <li key={idx} style={{ color: "green",listStyleType:"none"}}> {key}: -${masterQuote.discounts[key]}.00</li>
                    ))}
                </ul>
                <h1 style={{ color: "green" }}>Total: ${masterQuote.total}.00</h1>
                <Container>
                    <h3 >Itemized Quote</h3>
                    <Table striped bordered hover variant="light">
                        <thead>
                            <tr>
                                <th> Item </th>
                                <th> Price </th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(masterQuote.quote).map((objKey,idx)=>(
                                <tr>
                                    <td key={idx}> {objKey}</td>
                                    <td>${masterQuote.quote[objKey]}.00</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Container>
            </Container>
        </>
    );
};
export default MasterQuote;
