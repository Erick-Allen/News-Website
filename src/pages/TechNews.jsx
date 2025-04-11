import { useState, useEffect } from 'react';
import { fetchArticleByCategory } from '../services/articleService';
import { NewsCard } from '../components/NewsCard';

const TechNews = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const fetchTechArticles = async () => {
            const techArticles = await fetchArticleByCategory('technology');
            setArticles(techArticles);
        }
        fetchTechArticles();
    }, []);

    return(
        <div>
            <h2>Tech News</h2>
            {articles.map(article => (
                <NewsCard key={article.id} article={article}/>
            ))}
        </div>
    )
}

export default TechNews;