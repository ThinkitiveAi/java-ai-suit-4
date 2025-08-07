// import React, { useState, useRef } from 'react';
// import './PatientLogin.css';
// import { Link } from 'react-router-dom';

// function validateEmail(email) {
//   return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
// }
// function validatePhone(phone) {
//   return /^\+?\d{10,15}$/.test(phone);
// }

// const PatientLogin = () => {
//   const [identifier, setIdentifier] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [rememberMe, setRememberMe] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState(false);
//   const identifierRef = useRef(null);
//   const passwordRef = useRef(null);

//   // Validation
//   const isEmail = identifier.includes('@');
//   const isPhone = !isEmail && identifier.length > 0;
//   const validEmail = isEmail ? validateEmail(identifier) : true;
//   const validPhone = isPhone ? validatePhone(identifier) : true;
//   const validPassword = password.length >= 6;
//   const identifierError = identifier && !validEmail && isEmail
//     ? 'Invalid email format'
//     : identifier && !validPhone && isPhone
//     ? 'Invalid phone number'
//     : '';
//   const passwordError = password && !validPassword ? 'Password must be at least 6 characters' : '';

//   const formValid = identifier && password && !identifierError && !passwordError;

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setError('');
//     if (!identifier) {
//       setError('Email or phone is required');
//       identifierRef.current.focus();
//       return;
//     }
//     if (!validEmail || !validPhone) {
//       setError('Please enter a valid email or phone number');
//       identifierRef.current.focus();
//       return;
//     }
//     if (!validPassword) {
//       setError('Password must be at least 6 characters');
//       passwordRef.current.focus();
//       return;
//     }
//     setLoading(true);
//     setTimeout(() => {
//       setLoading(false);
//       setSuccess(true);
//       setTimeout(() => {
//         setSuccess(false);
//         // In real app, redirect to dashboard
//       }, 1200);
//     }, 1500);
//   };

//   return (
//     <div className="patient-login-bg">
//       <div className="patient-login-header">
//         <h1 className="patient-login-title">Patient Login</h1>
//         <p className="patient-login-subtitle">Welcome back! Please sign in to your account.</p>
//       </div>
//       <div className="patient-login-card" role="main" aria-labelledby="login-title">
//         <form className="patient-login-form" onSubmit={handleSubmit} autoComplete="on">
//           <div className="patient-login-field">
//             <label htmlFor="identifier">Email or Phone</label>
//             <div className="patient-login-input-icon">
//               <span className="icon-user" aria-hidden="true">👤</span>
//               <input
//                 id="identifier"
//                 name="identifier"
//                 type="text"
//                 ref={identifierRef}
//                 autoComplete="username"
//                 placeholder="Enter your email or phone"
//                 value={identifier}
//                 onChange={e => setIdentifier(e.target.value)}
//                 aria-invalid={!!identifierError}
//                 aria-describedby="identifier-error"
//                 disabled={loading}
//                 required
//               />
//             </div>
//             {identifierError && <div id="identifier-error" className="patient-login-error">{identifierError}</div>}
//           </div>
//           <div className="patient-login-field">
//             <label htmlFor="password">Password</label>
//             <div className="patient-login-input-icon">
//               <span className="icon-lock" aria-hidden="true">🔒</span>
//               <input
//                 id="password"
//                 name="password"
//                 type={showPassword ? 'text' : 'password'}
//                 ref={passwordRef}
//                 autoComplete="current-password"
//                 placeholder="Enter your password"
//                 value={password}
//                 onChange={e => setPassword(e.target.value)}
//                 aria-invalid={!!passwordError}
//                 aria-describedby="password-error"
//                 disabled={loading}
//                 required
//                 minLength={6}
//               />
//               <button
//                 type="button"
//                 className="patient-login-eye"
//                 onClick={() => setShowPassword(s => !s)}
//                 tabIndex={0}
//                 aria-label={showPassword ? 'Hide password' : 'Show password'}
//                 disabled={loading}
//               >
//                 {showPassword ? '🙈' : '👁️'}
//               </button>
//             </div>
//             {passwordError && <div id="password-error" className="patient-login-error">{passwordError}</div>}
//           </div>
//           <div className="patient-login-options">
//             <label className="patient-login-remember">
//               <input
//                 type="checkbox"
//                 checked={rememberMe}
//                 onChange={e => setRememberMe(e.target.checked)}
//                 disabled={loading}
//               />
//               Remember Me <span className="patient-login-remember-info">(for faster access next time)</span>
//             </label>
//             <Link to="/patient-forgot-password" className="patient-login-link">Forgot Password?</Link>
//           </div>
//           <button
//             type="submit"
//             className="patient-login-btn"
//             disabled={loading || !formValid}
//             aria-busy={loading}
//           >
//             {loading ? <span className="patient-login-spinner"></span> : 'Login'}
//           </button>
//           {error && <div className="patient-login-error" role="alert">{error}</div>}
//           {success && <div className="patient-login-success">Login successful! Redirecting…</div>}
//         </form>
//         <div className="patient-login-footer">
//           <span>New patient? <Link to="/patient-register" className="patient-login-link">Register here</Link></span>
//           <span><Link to="/patient-support" className="patient-login-link">Help & Support</Link> | <Link to="/patient-contact" className="patient-login-link">Contact</Link></span>
//         </div>
//       </div>
//       <footer className="patient-login-legal">
//         <span>🔒 Your information is secure and private.</span>
//         <span>© {new Date().getFullYear()} HealthFirst. All rights reserved.</span>
//       </footer>
//     </div>
//   );
// };

// export default PatientLogin; 



import React, { useState, useRef } from 'react';
import './PatientLogin.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone) {
  return /^\+?\d{10,15}$/.test(phone);
}

