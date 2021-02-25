function FinalQuote(props){
    const {total, discounts,subtotal, quote}= props
    if ( total > 0 ) {
        return (
            <div>
                <h4> Your Final Estimate is: </h4>
                <p>Your subtotal is: ${subtotal}.00</p>
                {Object.keys(discounts).map((key,idx)=>(
                    <p key={idx}> {key}: -${discounts[key]}.00</p>
                ))} 
                <h1>Your final total is: ${total}.00</h1>
            </div>
        );
    } else return null;
}
export default FinalQuote;