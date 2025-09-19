import React from 'react';
import { useParams } from 'react-router-dom';

const ArticlePage = ( articles ) => {
  const { id } = useParams();

  // Cherche l’article par son id dans les données
  const article = Object.values(articles).flat().find(a => a.id === id);
  

  if (!article) {
    return <p>Article introuvable ❌</p>;
  }

  return (
    <div className="article-page">
      <h1>{article.title}</h1>
      <p>{article.excerpt}</p>
      <div className="article-tags">
        {article.tags.map((tag, index) => (
          <span key={index} className="tag">#{tag}</span>
        ))}
      </div>
      <p><strong>Publié :</strong> {article.meta.time}</p>
      <p><strong>Commentaires :</strong> {article.meta.comments}</p>
    </div>
  );
};

export default ArticlePage;
