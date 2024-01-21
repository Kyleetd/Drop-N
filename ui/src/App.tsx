import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./pages/landing-page"
import UserDashboard from "./pages/user-dashboard"
import FormPropsTextFields from "./pages/new-user"


function App() {
  return (
        <Router>
          <Routes>
            <Route path="/" Component={Landing}/>
            <Route path="/dashboard" Component={UserDashboard}/>
            <Route path="/new-user" Component={FormPropsTextFields}/>
          </Routes>
        </Router>
  );
}

export default App;