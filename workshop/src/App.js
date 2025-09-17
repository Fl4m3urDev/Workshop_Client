import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import PolitiquePage from './pages/PolitiquePage';
import EconomiePage from './pages/EconomiePage';
import CulturePage from './pages/CulturePage';
import SportPage from './pages/SportPage';
import BretagnePage from './pages/BretagnePage';
import Footer from './components/Footer';
import UserDashboard from './components/UserDashboard';
import './App.css';

const App = () => {
  const [currentPage, setCurrentPage] = useState('accueil');
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [userData, setUserData] = useState({
    categories: ['culture', 'economie', 'bretagne'],
    likedTags: ['Festival', 'Bretagne', 'Export', 'Art', 'Lorient', 'Cidre'],
    articleLikes: new Set(),
    stats: {
      articlesRead: 127,
      articlesLiked: 43,
      articlesShared: 18,
      consecutiveDays: 7
    }
  });

  const updateUserData = (newData) => {
    setUserData(prevData => ({
      ...prevData,
      ...newData
    }));
  };

  const toggleLike = (articleId, articleTags) => {
    const newLikes = new Set(userData.articleLikes);
    const isLiked = newLikes.has(articleId);
    
    if (isLiked) {
      newLikes.delete(articleId);
      // Retirer les tags des préférences (logique simplifiée)
    } else {
      newLikes.add(articleId);
      // Ajouter les nouveaux tags aux préférences
      const newLikedTags = [...userData.likedTags];
      articleTags.forEach(tag => {
        if (!newLikedTags.includes(tag)) {
          newLikedTags.push(tag);
        }
      });
      updateUserData({ 
        articleLikes: newLikes, 
        likedTags: newLikedTags,
        stats: { ...userData.stats, articlesLiked: userData.stats.articlesLiked + 1 }
      });
      return;
    }
    
    updateUserData({ 
      articleLikes: newLikes,
      stats: { ...userData.stats, articlesLiked: userData.stats.articlesLiked - 1 }
    });
  };

  const renderPage = () => {
    const pageProps = {
      userData,
      updateUserData,
      toggleLike
    };

    switch(currentPage) {
      case 'politique':
        return <PolitiquePage {...pageProps} />;
      case 'economie':
        return <EconomiePage {...pageProps} />;
      case 'culture':
        return <CulturePage {...pageProps} />;
      case 'sport':
        return <SportPage {...pageProps} />;
      case 'bretagne':
        return <BretagnePage {...pageProps} />;
      default:
        return <HomePage {...pageProps} />;
    }
  };

  return (
    <div className="app">
      <Header 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        setIsDashboardOpen={setIsDashboardOpen}
      />
      
      <main className="main-app-content">
        {renderPage()}
      </main>
      
      <Footer />
      
      <UserDashboard 
        isOpen={isDashboardOpen}
        onClose={() => setIsDashboardOpen(false)}
        userData={userData}
        updateUserData={updateUserData}
      />
    </div>
  );
};

export default App;