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
                className="py-3 px-0" 
                style={{ backgroundColor: "#FAFAFA", color: "#184D62" }}>
                <Container>
                    <h3 className="text-center">Quote Details</h3>
                    <Table striped bordered hover 
                        className="mx-auto"
                        style={{maxWidth:"800px"}}>
                        <thead>
                            <tr>
                                <th> Item </th>
                                <th> Price </th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(masterQuote.quote).map((objKey, idx) => (
                                <tr>
                                    <td key={idx}> {objKey}</td>
                                    <td className="text-right pr-5">${masterQuote.quote[objKey]}.00</td>
                                </tr>
                            ))}
                            <tr>
                                <td><h5>Subtotal:</h5></td>
                                <td className="text-right pr-5">${masterQuote.subtotal}.00</td>
                            </tr>
                            {Object.keys(masterQuote.discounts).map((key, idx) => (
                                <tr>
                                    <td key={idx}>
                                        <mark className="">
                                            {key}
                                        </mark>
                                    </td>
                                    <td className="text-right pr-5">
                                        <mark className="">
                                            -${masterQuote.discounts[key]}.00
                                        </mark>
                                    </td>
                                </tr>
                            ))}
                            <tr>
                                <td><h3><strong>Total:</strong></h3></td>
                                <td className="display-4">${masterQuote.total}.00</td>
                            </tr>
                        </tbody>
                    </Table>
                    {/* <h2 style={{ color: "lightblue" }}>
                        Subtotal: ${masterQuote.subtotal}.00
                    </h2> */}
                </Container>
                {/* <h3>Discounts:</h3>
                <Table striped bordered hover variant="primary">
                    <thead>
                        <th> Discount </th>
                        <th> Price</th>
                    </thead>
                    <tbody>
                        {Object.keys(masterQuote.discounts).map((key, idx) => (
                            <tr>
                                <td key={idx}> {key}</td>
                                <td style={{color:"red"}}>-${masterQuote.discounts[key]}.00</td>
                            </tr>
                        ))}

                    </tbody>
                </Table>
                <h1 style={{ color: "lightgreen" }}>Total: ${masterQuote.total}.00</h1> */}
            </Container>
        </>
    );
};
export default MasterQuote;
