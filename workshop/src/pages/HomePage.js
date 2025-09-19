import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import ArticleCard from '../components/ArticleCard';
import FeaturedArticle from '../components/FeaturedArticle';

const HomePage = ({ userData, updateUserData, toggleLike }) => {
  const [activeTab, setActiveTab] = useState('pour-vous');

  const featuredArticle = {
    id: 'featured-1',
    title: 'Le festival de Lorient bat tous les records de fréquentation',
    excerpt: 'Plus de 750 000 visiteurs ont participé au Festival Interceltique de Lorient cette année, établissant un nouveau record historique pour l\'événement breton.',
    tags: ['Culture', 'Bretagne', 'Festival', 'Lorient'],
    image: 'featured-festival',
    meta: {
      time: 'Il y a 2 heures',
      author: 'Marie Dupont',
      comments: 24
    },
    badge: 'Recommandé pour vous'
  };
  
  const articlesData = {
    'pour-vous': [
      {
        id: 'article-1',
        title: 'Les producteurs de cidre bretons s\'exportent en Asie',
        excerpt: 'Le cidre breton conquiert de nouveaux marchés internationaux, notamment au Japon et en Corée du Sud, portant l\'économie locale.',
        tags: ['Économie', 'Bretagne', 'Export', 'Cidre'],
        image: 'cidre-export',
        meta: { time: 'Il y a 6 heures', comments: 12 },
        likes: 23,
        badge: '🎯 Basé sur vos goûts'
      },
      {
        id: 'article-2',
        title: 'Nouveau musée d\'art contemporain à Nantes',
        excerpt: 'Un espace de 3000m² dédié à l\'art contemporain ouvrira ses portes au printemps 2026 dans le quartier de la Création.',
        tags: ['Culture', 'Art', 'Nantes', 'Musée'],
        image: 'musee-nantes',
        meta: { time: 'Il y a 1 jour', comments: 8 },
        likes: 15,
        badge: '📈 Tendance dans Culture'
      }
    ],
    'decouvrir': [
      {
        id: 'article-3',
        title: 'La startup brestoise révolutionne l\'éolien offshore',
        excerpt: 'Une jeune entreprise bretonne développe une technologie révolutionnaire pour optimiser le rendement des éoliennes en mer.',
        tags: ['Innovation', 'Énergie', 'Brest', 'Startup'],
        image: 'startup-brest',
        meta: { time: 'Il y a 4 heures', comments: 18 },
        likes: 42,
        badge: '🆕 Nouveau pour vous'
      },
      {
        id: 'article-4',
        title: 'Les secrets culinaires du chef étoilé vannetais',
        excerpt: 'Portrait d\'un chef qui revisite la cuisine traditionnelle bretonne avec une approche moderne et créative.',
        tags: ['Gastronomie', 'Chef', 'Vannes', 'Michelin'],
        image: 'chef-vannes',
        meta: { time: 'Il y a 2 heures', comments: 35 },
        likes: 67,
        badge: '🌟 Populaire aujourd\'hui'
      }
    ],
    'actualites': [
      {
        id: 'article-5',
        title: 'Tempête Céline : vigilance orange maintenue',
        excerpt: 'Météo-France maintient la vigilance orange pour les départements côtiers bretons avec des vents pouvant atteindre 120 km/h.',
        tags: ['Météo', 'Alerte', 'Bretagne'],
        image: 'tempete-celine',
        meta: { time: 'Il y a 1 heure', comments: 8 },
        likes: 12
      },
      {
        id: 'article-6',
        title: 'Rennes Métropole investit dans le vélo électrique',
        excerpt: 'Un nouveau réseau de bornes de recharge pour vélos électriques sera déployé dans toute la métropole rennaise d\'ici fin 2025.',
        tags: ['Transport', 'Vélo', 'Rennes', 'Écologie'],
        image: 'velo-rennes',
        meta: { time: 'Il y a 8 heures', comments: 15 },
        likes: 28
      }
    ]
  };

  const featuredArticleForTab = {
    'actualites': {
      id: 'featured-2',
      title: 'Nouvelle ligne TGV vers la Bretagne annoncée',
      excerpt: 'Le gouvernement dévoile son plan pour améliorer les liaisons ferroviaires entre Paris et la Bretagne avec une nouvelle ligne à grande vitesse.',
      tags: ['Transport', 'TGV', 'Infrastructure'],
      image: 'tgv-bretagne',
      meta: {
        time: 'Il y a 4 heures',
        author: 'Jean Martin',
        comments: 156
      }
    }
  };

  const tabs = [
    { key: 'pour-vous', label: '🎯 Pour vous' },
    { key: 'decouvrir', label: '🔍 Découvrir' },
    { key: 'actualites', label: '📰 Toutes les actualités' }
  ];

  const handleLikeToggle = (articleId, articleTags, currentLikes) => {
    const isLiked = userData.articleLikes.has(articleId);
    toggleLike(articleId, articleTags);
    
    // Afficher une notification
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

  const toggleDislike = (articleId) => {
    // Ici tu peux garder un Set pour les dislikes comme pour les likes
    const newDislikes = new Set(userData.articleDislikes || []);
    const isDisliked = newDislikes.has(articleId);

    if (isDisliked) {
      newDislikes.delete(articleId);
      updateUserData({
        articleDislikes: newDislikes,
        stats: { ...userData.stats, articlesShared: userData.stats.articlesShared - 1 } // exemple
      });
    } else {
      newDislikes.add(articleId);
      updateUserData({
        articleDislikes: newDislikes,
        stats: { ...userData.stats, articlesShared: userData.stats.articlesShared + 1 }
      });
    }
  };

  return (
    <div className="container">
      <main className="main-content">
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

        <div className={`tab-content ${activeTab === 'pour-vous' ? 'active' : ''}`}>
          {activeTab === 'pour-vous' && (
            <>
              <FeaturedArticle 
                article={featuredArticle}
                onLike={handleLikeToggle}
                isLiked={userData.articleLikes.has(featuredArticle.id)}
              />
              <section className="articles-grid">
                {articlesData['pour-vous'].map((article) => (
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

        <div className={`tab-content ${activeTab === 'decouvrir' ? 'active' : ''}`}>
          {activeTab === 'decouvrir' && (
            <section className="articles-grid">
              {articlesData['decouvrir'].map((article) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  onLike={handleLikeToggle}
                  isLiked={userData.articleLikes.has(article.id)}
                />
              ))}
            </section>
          )}
        </div>

        <div className={`tab-content ${activeTab === 'actualites' ? 'active' : ''}`}>
          {activeTab === 'actualites' && (
            <>
              <FeaturedArticle 
                article={featuredArticleForTab['actualites']}
                onLike={handleLikeToggle}
                isLiked={userData.articleLikes.has(featuredArticleForTab['actualites'].id)}
              />
              <section className="articles-grid">
                {articlesData['actualites'].map((article) => (
                  // <ArticleCard
                  //   key={article.id}
                  //   article={article}
                  //   onLike={handleLikeToggle}
                  //   isLiked={userData.articleLikes.has(article.id)}
                  // />
                  <ArticleCard
                    key={article.id}
                    article={article}
                    onLike={toggleLike}
                    onDislike={toggleDislike}
                    isLiked={userData.articleLikes.has(article.id)}
                    isDisliked={userData.articleDislikes?.has(article.id)}
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

export default HomePage;