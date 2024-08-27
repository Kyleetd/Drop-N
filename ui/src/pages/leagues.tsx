import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import "../App.css";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import SendIcon from "@mui/icons-material/Send";
import TopBar from "../components/TopBar";

const Leagues = ({ currentUserId }: { currentUserId: number | null }) => {
  const [leagues, setLeagues] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        const response = await fetch("http://localhost:8001/leagues");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setLeagues(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchLeagues();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:8001/league/${id}`, {
        method: "DELETE",
      });

      console.log(`ID: ${id}, Type: ${typeof id}`);

      if (response.ok) {
        setLeagues((prevLeagues: any) =>
          prevLeagues.filter((league: any) => league.id !== id)
        );
      } else {
        const errorText = await response.text();
        console.error(`Failed to delete league: ${errorText}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

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
            onClick={() => navigate("/new-league")}
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
                  <Button
                    size="small"
                    color="error"
                    variant="contained"
                    style={{ marginTop: "8px" }}
                    onClick={() => handleDelete(league.id)}
                  >
                    Delete
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
