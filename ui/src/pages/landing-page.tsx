import React, { useState } from "react";
import logo from "../logo.png";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Landing(props: any) {
  // State to store user input
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Handler for when the user submits the form
  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Prepare data to be sent in the POST request
    const formData = JSON.stringify({
      email: email,
      password: password,
    });

    console.log(formData);

    try {
      // Make a POST request using the fetch API
      const response = await fetch("http://localhost:8000/user", {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
        },
        body: formData,
      });

      if (response.ok) {
        // Handle the response (e.g., redirect to dashboard on success)
        console.log();
        const responseData = await response.json();
        console.log(responseData);
        navigate("/dashboard");
      } else {
        const errorData = await response.json();
        setError(errorData.detail);
      }
    } catch (error) {
      // Handle network or other errors
      console.error("Login failed", error);
      setError("An unexpected error occurred.");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        {error && (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {error}
          </Alert>
        )}
        <img src={logo} alt="logo" width={150} />
        <p>Welcome to UBC Volleyball Club's Drop'n Platform!</p>

        <form
          onSubmit={handleLogin}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "30px",
          }}
        >
          <div style={{ display: "flex", gap: "10px" }}>
            <TextField
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              autoFocus={true}
              InputLabelProps={{
                style: { color: "#1976d2" },
              }}
              InputProps={{
                style: { color: "white" },
              }}
            />
            <TextField
              label="Password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              InputLabelProps={{
                style: { color: "#1976d2" },
              }}
              InputProps={{
                style: { color: "white" },
              }}
            />
            <Button type="submit" variant="contained" color="primary">
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
