'use client';
'use client';
import { loadCachedArticles } from '../../lib/savedArticlesService';
import { useState, useEffect } from 'react';
import { NewsCard } from '../../components/NewsCard';

const BusinessNews = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const fetchBusinessArticles = async () => {
            const allArticles = await loadCachedArticles();
            const businessArticles = allArticles.filter(article => article.category === 'business');
            setArticles(businessArticles);
        };
        fetchBusinessArticles();
    }, []);

    return(
        <div>
            <h2>Business News</h2>
            {articles.map(article => (
                <NewsCard key={article.id} article={article}/>
            ))}
        </div>
    )
}

export default BusinessNews;