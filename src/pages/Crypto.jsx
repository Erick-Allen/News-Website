import { useFinnhubSocket } from "../hooks/useFinnhubSocket";

const Crypto = () => {
    const price = useFinnhubSocket("BINANCE:BTCUSDT");

    return(
        <div>
            <h2>Crypto</h2>
            <p>Bitcoin (BTC) Price: {price ? `$${price.toFixed(2)}` : 'Loading...'}</p>
        </div>
    )
}

export default Crypto;