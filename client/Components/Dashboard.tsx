import {
  AppBar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CssBaseline,
  Grid,
  Stack,
  Box,
  Toolbar,
  Typography,
  Container,
  Select,
  MenuItem,
  Autocomplete,
  TextField,
  InputLabel,
  Input,
} from '@mui/material';
import { BorderAllRounded } from '@mui/icons-material';
import React, { Fragment, useContext, useState, useEffect } from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import ReactTooltip from 'react-tooltip';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './Auth&Log';
import { RootState } from '../reduxFeatures/reduxStore';
import WorldMap from './DashboardChildren/WorldMap';

interface CompanyCardInfo {
  id: number,
  logo: string,
  name: string,
}

export default function Dashboard() {
  const { expInfoArr } = useSelector((store: RootState) => store.geo);
  const [content, setContent] = useState<FunctionConstructor | JSX.Element>();
  const { user, logOut } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
   
  }, []);

  async function renderCompanyCards() {
    try {
     
      console.log('fetched Arr:');
    } catch (err) {
      console.log('fetch err0r:', err);
    }
  }

  function handleRoute(link: string) {
    navigate(link);
  }

  function goodBye() {
    handleRoute('/');
    logOut();
  }

  return (
    <Fragment>
      <CssBaseline />
      <AppBar position='relative'>
        <Toolbar>
          <Typography
            variant='h6'
            color='inherit'
            onClick={() => handleRoute('/dashboard')}
            noWrap>
            SHAREXP
          </Typography>
          <Button onClick={goodBye}>Logout</Button>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}>
          <Container maxWidth='md'>
            <Typography
              component='h1'
              variant='h2'
              align='center'
              color='text.primary'
              gutterBottom>
              Shared Travel Experiences
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction='row'
              // maxWidth='280px'
              spacing={1}
              justifyContent='center'>
              <Box
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}>
                  <Stack spacing={2}>
                    <Select
                      defaultValue='Select a Country'
                      onChange={(e) => handleRoute(e.target.value)}
                      onBlur={(e) => handleRoute(e.target.value)}>
                      {expInfoArr.map((expInfo) => (
                        <MenuItem
                          key={expInfo.id}
                          value={`/dashboard/${expInfo.country}/${expInfo.id}`}>
                          {expInfo.country}
                        </MenuItem>
                      ))}
                    </Select>
                  </Stack>
              </Box>
             
            </Stack>
          </Container>
        </Box>
        {/* End hero unit */}
        <Box
          sx={{
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            px: '100px',
          }}>
          <Container
            maxWidth='lg'
            sx={{
              bgcolor: '#1c5375',
              borderRadius: '66px',
            }}>
            <WorldMap setTooltipContent={setContent} />
            <ReactTooltip
              className='tool-tip'
              backgroundColor='white'
              textColor='black'
              clickable>
              {content}
            </ReactTooltip>
          </Container>
        </Box>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component='footer'>
        <Typography variant='h6' align='center' gutterBottom>
          SPILL THE TEA !!!
        </Typography>
        <Typography
          variant='subtitle1'
          align='center'
          color='text.secondary'
          component='p'>
          Please add more reviews to strengthen our network
        </Typography>
      </Box>
      {/* End footer */}
    </Fragment>
  );
}
