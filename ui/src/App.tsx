import React from 'react';
import logo from './logo.svg';
import Button from '@mui/material/Button';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to UBC Volleyball Club's Drop'n Platform!
        </p>

        <Button 
          variant="contained" 
          color="primary"
          href="https://example.com"
          target="_blank"
          rel="noopener noreferrer"
        >I'm registered</Button>

        <Button 
          variant="contained" 
          color="primary"
          href="https://example.com"
          target="_blank"
          rel="noopener noreferrer"
        >I'm drop'n in</Button>



      </header>
    </div>
  );
}

export default App;
