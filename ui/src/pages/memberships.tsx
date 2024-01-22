import Typography from "@mui/material/Typography";
import "../App.css";
import TopBar from "../components/TopBar";

const Memberships = ({ currentUserId }: { currentUserId: number | null }) => {
  console.log(currentUserId);

  return (
    <div className="Basic-Page">
      <TopBar />

      <div style={{ margin: "20px" }}>
        <Typography variant="h4" gutterBottom sx={{ color: "white" }}>
          Memberships
        </Typography>
      </div>
    </div>
  );
};

export default Memberships;
