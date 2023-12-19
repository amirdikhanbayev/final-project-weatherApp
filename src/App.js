import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Weather from './components/Weather';
import Home from './components/Home';
import './App.css';
import logo from './img/img.png';
function App() {
    return (
        <Router>
            <div className="app-container">
                <div className="logo-container">
                    <img src={logo} alt="Logo" className="logo" />
                </div>

                <nav className="nav-bar">
                    <div className="nav-links">
                        <Link to="/" className="nav-link">Home</Link>
                        <Link to="/weather" className="nav-link">Weather</Link>
                    </div>
                </nav>

                <Routes>
                    <Route path="/weather" element={<Weather />} />
                    <Route path="/" element={<Home />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
