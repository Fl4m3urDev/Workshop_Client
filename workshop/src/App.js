import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import PolitiquePage from './pages/PolitiquePage';
import EconomiePage from './pages/EconomiePage';
import CulturePage from './pages/CulturePage';
import SportPage from './pages/SportPage';
import BretagnePage from './pages/BretagnePage';
import ArticlePage from './pages/ArticlePage';
import Footer from './components/Footer';
import LoginPage from './pages/LoginPage';
import EnregistrementPage from './pages/EnregistrementPage';
import UserDashboard from './components/UserDashboard';
import './App.css';

const App = () => {
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [user, setUser] = useState(null); // null = non connecté

  const [userData, setUserData] = useState({
    categories: ['culture', 'economie', 'bretagne'],
    likedTags: ['Festival', 'Bretagne', 'Export', 'Art', 'Lorient', 'Cidre'],
    articleLikes: new Set(),
    articleDislikes: new Set(), // 👎 Nouveau
    stats: {
      articlesRead: 127,
      articlesLiked: 43,
      articlesDisliked: 5, // 👎 Nouveau
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

  // ❤️ LIKE
  const toggleLike = (articleId, articleTags) => {
    const newLikes = new Set(userData.articleLikes);
    const newDislikes = new Set(userData.articleDislikes);

    const isLiked = newLikes.has(articleId);

    if (isLiked) {
      newLikes.delete(articleId);
      updateUserData({
        articleLikes: newLikes,
        stats: { ...userData.stats, articlesLiked: userData.stats.articlesLiked - 1 }
      });
    } else {
      newLikes.add(articleId);
      newDislikes.delete(articleId); // 🚫 si l’article est disliké, on l’enlève
      const newLikedTags = [...userData.likedTags];
      articleTags.forEach(tag => {
        if (!newLikedTags.includes(tag)) {
          newLikedTags.push(tag);
        }
      });
      updateUserData({
        articleLikes: newLikes,
        articleDislikes: newDislikes,
        likedTags: newLikedTags,
        stats: { 
          ...userData.stats, 
          articlesLiked: userData.stats.articlesLiked + 1,
          articlesDisliked: newDislikes.size
        }
      });
    }
  };

  // 👎 DISLIKE
  const toggleDislike = (articleId) => {
    const newDislikes = new Set(userData.articleDislikes);
    const newLikes = new Set(userData.articleLikes);

    const isDisliked = newDislikes.has(articleId);

    if (isDisliked) {
      newDislikes.delete(articleId);
      updateUserData({
        articleDislikes: newDislikes,
        stats: { ...userData.stats, articlesDisliked: userData.stats.articlesDisliked - 1 }
      });
    } else {
      newDislikes.add(articleId);
      newLikes.delete(articleId); // 🚫 si déjà liké, on l’enlève
      updateUserData({
        articleDislikes: newDislikes,
        articleLikes: newLikes,
        stats: { 
          ...userData.stats, 
          articlesDisliked: userData.stats.articlesDisliked + 1,
          articlesLiked: newLikes.size
        }
      });
    }
  };

  const pageProps = {
    userData,
    updateUserData,
    toggleLike,
    toggleDislike // 👎 on le passe aussi
  };

  return (
    <Router>
      <div className="app">
        <Header 
          user={user} 
          setUser={setUser} 
          setIsDashboardOpen={setIsDashboardOpen} 
        />
        
        <main className="main-app-content">
          <Routes>
            <Route path="/" element={<HomePage {...pageProps} />} />
            <Route path="/login" element={<LoginPage setUser={setUser} {...pageProps} />} />
            <Route path="/enregistrement" element={<EnregistrementPage setUser={setUser} {...pageProps} />} />
            <Route path="/politique" element={<PolitiquePage {...pageProps} />} />
            <Route path="/economie" element={<EconomiePage {...pageProps} />} />
            <Route path="/culture" element={<CulturePage {...pageProps} />} />
            <Route path="/sport" element={<SportPage {...pageProps} />} />
            <Route path="/bretagne" element={<BretagnePage {...pageProps} />} />
            <Route path="/article/:id" element={<ArticlePage {...pageProps} />} />
          </Routes>
        </main>

        <Footer />

        <UserDashboard 
          isOpen={isDashboardOpen}
          onClose={() => setIsDashboardOpen(false)}
          userData={userData}
          updateUserData={updateUserData}
        />
      </div>
    </Router>
  );
};

export default App;

/*
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import PolitiquePage from './pages/PolitiquePage';
import EconomiePage from './pages/EconomiePage';
import CulturePage from './pages/CulturePage';
import SportPage from './pages/SportPage';
import BretagnePage from './pages/BretagnePage';
import ArticlePage from './pages/ArticlePage';
import Footer from './components/Footer';
import LoginPage from './pages/LoginPage';
import EnregistrementPage from './pages/EnregistrementPage';
import UserDashboard from './components/UserDashboard';
import './App.css';

const App = () => {
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [user, setUser] = useState(null); // null = non connecté

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
      updateUserData({ 
        articleLikes: newLikes,
        stats: { ...userData.stats, articlesLiked: userData.stats.articlesLiked - 1 }
      });
    } else {
      newLikes.add(articleId);
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
    }
  };

  const pageProps = {
    userData,
    updateUserData,
    toggleLike
  };

  return (
    <Router>
      <div className="app">
        <Header 
          user={user} 
          setUser={setUser} 
          setIsDashboardOpen={setIsDashboardOpen} 
        />
        
        <main className="main-app-content">
          <Routes>
            <Route path="/" element={<HomePage {...pageProps} />} />
            <Route path="/login" element={<LoginPage setUser={setUser} {...pageProps} />} />
            <Route path="/enregistrement" element={<EnregistrementPage setUser={setUser} {...pageProps} />} />
            <Route path="/politique" element={<PolitiquePage {...pageProps} />} />
            <Route path="/economie" element={<EconomiePage {...pageProps} />} />
            <Route path="/culture" element={<CulturePage {...pageProps} />} />
            <Route path="/sport" element={<SportPage {...pageProps} />} />
            <Route path="/bretagne" element={<BretagnePage {...pageProps} />} />
            <Route path="/article/:id" element={<ArticlePage {...pageProps} />} />
          </Routes>
        </main>

        <Footer />

        <UserDashboard 
          isOpen={isDashboardOpen}
          onClose={() => setIsDashboardOpen(false)}
          userData={userData}
          updateUserData={updateUserData}
        />
      </div>
    </Router>
  );
};

export default App;
*/