import { useEffect, useState } from 'react';
import { FINNHUB_WS_URL } from '../api/finnhub';

export const useFinnhubSocket = (symbol) => {
    const [price, setPrice] = useState(null);

    useEffect(() => {
        const socket = new WebSocket(FINNHUB_WS_URL);

        socket.addEventListener('open', (event) => {
            socket.send(JSON.stringify({ type: 'subscribe', symbol}));
        });

        socket.addEventListener('message', (event) => {
            const message = JSON.parse(event.data);
            if (message.type === 'trade' && message.data.length > 0) {
                const trade = message.data[0];
                setPrice(trade.p);
            }
        });

        return () => {
            socket.send(JSON.stringify({type: 'unsubscribe', symbol }));
            socket.close();
        };
    }, [symbol])

    return price;
};