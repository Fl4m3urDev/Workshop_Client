import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = ({ user, setUser }) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    { key: 'accueil', label: 'Accueil', path: '/' },
    { key: 'politique', label: 'Politique', path: '/politique' },
    { key: 'economie', label: 'Économie', path: '/economie' },
    { key: 'culture', label: 'Culture', path: '/culture' },
    { key: 'sport', label: 'Sport', path: '/sport' },
    { key: 'bretagne', label: 'Bretagne', path: '/bretagne' }
  ];

  const handleNavigation = (path) => {
    navigate(path);
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

  const handleLogout = () => {
    setUser(null);
    setIsUserMenuOpen(false);
    navigate('/');
  };

  // Fermer le menu si on clique ailleurs
  useEffect(() => {
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
        <div className="logo" onClick={() => handleNavigation('/')}>
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
                  onClick={() => handleNavigation(item.path)}
                  className={location.pathname === item.path ? 'active' : ''}
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
            {!user ? (
                <button onClick={() => navigate('/login')} className='connexion-btn'>Connexion</button>
              ) : (
                <div className="user-dropdown">
                  <div className="user-avatar" onClick={toggleUserMenu}>
                    {user.email.charAt(0).toUpperCase()}
                  </div>
                  {isUserMenuOpen && (
                    <div className="user-menu">
                      <a onClick={() => setIsUserMenuOpen(true)}>📊 Tableau de bord</a>
                      <a onClick={handleLogout}>🚪 Déconnexion</a>
                    </div>
                  )}
                </div>
              )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;


/*
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = ({ setIsDashboardOpen }) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    { key: 'accueil', label: 'Accueil', path: '/' },
    { key: 'politique', label: 'Politique', path: '/politique' },
    { key: 'economie', label: 'Économie', path: '/economie' },
    { key: 'culture', label: 'Culture', path: '/culture' },
    { key: 'sport', label: 'Sport', path: '/sport' },
    { key: 'bretagne', label: 'Bretagne', path: '/bretagne' }
  ];

  const handleNavigation = (path) => {
    navigate(path);
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
  useEffect(() => {
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
        <div className="logo" onClick={() => handleNavigation('/')}>
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
                  onClick={() => handleNavigation(item.path)}
                  className={location.pathname === item.path ? 'active' : ''}
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
              <button onClick={() => navigate('/login')} className='connexion-btn'>Connexion</button>
            <div className="user-dropdown">
              <div className="user-avatar" onClick={toggleUserMenu}>MJ</div>
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
*/