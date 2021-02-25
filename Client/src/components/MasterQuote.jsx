function MasterQuote(props){
    const { masterQuote } = props;
    if (masterQuote === null) {
        console.log("no masterQuote found in inquiry");
        return null;
    };
    return(
        <div>
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
