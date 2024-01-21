import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./pages/landing-page"
import Events from "./pages/events"
import Memberships from "./pages/memberships"
import Purchases from "./pages/purchases"
import FormPropsTextFields from "./pages/new-user"


function App() {
  return (
        <Router>
          <Routes>
            <Route path="/" Component={Landing}/>
            <Route path="/events" Component={Events}/>
            <Route path="/memberships" Component={Memberships}/>
            <Route path="/purchases" Component={Purchases}/>
            <Route path="/new-user" Component={FormPropsTextFields}/>
          </Routes>
        </Router>
  );
}

export default App;