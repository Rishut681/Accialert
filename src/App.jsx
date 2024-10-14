// App.jsx
import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginScreen from "./Screens/LoginScreen";
import SignupScreen from "./Screens/SignupScreen";
import HomeScreen from "./Screens/HomeScreen";
import LoadingScreen from './Screens/LoadingScreen'; // Import the LoadingScreen component
import Feedback from '../src/Components/Feedback';
import ComplaintForm from '../src/Components/ComplaintForm';
import Page1 from './Pages/Page1';
import Report from './Pages/Reports';
function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay, for example 2 seconds (you can adjust this)
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      {isLoading && <LoadingScreen />} {/* Show loading screen if isLoading is true */}
      <div className={`App-body ${isLoading ? 'hidden' : ''}`}>
        <Router>
          <Routes>
            <Route path="/" element={<LoginScreen />} />
            <Route path="/signup" element={<SignupScreen />} />
            <Route path="/home" element={<HomeScreen />} />
            <Route path="/page1" element={<Page1/>}/>
            <Route path="/feedback" element={<Feedback/>}/>
            <Route path="/complain" element={<ComplaintForm/>}/>
            <Route path="/reports" element={<Report/>}/>
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;