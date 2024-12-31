import { useEffect, useState } from "react";
import TopBar from "../components/TopBar";
import { UserInfo } from "../types/user-info";
import { Typography, Paper, Box } from "@mui/material";

const Profile = ({ currentUserId }: { currentUserId: number | null }) => {
  const [user, setUser] = useState<UserInfo | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (currentUserId) {
        try {
          const response = await fetch(
            `http://localhost:8001/user/id/${currentUserId}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch user data");
          }
          const data = await response.json();
          setUser({
            firstName: data.first_name,
            lastName: data.last_name,
            email: data.email,
            phoneNumber: data.phone_number,
            id: data.id,
          });
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUser();
  }, [currentUserId]);

  return (
    <div className="Basic-Page">
      <TopBar />
      {user && (
        <Box
          sx={{
            marginTop: "16px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "24px", 
          }}
        >
          {/* Name Display with Background Box */}
          <Paper
            sx={{
              padding: "16px 32px",
              borderRadius: "8px",
              boxShadow: 3,
              backgroundColor: "#f5f5f5",
              width: "fit-content", 
              textAlign: "center", 
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontSize: "50px",
                fontWeight: "bold",
                color: "#333",
              }}
            >
              {user.firstName} {user.lastName}
            </Typography>
          </Paper>

          {/* Additional Information Section */}
          <Box
            sx={{
              padding: "16px 32px",
              borderRadius: "8px",
              backgroundColor: "#f0f0f0",
              width: "fit-content",
              textAlign: "left",
              boxShadow: 2,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Player Information
            </Typography>
            <Typography variant="body1" sx={{ marginTop: "8px" }}>
              <strong>Player ID:</strong> {user.id}
            </Typography>
            <Typography variant="body1" sx={{ marginTop: "8px" }}>
              <strong>Email:</strong> {user.email}
            </Typography>
            <Typography variant="body1" sx={{ marginTop: "8px" }}>
              <strong>Phone Number:</strong> {user.phoneNumber}
            </Typography>
          </Box>
        </Box>
      )}
    </div>
  );
};

export default Profile;
