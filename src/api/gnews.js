const API_KEY = import.meta.env.VITE_GNEWS_API_KEY;
const BASE_URL = 'https://gnews.io/api/v4';

export const fetchTopNews = async (keyword = '') => {
    try {
        const url = keyword ? `${BASE_URL}/search?q=${keyword}&lang=en&apikey=${API_KEY}` : `${BASE_URL}/top-headlines?lang=en&country=us&max=1&apikey={API_KEY}`;
        const res = await fetch(url);
        const data = await res.json();
        return data.articles || []
    }   catch (err) {
        console.error("Error fetching Gnews:", err);
    }
}