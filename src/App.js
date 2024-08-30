import logo from './logo.svg';
import './App.css';
import Auth from "./pages/Auth/Auth";
import HomePage from "./pages/HomePage/HomePage"
import Profile from "./pages/Profile/Profile"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import * as ROUTES from "./constants/routes";


function App() {
  return (
    <Router>
      <Routes>
        <Route path={ROUTES.LOGIN} element={<Auth/>} />
        <Route path={ROUTES.HOME} element={<HomePage/>} />
        <Route path={ROUTES.PROFILE} element={<Profile/>}/>
      </Routes>
    </Router>
  );
}

export default App;
