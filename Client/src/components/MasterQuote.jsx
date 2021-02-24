function MasterQuote(props){
    const { masterQuote } = props;
    if (masterQuote === null) {
        console.log("no masterQuote found in inquiry");
        return null;
    };
    return(
        <div>
            <h1 style={{color:"green"}}>Total: {masterQuote.total}</h1>
            <h2 style ={{color:"lightGreen"}}>Subtotal: {masterQuote.subtotal}</h2>
            <h3>Discounts:</h3>
            <ul>
                {Object.keys(masterQuote.discounts).map((key,idx)=>(
                    <li key={idx} style={{color:"red"}}> {key}: -${masterQuote.discounts[key]}</li>
                ))}
            </ul>
            <h3 style={{color:"pink"}}>Itemized Quote</h3>
            <ul>
                {Object.keys(masterQuote.quote).map((objKey, idx)=>(
                    <li key={idx}>{objKey}: ${masterQuote.quote[objKey]}</li>
                ))}
            </ul>
        </div>
    );
};
export default MasterQuote;
