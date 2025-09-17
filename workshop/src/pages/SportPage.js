import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import ArticleCard from '../components/ArticleCard';
import FeaturedArticle from '../components/FeaturedArticle';

const SportPage = ({ userData, updateUserData, toggleLike }) => {
  const [activeTab, setActiveTab] = useState('football');

  const featuredArticle = {
    id: 'sport-featured-1',
    title: 'Stade Rennais : qualification historique en finale de Ligue des Champions',
    excerpt: 'Après une victoire éclatante 3-1 contre le Bayern Munich, le Stade Rennais se qualifie pour sa première finale de C1.',
    tags: ['Football', 'Stade Rennais', 'Ligue des Champions', 'Finale'],
    image: 'rennes-finale-c1',
    meta: {
      time: 'Il y a 20 minutes',
      author: 'Pierre-Yves Le Gall',
      comments: 567
    },
    badge: 'HISTORIQUE'
  };

  const articlesData = {
    'football': [
      {
        id: 'sport-1',
        title: 'FC Lorient : retour en Ligue 1 confirmé',
        excerpt: 'Les Merlus officialisent leur remontée en première division après une saison remarquable en Ligue 2.',
        tags: ['Football', 'FC Lorient', 'Ligue 1', 'Montée'],
        image: 'lorient-ligue1',
        meta: { time: 'Il y a 2 heures', comments: 234 },
        likes: 189,
        badge: '⚽ Montée'
      },
      {
        id: 'sport-2',
        title: 'Stade Brestois : nouveau centre d\'entraînement',
        excerpt: 'Le club finistérien inaugure ses nouvelles installations ultramodernes d\'une valeur de 15 millions d\'euros.',
        tags: ['Football', 'Stade Brestois', 'Centre d\'entraînement'],
        image: 'brest-centre',
        meta: { time: 'Il y a 4 heures', comments: 78 },
        likes: 123,
        badge: '🏟️ Infrastructures'
      }
    ],
    'autres': [
      {
        id: 'sport-3',
        title: 'Cyclisme : Tour de Bretagne, parcours dévoilé',
        excerpt: 'La 55e édition du Tour de Bretagne proposera 8 étapes du 1er au 8 mai, avec des arrivées inédites.',
        tags: ['Cyclisme', 'Tour de Bretagne', 'Course', 'Parcours'],
        image: 'tour-bretagne',
        meta: { time: 'Il y a 1 heure', comments: 156 },
        likes: 234,
        badge: '🚴 Cyclisme'
      },
      {
        id: 'sport-4',
        title: 'Voile : Route du Rhum, les favoris bretons',
        excerpt: 'Analyse des chances des 15 skippers bretons engagés dans la mythique transat en solitaire.',
        tags: ['Voile', 'Route du Rhum', 'Transat', 'Skippers bretons'],
        image: 'route-rhum',
        meta: { time: 'Il y a 3 heures', comments: 187 },
        likes: 298,
        badge: '⛵ Voile'
      }
    ],
    'amateur': [
      {
        id: 'sport-5',
        title: 'Rugby : finale de Fédérale 1 à Vannes',
        excerpt: 'Le RC Vannes dispute ce weekend la finale du championnat de France de Fédérale 1 au Stade de France.',
        tags: ['Rugby', 'RC Vannes', 'Fédérale 1', 'Finale'],
        image: 'vannes-rugby',
        meta: { time: 'Il y a 5 heures', comments: 89 },
        likes: 167
      },
      {
        id: 'sport-6',
        title: 'Handball : Cesson-Rennes champion de France',
        excerpt: 'L\'équipe bretonne remporte son premier titre de champion de France après une saison exceptionnelle.',
        tags: ['Handball', 'Cesson-Rennes', 'Champion', 'Titre'],
        image: 'cesson-champion',
        meta: { time: 'Il y a 6 heures', comments: 134 },
        likes: 245
      }
    ]
  };

  const featuredArticleForTab = {
    'autres': {
      id: 'sport-featured-2',
      title: 'JO 2028 : la Bretagne candidate pour accueillir la voile',
      excerpt: 'La région bretonne présente officiellement sa candidature pour organiser les épreuves de voile des Jeux Olympiques de Los Angeles.',
      tags: ['JO 2028', 'Voile', 'Candidature', 'Olympique'],
      image: 'jo-2028-voile',
      meta: {
        time: 'Il y a 1 heure',
        author: 'Loïc Prigent',
        comments: 267
      }
    },
    'amateur': {
      id: 'sport-featured-3',
      title: 'Sport amateur : la Bretagne, terre de champions',
      excerpt: 'Portrait d\'une région qui forme et révèle des talents dans toutes les disciplines grâce à ses clubs formateurs.',
      tags: ['Sport amateur', 'Formation', 'Clubs', 'Talents'],
      image: 'bretagne-champions',
      meta: {
        time: 'Il y a 2 heures',
        author: 'Gwenaelle Raoul',
        comments: 145
      }
    }
  };

  const tabs = [
    { key: 'football', label: '⚽ Football' },
    { key: 'autres', label: '🏆 Autres sports' },
    { key: 'amateur', label: '🎯 Sport amateur' }
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
          <h1>🏆 Sport</h1>
          <p>Toute l'actualité sportive bretonne : clubs professionnels, sport amateur et événements</p>
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

        <div className={`tab-content ${activeTab === 'football' ? 'active' : ''}`}>
          {activeTab === 'football' && (
            <>
              <FeaturedArticle 
                article={featuredArticle}
                onLike={handleLikeToggle}
                isLiked={userData.articleLikes.has(featuredArticle.id)}
              />
              <section className="articles-grid">
                {articlesData['football'].map((article) => (
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

        <div className={`tab-content ${activeTab === 'autres' ? 'active' : ''}`}>
          {activeTab === 'autres' && (
            <>
              <FeaturedArticle 
                article={featuredArticleForTab['autres']}
                onLike={handleLikeToggle}
                isLiked={userData.articleLikes.has(featuredArticleForTab['autres'].id)}
              />
              <section className="articles-grid">
                {articlesData['autres'].map((article) => (
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

        <div className={`tab-content ${activeTab === 'amateur' ? 'active' : ''}`}>
          {activeTab === 'amateur' && (
            <>
              <FeaturedArticle 
                article={featuredArticleForTab['amateur']}
                onLike={handleLikeToggle}
                isLiked={userData.articleLikes.has(featuredArticleForTab['amateur'].id)}
              />
              <section className="articles-grid">
                {articlesData['amateur'].map((article) => (
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

export default SportPage;