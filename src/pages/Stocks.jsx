import StockTickerList from "../components/StockTickerList";
import {useMarketStatus } from "../hooks/useFinnhubSocket";

const Stocks = () => {
    const marketStatus = useMarketStatus();
    const symbolsList = ["SPY", "AAPL", "MSFT"];

    return(
        <div>
            <h2>Stocks</h2>
            <h3>Market Status {marketStatus ? "Open" : "Closed"}</h3>
            <StockTickerList symbols={symbolsList} />
        </div>
    )
}

export default Stocks;