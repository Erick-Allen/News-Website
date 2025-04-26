"use client";
import { useEffect, useState } from 'react';

const API_KEY = process.env.NEXT_PUBLIC_FINNHUB_API_KEY;
const FINNHUB_WS_URL = `wss://ws.finnhub.io?token=${API_KEY}`;
const SOCKET_DELAY_MS = 4000;

export const useFinnhubSocket = (symbolsInput) => {
    const symbols = Array.isArray(symbolsInput) ? symbolsInput : [];
    const [prices, setPrices] = useState({});

    useEffect(() => {
        if (symbols.length === 0) return;
        console.log("ran effect");

        const fetchInitialPrices = async () => {
            const updates = {};
            for (const symbol of symbols) {
                const res = await fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`);
                const data = await res.json();
                if (data && data.c) {
                    updates[symbol] = data.c;
                }
            }
            setPrices(prev => ({ ...prev, ...updates }));
        };

        fetchInitialPrices();

        let socket;
        let timeoutId;

            timeoutId = setTimeout(() => {
            socket = new WebSocket(FINNHUB_WS_URL);

            socket.addEventListener('open', () => {
                console.log("WebSocket connection opened");
                symbols.forEach(symbol => {
                    socket.send(JSON.stringify({ type: 'subscribe', symbol }));
                });
            });
    
            socket.addEventListener('message', (event) => {
                const message = JSON.parse(event.data);
                if (message.type === 'trade' && message.data.length > 0) {
                    console.log("WebSocket message received:", message);
                    const updates = {};
                    message.data.forEach(trade => {
                        updates[trade.s] = trade.p;
                    });
                    setPrices(prev => ({ ...prev, ...updates }));
                }
            });
    
            
                socket.addEventListener('error', (err) => {
                    console.error("WebSocket error:", err);
                });
    
                socket.addEventListener('close', () => {
                    console.log("WebSocket closed for", symbols);
                });
        }, SOCKET_DELAY_MS);
        

        

        return () => {
            clearTimeout(timeoutId);
            if (socket && socket.readyState === WebSocket.OPEN) {
                symbols.forEach(symbol => {
                    socket.send(JSON.stringify({ type: 'unsubscribe', symbol }));
                });
                socket.close();
            }
        };
    }, [symbols.join(',')]);

    return prices;
};

export const useMarketStatus = () => {
    const [marketStatus, setMarketStatus] = useState(null);

    useEffect(() => {
        const fetchMarketStatus = async () => {
            const res = await fetch(`https://finnhub.io/api/v1/stock/market-status?exchange=US&token=${API_KEY}`);
            const data = await res.json();
            if (data) {
                setMarketStatus(data.isOpen);
            }
        };

        fetchMarketStatus();
    }, []);

    return marketStatus;
}