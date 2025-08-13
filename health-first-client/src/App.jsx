import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './common-components/Home.jsx';
import ProviderLogin from './pages/Provider/signin/ProviderLogin.jsx';
import ProviderRegistration from "./pages/Provider/registration/ProviderRegistration.jsx";
import PatientLogin from "./pages/Patient/sign-in/PatientLogin.jsx";
import PatientRegistration from "./pages/Patient/registration/PatientRegistration.jsx";
import PatientDashboard from "./pages/Patient/dashboard/PatientDashboard.jsx";
import ProviderDashboard from './pages/Provider/dashboard/ProviderDashboard.jsx';

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
        <Route path="/provider-dashboard" element={<ProviderDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;