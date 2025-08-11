const currancySymbol = (num) => {

    const symbol = new Intl.NumberFormat('en-IN',{
        style : "currency",
        currency : "INR",
        minimumFractionDigits : "2"
    })

    return (
        symbol.format(num)
    )
}

export default currancySymbol;