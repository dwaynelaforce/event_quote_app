function FinalQuote(props){
    const {total, discounts,subtotal, quote}= props
    if( total >0){
        return(
            <div>
                <h4> Your Final Estimate is: </h4>
                <p>Your subtotal is: ${subtotal}</p>
                {Object.keys(discounts).map((key,idx)=>(
                    <p key={idx}> {key}: -${discounts[key]}</p>
                    ))} 
                <h1>Your final total is: ${total}</h1>
                <a href="https://"></a>
                <p style={{color:"red"}}> *This is not a final quote, just an estimate. For a final rate <a href="mailto:Cole.Dillinger@whova.com">send us an email!</a></p>
            </div>
        )

    } else {
        return(
            <div></div>
        )
    }
}
export default FinalQuote;