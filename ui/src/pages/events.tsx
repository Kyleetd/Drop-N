import React from "react";
import logo from "../logo.png";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "../App.css";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import TopBar from "../components/TopBar";

const Events = ({ currentUserId }: { currentUserId: string | null }) => {
  return (
    <div className="Basic-Page">
      <TopBar />

      <div style={{ margin: "20px" }}>
        <Typography variant="h4" gutterBottom sx={{ color: "white" }}>
          Upcoming Events
        </Typography>

        <div>
          <Card sx={{ maxWidth: 345 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Sample event 1
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
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
        </div>
      </div>
    </div>
  );
};

export default Events;
