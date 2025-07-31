import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home.jsx';
import ProviderLogin from './components/ProviderLogin.jsx';
import ProviderRegistration from './components/ProviderRegistration.jsx';
import PatientLogin from './components/PatientLogin.jsx';
import PatientRegistration from './components/PatientRegistration.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/provider-login" element={<ProviderLogin />} />
        <Route path="/provider-register" element={<ProviderRegistration />} />
        <Route path="/patient-login" element={<PatientLogin />} />
        <Route path="/patient-register" element={<PatientRegistration />} />
      </Routes>
    </Router>
  );
}

export default App;