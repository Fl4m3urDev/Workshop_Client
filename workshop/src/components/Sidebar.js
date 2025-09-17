import React, { useState } from 'react';

const Sidebar = () => {
  const [email, setEmail] = useState('');

  const trendingArticles = [
    {
      id: 1,
      title: 'Les algues vertes reviennent sur les côtes finistériennes',
      meta: { time: 'Il y a 3 heures', views: '1,2k' }
    },
    {
      id: 2,
      title: 'Le Stade Rennais recrute un nouvel attaquant',
      meta: { time: 'Il y a 5 heures', views: '850' }
    },
    {
      id: 3,
      title: 'Ouverture d\'un nouveau campus tech à Nantes',
      meta: { time: 'Il y a 1 jour', views: '600' }
    }
  ];

  const weatherData = [
    { city: 'Rennes', weather: '☁️', temp: '18°C' },
    { city: 'Brest', weather: '🌧️', temp: '15°C' },
    { city: 'Lorient', weather: '⛅', temp: '17°C' },
    { city: 'Saint-Malo', weather: '☀️', temp: '19°C' }
  ];

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      alert('Merci pour votre inscription à la newsletter !');
      setEmail('');
    }
  };

  const handleTrendingClick = (article) => {
    console.log('Article tendance cliqué:', article.title);
  };

  return (
    <aside className="sidebar">
      {/* Widget Tendances */}
      <div className="widget">
        <h3 className="widget-title">🔥 Tendances</h3>
        <ul className="trending-list">
          {trendingArticles.map((article) => (
            <li key={article.id} className="trending-item">
              <div 
                className="trending-link"
                onClick={() => handleTrendingClick(article)}
              >
                {article.title}
              </div>
              <div className="trending-meta">
                📅 {article.meta.time} • 👁️ {article.meta.views} vues
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Widget Newsletter */}
      <div className="widget">
        <h3 className="widget-title">📧 Newsletter</h3>
        <p>Recevez les actualités bretonnes directement dans votre boîte mail</p>
        <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
          <input 
            type="email" 
            className="newsletter-input" 
            placeholder="Votre email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="newsletter-btn">
            S'abonner
          </button>
        </form>
      </div>

      {/* Widget Météo */}
      <div className="widget">
        <h3 className="widget-title">🌤️ Météo Bretagne</h3>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(2, 1fr)', 
          gap: '1rem', 
          textAlign: 'center' 
        }}>
          {weatherData.map((city, index) => (
            <div key={index}>
              <strong>{city.city}</strong><br />
              {city.weather} {city.temp}
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;