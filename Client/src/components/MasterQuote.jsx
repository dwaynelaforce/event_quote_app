function MasterQuote(props){
    const { masterQuote } = props;
    if (!masterQuote) {
        console.log("no masterQuote found in inquiry");
        return null;
    };
    return(
        <div>
            <h4 style={{color:"red"}}> ** This is an unofficial quote. This is an estimate. This information has been sent to  <a href="mailto:cole.dillinger@whova.com">cole.dillinger@whova.com</a> who will get back to you for an official quote</h4>
            <h2 style ={{color:"lightGreen"}}>Subtotal: ${masterQuote.subtotal}.00</h2>
            <h3>Discounts:</h3>
            <ul>
                {Object.keys(masterQuote.discounts).map((key,idx)=>(
                    <li key={idx} style={{color:"red"}}> {key}: -${masterQuote.discounts[key]}.00</li>
                    ))}
            </ul>
            <h1 style={{color:"green"}}>Total: ${masterQuote.total}.00</h1>
            <h3 style={{color:"pink"}}>Itemized Quote</h3>
            <ul>
                {Object.keys(masterQuote.quote).map((objKey, idx)=>(
                    <li key={idx}>{objKey}: ${masterQuote.quote[objKey]}.00</li>
                ))}
            </ul>
        </div>
    );
};
export default MasterQuote;
