import React from 'react';
import logo from '../logo.png';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import '../App.css';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';

const UserDashboard = () => {
  return (
    <div className='Basic-Page'>
      
        <AppBar position="static" sx={{backgroundColor: "#282828"}}>
          <Toolbar>
            <Typography variant="h6">
              Events Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
      

      <div style={{ margin: '20px' }}>
        <Typography variant="h4" gutterBottom sx={{color: "white"}}>
          Upcoming Events
        </Typography>

        <div>
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image=""
              alt="event"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Sample event 1
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget ultricies aliquam, nunc nisl ultrices nunc, eget ultricies nisl nisl eget nisl.
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