const PatientLogin = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const identifierRef = useRef(null);
  const passwordRef = useRef(null);

  // Validation
  const isEmail = identifier.includes('@');
  const isPhone = !isEmail && identifier.length > 0;
  const validEmail = isEmail ? validateEmail(identifier) : true;
  const validPhone = isPhone ? validatePhone(identifier) : true;
  const validPassword = password.length >= 6;
  const identifierError = identifier && !validEmail && isEmail
    ? 'Invalid email format'
    : identifier && !validPhone && isPhone
    ? 'Invalid phone number'
    : '';
  const passwordError = password && !validPassword ? 'Password must be at least 6 characters' : '';
  const formValid = identifier && password && !identifierError && !passwordError;

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');

  if (!identifier) {
    setError('Email or phone is required');
    identifierRef.current.focus();
    return;
  }
  if (!validEmail || !validPhone) {
    setError('Please enter a valid email or phone number');
    identifierRef.current.focus();
    return;
  }
  if (!validPassword) {
    setError('Password must be at least 6 characters');
    passwordRef.current.focus();
    return;
  }

  setLoading(true);
  setSuccess(false);

  // Dummy login logic
  setTimeout(() => {
    if (
      (identifier === 'john.doe@test.com' || identifier === '+915060601234') &&
      password === 'Pass@123'
    ) {
      setSuccess(true);
      setLoading(false);
      console.log('Dummy login success');

      setTimeout(() => {
        window.location.href = '/patient-dashboard';
      }, 1000);
    } else {
      setLoading(false);
      setError('Invalid credentials. Please try again.');
    }
  }, 1000);
};


  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError('');

  //   if (!identifier) {
  //     setError('Email or phone is required');
  //     identifierRef.current.focus();
  //     return;
  //   }
  //   if (!validEmail || !validPhone) {
  //     setError('Please enter a valid email or phone number');
  //     identifierRef.current.focus();
  //     return;
  //   }
  //   if (!validPassword) {
  //     setError('Password must be at least 6 characters');
  //     passwordRef.current.focus();
  //     return;
  //   }

  //   setLoading(true);
  //   setSuccess(false);

  //   try {
  //     const response = await axios.post('http://192.168.0.112:8080/api/v1/patient/login', {
  //       identifier,
  //       password,
  //       rememberMe,
  //     });

  //     // If the API returns a token or session, handle it here
  //     console.log('Login response:', response.data);

  //     setSuccess(true);
  //     setLoading(false);

  //     setTimeout(() => {
  //       window.location.href = '/dashboard';
  //     }, 1000);
  //   } catch (err) {
  //     setLoading(false);
  //     if (err.response) {
  //       if (err.response.status === 401) {
  //         setError('Invalid credentials. Please try again.');
  //       } else if (err.response.status === 423) {
  //         setError('Account locked or suspended.');
  //       } else {
  //         setError('Server error. Please try again later.');
  //       }
  //     } else {
  //       setError('Network error. Please check your connection.');
  //     }
  //   }
  // };

  return (
    <div className="patient-login-bg">
      <div className="patient-login-header">
        <h1 className="patient-login-title">Patient Login</h1>
        <p className="patient-login-subtitle">Welcome back! Please sign in to your account.</p>
      </div>
      <div className="patient-login-card" role="main" aria-labelledby="login-title">
        <form className="patient-login-form" onSubmit={handleSubmit} autoComplete="on">
          <div className="patient-login-field">
            <label htmlFor="identifier">Email or Phone</label>
            <div className="patient-login-input-icon">
              <span className="icon-user" aria-hidden="true">👤</span>
              <input
                id="identifier"
                name="identifier"
                type="text"
                ref={identifierRef}
                autoComplete="username"
                placeholder="Enter your email or phone"
                value={identifier}
                onChange={e => setIdentifier(e.target.value)}
                aria-invalid={!!identifierError}
                aria-describedby="identifier-error"
                disabled={loading}
                required
              />
            </div>
            {identifierError && <div id="identifier-error" className="patient-login-error">{identifierError}</div>}
          </div>
          <div className="patient-login-field">
            <label htmlFor="password">Password</label>
            <div className="patient-login-input-icon">
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
                className="patient-login-eye"
                onClick={() => setShowPassword(s => !s)}
                tabIndex={0}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                disabled={loading}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
            {passwordError && <div id="password-error" className="patient-login-error">{passwordError}</div>}
          </div>
          <div className="patient-login-options">
            <label className="patient-login-remember">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={e => setRememberMe(e.target.checked)}
                disabled={loading}
              />
              Remember Me <span className="patient-login-remember-info">(for faster access next time)</span>
            </label>
            <Link to="/patient-forgot-password" className="patient-login-link">Forgot Password?</Link>
          </div>
          <button
            type="submit"
            className="patient-login-btn"
            disabled={loading || !formValid}
            aria-busy={loading}
          >
            {loading ? <span className="patient-login-spinner"></span> : 'Login'}
          </button>
          {error && <div className="patient-login-error" role="alert">{error}</div>}
          {success && <div className="patient-login-success">Login successful! Redirecting…</div>}
        </form>
        <div className="patient-login-footer">
          <span>New patient? <Link to="/patient-register" className="patient-login-link">Register here</Link></span>
          <span><Link to="/patient-support" className="patient-login-link">Help & Support</Link> | <Link to="/patient-contact" className="patient-login-link">Contact</Link></span>
        </div>
      </div>
      <footer className="patient-login-legal">
        <span>🔒 Your information is secure and private.</span>
        <span>© {new Date().getFullYear()} HealthFirst. All rights reserved.</span>
      </footer>
    </div>
  );
};

export default PatientLogin;
