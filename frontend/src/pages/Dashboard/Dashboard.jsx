import React from 'react'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SpeedIcon from '@mui/icons-material/Speed';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import PersonIcon from '@mui/icons-material/Person';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import DescriptionIcon from '@mui/icons-material/Description';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PeopleIcon from '@mui/icons-material/People';
import MovingIcon from '@mui/icons-material/Moving';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import IconButton from '@mui/material/IconButton';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';
import "./Dashboard.css";
import { SpeedDialIcon, TextField } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CircleIcon from '@mui/icons-material/Circle';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import MyChart from './chart/ApexChart';
import { Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { Grid, Paper, CardHeader, TableContainer, Table, TableHead, TableBody, TableCell, TableRow, Divider } from '@mui/material';

const Dashboard = () => {
  const [value, setValue] = React.useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const data = [
    { value: 5, label: 'A', color: 'rgb(200, 250, 205)' },
    { value: 10, label: 'B', color: 'rgb(91, 229, 132)' },
    { value: 15, label: 'C', color: 'rgb(0, 171, 85)' },
    { value: 20, label: 'D', color: 'rgb(0, 123, 85)' },
  ];
  const size = {
    width: 400,
    height: 200,
  };

  const StyledText = styled('text')(({ theme }) => ({
    fill: theme.palette.text.primary,
    textAnchor: 'middle',
    dominantBaseline: 'central',
    fontSize: 20,
  }));

  const CustomLabel = ({ value, x, y }) => {
    return (
      <text x={x} y={y}>
        <tspan x={x}>Total</tspan>

        <tspan style={{ marginTop: "10px", fontWeight: "600", fontSize: "1.5rem" }} x={x} dy="1.2em">{value}</tspan>
      </text>
    );
  };

  function PieChartWithPaddingAngle() {
    return (
      <PieChart series={[{
        data, innerRadius: 80, cx: 200,
        label: {
          text: <span className="pie-chart-label"><br />{data[2].value}</span>,
          position: 'center',
        }
      }]} {...size}>
        <CustomLabel value={data[2].value} x={190} y={100} />
      </PieChart>
    );
  }

  const dataGrid = [
    { id: 1, name: 'John Doe', age: 30 },
    { id: 2, name: 'Jane Smith', age: 25 },
    { id: 3, name: 'Peter Parker', age: 22 },
  ];
  return (
    <div id='Dashboard'>
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
            <List className='menu-item'>
              <div className='menu-item-header'>general</div>
              <ListItem disablePadding className='item-checked'>
                <ListItemButton>
                  <ListItemIcon>
                    <SpeedIcon className='item-icon-checked' />
                  </ListItemIcon>
                  <ListItemText primary="App" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <MonetizationOnIcon />
                  </ListItemIcon>
                  <ListItemText primary="E-Commerce" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <QueryStatsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Analytics" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <AccountBalanceIcon />
                  </ListItemIcon>
                  <ListItemText primary="Banking" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <EditCalendarIcon />
                  </ListItemIcon>
                  <ListItemText primary="Booking" />
                </ListItemButton>
              </ListItem>
              <div className='menu-item-header'>management</div>
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
                    <LocalGroceryStoreIcon />
                  </ListItemIcon>
                  <ListItemText primary="E-Commerce" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <DescriptionIcon />
                  </ListItemIcon>
                  <ListItemText primary="Invoice" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <EditCalendarIcon />
                  </ListItemIcon>
                  <ListItemText primary="Blog" />
                </ListItemButton>
              </ListItem>
              <div className='menu-item-header'>app</div>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <MonetizationOnIcon />
                  </ListItemIcon>
                  <ListItemText primary="Mail" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <QueryStatsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Chat" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <AccountBalanceIcon />
                  </ListItemIcon>
                  <ListItemText primary="Calendar" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <EditCalendarIcon />
                  </ListItemIcon>
                  <ListItemText primary="Kanban" />
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
            <TextField id="standard-basic" className='txt-search' variant="standard" />
            <div className="btn-search">
              <Button variant="contained" color="success">
                Search
              </Button>
            </div>
          </div>
          <div className="action">
            <NotificationsIcon />
            <PeopleIcon />
            <div className="avatar">
              <img src="https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_default.jpg" alt="" />
            </div>
          </div>
        </div>
        <div className="container">
          <div className="banner">
            <div className="banner-description">
              <h4 className="banner-header">
                Welcome back,
                <br></br>
                Jaydon Frankie
              </h4>
              <p className="banner-detail">
                If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything
              </p>
            </div>
            <div className="banner-img">
              <img src="	https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_default.jpg" alt="" />
            </div>
          </div>
          <div className="total">
            <div className="total-item">
              <div className="total-description">
                <h6 className="total-header">Total Active Users</h6>
                <div className="total-percent"><MovingIcon /> 2.6%</div>
                <h3 className="total-number">18,765</h3>
              </div>
              <div className="total-icon">
                <EqualizerIcon />
              </div>
            </div>
            <div className="total-item">
              <div className="total-description">
                <h6 className="total-header">Total Active Users</h6>
                <div className="total-percent"><MovingIcon /> 2.6%</div>
                <h3 className="total-number">18,765</h3>
              </div>
              <div className="total-icon">
                <EqualizerIcon />
              </div>
            </div>
            <div className="total-item">
              <div className="total-description">
                <h6 className="total-header">Total Active Users</h6>
                <div className="total-percent"><MovingIcon /> 2.6%</div>
                <h3 className="total-number">18,765</h3>
              </div>
              <div className="total-icon">
                <IconButton style={{ width: 60, height: 36 }}>
                  <EqualizerIcon />
                </IconButton>
              </div>
            </div>
          </div>
          <div className="row-3-7">
            <div className="col-3 circle-chart">
              <span className="circle-chart-title">Current Download</span>
              <div className="circle-chart-content">
                {PieChartWithPaddingAngle()}
              </div>
              <div className="circle-chart-quote">
                <div className="quote-item"><CircleIcon className='circle-icon' style={{ color: "rgb(200, 250, 205)" }} />Mac</div>
                <div className="quote-item"><CircleIcon className='circle-icon' style={{ color: "rgb(91, 229, 132)" }} />Window</div>
                <div className="quote-item"><CircleIcon className='circle-icon' style={{ color: "rgb(0, 171, 85)" }} />IOS</div>
                <div className="quote-item"><CircleIcon className='circle-icon' style={{ color: "rgb(0, 123, 85)" }} />Android</div>
              </div>
            </div>
            <div className="col-7">
              <div className="chart-header">
                <div className="chart-header-title">
                  <span>Area Installed</span>
                  <p>(+43%) than last year</p>
                </div>
                <FormControl sx={{ m: 1, minWidth: 80, maxHeight: 50 }} id='year-dropdown'>
                  <InputLabel id="demo-simple-select-label">Year</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={value}
                    label="Dropdown"
                    onChange={handleChange}
                  >
                    <MenuItem value={'option1'}>1997</MenuItem>
                    <MenuItem value={'option2'}>1998</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <MyChart className="chart-content" />
            </div>
          </div>
          <div className="row-3-7" style={{ margin: "24px" }}>
            <div className="col-7">
              <span className="circle-chart-title">New Invoice</span>
              <Grid style={{ width: "100%" }} item xs={12} lg={8}>
                <Paper elevation={0} variant="outlined">
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Invoice ID</TableCell>
                          <TableCell>Category</TableCell>
                          <TableCell>Price</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell>INV-1710327147422</TableCell>
                          <TableCell>Mac</TableCell>
                          <TableCell>$16.19</TableCell>
                          <TableCell><span>In progress</span></TableCell>
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
                        <TableRow>
                          <TableCell>INV-1710327147422</TableCell>
                          <TableCell>Mac</TableCell>
                          <TableCell>$16.19</TableCell>
                          <TableCell><span>In progress</span></TableCell>
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
                        <TableRow>
                          <TableCell>INV-1710327147422</TableCell>
                          <TableCell>Mac</TableCell>
                          <TableCell>$16.19</TableCell>
                          <TableCell><span>In progress</span></TableCell>
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
                        <TableRow>
                          <TableCell>INV-1710327147422</TableCell>
                          <TableCell>Mac</TableCell>
                          <TableCell>$16.19</TableCell>
                          <TableCell><span>In progress</span></TableCell>
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
                        <TableRow>
                          <TableCell>INV-1710327147422</TableCell>
                          <TableCell>Mac</TableCell>
                          <TableCell>$16.19</TableCell>
                          <TableCell><span>In progress</span></TableCell>
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
                        <TableRow>
                          <TableCell>INV-1710327147422</TableCell>
                          <TableCell>Mac</TableCell>
                          <TableCell>$16.19</TableCell>
                          <TableCell><span>In progress</span></TableCell>
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
                        <TableRow>
                          <TableCell>INV-1710327147422</TableCell>
                          <TableCell>Mac</TableCell>
                          <TableCell>$16.19</TableCell>
                          <TableCell><span>In progress</span></TableCell>
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
                        <TableRow>
                          <TableCell>INV-1710327147422</TableCell>
                          <TableCell>Mac</TableCell>
                          <TableCell>$16.19</TableCell>
                          <TableCell><span>In progress</span></TableCell>
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
                        <TableRow>
                          <TableCell>INV-1710327147422</TableCell>
                          <TableCell>Mac</TableCell>
                          <TableCell>$16.19</TableCell>
                          <TableCell><span>In progress</span></TableCell>
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
                        {/* More rows */}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
                <Box className="grid-view-all">
                  <Button>
                    View All
                    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M10 19a1 1 0 0 1-.64-.23a1 1 0 0 1-.13-1.41L13.71 12L9.39 6.63a1 1 0 0 1 .15-1.41a1 1 0 0 1 1.46.15l4.83 6a1 1 0 0 1 0 1.27l-5 6A1 1 0 0 1 10 19"></path>
                    </svg>
                  </Button>
                </Box>
              </Grid>
            </div>
            <div className="col-3">
              <span className="circle-chart-title">Top Authors</span>
              <div className="author-content">
                <div className="author-item">
                  <div className="avatar">
                    <img src="https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_default.jpg" alt="" />
                  </div>
                  <div className="author-info">
                    <h6 className="author-name">Deja Brady</h6>
                    <span className="author-react"><FavoriteIcon id='favorite-icon'/><span>15.45k</span></span>
                  </div>
                  <div id="author-icon"><EmojiEventsIcon /></div>
                </div>
              </div>
              <div className="author-content">
                <div className="author-item">
                  <div className="avatar">
                    <img src="https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_default.jpg" alt="" />
                  </div>
                  <div className="author-info">
                    <h6 className="author-name">Deja Brady</h6>
                    <span className="author-react"><FavoriteIcon id='favorite-icon'/><span>15.45k</span></span>
                  </div>
                  <div id="author-icon"><EmojiEventsIcon /></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard