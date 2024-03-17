import React, { useState, useEffect } from 'react';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import SpeedIcon from '@mui/icons-material/Speed';
import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import './Dashboard.css';
import { Flag } from 'lucide-react';
import axios from 'axios';

const ArtWorkList: React.FC = () => {
  const [dataGrid, setDataGrid] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/arts/');
        setDataGrid(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div id="Dashboard">
      <div className="menu">
      <Box className="important" sx={{ width: '100%', maxWidth: 280, bgcolor: 'background.paper', overflowY: 'auto' }}>
          <nav aria-label="main mailbox folders">
            <List>
              <ListItem disablePadding>
                <div className="person">
                  <div className="avatar">
                    <img src="https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_default.jpg" alt="" />
                  </div>
                  <div className="info">
                    <h6 className="name">Jaydon Frankie</h6>
                    <p className="role">admin</p>
                  </div>
                </div>
              </ListItem>
            </List>
          </nav>
          <nav aria-label="secondary mailbox folders">
            <List className="menu-item">
              <div className="menu-item-header">Manage</div>
              <ListItem disablePadding className="item-checked">
                <ListItemButton>
                  <ListItemIcon>
                    <SpeedIcon className="item-icon-checked" />
                  </ListItemIcon>
                  <ListItemText primary="Dashboard" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                    <ListItemText primary="User" />
                </ListItemButton>
              </ListItem>
              
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <EditCalendarIcon />
                  </ListItemIcon>
                  <ListItemText primary="Artwork" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <MonetizationOnIcon />
                  </ListItemIcon>
                  <ListItemText primary="Report" />
                </ListItemButton>
              </ListItem>              
            </List>
          </nav>
        </Box>
      </div>
      <div className="content">
        <div className="header">
        <div className="search">
            <SearchIcon />
            <TextField id="standard-basic" className="txt-search" variant="standard" />
            <div className="btn-search">
              <Button variant="contained" color="success">
                Search
              </Button>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row-3-7" style={{ margin: '24px' }}>
            <div className="col-7">
              <span className="circle-chart-title">Top Artwork</span>
              <Grid style={{ width: '100%' }} item xs={12} lg={8}>
                <Paper elevation={0} variant="outlined">
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                        <TableCell>id</TableCell>
                          <TableCell>title</TableCell>
                          <TableCell>Description</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {dataGrid.map((row) => (
                          <TableRow key={row.id}>
                            <TableCell>{row.id}</TableCell>
                            <TableCell>{row.title}</TableCell>
                            <TableCell>{row.description}</TableCell>
                            <TableCell>{row.status}</TableCell>
                            <TableCell align="right">
                              <Button>
                                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                                  <circle cx="12" cy="12" r="2" fill="currentColor" />
                                  <circle cx="12" cy="5" r="2" fill="currentColor" />
                                  <circle cx="12" cy="19" r="2" fill="currentColor" />
                                </svg>
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              </Grid>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArtWorkList;
