const API_KEY = import.meta.env.VITE_FINNHUB_API_KEY;
export const FINNHUB_WS_URL = `wss://ws.finnhub.io?token=${API_KEY}`;