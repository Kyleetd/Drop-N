import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import UserState from "./State/UserState";
// import ResponsePopups from "./State/ResponsePopups";
import Landing from "./pages/landing-page"
import UserDashboard from "./pages/UserDashboard"


function App() {
  // State to store user input
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Handler for when the user submits the form
  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevents the default form submit action
    console.log(username); // Here you'd handle the login logic
    // Redirect to user dashboard or show login error as needed
  };

  return (

    // <ResponsePopups>
    //   <UserState>
        <Router>
          <Routes>
            <Route path="/" Component={Landing}/>
            <Route path="/dashboard" Component={UserDashboard}/>
          </Routes>
        </Router>
    //   </UserState>
    // </ResponsePopups>

  );
}

export default App;