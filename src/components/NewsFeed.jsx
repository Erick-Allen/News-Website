import { useEffect, useState } from 'react';
import { loadCachedArticles } from '../services/savedArticlesService';

import { NewsCard } from './NewsCard';

const NewsFeed = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticles = async () => {
            const news = await loadCachedArticles();
            setArticles(news);
            setLoading(false);
        };

    fetchArticles();
    }, [])

    if (loading) return <p>Loading articles...</p>;

    return (
        <div className="news-feed">
            {articles.map((article) => (
                <NewsCard key={article.title} article={article}/>
            ))}
        </div>
    )
}

export default NewsFeed;