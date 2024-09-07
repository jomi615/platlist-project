import logo from './logo.svg';
import './App.css';
import Auth from "./pages/Auth/Auth";
import HomePage from "./pages/HomePage/HomePage"
import Profile from "./pages/Profile/Profile"
import LandingPage from "./pages/LandingPage/LandingPage"

import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import * as ROUTES from "./constants/routes";
import Navbar from './components/Navbar'; // Adjust the path accordingly

function AppContent() {
  const location = useLocation();

  return (
    <div>
      {/* Conditionally render the Navbar only on the HOME route and when accessToken is available */}
      {location.pathname !== ROUTES.LANDINGPAGE && <Navbar />}
      
      <Routes>
        <Route path={ROUTES.LANDINGPAGE} element={<LandingPage />} />
        <Route path={ROUTES.LOGIN} element={<Auth />} />
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.PROFILE} element={<Profile />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;