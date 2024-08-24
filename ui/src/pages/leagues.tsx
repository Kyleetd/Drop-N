import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import "../App.css";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import TopBar from "../components/TopBar";

const Leagues = ({ currentUserId }: { currentUserId: number | null }) => {
  const [leagues, setLeagues] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        const response = await fetch("http://localhost:8001/leagues"); // Adjust the URL if necessary
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setLeagues(data); // Update state with fetched leagues
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message); // Update state with error message
        } else {
          setError("An unknown error occurred"); // Fallback error message
        }
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchLeagues();
  }, []);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <div className="Basic-Page">
      <TopBar />
      <div style={{ margin: "20px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ color: "white" }}>
            Leagues
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            style={{ marginLeft: "16px" }}
            onClick={() => alert("Add new league functionality goes here")}
          >
            New League
          </Button>
        </div>
        <div>
          {leagues.map((league) => (
            <Card key={league.id} sx={{ maxWidth: 345, marginBottom: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {league.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {league.description}
                  </Typography>
                </CardContent>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: "0 16px",
                  }}
                >
                  <Button
                    size="small"
                    color="primary"
                    variant="contained"
                    endIcon={<SendIcon />}
                  >
                    Drop'n
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leagues;
