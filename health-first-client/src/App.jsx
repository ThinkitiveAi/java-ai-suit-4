import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home.jsx';
import ProviderLogin from './components/Provider/ProviderLogin.jsx';
import ProviderRegistration from './components/Provider/ProviderRegistration.jsx';
import PatientLogin from './components/Patient/PatientLogin.jsx';
import PatientRegistration from './components/Patient/PatientRegistration.jsx';
import PatientDashboard from './components/Patient/PatientDashboard.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/provider-login" element={<ProviderLogin />} />
        <Route path="/provider-register" element={<ProviderRegistration />} />
        <Route path="/patient-login" element={<PatientLogin />} />
        <Route path="/patient-register" element={<PatientRegistration />} />
        <Route path="/patient-dashboard" element={<PatientDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;