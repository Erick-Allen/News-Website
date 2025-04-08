import {useEffect, useState} from 'react';
import { loadCachedArticles } from '../services/savedArticlesService';

import { NewsCard } from './NewsCard';

const NewsFeed = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getArticles = async () => {
            const news = await loadCachedArticles();
            setArticles(news);
            setLoading(false);
        };

    getArticles();
    }, [])

    if (loading) return <p>Loading articles...</p>;

    return (
        <div className="news-feed">
            {articles.map((article) => (
                <NewsCard key={article.title} article={article}/>
            ))}
            <NewsCard key={article.title} article={article}/>
        </div>
    )
}