import React, { useState } from 'react';

const Header = ({ currentPage, setCurrentPage, setIsDashboardOpen }) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navigationItems = [
    { key: 'accueil', label: 'Accueil' },
    { key: 'politique', label: 'Politique' },
    { key: 'economie', label: 'Économie' },
    { key: 'culture', label: 'Culture' },
    { key: 'sport', label: 'Sport' },
    { key: 'bretagne', label: 'Bretagne' }
  ];

  const handleNavigation = (pageKey) => {
    setCurrentPage(pageKey);
    setIsUserMenuOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Recherche:', searchQuery);
      // Ici vous pourriez implémenter la logique de recherche
    }
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const openDashboard = () => {
    setIsDashboardOpen(true);
    setIsUserMenuOpen(false);
  };

  // Fermer le menu si on clique ailleurs
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.user-profile')) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <header className="header">
      <div className="header-top">
        <div 
          className="logo" 
          onClick={() => handleNavigation('accueil')}
        >
          Bretagne Actualités
        </div>
        <div className="weather-date">
          <div>🌤️ Rennes 18°C</div>
          <div>📅 Mercredi 17 septembre 2025</div>
        </div>
      </div>
      
      <nav className="nav-main">
        <div className="nav-container">
          <ul className="nav-menu">
            {navigationItems.map((item) => (
              <li key={item.key}>
                <a 
                  onClick={() => handleNavigation(item.key)}
                  className={currentPage === item.key ? 'active' : ''}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          
          <form className="search-container" onSubmit={handleSearch}>
            <input 
              type="text" 
              className="search-input" 
              placeholder="Rechercher..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="search-btn">🔍</button>
          </form>
          
          <div className="user-profile">
            <div className="user-dropdown">
              <div className="user-avatar" onClick={toggleUserMenu}>
                MJ
              </div>
              <div className={`user-menu ${isUserMenuOpen ? 'active' : ''}`}>
                <a onClick={openDashboard}>📊 Mon tableau de bord</a>
                <a onClick={() => console.log('Articles sauvés')}>📰 Mes articles sauvés</a>
                <a onClick={() => console.log('Paramètres')}>⚙️ Paramètres</a>
                <a onClick={() => console.log('Déconnexion')}>🚪 Déconnexion</a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;