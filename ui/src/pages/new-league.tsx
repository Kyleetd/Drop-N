import { Box, Button, TextField, Typography } from "@mui/material";
import TopBar from "../components/TopBar";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LeagueFormData } from "../types/league-form-data";

const NewLeague = ({ currentUserId }: { currentUserId: number | null }) => {
  const [formData, setFormData] = useState<LeagueFormData>({
    leagueName: "",
    membershipCost: "",
    dropInCost: "",
    leagueDescription: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData: LeagueFormData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const requestBody = {
        name: formData.leagueName,
        membership_cost: parseFloat(formData.membershipCost),
        drop_in_cost: parseFloat(formData.dropInCost),
        description: formData.leagueDescription,
        president_id: currentUserId,
      };

      const response = await fetch("http://localhost:8001/leagues", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        navigate("/leagues");
      } else {
        console.error("Failed to create league.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="Basic-Page" style={{ position: "relative" }}>
      <TopBar />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          margin: "20px",
          position: "relative",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{ color: "white", padding: "4px" }}
        >
          New League
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            "& > :not(style)": {
              mb: 2,
              width: "25ch",
              backgroundColor: "white",
            },
            position: "relative",
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="leagueName"
            label="League Name"
            variant="filled"
            value={formData.leagueName}
            onChange={handleInputChange}
          />
          <TextField
            id="membershipCost"
            label="Membership cost"
            variant="filled"
            value={formData.membershipCost}
            onChange={handleInputChange}
          />
          <TextField
            id="dropInCost"
            label="Drop-in cost"
            variant="filled"
            value={formData.dropInCost}
            onChange={handleInputChange}
          />
          <TextField
            id="leagueDescription"
            label="League description"
            variant="filled"
            value={formData.leagueDescription}
            onChange={handleInputChange}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2, color: "#282828" }}
          >
            Submit
          </Button>
        </Box>
      </div>
    </div>
  );
};

export default NewLeague;
