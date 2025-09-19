import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const e = {};
    if (!email) e.email = 'Email requis.';
    else if (!/^[\w-.]+@[\w-]+\.[a-zA-Z]{2,}$/.test(email)) e.email = "Email invalide.";

    if (!password) e.password = 'Mot de passe requis.';
    else if (password.length < 6) e.password = 'Le mot de passe doit contenir au moins 6 caractères.';

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await new Promise(r => setTimeout(r, 800));
      const userData = { email }; // exemple minimal
      setUser(userData);           // <-- ici ça fonctionnera
      navigate('/');
    } catch (err) {
      setErrors({ form: 'Échec de la connexion. Réessayez.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h1 className="login-title">Se connecter</h1>

        {errors.form && <div className="error-box">{errors.form}</div>}

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={errors.email ? 'input-error' : ''}
            placeholder="votre@email.com"
          />
          {errors.email && <p className="error-text">{errors.email}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Mot de passe</label>
          <div className="password-wrapper">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={errors.password ? 'input-error' : ''}
              placeholder="••••••••"
            />
            <button
              type="button"
              className="show-password-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? 'Masquer' : 'Afficher'}
            </button>
          </div>
          {errors.password && <p className="error-text">{errors.password}</p>}
        </div>

        <div className="form-options">
          <label className="remember">
            <input type="checkbox" />
            Se souvenir de moi
          </label>
          <a href="#" className="forgot-link">Mot de passe oublié ?</a>
        </div>

        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? 'Connexion…' : 'Se connecter'}
        </button>

        <p className="form-footer">
          Pas encore de compte? <a onClick={() => navigate("/enregistrement")} href="#">S'inscrire</a>
        </p>
      </form>
    </div>
  );
}


/*
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const e = {};
    if (!email) e.email = 'Email requis.';
    else if (!/^[\w-.]+@[\w-]+\.[a-zA-Z]{2,}$/.test(email)) e.email = "Email invalide.";

    if (!password) e.password = 'Mot de passe requis.';
    else if (password.length < 6) e.password = 'Le mot de passe doit contenir au moins 6 caractères.';

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 800));
      if (onLogin) onLogin({ email, password });
      else {
        navigate('/')
        console.log('Login success:', { email, password });
      }
    } catch (err) {
      console.error(err);
      setErrors({ form: 'Échec de la connexion. Réessayez.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h1 className="login-title">Se connecter</h1>

        {errors.form && <div className="error-box">{errors.form}</div>}

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={errors.email ? 'input-error' : ''}
            placeholder="votre@email.com"
          />
          {errors.email && <p className="error-text">{errors.email}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Mot de passe</label>
          <div className="password-wrapper">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={errors.password ? 'input-error' : ''}
              placeholder="••••••••"
            />
            <button
              type="button"
              className="show-password-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? 'Masquer' : 'Afficher'}
            </button>
          </div>
          {errors.password && <p className="error-text">{errors.password}</p>}
        </div>

        <div className="form-options">
          <label className="remember">
            <input type="checkbox" />
            Se souvenir de moi
          </label>
          <a href="#" className="forgot-link">Mot de passe oublié ?</a>
        </div>

        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? 'Connexion…' : 'Se connecter'}
        </button>

        <p className="form-footer">
          Pas encore de compte? <a onClick={() => navigate("/enregistrement")} href="#">S'inscrire</a>
        </p>
      </form>
    </div>
  );
}

*/