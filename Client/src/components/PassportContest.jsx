function PassportContext(props){
    const {quote, setQuote} = props;
    if (!quote.Exhibitors) {
        quote.Exhibitors = 0;
        setQuote(quote);
        return null;
    }
    return(
        <div>
            <h1> Hello from Passport Context</h1>
        </div>
    )
}
export default PassportContext;
