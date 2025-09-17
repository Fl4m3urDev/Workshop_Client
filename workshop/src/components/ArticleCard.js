import React from 'react';

const ArticleCard = ({ article, onLike, isLiked }) => {
  const handleLike = () => {
    onLike(article.id, article.tags, article.likes);
  };

  return (
    <article className="article-card">
      {article.badge && (
        <div className="recommendation-badge">{article.badge}</div>
      )}
      
      <div className="article-image">📸 Image</div>
      
      <div className="article-content">
        <h2 className="article-title">{article.title}</h2>
        
        <div className="article-tags">
          {article.tags.map((tag, index) => (
            <span key={index} className="tag">#{tag}</span>
          ))}
        </div>
        
        <p className="article-excerpt">{article.excerpt}</p>
        
        <div className="article-actions">
          <div className="article-meta">
            <span>📅 {article.meta.time}</span>
            <span>💬 {article.meta.comments} commentaires</span>
          </div>
          <button 
            className={`like-button ${isLiked ? 'liked' : ''}`}
            onClick={handleLike}
          >
            ❤️ <span className="like-count">{article.likes || 0}</span>
          </button>
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;