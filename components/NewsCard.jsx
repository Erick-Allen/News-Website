import '../styles/NewsCard.css';

export const NewsCard = ({ article }) => {
  const { title, description, url, image, publishedAt, category } = article;

  return (
    <div className="news-card">
      <h3 className="news-title">{title}</h3>
      {image && <img className='news-image' src={image} alt={title} />}
      {image && <p className="news-category">{category}</p>}
      <p className="news-description">{description}</p>
      <p className="news-published-date">{publishedAt}</p>
      <a href={url} target="_blank" rel="noopener noreferrer">Read More</a>
    </div>
  );
};