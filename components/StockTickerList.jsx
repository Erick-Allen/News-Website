import StockTicker from "./StockTicker";
import { useFinnhubSocket } from "../hooks/useFinnhubSocket";

const StockTickerList = ({ symbols }) => {
    const prices = useFinnhubSocket(symbols);

    return (
        <>
            {symbols.map((symbol) => (
                <StockTicker key={symbol} symbol={symbol} price={prices[symbol]} />
            ))}
        </>
    );
};

export default StockTickerList;