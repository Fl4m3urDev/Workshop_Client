import React from 'react';

const Footer = () => {
  const footerSections = [
    {
      title: 'Bretagne Actualités',
      links: [
        { label: 'À propos', action: () => console.log('À propos') },
        { label: 'Contact', action: () => console.log('Contact') },
        { label: 'Équipe rédactionnelle', action: () => console.log('Équipe') },
        { label: 'Archives', action: () => console.log('Archives') }
      ]
    },
    {
      title: 'Rubriques',
      links: [
        { label: 'Politique', action: () => console.log('Politique') },
        { label: 'Économie', action: () => console.log('Économie') },
        { label: 'Culture', action: () => console.log('Culture') },
        { label: 'Sport', action: () => console.log('Sport') }
      ]
    },
    {
      title: 'Services',
      links: [
        { label: 'Newsletter', action: () => console.log('Newsletter') },
        { label: 'Application mobile', action: () => console.log('App mobile') },
        { label: 'Flux RSS', action: () => console.log('RSS') },
        { label: 'Widgets', action: () => console.log('Widgets') }
      ]
    },
    {
      title: 'Suivez-nous',
      links: [
        { label: '📘 Facebook', action: () => window.open('https://facebook.com', '_blank') },
        { label: '🐦 Twitter', action: () => window.open('https://twitter.com', '_blank') },
        { label: '📸 Instagram', action: () => window.open('https://instagram.com', '_blank') },
        { label: '🎬 YouTube', action: () => window.open('https://youtube.com', '_blank') }
      ]
    }
  ];

  const handleLegalClick = (type) => {
    console.log(`Ouverture de: ${type}`);
    alert(`Page ${type} - À implémenter`);
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        {footerSections.map((section, index) => (
          <div key={index} className="footer-section">
            <h3>{section.title}</h3>
            <ul>
              {section.links.map((link, linkIndex) => (
                <li key={linkIndex}>
                  <a onClick={link.action}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      
      <div className="footer-bottom">
        <p>
          &copy; 2025 Bretagne Actualités - Tous droits réservés | 
          <a onClick={() => handleLegalClick('Mentions légales')}> Mentions légales</a> | 
          <a onClick={() => handleLegalClick('Politique de confidentialité')}> Politique de confidentialité</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;