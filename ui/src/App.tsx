import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./pages/landing-page";
import Events from "./pages/events";
import Memberships from "./pages/memberships";
import Purchases from "./pages/purchases";
import FormPropsTextFields from "./pages/new-user";

function App() {
  const [currentUserId, setCurrentUserId] = React.useState<string | null>(null);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Landing
            />
          }
        />
        <Route
          path="/events"
          element={<Events currentUserId={currentUserId} />}
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
