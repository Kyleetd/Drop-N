import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Landing from "./pages/landing-page";
import Leagues from "./pages/leagues";
import NewLeague from "./pages/new-league";
import Memberships from "./pages/memberships";
import Purchases from "./pages/purchases";
import FormPropsTextFields from "./pages/new-user";
import Profile from "./pages/profile";

function App() {
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token) {
      try {
        const decodedToken: { sub: number } = jwtDecode(token);

        // Extract user ID from the decoded token
        const userId =
          typeof decodedToken.sub === "number" ? decodedToken.sub : null;

        setCurrentUserId(userId);
      } catch (error) {
        console.error("Error decoding token:", (error as Error).message);
        localStorage.removeItem("authToken");
        localStorage.removeItem("currentUserId");
      }
    } else {
      const savedUserId = localStorage.getItem("currentUserId");
      if (savedUserId) {
        setCurrentUserId(Number(savedUserId));
      }
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Landing
              currentUserId={currentUserId}
              setCurrentUserId={setCurrentUserId}
            />
          }
        />

        <Route
          path="/leagues"
          element={<Leagues currentUserId={currentUserId} />}
        />

        <Route
          path="/new-league"
          element={<NewLeague currentUserId={currentUserId} />}
        />

        <Route
          path="/memberships"
          element={<Memberships currentUserId={currentUserId} />}
        />

        <Route
          path="/purchases"
          element={<Purchases currentUserId={currentUserId} />}
        />

        <Route
          path="/new-user"
          element={
            <FormPropsTextFields
              currentUserId={currentUserId}
              setCurrentUserId={setCurrentUserId}
            />
          }
        />

        <Route
          path="/profile"
          element={<Profile currentUserId={currentUserId} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
