import React from 'react';

const FeaturedArticle = ({ article, onLike, isLiked, openArticle }) => {
  const handleLike = (e) => {
    e.stopPropagation(); // évite de déclencher le clic sur la carte
    onLike(article.id, article.tags, 0);
  };

  return (
    <article className="featured-article" onClick={() => openArticle(article)} style={{ cursor: 'pointer' }}>
      <div className="featured-image">
        {article.badge && (
          <div className="recommendation-badge">{article.badge}</div>
        )}
        📸 Image à la une
        <div className="featured-content">
          <h1 className="featured-title">{article.title}</h1>
          <div className="article-tags">
            {article.tags.map((tag, index) => (
              <span key={index} className="tag">#{tag}</span>
            ))}
          </div>
          <p className="featured-excerpt">{article.excerpt}</p>
          <div className="meta-info">
            <span>📅 {article.meta.time}</span>
            <span>👤 {article.meta.author}</span>
            <span>💬 {article.meta.comments} commentaires</span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default FeaturedArticle;