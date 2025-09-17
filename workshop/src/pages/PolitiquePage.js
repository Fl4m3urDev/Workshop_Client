import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import ArticleCard from '../components/ArticleCard';
import FeaturedArticle from '../components/FeaturedArticle';

const PolitiquePage = ({ userData, updateUserData, toggleLike }) => {

  const [activeTab, setActiveTab] = useState('actualites');

  const featuredArticle = {
    id: 'politique-featured-1',
    title: 'Réforme des collectivités territoriales bretonnes',
    excerpt: 'Le gouvernement présente son projet de réorganisation des compétences entre communes, départements et région bretonne pour 2026.',
    tags: ['Politique', 'Bretagne', 'Réforme', 'Collectivités'],
    image: 'reforme-territoriale',
    meta: {
      time: 'Il y a 1 heure',
      author: 'Philippe Moreau',
      comments: 89
    },
    badge: 'Breaking News'
  };

  const articlesData = {
    'actualites': [
      {
        id: 'politique-1',
        title: 'Budget 2026 : la Région Bretagne privilégie l\'écologie',
        excerpt: 'Le conseil régional breton vote un budget record de 3,2 milliards d\'euros avec 40% des investissements dédiés à la transition écologique.',
        tags: ['Budget', 'Écologie', 'Conseil régional', 'Investissement'],
        image: 'budget-region',
        meta: { time: 'Il y a 3 heures', comments: 45 },
        likes: 67,
        badge: '🔥 Sujet chaud'
      },
      {
        id: 'politique-2',
        title: 'Élections municipales partielles à Quimper',
        excerpt: 'Trois candidats s\'affrontent pour remplacer l\'adjoint démissionnaire dans le secteur de l\'urbanisme et du développement durable.',
        tags: ['Élections', 'Quimper', 'Municipales', 'Urbanisme'],
        image: 'elections-quimper',
        meta: { time: 'Il y a 5 heures', comments: 23 },
        likes: 34,
        badge: '📊 Sondages exclusifs'
      }
    ],
    'debats': [
      {
        id: 'politique-3',
        title: 'Langue bretonne : vers une officialisation ?',
        excerpt: 'Le débat sur le statut officiel du breton divise les élus régionaux entre tradition culturelle et pragmatisme administratif.',
        tags: ['Langue bretonne', 'Culture', 'Débat', 'Identité'],
        image: 'langue-bretonne',
        meta: { time: 'Il y a 2 heures', comments: 156 },
        likes: 98,
        badge: '🗣️ Débat citoyen'
      },
      {
        id: 'politique-4',
        title: 'Transport public gratuit : l\'expérience rennaise',
        excerpt: 'Deux ans après la mise en place de la gratuité des transports, Rennes dresse un bilan contrasté de cette mesure sociale.',
        tags: ['Transport', 'Gratuité', 'Rennes', 'Social'],
        image: 'transport-gratuit',
        meta: { time: 'Il y a 4 heures', comments: 78 },
        likes: 112,
        badge: '📈 Analyse approfondie'
      }
    ],
    'elections': [
      {
        id: 'politique-5',
        title: 'Européennes 2029 : premiers candidats bretons',
        excerpt: 'Plusieurs personnalités politiques bretonnes annoncent leurs intentions pour les prochaines élections européennes.',
        tags: ['Européennes', 'Candidatures', 'Europe', 'Bretagne'],
        image: 'europeennes-2029',
        meta: { time: 'Il y a 6 heures', comments: 67 },
        likes: 43
      },
      {
        id: 'politique-6',
        title: 'Sénatoriales : renouvellement partiel prévu',
        excerpt: 'Trois sièges de sénateurs bretons seront renouvelés lors des prochaines élections sénatoriales de septembre 2026.',
        tags: ['Sénatoriales', 'Sénat', 'Élections', 'Renouvellement'],
        image: 'senatoriales',
        meta: { time: 'Il y a 8 heures', comments: 29 },
        likes: 18
      }
    ]
  };

  const featuredArticleForTab = {
    'debats': {
      id: 'politique-featured-2',
      title: 'Grand débat sur l\'avenir énergétique de la Bretagne',
      excerpt: 'Éolien offshore, nucléaire, énergies renouvelables : les élus bretons organisent une consultation citoyenne majeure.',
      tags: ['Énergie', 'Débat', 'Consultation', 'Avenir'],
      image: 'debat-energie',
      meta: {
        time: 'Il y a 2 heures',
        author: 'Claire Roussel',
        comments: 234
      }
    },
    'elections': {
      id: 'politique-featured-3',
      title: 'Analyse : la recomposition politique bretonne',
      excerpt: 'Comment les récents changements d\'alliance redessinent le paysage politique local en vue des prochaines échéances.',
      tags: ['Analyse', 'Alliances', 'Recomposition', 'Stratégie'],
      image: 'recomposition-politique',
      meta: {
        time: 'Il y a 1 heure',
        author: 'Marc Lestrange',
        comments: 145
      }
    }
  };

  const tabs = [
    { key: 'actualites', label: '🗞️ Actualités' },
    { key: 'debats', label: '🗣️ Débats' },
    { key: 'elections', label: '🗳️ Élections' }
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
          <h1>🏛️ Politique</h1>
          <p>Suivez l'actualité politique bretonne et les débats qui façonnent l'avenir de la région</p>
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

        <div className={`tab-content ${activeTab === 'debats' ? 'active' : ''}`}>
          {activeTab === 'debats' && (
            <>
              <FeaturedArticle 
                article={featuredArticleForTab['debats']}
                onLike={handleLikeToggle}
                isLiked={userData.articleLikes.has(featuredArticleForTab['debats'].id)}
              />
              <section className="articles-grid">
                {articlesData['debats'].map((article) => (
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

        <div className={`tab-content ${activeTab === 'elections' ? 'active' : ''}`}>
          {activeTab === 'elections' && (
            <>
              <FeaturedArticle 
                article={featuredArticleForTab['elections']}
                onLike={handleLikeToggle}
                isLiked={userData.articleLikes.has(featuredArticleForTab['elections'].id)}
              />
              <section className="articles-grid">
                {articlesData['elections'].map((article) => (
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

export default PolitiquePage;