import React from 'react';
import { useNavigate } from 'react-router-dom';

const ArticleCard = ({ article, onLike, onDislike, isLiked, isDisliked }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/article/${article.id}`);
  };

  const handleLike = (e) => {
    e.stopPropagation();
    onLike(article.id, article.tags); // ⚡ appelle la fonction parent
  };

  const handleDislike = (e) => {
    e.stopPropagation();
    onDislike(article.id); // ⚡ appelle la fonction parent
  };

  return (
    <article 
      className="article-card"
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
    >
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
          
          <div className="reaction-buttons">
            <button 
              className={`like-button ${isLiked ? 'liked' : ''}`}
              onClick={handleLike}
            >
              ❤️ <span className="like-count">{article.likes || 0}</span>
            </button>

            <button 
              className={`dislike-button ${isDisliked ? 'disliked' : ''}`}
              onClick={handleDislike}
            >
              👎 <span className="dislike-count">{article.dislikes || 0}</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;

/*
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ArticleCard = ({ article, onLike, isLiked }) => {

    const navigate = useNavigate(); // <-- hook ici, au début du composant

    const handleClick = () => {
      navigate(`/article/${article.id}`);
    };

  const handleLike = (e) => {
    e.stopPropagation(); // évite de déclencher le clic sur la carte
    onLike(article.id, article.tags, article.likes);
  };

  return (
    <article 
      className="article-card"
      onClick={handleClick} 
      style={{ cursor: 'pointer' }}
    >
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
*/