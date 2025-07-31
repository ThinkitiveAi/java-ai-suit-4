import React, { useState, useRef } from 'react';
import './ProviderLogin.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

function validateEmail(email) {
  // Simple email regex
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone) {
  // Simple phone regex (10-15 digits, allows +)
  return /^\+?\d{10,15}$/.test(phone);
}

const ProviderLogin = () => {
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const credentialRef = useRef(null);
  const passwordRef = useRef(null);

  // Validation
  const isEmail = credential.includes('@');
  const isPhone = !isEmail && credential.length > 0;
  const validEmail = isEmail ? validateEmail(credential) : true;
  const validPhone = isPhone ? validatePhone(credential) : true;
  const validPassword = password.length >= 6;
  const credentialError = credential && !validEmail && isEmail
    ? 'Invalid email format'
    : credential && !validPhone && isPhone
    ? 'Invalid phone number'
    : '';
  const passwordError = password && !validPassword ? 'Password must be at least 6 characters' : '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!credential) {
      setError('Email or phone is required');
      credentialRef.current.focus();
      return;
    }
    if (!validEmail || !validPhone) {
      setError('Please enter a valid email or phone number');
      credentialRef.current.focus();
      return;
    }
    if (!validPassword) {
      setError('Password must be at least 6 characters');
      passwordRef.current.focus();
      return;
    }
    setLoading(true);
    setSuccess(false);
    try {
      const response = await axios.post('/api/provider/login', {
        credential,
        password,
        rememberMe,
      });
      setSuccess(true);
      setLoading(false);
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 1000);
    } catch (err) {
      if (err.response) {
        if (err.response.status === 401) {
          setError('Invalid credentials. Please try again.');
        } else if (err.response.status === 423) {
          setError('Account locked or suspended.');
        } else {
          setError('Server error. Please try again later.');
        }
      } else {
        setError('Network error. Please check your connection.');
      }
      setLoading(false);
    }
  };

  return (
    <>
    <div className="provider-login-bg">
      <div className="provider-login-header">
      <span className="provider-reg-icon">🩺</span>
        <h1 className="provider-login-title">Provider Login</h1>
        <p className="provider-login-subtitle">Secure access for medical professionals</p>
      </div>
      <div className="provider-login-card" role="main" aria-labelledby="login-title">
        <form className="provider-login-form" onSubmit={handleSubmit} autoComplete="on">
          <div className="provider-login-field">
            <label htmlFor="credential">Email or Phone</label>
            <div className="provider-login-input-icon">
              <span className="icon-user" aria-hidden="true">👤</span>
              <input
                id="credential"
                name="credential"
                type="text"
                ref={credentialRef}
                autoComplete="username"
                placeholder="Enter your email or phone"
                value={credential}
                onChange={e => setCredential(e.target.value)}
                aria-invalid={!!credentialError}
                aria-describedby="credential-error"
                disabled={loading}
                required
              />
            </div>
            {credentialError && <div id="credential-error" className="provider-login-error">{credentialError}</div>}
          </div>
          <div className="provider-login-field">
            <label htmlFor="password">Password</label>
            <div className="provider-login-input-icon">
              <span className="icon-lock" aria-hidden="true">🔒</span>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                ref={passwordRef}
                autoComplete="current-password"
                placeholder="Enter your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                aria-invalid={!!passwordError}
                aria-describedby="password-error"
                disabled={loading}
                required
                minLength={6}
              />
              <button
                type="button"
                className="provider-login-eye"
                onClick={() => setShowPassword(s => !s)}
                tabIndex={0}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                disabled={loading}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
            {passwordError && <div id="password-error" className="provider-login-error">{passwordError}</div>}
          </div>
          <div className="provider-login-options">
            <label className="provider-login-remember">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={e => setRememberMe(e.target.checked)}
                disabled={loading}
              />
              Remember Me
            </label>
            <a href="/forgot-password" className="provider-login-link">Forgot Password?</a>
          </div>
          <button
            type="submit"
            className="provider-login-btn"
            disabled={loading || !credential || !password || !!credentialError || !!passwordError}
            aria-busy={loading}
          >
            {loading ? <span className="provider-login-spinner"></span> : 'Login'}
          </button>
          {error && <div className="provider-login-error" role="alert">{error}</div>}
          {success && <div className="provider-login-success">Login successful! Redirecting…</div>}
        </form>
        <div className="provider-login-footer">
          <span>New provider? <Link to="/register" className="provider-login-link">Register here</Link></span>
          <span><a href="/support" className="provider-login-link">Support</a> | <a href="/privacy" className="provider-login-link">Privacy Policy</a></span>
        </div>
      </div>
    </div>
    </>
  );
};

export default ProviderLogin; 