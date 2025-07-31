import React, { useState, useRef } from 'react';
import './PatientRegistration.css';
import { Link } from 'react-router-dom';

const GENDERS = ['Male', 'Female', 'Other', 'Prefer not to say'];
const COUNTRIES = ['United States', 'Canada', 'United Kingdom', 'India', 'Australia', 'Other'];
const RELATIONSHIPS = ['Spouse', 'Parent', 'Sibling', 'Friend', 'Child', 'Other'];

function validateEmail(email) {
  return /^[^\s@]+@[^ 0-9]+|[^\s@]+\.[^\s@]+$/.test(email);
}
function validatePhone(phone) {
  return /^\+?\d{10,15}$/.test(phone);
}
function validatePassword(password) {
  // At least 8 chars, 1 number, 1 special char
  return /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/.test(password);
}
function getAge(dob) {
  if (!dob) return 0;
  const diff = Date.now() - new Date(dob).getTime();
  return Math.abs(new Date(diff).getUTCFullYear() - 1970);
}

const PatientRegistration = () => {
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '', dob: '', gender: '', photo: null,
    street: '', city: '', state: '', zip: '', country: '',
    emergencyName: '', emergencyRelationship: '', emergencyPhone: '',
    password: '', confirmPassword: '', terms: false, privacy: false
  });
  const [photoPreview, setPhotoPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef();

  // Validation logic
  const validate = () => {
    const errs = {};
    if (!form.firstName) errs.firstName = 'First name required';
    if (!form.lastName) errs.lastName = 'Last name required';
    if (!form.email || !validateEmail(form.email)) errs.email = 'Valid email required';
    if (!form.phone || !validatePhone(form.phone)) errs.phone = 'Valid phone required';
    if (!form.dob) errs.dob = 'Date of birth required';
    else if (getAge(form.dob) < 13) errs.dob = 'You must be at least 13 years old';
    if (!form.gender) errs.gender = 'Select gender';
    if (!form.street) errs.street = 'Street address required';
    if (!form.city) errs.city = 'City required';
    if (!form.state) errs.state = 'State/Province required';
    if (!form.zip) errs.zip = 'ZIP/Postal code required';
    if (!form.country) errs.country = 'Country required';
    if (!form.emergencyName) errs.emergencyName = 'Emergency contact name required';
    if (!form.emergencyRelationship) errs.emergencyRelationship = 'Select relationship';
    if (!form.emergencyPhone || !validatePhone(form.emergencyPhone)) errs.emergencyPhone = 'Valid emergency phone required';
    if (!form.password || !validatePassword(form.password)) errs.password = 'Password must be 8+ chars, 1 number, 1 special';
    if (form.confirmPassword !== form.password) errs.confirmPassword = 'Passwords do not match';
    if (!form.terms) errs.terms = 'You must accept the terms';
    if (!form.privacy) errs.privacy = 'You must accept the privacy policy';
    if (form.emergencyPhone === form.phone) errs.emergencyPhone = 'Emergency phone must be different from your phone';
    return errs;
  };

  // Password strength
  const passwordStrength = form.password.length >= 8 && /[0-9]/.test(form.password) && /[!@#$%^&*]/.test(form.password)
    ? 'strong' : form.password.length >= 6 ? 'medium' : 'weak';

  // Handle input changes
  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
    setErrors(e => ({ ...e, [name]: undefined }));
  };
  // Photo upload
  const handlePhoto = e => {
    const file = e.target.files[0];
    if (file) {
      setForm(f => ({ ...f, photo: file }));
      setPhotoPreview(URL.createObjectURL(file));
    }
  };
  // Drag and drop
  const handleDrop = e => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setForm(f => ({ ...f, photo: file }));
      setPhotoPreview(URL.createObjectURL(file));
    }
  };
  // Form submit
  const handleSubmit = e => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    }, 1500);
  };

  return (
    <div className="patient-reg-bg">
      <div className="patient-reg-header">
        <h1>Welcome to HealthFirst</h1>
        <p className="patient-reg-desc">Create your account to access personalized healthcare services.</p>
      </div>
      <form className="patient-reg-form" onSubmit={handleSubmit} autoComplete="on">
        <fieldset className="patient-reg-section">
          <legend>Personal Information</legend>
          <div className="patient-reg-row">
            <div>
              <label>First Name</label>
              <input name="firstName" value={form.firstName} onChange={handleChange} required />
              {errors.firstName && <div className="patient-reg-error">{errors.firstName}</div>}
            </div>
            <div>
              <label>Last Name</label>
              <input name="lastName" value={form.lastName} onChange={handleChange} required />
              {errors.lastName && <div className="patient-reg-error">{errors.lastName}</div>}
            </div>
          </div>
          <div className="patient-reg-row">
            <div>
              <label>Email</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} required />
              {errors.email && <div className="patient-reg-error">{errors.email}</div>}
            </div>
            <div>
              <label>Phone</label>
              <input name="phone" value={form.phone} onChange={handleChange} required />
              {errors.phone && <div className="patient-reg-error">{errors.phone}</div>}
            </div>
          </div>
          <div className="patient-reg-row">
            <div>
              <label>Date of Birth</label>
              <input name="dob" type="date" value={form.dob} onChange={handleChange} required />
              {errors.dob && <div className="patient-reg-error">{errors.dob}</div>}
            </div>
            <div>
              <label>Gender</label>
              <select name="gender" value={form.gender} onChange={handleChange} required>
                <option value="">Select</option>
                {GENDERS.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
              {errors.gender && <div className="patient-reg-error">{errors.gender}</div>}
            </div>
          </div>
          <div className="patient-reg-photo-upload"
            onDrop={handleDrop} onDragOver={e => e.preventDefault()}
            onClick={() => fileInputRef.current.click()}
            tabIndex={0} aria-label="Upload profile photo">
            {photoPreview ? (
              <img src={photoPreview} alt="Profile Preview" className="patient-reg-photo-preview" />
            ) : (
              <span>Drag & drop or click to upload photo (optional)</span>
            )}
            <input type="file" accept="image/*" style={{ display: 'none' }} ref={fileInputRef} onChange={handlePhoto} />
          </div>
        </fieldset>
        <fieldset className="patient-reg-section">
          <legend>Address Information</legend>
          <div className="patient-reg-row">
            <div>
              <label>Street Address</label>
              <input name="street" value={form.street} onChange={handleChange} required />
              {errors.street && <div className="patient-reg-error">{errors.street}</div>}
            </div>
            <div>
              <label>City</label>
              <input name="city" value={form.city} onChange={handleChange} required />
              {errors.city && <div className="patient-reg-error">{errors.city}</div>}
            </div>
          </div>
          <div className="patient-reg-row">
            <div>
              <label>State/Province</label>
              <input name="state" value={form.state} onChange={handleChange} required />
              {errors.state && <div className="patient-reg-error">{errors.state}</div>}
            </div>
            <div>
              <label>ZIP/Postal Code</label>
              <input name="zip" value={form.zip} onChange={handleChange} required />
              {errors.zip && <div className="patient-reg-error">{errors.zip}</div>}
            </div>
            <div>
              <label>Country</label>
              <select name="country" value={form.country} onChange={handleChange} required>
                <option value="">Select</option>
                {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              {errors.country && <div className="patient-reg-error">{errors.country}</div>}
            </div>
          </div>
        </fieldset>
        <fieldset className="patient-reg-section">
          <legend>Emergency Contact</legend>
          <div className="patient-reg-row">
            <div>
              <label>Contact Name</label>
              <input name="emergencyName" value={form.emergencyName} onChange={handleChange} required />
              {errors.emergencyName && <div className="patient-reg-error">{errors.emergencyName}</div>}
            </div>
            <div>
              <label>Relationship</label>
              <select name="emergencyRelationship" value={form.emergencyRelationship} onChange={handleChange} required>
                <option value="">Select</option>
                {RELATIONSHIPS.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
              {errors.emergencyRelationship && <div className="patient-reg-error">{errors.emergencyRelationship}</div>}
            </div>
            <div>
              <label>Phone Number</label>
              <input name="emergencyPhone" value={form.emergencyPhone} onChange={handleChange} required />
              {errors.emergencyPhone && <div className="patient-reg-error">{errors.emergencyPhone}</div>}
            </div>
          </div>
        </fieldset>
        <fieldset className="patient-reg-section">
          <legend>Account Security</legend>
          <div className="patient-reg-row">
            <div>
              <label>Password</label>
              <input name="password" type="password" value={form.password} onChange={handleChange} required />
              <div className={`patient-reg-password-strength ${passwordStrength}`}>{passwordStrength}</div>
              {errors.password && <div className="patient-reg-error">{errors.password}</div>}
            </div>
            <div>
              <label>Confirm Password</label>
              <input name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} required />
              {errors.confirmPassword && <div className="patient-reg-error">{errors.confirmPassword}</div>}
            </div>
          </div>
        </fieldset>
        <div className="patient-reg-terms">
          <label>
            <input type="checkbox" name="terms" checked={form.terms} onChange={handleChange} />
            I agree to the <a href="/terms" target="_blank" rel="noopener noreferrer">Terms of Service</a>
          </label>
          {errors.terms && <div className="patient-reg-error">{errors.terms}</div>}
        </div>
        <div className="patient-reg-terms">
          <label>
            <input type="checkbox" name="privacy" checked={form.privacy} onChange={handleChange} />
            I acknowledge the <a href="/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
          </label>
          {errors.privacy && <div className="patient-reg-error">{errors.privacy}</div>}
        </div>
        {success && <div className="patient-reg-success">Registration successful! Please check your email for verification and next steps.</div>}
        <button type="submit" className="patient-reg-btn" disabled={loading} aria-busy={loading}>
          {loading ? <span className="patient-reg-spinner"></span> : 'Register'}
        </button>
        <div className="patient-reg-footer">
          Already have an account? <Link to="/patient-login" className="patient-reg-link">Login here</Link>
        </div>
      </form>
      <footer className="patient-reg-support">
        Need help? <Link to="/patient-support">Contact support</Link>
      </footer>
    </div>
  );
};

export default PatientRegistration; 