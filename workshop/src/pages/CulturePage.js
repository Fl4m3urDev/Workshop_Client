import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import ArticleCard from '../components/ArticleCard';
import FeaturedArticle from '../components/FeaturedArticle';

const CulturePage = ({ userData, updateUserData, toggleLike }) => {
  const [activeTab, setActiveTab] = useState('evenements');

  const featuredArticle = {
    id: 'culture-featured-1',
    title: 'La Folle Journée de Nantes révolutionne son format',
    excerpt: 'Le célèbre festival de musique classique innove avec des concerts immersifs et des performances en réalité virtuelle.',
    tags: ['Musique', 'Festival', 'Nantes', 'Innovation', 'Classique'],
    image: 'folle-journee-2025',
    meta: {
      time: 'Il y a 1 heure',
      author: 'Isabelle Morvan',
      comments: 156
    },
    badge: 'Festival 2025'
  };

  const articlesData = {
    evenements: [
      {
        id: 'culture-1',
        title: 'Festival de Cornouaille : programmation dévoilée',
        excerpt: 'Plus de 300 artistes internationaux se produiront à Quimper du 20 au 28 juillet pour célébrer les musiques du monde.',
        tags: ['Festival', 'Cornouaille', 'Quimper', 'Musique du monde'],
        image: 'cornouaille-2025',
        meta: { time: 'Il y a 3 heures', comments: 89 },
        likes: 134,
        badge: '🎵 Musique'
      },
      {
        id: 'culture-2',
        title: 'Biennale d\'art contemporain de Rennes',
        excerpt: 'Découvrez les œuvres de 50 artistes bretons et internationaux dans 15 lieux emblématiques de la capitale bretonne.',
        tags: ['Art contemporain', 'Biennale', 'Rennes', 'Exposition'],
        image: 'biennale-rennes',
        meta: { time: 'Il y a 5 heures', comments: 67 },
        likes: 98,
        badge: '🎨 Art'
      }
    ],
    patrimoine: [
      {
        id: 'culture-3',
        title: 'Restauration du château de Josselin achevée',
        excerpt: 'Après 5 ans de travaux, le joyau architectural médiéval retrouve sa splendeur d\'antan et rouvre au public.',
        tags: ['Patrimoine', 'Château', 'Josselin', 'Restauration'],
        image: 'chateau-josselin',
        meta: { time: 'Il y a 2 heures', comments: 78 },
        likes: 167,
        badge: '🏰 Patrimoine'
      },
      {
        id: 'culture-4',
        title: 'Les alignements de Carnac classés au patrimoine mondial',
        excerpt: 'L\'UNESCO reconnaît officiellement les mégalithes de Carnac comme site du patrimoine mondial de l\'humanité.',
        tags: ['UNESCO', 'Carnac', 'Mégalithes', 'Patrimoine mondial'],
        image: 'carnac-unesco',
        meta: { time: 'Il y a 4 heures', comments: 234 },
        likes: 312,
        badge: '🌍 UNESCO'
      }
    ],
    creation: [
      {
        id: 'culture-5',
        title: 'Bande dessinée : le boom des auteurs bretons',
        excerpt: 'De plus en plus d\'auteurs bretons s\'imposent sur la scène nationale de la BD, portés par des thématiques locales universelles.',
        tags: ['Bande dessinée', 'Auteurs bretons', 'Édition', 'Création'],
        image: 'bd-bretonne',
        meta: { time: 'Il y a 6 heures', comments: 45 },
        likes: 87
      },
      {
        id: 'culture-6',
        title: 'Cinéma breton : record de productions en 2025',
        excerpt: 'Jamais autant de films n\'ont été tournés en Bretagne, attirant réalisateurs et producteurs par ses paysages et ses aides.',
        tags: ['Cinéma', 'Production', 'Tournage', 'Subventions'],
        image: 'cinema-breton',
        meta: { time: 'Il y a 8 heures', comments: 56 },
        likes: 79
      }
    ]
  };

  const featuredArticleForTab = {
    patrimoine: {
      id: 'culture-featured-2',
      title: 'Mont-Saint-Michel : nouvelle muséographie révolutionnaire',
      excerpt: 'L\'abbaye millénaire se réinvente avec des technologies immersives pour faire revivre 1000 ans d\'histoire.',
      tags: ['Mont-Saint-Michel', 'Muséographie', 'Histoire', 'Technologie'],
      image: 'mtsm-musee',
      meta: {
        time: 'Il y a 2 heures',
        author: 'François Lemaître',
        comments: 198
      }
    },
    creation: {
      id: 'culture-featured-3',
      title: 'Prix littéraire de Bretagne : les finalistes révélés',
      excerpt: 'Découvrez les 5 romans finalistes du prestigieux prix littéraire breton qui célèbre la création contemporaine.',
      tags: ['Littérature', 'Prix littéraire', 'Romans', 'Finalistes'],
      image: 'prix-litteraire',
      meta: {
        time: 'Il y a 3 heures',
        author: 'Gwenaëlle Tanguy',
        comments: 112
      }
    }
  };

  const tabs = [
    { key: 'evenements', label: '🎭 Événements' },
    { key: 'patrimoine', label: '🏛️ Patrimoine' },
    { key: 'creation', label: '✨ Création' }
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
          <h1>🎭 Culture</h1>
          <p>Découvrez la richesse culturelle bretonne : festivals, patrimoine, création et traditions</p>
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

        {/* Événements */}
        <div className={`tab-content ${activeTab === 'evenements' ? 'active' : ''}`}>
          {activeTab === 'evenements' && (
            <>
              <FeaturedArticle 
                article={featuredArticle}
                onLike={handleLikeToggle}
                isLiked={userData.articleLikes.has(featuredArticle.id)}
              />
              <section className="articles-grid">
                {articlesData.evenements.map((article) => (
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

        {/* Patrimoine */}
        <div className={`tab-content ${activeTab === 'patrimoine' ? 'active' : ''}`}>
          {activeTab === 'patrimoine' && (
            <>
              <FeaturedArticle 
                article={featuredArticleForTab.patrimoine}
                onLike={handleLikeToggle}
                isLiked={userData.articleLikes.has(featuredArticleForTab.patrimoine.id)}
              />
              <section className="articles-grid">
                {articlesData.patrimoine.map((article) => (
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

        {/* Création */}
        <div className={`tab-content ${activeTab === 'creation' ? 'active' : ''}`}>
          {activeTab === 'creation' && (
            <>
              <FeaturedArticle 
                article={featuredArticleForTab.creation}
                onLike={handleLikeToggle}
                isLiked={userData.articleLikes.has(featuredArticleForTab.creation.id)}
              />
              <section className="articles-grid">
                {articlesData.creation.map((article) => (
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

export default CulturePage;