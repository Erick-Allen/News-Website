import { useFinnhubSocket } from "../hooks/useFinnhubSocket";

const Stocks = () => {
    const price = useFinnhubSocket("SPY");

    return(
        <div>
            <h2>Stocks</h2>
            <p>SPY (SPY) Price: {price ? `$${price.toFixed(2)}` : 'Loading...'}</p>
        </div>
    )
}

export default Stocks;