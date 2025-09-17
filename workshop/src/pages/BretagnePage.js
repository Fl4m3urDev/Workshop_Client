import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import ArticleCard from '../components/ArticleCard';
import FeaturedArticle from '../components/FeaturedArticle';

const BretagnePage = ({ userData, updateUserData, toggleLike }) => {
  const [activeTab, setActiveTab] = useState('actualites');

  const featuredArticle = {
    id: 'bretagne-featured-1',
    title: 'Plan Bretagne 2030 : 5 milliards d\'euros d\'investissement',
    excerpt: 'La région dévoile son plan stratégique pour les 5 prochaines années avec des investissements massifs dans la transition écologique et le numérique.',
    tags: ['Plan 2030', 'Investissement', 'Transition écologique', 'Numérique'],
    image: 'plan-bretagne-2030',
    meta: {
      time: 'Il y a 1 heure',
      author: 'Anne-Marie Kergoat',
      comments: 234
    },
    badge: 'Plan stratégique'
  };

  const articlesData = {
    'actualites': [
      {
        id: 'bretagne-1',
        title: 'Démographie : la Bretagne gagne 50 000 habitants',
        excerpt: 'L\'INSEE confirme l\'attractivité bretonne avec une croissance démographique de 1,2% en 2025, la plus forte de France.',
        tags: ['Démographie', 'INSEE', 'Croissance', 'Attractivité'],
        image: 'demo-bretagne',
        meta: { time: 'Il y a 3 heures', comments: 167 },
        likes: 198,
        badge: '📈 Croissance'
      },
      {
        id: 'bretagne-2',
        title: 'Liaison maritime Bretagne-Irlande renforcée',
        excerpt: 'Brittany Ferries annonce une nouvelle ligne directe entre Saint-Malo et Cork pour développer les échanges.',
        tags: ['Transport maritime', 'Brittany Ferries', 'Irlande', 'Saint-Malo'],
        image: 'ferry-irlande',
        meta: { time: 'Il y a 5 heures', comments: 89 },
        likes: 134,
        badge: '⛴️ Maritime'
      }
    ],
    'territoires': [
      {
        id: 'bretagne-3',
        title: 'Finistère : nouveau parc naturel marin créé',
        excerpt: 'Un espace protégé de 120 000 hectares voit le jour au large de Brest pour préserver la biodiversité marine.',
        tags: ['Finistère', 'Parc naturel', 'Biodiversité', 'Protection'],
        image: 'parc-marin-finistere',
        meta: { time: 'Il y a 2 heures', comments: 234 },
        likes: 287,
        badge: '🌊 Environnement'
      },
      {
        id: 'bretagne-4',
        title: 'Côtes-d\'Armor : fibre optique pour tous',
        excerpt: 'Le département achève son déploiement de la fibre avec 100% des communes désormais connectées au très haut débit.',
        tags: ['Côtes-d\'Armor', 'Fibre optique', 'Numérique', 'Connexion'],
        image: 'fibre-22',
        meta: { time: 'Il y a 4 heures', comments: 78 },
        likes: 156,
        badge: '📡 Numérique'
      }
    ],
    'traditions': [
      {
        id: 'bretagne-5',
        title: 'Fest-noz : reconnaissance internationale renouvelée',
        excerpt: 'L\'UNESCO réaffirme l\'importance du fest-noz breton comme patrimoine immatériel de l\'humanité.',
        tags: ['Fest-noz', 'UNESCO', 'Tradition', 'Patrimoine'],
        image: 'fest-noz-unesco',
        meta: { time: 'Il y a 6 heures', comments: 145 },
        likes: 298
      },
      {
        id: 'bretagne-6',
        title: 'Écoles Diwan : ouverture de 5 nouvelles classes',
        excerpt: 'L\'enseignement en breton se développe avec l\'ouverture de nouvelles classes dans le Morbihan et en Loire-Atlantique.',
        tags: ['Diwan', 'Langue bretonne', 'Enseignement', 'Écoles'],
        image: 'ecoles-diwan',
        meta: { time: 'Il y a 8 heures', comments: 167 },
        likes: 234
      }
    ]
  };

  const featuredArticleForTab = {
    'territoires': {
      id: 'bretagne-featured-2',
      title: 'Métropole bretonne : vers une gouvernance unifiée',
      excerpt: 'Les cinq départements bretons étudient la création d\'une métropole unique pour peser davantage au niveau national et européen.',
      tags: ['Métropole', 'Gouvernance', 'Départements', 'Unification'],
      image: 'metropole-bretagne',
      meta: {
        time: 'Il y a 2 heures',
        author: 'Yann Prigent',
        comments: 198
      }
    },
    'traditions': {
      id: 'bretagne-featured-3',
      title: 'Renaissance des traditions bretonnes chez les jeunes',
      excerpt: 'Enquête sur le regain d\'intérêt des 18-30 ans pour la culture, la langue et les traditions bretonnes.',
      tags: ['Jeunesse', 'Traditions', 'Culture bretonne', 'Renaissance'],
      image: 'jeunes-traditions',
      meta: {
        time: 'Il y a 3 heures',
        author: 'Maëva Kervella',
        comments: 267
      }
    }
  };

  const tabs = [
    { key: 'actualites', label: '📰 Actualités' },
    { key: 'territoires', label: '🗺️ Territoires' },
    { key: 'traditions', label: '🎭 Traditions' }
  ];

  const handleLikeToggle = (articleId, articleTags, currentLikes) => {
    const isLiked = userData.articleLikes.has(articleId);
    toggleLike(articleId, articleTags);
    
    showNotification(isLiked ? 'Article retiré de vos favoris' : 'Article ajouté à vos favoris');
  };

  const showNotification = (message) => {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.style.animation = 'slideOut 0.3s ease-in';
      setTimeout(() => toast.remove(), 300);
    }, 2000);
  };

  return (
    <div className="container">
      <main className="main-content">
        <div className="page-header">
          <h1>🏴󠁧󠁢󠁳󠁣󠁴󠁿 Bretagne</h1>
          <p>L'actualité de nos territoires, de nos traditions et de notre identité bretonne</p>
        </div>

        <div className="recommendation-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={`tab-button ${activeTab === tab.key ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className={`tab-content ${activeTab === 'actualites' ? 'active' : ''}`}>
          {activeTab === 'actualites' && (
            <>
              <FeaturedArticle 
                article={featuredArticle}
                onLike={handleLikeToggle}
                isLiked={userData.articleLikes.has(featuredArticle.id)}
              />
              <section className="articles-grid">
                {articlesData['actualites'].map((article) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    onLike={handleLikeToggle}
                    isLiked={userData.articleLikes.has(article.id)}
                  />
                ))}
              </section>
            </>
          )}
        </div>

        <div className={`tab-content ${activeTab === 'territoires' ? 'active' : ''}`}>
          {activeTab === 'territoires' && (
            <>
              <FeaturedArticle 
                article={featuredArticleForTab['territoires']}
                onLike={handleLikeToggle}
                isLiked={userData.articleLikes.has(featuredArticleForTab['territoires'].id)}
              />
              <section className="articles-grid">
                {articlesData['territoires'].map((article) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    onLike={handleLikeToggle}
                    isLiked={userData.articleLikes.has(article.id)}
                  />
                ))}
              </section>
            </>
          )}
        </div>

        <div className={`tab-content ${activeTab === 'traditions' ? 'active' : ''}`}>
          {activeTab === 'traditions' && (
            <>
              <FeaturedArticle 
                article={featuredArticleForTab['traditions']}
                onLike={handleLikeToggle}
                isLiked={userData.articleLikes.has(featuredArticleForTab['traditions'].id)}
              />
              <section className="articles-grid">
                {articlesData['traditions'].map((article) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    onLike={handleLikeToggle}
                    isLiked={userData.articleLikes.has(article.id)}
                  />
                ))}
              </section>
            </>
          )}
        </div>
      </main>

      <Sidebar />
    </div>
  );
};

export default BretagnePage;