import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProviderLogin from './components/ProviderLogin.jsx';
import ProviderRegistration from './components/ProviderRegistration.jsx';
import PatientLogin from './components/PatientLogin.jsx';
import PatientRegistration from './components/PatientRegistration.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProviderLogin />} />
        <Route path="/register" element={<ProviderRegistration />} />
        <Route path="/patient-login" element={<PatientLogin />} />
        <Route path="/patient-register" element={<PatientRegistration />} />
      </Routes>
    </Router>
  );
}

export default App;