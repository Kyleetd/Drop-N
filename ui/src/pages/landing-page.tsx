import React, { useState } from 'react';
import logo from '../logo.png';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField'; // Import TextField
import '../App.css';

function Landing() {
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
    <div className="App">
      <header className="App-header">
        <img src={logo} alt="logo" width={150}/>
        <p>
          Welcome to UBC Volleyball Club's Drop'n Platform!
        </p>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px' }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <TextField
              label="Username"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoFocus={true}
              InputLabelProps={{
                style: { color: '#1976d2' },
              }}
              InputProps={{
                style: { color: 'white' },
              }}
            />
            <TextField
              label="Password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              InputLabelProps={{
                style: { color: '#1976d2' },
              }}
              InputProps={{
                style: { color: 'white' },
              }}
            />
            <Button 
              type="submit"
              variant="contained" 
              color="primary"
            >
              Login
            </Button>
          </div>

          <Button 
            variant="contained" 
            color="primary"
            href="/new-user"
            target="_blank"
            rel="noopener noreferrer"
          >
            Register for Drop'n
          </Button>
        </form>
      </header>
    </div>
  );
}

export default Landing;