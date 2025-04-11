import { useState, useEffect } from 'react';
import { fetchArticleByCategory } from '../services/articleService';
import { NewsCard } from '../components/NewsCard';

const BusinessNews = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const fetchBusinessArticles = async () => {
            const businessArticles = await fetchArticleByCategory('business');
            setArticles(businessArticles);
        }
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