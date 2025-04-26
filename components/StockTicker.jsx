const StockTicker = ({ symbol, price }) => {
    return (
        <p>
            {symbol}: {price ? `$${price.toFixed(2)}` : "Loading..."}
        </p>
    );
};

export default StockTicker;