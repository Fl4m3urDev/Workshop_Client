import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function EnregistrementPage({ onRegister }) {
  const [form, setForm] = useState({ nom: '', prenom: '', email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const validate = () => {
    const e = {}
    if (!form.nom) e.nom = 'Nom requis.'
    if (!form.prenom) e.prenom = 'Prénom requis.'
    if (!form.email) e.email = 'Email requis.'
    else if (!/^[\w-.]+@[\w-]+\.[a-zA-Z]{2,}$/.test(form.email)) e.email = "Email invalide."
    if (!form.password) e.password = 'Mot de passe requis.'
    else if (form.password.length < 6) e.password = 'Minimum 6 caractères.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    if (!validate()) return
    setLoading(true)
    try {
      await new Promise((r) => setTimeout(r, 800))
      if (onRegister) onRegister(form)
      else {
        console.log('Register:', form)
    } 
    } catch (err) {
      console.error(err)
      setErrors({ form: 'Échec de l’inscription. Réessayez.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form" aria-labelledby="register-heading">
        <h1 id="register-heading" className="register-title">
          Créer un compte
        </h1>

        {errors.form && <div className="error-box">{errors.form}</div>}

        <div className="form-group">
          <label htmlFor="nom">Nom</label>
          <input
            id="nom"
            name="nom"
            type="text"
            value={form.nom}
            onChange={handleChange}
            className={errors.nom ? 'input-error' : ''}
            placeholder="Votre nom"
          />
          {errors.nom && <p className="error-text">{errors.nom}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="prenom">Prénom</label>
          <input
            id="prenom"
            name="prenom"
            type="text"
            value={form.prenom}
            onChange={handleChange}
            className={errors.prenom ? 'input-error' : ''}
            placeholder="Votre prénom"
          />
          {errors.prenom && <p className="error-text">{errors.prenom}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className={errors.email ? 'input-error' : ''}
            placeholder="exemple@email.com"
          />
          {errors.email && <p className="error-text">{errors.email}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Mot de passe</label>
          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            className={errors.password ? 'input-error' : ''}
            placeholder="••••••••"
          />
          {errors.password && <p className="error-text">{errors.password}</p>}
        </div>

        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? 'Inscription…' : "S'inscrire"}
        </button>

        <p className="form-footer">
          Déjà un compte ? <a onClick={() => navigate('/login')} href="#">Se connecter</a>
        </p>
      </form>
    </div>
  )
}

