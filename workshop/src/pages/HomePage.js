import React, { useState, useMemo } from 'react';
import Sidebar from '../components/Sidebar';
import ArticleCard from '../components/ArticleCard';
import FeaturedArticle from '../components/FeaturedArticle';

const HomePage = ({ userData, updateUserData, toggleLike }) => {
  const [activeTab, setActiveTab] = useState('pour-vous');
  const [interactionScores, setInteractionScores] = useState({});

  const featuredArticle = {
    id: 'featured-1',
    title: 'Le festival de Lorient bat tous les records de fréquentation',
    excerpt:
      "Plus de 750 000 visiteurs ont participé au Festival Interceltique de Lorient cette année, établissant un nouveau record historique pour l'événement breton.",
    tags: ['Culture', 'Bretagne', 'Festival', 'Lorient'],
    image: 'featured-festival',
    meta: {
      time: 'Il y a 2 heures',
      author: 'Marie Dupont',
      comments: 24,
    },
    badge: 'Recommandé pour vous',
  };
  
  const articlesData = {
    'pour-vous': [],
  
    decouvrir: [
      {
        id: 'article-3',
        title: "La startup brestoise révolutionne l'éolien offshore",
        excerpt:
          'Une jeune entreprise bretonne développe une technologie révolutionnaire pour optimiser le rendement des éoliennes en mer.',
        tags: ['Innovation', 'Énergie', 'Brest', 'Startup'],
        image: 'startup-brest',
        meta: { time: 'Il y a 4 heures', comments: 18 },
        likes: 42,
        badge: '🆕 Nouveau pour vous',
      },
      {
        id: 'article-4',
        title: 'Les secrets culinaires du chef étoilé vannetais',
        excerpt:
          'Portrait d’un chef qui revisite la cuisine traditionnelle bretonne avec une approche moderne et créative.',
        tags: ['Gastronomie', 'Chef', 'Vannes', 'Michelin'],
        image: 'chef-vannes',
        meta: { time: 'Il y a 2 heures', comments: 35 },
        likes: 67,
        badge: '🌟 Populaire aujourd’hui',
      },
      // --- Articles variés ---
      {
        id: 'article-14',
        title: 'Un festival de jazz attire des milliers de visiteurs à Saint-Malo',
        excerpt:
          'Le festival de jazz de Saint-Malo a accueilli un public record, confirmant l’essor des musiques actuelles en Bretagne.',
        tags: ['Culture', 'Musique', 'Saint-Malo', 'Festival'],
        image: 'jazz-saintmalo',
        meta: { time: 'Il y a 1 jour', comments: 16 },
        likes: 30,
        badge: '🎷 Musique',
      },
      {
        id: 'article-15',
        title: 'Une application rennaise simplifie la gestion des déchets',
        excerpt:
          'Une startup locale lance une application pour aider les habitants à mieux trier et recycler leurs déchets.',
        tags: ['Écologie', 'Startup', 'Rennes', 'Innovation'],
        image: 'appli-dechets',
        meta: { time: 'Il y a 3 jours', comments: 9 },
        likes: 22,
        badge: '♻️ Green Tech',
      },
      {
        id: 'article-16',
        title: 'Le basket breton gagne en popularité chez les jeunes',
        excerpt:
          'De plus en plus de clubs de basket émergent en Bretagne, attirant de nouveaux licenciés chaque année.',
        tags: ['Sport', 'Basket', 'Jeunesse', 'Bretagne'],
        image: 'basket-bretagne',
        meta: { time: 'Il y a 6 heures', comments: 21 },
        likes: 41,
        badge: '🏀 Sport Jeune',
      },
      {
        id: 'article-17',
        title: 'Les nouvelles routes maritimes bretonnes vers l’Irlande',
        excerpt:
          'Un plan d’expansion portuaire ouvre de nouvelles opportunités commerciales avec l’Irlande.',
        tags: ['Transport', 'Commerce', 'Mer', 'Export'],
        image: 'routes-maritime',
        meta: { time: 'Il y a 12 heures', comments: 6 },
        likes: 19,
        badge: '⚓ Maritime',
      },
      {
        id: 'article-18',
        title: 'Un centre spatial breton pour développer des nanosatellites',
        excerpt:
          'La Bretagne se positionne comme un acteur clé dans le domaine spatial grâce à un projet innovant.',
        tags: ['Espace', 'Technologie', 'Innovation', 'Bretagne'],
        image: 'nanosatellites-bretagne',
        meta: { time: 'Il y a 2 jours', comments: 13 },
        likes: 55,
        badge: '🚀 Spatial',
      },
      // --- Articles similaires (gastronomie) ---
      {
        id: 'article-19',
        title: 'Un jeune chef breton remporte un concours culinaire à Paris',
        excerpt:
          'Un cuisinier breton s’impose lors d’un concours prestigieux en mettant à l’honneur les produits locaux.',
        tags: ['Gastronomie', 'Concours', 'Chef', 'Bretagne'],
        image: 'chef-concours',
        meta: { time: 'Il y a 14 heures', comments: 17 },
        likes: 37,
        badge: '🥇 Gastronomie',
      },
      {
        id: 'article-20',
        title: 'Les crêperies bretonnes modernisent leurs cartes',
        excerpt:
          'Entre tradition et modernité, les crêperies de Bretagne innovent pour séduire une clientèle plus jeune.',
        tags: ['Gastronomie', 'Tradition', 'Crêpes', 'Bretagne'],
        image: 'creperie-bretagne',
        meta: { time: 'Il y a 9 heures', comments: 12 },
        likes: 29,
        badge: '🥞 Tradition revisitée',
      },
      {
        id: 'article-21',
        title: 'Un marché nocturne à Vannes met en avant les producteurs locaux',
        excerpt:
          'Un rendez-vous gourmand qui valorise le terroir breton et ses artisans.',
        tags: ['Gastronomie', 'Produits Locaux', 'Vannes', 'Bretagne'],
        image: 'marche-vannes',
        meta: { time: 'Il y a 1 jour', comments: 20 },
        likes: 46,
        badge: '🛍️ Produits locaux',
      },
      {
        id: 'article-22',
        title: 'Un documentaire met à l’honneur la cuisine bretonne traditionnelle',
        excerpt:
          'Un film qui retrace l’histoire et les saveurs uniques de la gastronomie bretonne.',
        tags: ['Culture', 'Gastronomie', 'Bretagne', 'Documentaire'],
        image: 'docu-cuisine',
        meta: { time: 'Il y a 2 jours', comments: 14 },
        likes: 33,
        badge: '🎥 Documentaire',
      },
      {
        id: 'article-23',
        title: 'Les algues bretonnes, nouvel ingrédient tendance en gastronomie',
        excerpt:
          'Riches en nutriments, les algues bretonnes séduisent les grands chefs et s’invitent dans la haute cuisine.',
        tags: ['Gastronomie', 'Innovation', 'Bretagne', 'Mer'],
        image: 'algues-gastronomie',
        meta: { time: 'Il y a 7 heures', comments: 25 },
        likes: 51,
        badge: '🌊 Superfood',
      },
    ],
  
    actualites: [
      {
        id: 'article-5',
        title: 'Tempête Céline : vigilance orange maintenue',
        excerpt:
          'Météo-France maintient la vigilance orange pour les départements côtiers bretons avec des vents pouvant atteindre 120 km/h.',
        tags: ['Météo', 'Alerte', 'Bretagne'],
        image: 'tempete-celine',
        meta: { time: 'Il y a 1 heure', comments: 8 },
        likes: 12,
      },
      {
        id: 'article-6',
        title: "Rennes Métropole investit dans le vélo électrique",
        excerpt:
          "Un nouveau réseau de bornes de recharge pour vélos électriques sera déployé dans toute la métropole rennaise d'ici fin 2025.",
        tags: ['Transport', 'Vélo', 'Rennes', 'Écologie'],
        image: 'velo-rennes',
        meta: { time: 'Il y a 8 heures', comments: 15 },
        likes: 28,
      },
      {
        id: 'article-11',
        title: 'La Bretagne exporte son savoir-faire en énergies marines',
        excerpt:
          "Des partenariats signés avec le Danemark et la Norvège pour partager l'expertise bretonne en hydrolien.",
        tags: ['Énergie', 'Mer', 'Export', 'Écologie'],
        image: 'hydrolien-bretagne',
        meta: { time: 'Il y a 10 heures', comments: 5 },
        likes: 21,
      },
      {
        id: 'article-12',
        title: 'Nouvelle startup de jeux vidéo à Saint-Brieuc',
        excerpt:
          'Une équipe de jeunes développeurs bretons lance un studio prometteur axé sur les jeux mobiles.',
        tags: ['Tech', 'Jeux Vidéo', 'Startup', 'Saint-Brieuc'],
        image: 'studio-jeux',
        meta: { time: 'Il y a 3 jours', comments: 14 },
        likes: 61,
      },
      {
        id: 'article-13',
        title: 'Un concours culinaire breton met à l’honneur les produits de la mer',
        excerpt:
          'Huîtres, coquilles Saint-Jacques et algues au centre de la scène culinaire régionale.',
        tags: ['Gastronomie', 'Concours', 'Bretagne'],
        image: 'concours-mer',
        meta: { time: 'Il y a 6 heures', comments: 27 },
        likes: 39,
      },
    ],
  };
  
  const featuredArticleForTab = {
    actualites: {
      id: 'featured-2',
      title: 'Nouvelle ligne TGV vers la Bretagne annoncée',
      excerpt:
        'Le gouvernement dévoile son plan pour améliorer les liaisons ferroviaires entre Paris et la Bretagne avec une nouvelle ligne à grande vitesse.',
      tags: ['Transport', 'TGV', 'Infrastructure'],
      image: 'tgv-bretagne',
      meta: {
        time: 'Il y a 4 heures',
        author: 'Jean Martin',
        comments: 156,
      },
    },
  };
  
  const tabs = [
    { key: 'pour-vous', label: '🎯 Pour vous' },
    { key: 'decouvrir', label: '🔍 Découvrir' },
    { key: 'actualites', label: '📰 Toutes les actualités' },
  ];

  // --- Gérer les interactions ---
  const handleInteraction = (article, type) => {
    const scoreToAdd = type === 'view' ? 1 : type === 'like' ? 2 : 0;

    setInteractionScores((prev) => {
      const newScores = { ...prev };
      newScores[article.id] = (newScores[article.id] || 0) + scoreToAdd;
      return newScores;
    });

    // si interaction = like -> toggle le like
    if (type === 'like') {
      const isLiked = userData.articleLikes.has(article.id);
      toggleLike(article.id, article.tags);
      showNotification(isLiked ? 'Article retiré de vos favoris' : 'Article ajouté à vos favoris');
    }
  };

  // --- Générer les recommandations ---
  const getRecommendations = () => {
    const tagScores = {};

    // calculer score par tag à partir des interactions
    Object.entries(interactionScores).forEach(([articleId, score]) => {
      const allArticles = [
        ...articlesData['decouvrir'],
        ...articlesData['actualites'],
      ];
      const article = allArticles.find((a) => a.id === articleId);
      if (article) {
        article.tags.forEach((tag) => {
          tagScores[tag] = (tagScores[tag] || 0) + score;
        });
      }
    });

    // scorer tous les articles candidats
    const allCandidates = [
      ...articlesData['decouvrir'],
      ...articlesData['actualites'],
    ];
    const scoredCandidates = allCandidates
      .filter((a) => !interactionScores[a.id]) // exclure ceux déjà vus/likés
      .map((a) => {
        const score = a.tags.reduce((acc, tag) => acc + (tagScores[tag] || 0), 0);
        return { ...a, recommendationScore: score };
      })
      .filter((a) => a.recommendationScore > 0) // garder que ceux pertinents
      .sort((a, b) => b.recommendationScore - a.recommendationScore)
      .slice(0, 5);

    return scoredCandidates;
  };

  const recommendations = useMemo(() => getRecommendations(), [interactionScores]);

  // --- Notifications ---
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

        {/* Onglet POUR VOUS */}
        <div className={`tab-content ${activeTab === 'pour-vous' ? 'active' : ''}`}>
          {activeTab === 'pour-vous' && (
            <section className="articles-grid">
              {recommendations.length === 0 ? (
                <p>Aucune recommandation pour l’instant. Interagissez avec des articles 🙂</p>
              ) : (
                recommendations.map((article) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    onLike={() => handleInteraction(article, 'like')}
                    isLiked={userData.articleLikes.has(article.id)}
                  />
                ))
              )}
            </section>
          )}
        </div>

        {/* Onglet DECOUVRIR */}
        <div className={`tab-content ${activeTab === 'decouvrir' ? 'active' : ''}`}>
          {activeTab === 'decouvrir' && (
            <section className="articles-grid">
              {articlesData['decouvrir'].map((article) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  onLike={() => handleInteraction(article, 'like')}
                  onView={() => handleInteraction(article, 'view')}
                  isLiked={userData.articleLikes.has(article.id)}
                />
              ))}
            </section>
          )}
        </div>

        {/* Onglet ACTUALITES */}
        <div className={`tab-content ${activeTab === 'actualites' ? 'active' : ''}`}>
          {activeTab === 'actualites' && (
            <>
              <FeaturedArticle 
                article={featuredArticleForTab['actualites']}
                onLike={() => handleInteraction(featuredArticleForTab['actualites'], 'like')}
                isLiked={userData.articleLikes.has(featuredArticleForTab['actualites'].id)}
              />
              <section className="articles-grid">
                {articlesData['actualites'].map((article) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    onLike={() => handleInteraction(article, 'like')}
                    onView={() => handleInteraction(article, 'view')}
                    isLiked={userData.articleLikes.has(article.id)}
                  />
                ))}
              </section>
            </>
          )}
        </div>

        {/* Debug panneau pour voir les scores */}
        <div className="debug-panel">
          <h4>🔍 Debug Scores</h4>
          <pre>{JSON.stringify(interactionScores, null, 2)}</pre>
        </div>
      </main>

      <Sidebar />
    </div>
  );
};

export default HomePage;
