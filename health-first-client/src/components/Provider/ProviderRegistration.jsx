import React, { useState, useRef } from 'react';
import './ProviderRegistration.css';
import axios from 'axios';

const SPECIALIZATIONS = [
  'Cardiology', 'Dermatology', 'Pediatrics', 'General Medicine', 'Orthopedics',
  'Gynecology', 'Neurology', 'Psychiatry', 'Radiology', 'Surgery', 'Other'
];
const PRACTICE_TYPES = [
  'Private Practice', 'Hospital', 'Clinic', 'Telemedicine', 'Other'
];

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function validatePhone(phone) {
  return /^\+?\d{10,15}$/.test(phone);
}
function validateLicense(license) {
  return /^[A-Za-z0-9\-]{5,}$/.test(license);
}
function validatePassword(password) {
  // At least 8 chars, 1 number, 1 special char
  return /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/.test(password);
}

const ProviderRegistration = () => {
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '', photo: null,
    license: '', specialization: '', experience: '', degree: '',
    clinicName: '', address: '', city: '', state: '', zip: '', practiceType: '',
    password: '', confirmPassword: '', terms: false
  });
  const [photoPreview, setPhotoPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [apiError, setApiError] = useState('');
  const fileInputRef = useRef();

  // Validation logic
  const validate = () => {
    const errs = {};
    if (!form.firstName) errs.firstName = 'First name required';
    if (!form.lastName) errs.lastName = 'Last name required';
    if (!form.email || !validateEmail(form.email)) errs.email = 'Valid email required';
    if (!form.phone || !validatePhone(form.phone)) errs.phone = 'Valid phone required';
    if (!form.license || !validateLicense(form.license)) errs.license = 'Valid license required';
    if (!form.specialization) errs.specialization = 'Select specialization';
    if (!form.experience || isNaN(form.experience) || form.experience < 0) errs.experience = 'Valid experience required';
    if (!form.degree) errs.degree = 'Degree required';
    if (!form.clinicName) errs.clinicName = 'Clinic/Hospital name required';
    if (!form.address) errs.address = 'Address required';
    if (!form.city) errs.city = 'City required';
    if (!form.state) errs.state = 'State required';
    if (!form.zip) errs.zip = 'ZIP required';
    if (!form.practiceType) errs.practiceType = 'Select practice type';
    if (!form.password || !validatePassword(form.password)) errs.password = 'Password must be 8+ chars, 1 number, 1 special';
    if (form.confirmPassword !== form.password) errs.confirmPassword = 'Passwords do not match';
    if (!form.terms) errs.terms = 'You must accept the terms';
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
  const handleSubmit = async e => {
    e.preventDefault();
    setApiError('');
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setLoading(true);
    try {
      const data = new FormData();
      Object.entries(form).forEach(([k, v]) => {
        if (k === 'photo' && v) data.append('photo', v);
        else if (k !== 'photo') data.append(k, v);
      });
      await axios.post('https://86721ef8cdb1.ngrok-free.app/api/v1/provider/register', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setSuccess(true);
      setLoading(false);
    } catch (err) {
      if (err.response && err.response.status === 409) {
        setApiError('Email or license already exists.');
      } else {
        setApiError('Registration failed. Please try again.');
      }
      setLoading(false);
    }
  };

  return (
    <div className="provider-reg-bg">
      <div className="provider-reg-header">
        <span className="provider-reg-icon">🩺</span>
        <h1>Provider Registration</h1>
      </div>
      <form className="provider-reg-form" onSubmit={handleSubmit} autoComplete="on">
        <fieldset className="provider-reg-section">
          <legend>Personal Information</legend>
          <div className="provider-reg-row">
            <div>
              <label>First Name</label>
              <input name="firstName" value={form.firstName} onChange={handleChange} required />
              {errors.firstName && <div className="provider-reg-error">{errors.firstName}</div>}
            </div>
            <div>
              <label>Last Name</label>
              <input name="lastName" value={form.lastName} onChange={handleChange} required />
              {errors.lastName && <div className="provider-reg-error">{errors.lastName}</div>}
            </div>
          </div>
          <div className="provider-reg-row">
            <div>
              <label>Email</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} required />
              {errors.email && <div className="provider-reg-error">{errors.email}</div>}
            </div>
            <div>
              <label>Phone</label>
              <input name="phone" value={form.phone} onChange={handleChange} required />
              {errors.phone && <div className="provider-reg-error">{errors.phone}</div>}
            </div>
          </div>
          <div className="provider-reg-photo-upload"
            onDrop={handleDrop} onDragOver={e => e.preventDefault()}
            onClick={() => fileInputRef.current.click()}
            tabIndex={0} aria-label="Upload profile photo">
            {photoPreview ? (
              <img src={photoPreview} alt="Profile Preview" className="provider-reg-photo-preview" />
            ) : (
              <span>Drag & drop or click to upload photo</span>
            )}
            <input type="file" accept="image/*" style={{ display: 'none' }} ref={fileInputRef} onChange={handlePhoto} />
          </div>
        </fieldset>
        <fieldset className="provider-reg-section">
          <legend>Professional Information</legend>
          <div className="provider-reg-row">
            <div>
              <label>Medical License Number</label>
              <input name="license" value={form.license} onChange={handleChange} required />
              {errors.license && <div className="provider-reg-error">{errors.license}</div>}
            </div>
            <div>
              <label>Specialization</label>
              <select name="specialization" value={form.specialization} onChange={handleChange} required>
                <option value="">Select</option>
                {SPECIALIZATIONS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              {errors.specialization && <div className="provider-reg-error">{errors.specialization}</div>}
            </div>
          </div>
          <div className="provider-reg-row">
            <div>
              <label>Years of Experience</label>
              <input name="experience" type="number" min="0" value={form.experience} onChange={handleChange} required />
              {errors.experience && <div className="provider-reg-error">{errors.experience}</div>}
            </div>
            <div>
              <label>Medical Degree/Qualifications</label>
              <input name="degree" value={form.degree} onChange={handleChange} required />
              {errors.degree && <div className="provider-reg-error">{errors.degree}</div>}
            </div>
          </div>
        </fieldset>
        <fieldset className="provider-reg-section">
          <legend>Practice Information</legend>
          <div className="provider-reg-row">
            <div>
              <label>Clinic/Hospital Name</label>
              <input name="clinicName" value={form.clinicName} onChange={handleChange} required />
              {errors.clinicName && <div className="provider-reg-error">{errors.clinicName}</div>}
            </div>
            <div>
              <label>Practice Type</label>
              <select name="practiceType" value={form.practiceType} onChange={handleChange} required>
                <option value="">Select</option>
                {PRACTICE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
              {errors.practiceType && <div className="provider-reg-error">{errors.practiceType}</div>}
            </div>
          </div>
          <div className="provider-reg-row">
            <div>
              <label>Clinic Address</label>
              <input name="address" placeholder="Street" value={form.address} onChange={handleChange} required />
              {errors.address && <div className="provider-reg-error">{errors.address}</div>}
            </div>
            <div>
              <label>City</label>
              <input name="city" value={form.city} onChange={handleChange} required />
              {errors.city && <div className="provider-reg-error">{errors.city}</div>}
            </div>
          </div>
          <div className="provider-reg-row">
            <div>
              <label>State</label>
              <input name="state" value={form.state} onChange={handleChange} required />
              {errors.state && <div className="provider-reg-error">{errors.state}</div>}
            </div>
            <div>
              <label>ZIP</label>
              <input name="zip" value={form.zip} onChange={handleChange} required />
              {errors.zip && <div className="provider-reg-error">{errors.zip}</div>}
            </div>
          </div>
        </fieldset>
        <fieldset className="provider-reg-section">
          <legend>Account Security</legend>
          <div className="provider-reg-row">
            <div>
              <label>Password</label>
              <input name="password" type="password" value={form.password} onChange={handleChange} required />
              <div className={`provider-reg-password-strength ${passwordStrength}`}>{passwordStrength}</div>
              {errors.password && <div className="provider-reg-error">{errors.password}</div>}
            </div>
            <div>
              <label>Confirm Password</label>
              <input name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} required />
              {errors.confirmPassword && <div className="provider-reg-error">{errors.confirmPassword}</div>}
            </div>
          </div>
        </fieldset>
        <div className="provider-reg-terms">
          <label>
            <input type="checkbox" name="terms" checked={form.terms} onChange={handleChange} />
            I agree to the <a href="/terms" target="_blank" rel="noopener noreferrer">Terms & Conditions</a>
          </label>
          {errors.terms && <div className="provider-reg-error">{errors.terms}</div>}
        </div>
        {apiError && <div className="provider-reg-error" role="alert">{apiError}</div>}
        {success && <div className="provider-reg-success">Registration successful! Please check your email for verification and next steps.</div>}
        <button type="submit" className="provider-reg-btn" disabled={loading} aria-busy={loading}>
          {loading ? <span className="provider-reg-spinner"></span> : 'Register'}
        </button>
        <div className="provider-reg-footer">
          Already have an account? <a href="/login" className="provider-reg-link">Login here</a>
        </div>
      </form>
      <footer className="provider-reg-support">
        Need help? <a href="/support">Contact support</a>
      </footer>
    </div>
  );
};

export default ProviderRegistration; 