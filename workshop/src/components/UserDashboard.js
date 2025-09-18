import React from 'react';

const UserDashboard = ({ isOpen, onClose, userData, updateUserData }) => {
  const categories = [
    { key: 'culture', icon: '🎭', label: 'Culture' },
    { key: 'economie', icon: '💼', label: 'Économie' },
    { key: 'sport', icon: '⚽', label: 'Sport' },
    { key: 'politique', icon: '🏛️', label: 'Politique' },
    { key: 'bretagne', icon: '🏴‍☠️', label: 'Bretagne' },
    { key: 'tech', icon: '💻', label: 'Tech' },
    { key: 'environnement', icon: '🌱', label: 'Environnement' },
    { key: 'gastronomie', icon: '🍽️', label: 'Gastronomie' }
  ];

  const toggleCategory = (categoryKey) => {
    const newCategories = userData.categories.includes(categoryKey)
      ? userData.categories.filter(cat => cat !== categoryKey)
      : [...userData.categories, categoryKey];
    
    updateUserData({ categories: newCategories });
  };

  const removeTag = (tagToRemove) => {
    const newTags = userData.likedTags.filter(tag => tag !== tagToRemove);
    updateUserData({ likedTags: newTags });
  };

  const handleClose = () => {
    onClose();
    document.body.style.overflow = 'auto';
  };

  // Empêcher la fermeture en cliquant sur le contenu du modal
  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  if (!isOpen) return null;

  // Bloquer le scroll du body quand le modal est ouvert
  if (isOpen) {
    document.body.style.overflow = 'hidden';
  }

  return (
    <div className={`modal-overlay ${isOpen ? 'active' : ''}`} onClick={handleClose}>
      <div className="user-dashboard" onClick={handleModalClick}>
        <div className="dashboard-header">
          <h2>📊 Mon Tableau de Bord</h2>
          <button className="close-modal" onClick={handleClose}>✕</button>
        </div>

        {/* Section Centres d'intérêt */}
        <div className="dashboard-section">
          <h3>🎯 Mes Centres d'Intérêt</h3>
          <p style={{ color: '#6b7280', marginBottom: '1rem' }}>
            Sélectionnez les catégories qui vous intéressent pour personnaliser votre fil d'actualités
          </p>
          <div className="categories-grid">
            {categories.map((category) => (
              <div
                key={category.key}
                className={`category-card ${userData.categories.includes(category.key) ? 'selected' : ''}`}
                onClick={() => toggleCategory(category.key)}
              >
                <span className="category-icon">{category.icon}</span>
                <strong>{category.label}</strong>
              </div>
            ))}
          </div>
        </div>

        {/* Section Tags préférés */}
        <div className="dashboard-section">
          <h3>❤️ Mes Tags Préférés</h3>
          <p style={{ color: '#6b7280', marginBottom: '1rem' }}>
            Ces tags sont basés sur les articles que vous avez aimés
          </p>
          <div className="liked-tags">
            {userData.likedTags.map((tag, index) => (
              <div key={index} className="liked-tag">
                #{tag}
                <button 
                  className="remove-tag" 
                  onClick={() => removeTag(tag)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Section Statistiques */}
        <div className="dashboard-section">
          <h3>📊 Vos Statistiques</h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
            gap: '1rem' 
          }}>
            <div style={{ 
              background: 'linear-gradient(135deg, #dbeafe, #bfdbfe)', 
              padding: '1rem', 
              borderRadius: '8px', 
              textAlign: 'center' 
            }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1e40af' }}>
                {userData.stats.articlesRead}
              </div>
              <div style={{ color: '#374151' }}>Articles lus</div>
            </div>
            <div style={{ 
              background: 'linear-gradient(135deg, #fecaca, #fca5a5)', 
              padding: '1rem', 
              borderRadius: '8px', 
              textAlign: 'center' 
            }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#dc2626' }}>
                {userData.stats.articlesLiked}
              </div>
              <div style={{ color: '#374151' }}>Articles aimés</div>
            </div>
            <div style={{ 
              background: 'linear-gradient(135deg, #d1fae5, #a7f3d0)', 
              padding: '1rem', 
              borderRadius: '8px', 
              textAlign: 'center' 
            }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#059669' }}>
                {userData.stats.articlesShared}
              </div>
              <div style={{ color: '#374151' }}>Articles partagés</div>
            </div>
            <div style={{ 
              background: 'linear-gradient(135deg, #fef3c7, #fde68a)', 
              padding: '1rem', 
              borderRadius: '8px', 
              textAlign: 'center' 
            }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#d97706' }}>
                {userData.stats.consecutiveDays}
              </div>
              <div style={{ color: '#374151' }}>Jours consécutifs</div>
            </div>
          </div>
        </div>

        {/* Section Recommandations */}
        <div className="dashboard-section">
          <h3>🎯 Recommandations Personnalisées</h3>
          <p style={{ color: '#6b7280' }}>
            Basées sur vos centres d'intérêt et vos likes précédents
          </p>
          <div style={{ 
            background: 'linear-gradient(135deg, #f0f9ff, #e0f2fe)', 
            padding: '1rem', 
            borderRadius: '8px', 
            marginTop: '1rem' 
          }}>
            <strong>Algorithme actuel :</strong><br />
            • 40% basé sur vos catégories préférées<br />
            • 35% basé sur vos tags likés<br />
            • 15% articles populaires dans vos domaines<br />
            • 10% découverte de nouveaux sujets
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;