'use client';
import { useState, useEffect } from 'react';
import { NewsCard } from '../../components/NewsCard';
import { loadCachedArticles } from '../../lib/savedArticlesService'; // make sure this is correctly imported

const TechNews = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const fetchTechArticles = async () => {
            const allArticles = await loadCachedArticles();
            const techArticles = allArticles.filter(article => article.category === 'technology');
            setArticles(techArticles);
        };
        fetchTechArticles();
    }, []);

    return (
        <div>
            <h2>Tech News</h2>
            {articles.map(article => (
                <NewsCard key={article.title} article={article} />
            ))}
        </div>
    );
};

export default TechNews;