import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const UserDashboard = () => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            UBC Volleyball Club Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      <div style={{ margin: '20px' }}>
        <Typography variant="h4" gutterBottom>
          Upcoming Events
        </Typography>

        {/* Placeholder for upcoming events */}
        <div>
          <Typography>Event 1</Typography>
          <Typography>Event 2</Typography>
          <Typography>Event 3</Typography>
          {/* Add more placeholders or map through an events array */}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
