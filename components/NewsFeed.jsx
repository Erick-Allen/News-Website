'use client';
import { useEffect, useState } from 'react';
import { NewsCard } from './NewsCard';
import '../styles/NewsFeed.css';
import { loadCachedArticles } from '../lib/savedArticlesService';

const NewsFeed = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadArticles = async () => {
            const data = await loadCachedArticles();
            setArticles(data);
            setLoading(false);
        };
        loadArticles();
    }, []);

    if (loading) return <p>Loading articles...</p>;

    return (
        <div className="news-feed">
            {articles.map((article) => (
                <NewsCard key={article.title} article={article} />
            ))}
        </div>
    );
};

export default NewsFeed;