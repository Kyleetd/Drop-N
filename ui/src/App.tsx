import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import jwt from "jsonwebtoken";
import Landing from "./pages/landing-page";
import Leagues from "./pages/leagues";
import NewLeague from "./pages/new-league";
import Memberships from "./pages/memberships";
import Purchases from "./pages/purchases";
import FormPropsTextFields from "./pages/new-user";

function App() {
  const [currentUserId, setCurrentUserId] = React.useState<number | null>(null);

  // useEffect(() => {
  //   const token = localStorage.getItem("authToken");

  //   if (token) {
  //     try {
  //       // Secret key used on the server
  //       const decodedToken = jwt.verify(token, "potato");

  //       // Extract user ID from the decoded token
  //       const userId =
  //         typeof decodedToken.sub === "number" ? decodedToken.sub : null;

  //       // Set the user ID in the component state
  //       setCurrentUserId(userId);
  //     } catch (error) {
  //       // Handle token verification error
  //       console.error("Error decoding token:", (error as Error).message);
  //     }
  //   }
  // }, []);

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
      </Routes>
    </Router>
  );
}

export default App;
