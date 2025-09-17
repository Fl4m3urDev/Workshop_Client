import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import ArticleCard from '../components/ArticleCard';
import FeaturedArticle from '../components/FeaturedArticle';

const EconomiePage = ({ userData, updateUserData, toggleLike }) => {
  const [activeTab, setActiveTab] = useState('entreprises');

  const featuredArticle = {
    id: 'economie-featured-1',
    title: 'La filière agroalimentaire bretonne dépasse les 20 milliards d\'euros',
    excerpt: 'L\'industrie agroalimentaire confirme sa position de leader économique régional avec une croissance de 8% en 2025.',
    tags: ['Agroalimentaire', 'Croissance', 'Industrie', 'Record'],
    image: 'agroalimentaire-record',
    meta: {
      time: 'Il y a 30 minutes',
      author: 'Sylvie Durand',
      comments: 67
    },
    badge: 'Exclusif'
  };

  const articlesData = {
    'entreprises': [
      {
        id: 'economie-1',
        title: 'Thales ouvre un nouveau centre R&D à Brest',
        excerpt: 'Le groupe de défense investit 50 millions d\'euros dans un centre dédié aux technologies navales et sous-marines.',
        tags: ['Thales', 'R&D', 'Brest', 'Défense', 'Naval'],
        image: 'thales-brest',
        meta: { time: 'Il y a 2 heures', comments: 34 },
        likes: 89,
        badge: '💼 Emploi'
      },
      {
        id: 'economie-2',
        title: 'Succès de la licorne bretonne TechOcean',
        excerpt: 'La startup spécialisée dans l\'océanographie lève 200 millions d\'euros et devient la première licorne bretonne.',
        tags: ['Startup', 'Licorne', 'Océanographie', 'Levée de fonds'],
        image: 'techocean-licorne',
        meta: { time: 'Il y a 4 heures', comments: 78 },
        likes: 156,
        badge: '🦄 Licorne'
      }
    ],
    'agriculture': [
      {
        id: 'economie-3',
        title: 'Agriculture bio : la Bretagne leader français',
        excerpt: 'Avec 15% de sa surface agricole en bio, la Bretagne devient la première région française en agriculture biologique.',
        tags: ['Agriculture', 'Bio', 'Environnement', 'Leader'],
        image: 'agriculture-bio',
        meta: { time: 'Il y a 1 heure', comments: 92 },
        likes: 134,
        badge: '🌱 Durable'
      },
      {
        id: 'economie-4',
        title: 'Prix du porc : stabilisation après la crise',
        excerpt: 'Après des mois de volatilité, les cours du porc se stabilisent grâce aux nouveaux débouchés asiatiques.',
        tags: ['Élevage', 'Porc', 'Prix', 'Export', 'Asie'],
        image: 'prix-porc',
        meta: { time: 'Il y a 3 heures', comments: 56 },
        likes: 67,
        badge: '📈 Marchés'
      }
    ],
    'innovation': [
      {
        id: 'economie-5',
        title: 'Hydrogène vert : la Bretagne accélère',
        excerpt: 'Un plan de 500 millions d\'euros pour développer la filière hydrogène vert d\'ici 2030.',
        tags: ['Hydrogène', 'Énergie', 'Innovation', 'Investissement'],
        image: 'hydrogene-vert',
        meta: { time: 'Il y a 5 heures', comments: 43 },
        likes: 98
      },
      {
        id: 'economie-6',
        title: 'IA : nouveau hub technologique à Rennes',
        excerpt: 'Rennes se dote d\'un centre d\'excellence en intelligence artificielle avec le soutien de grandes entreprises tech.',
        tags: ['IA', 'Intelligence artificielle', 'Rennes', 'Tech'],
        image: 'hub-ia-rennes',
        meta: { time: 'Il y a 7 heures', comments: 67 },
        likes: 123
      }
    ]
  };

  const featuredArticleForTab = {
    'agriculture': {
      id: 'economie-featured-2',
      title: 'Plan de relance agricole : 800 millions pour la Bretagne',
      excerpt: 'L\'État débloque une enveloppe exceptionnelle pour moderniser l\'agriculture bretonne et accompagner la transition écologique.',
      tags: ['Agriculture', 'Plan de relance', 'Modernisation', 'Transition'],
      image: 'plan-relance-agricole',
      meta: {
        time: 'Il y a 1 heure',
        author: 'Marie-Christine Le Goff',
        comments: 178
      }
    },
    'innovation': {
      id: 'economie-featured-3',
      title: 'Bretagne Tech 2030 : l\'ambition numérique régionale',
      excerpt: 'Présentation de la stratégie bretonne pour devenir un hub technologique européen de référence d\'ici 2030.',
      tags: ['Tech', 'Numérique', 'Stratégie', 'Europe'],
      image: 'bretagne-tech-2030',
      meta: {
        time: 'Il y a 45 minutes',
        author: 'Thomas Kermarec',
        comments: 134
      }
    }
  };

  const tabs = [
    { key: 'entreprises', label: '🏢 Entreprises' },
    { key: 'agriculture', label: '🚜 Agriculture' },
    { key: 'innovation', label: '🔬 Innovation' }
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
          <h1>💼 Économie</h1>
          <p>L'actualité économique bretonne : entreprises, agriculture, innovation et marchés</p>
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

        <div className={`tab-content ${activeTab === 'entreprises' ? 'active' : ''}`}>
          {activeTab === 'entreprises' && (
            <>
              <FeaturedArticle 
                article={featuredArticle}
                onLike={handleLikeToggle}
                isLiked={userData.articleLikes.has(featuredArticle.id)}
              />
              <section className="articles-grid">
                {articlesData['entreprises'].map((article) => (
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

        <div className={`tab-content ${activeTab === 'agriculture' ? 'active' : ''}`}>
          {activeTab === 'agriculture' && (
            <>
              <FeaturedArticle 
                article={featuredArticleForTab['agriculture']}
                onLike={handleLikeToggle}
                isLiked={userData.articleLikes.has(featuredArticleForTab['agriculture'].id)}
              />
              <section className="articles-grid">
                {articlesData['agriculture'].map((article) => (
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

        <div className={`tab-content ${activeTab === 'innovation' ? 'active' : ''}`}>
          {activeTab === 'innovation' && (
            <>
              <FeaturedArticle 
                article={featuredArticleForTab['innovation']}
                onLike={handleLikeToggle}
                isLiked={userData.articleLikes.has(featuredArticleForTab['innovation'].id)}
              />
              <section className="articles-grid">
                {articlesData['innovation'].map((article) => (
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

export default EconomiePage;