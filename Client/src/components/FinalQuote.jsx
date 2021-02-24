function FinalQuote(props){
    const {total, discounts,subtotal, quote}= props
    if ( total > 0 ) {
        return (
            <div>
                <h4> Your Final Estimate is: </h4>
                <p>Your subtotal is: ${subtotal}</p>
                {Object.keys(discounts).map((key,idx)=>(
                    <p key={idx}> {key}: -${discounts[key]}</p>
                ))} 
                <h1>Your final total is: ${total}</h1>
            </div>
        );
    } else return null;
}
export default FinalQuote;