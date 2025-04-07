import { useEffect, useState } from 'react';
import { fetchTopNews } from '../api/gnews';

function Home () {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getNews = async () => {
            const data = await fetchTopNews();
            setArticles(data);
            setLoading(false);
        }

        getNews();
    
    }, [])

    return (
        <div>
            <h2>
                Top News
            </h2>

            {loading ? (
                <p>Loading...</p>
            ) : (
                articles.map((article, idx) => (
                <div key={idx}>
                    <h3>{article.title}</h3>
                    <p>{article.description}</p>
                    <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
                </div>
                )) 
            )}
        </div>
    )
}

export default Home