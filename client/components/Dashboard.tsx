import React, { Fragment, useContext, useState, useEffect } from 'react';
import ReactTooltip from 'react-tooltip';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './Auth&Log';
import WorldMap from './WorldMap';
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
} from '@mui/material';
import { BorderAllRounded } from '@mui/icons-material';
// import CompanyDisplayWithErrorBoundary from './CompanyDisplay';

interface CompanyCardInfo {
  id: number,
  logo: string,
  name: string,
}

export default function Dashboard() {
  const [content, setContent] = useState<FunctionConstructor | JSX.Element>();

  const storage = sessionStorage.getItem('DashboardCache');
  const cache = useState(storage ? JSON.parse(storage) : []);
  const [cachedData, setCachedData] = useState(storage ? true : false);
  const { user, logOut } = useContext(UserContext);
  const [cards, setCompanyCards] = useState<Array<CompanyCardInfo>>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    console.log('cache:', cache[0]);
    if (cachedData) {
      setCompanyCards(cache[0]);
      setLoading(false);
    } else renderCompanyCards();
  }, []);

  async function renderCompanyCards() {
    try {
      const response = await fetch('/api/companies');
      const dataObj: Record<string, CompanyCardInfo[]> = await response.json();
      let compArr = dataObj.companies;
      sessionStorage.setItem('DashboardCache', JSON.stringify(compArr));
      setCachedData(true);
      setCompanyCards(compArr);
      setLoading(false);
      console.log('fetched Arr:', compArr);
    } catch (err) {
      console.log('fetch err0r:', err);
    }
  }

  function promptBox() {
    let company = prompt('Please enter new company name:', '');
    if (company !== null && company !== undefined && company !== '') {
      fetch('/api/companies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: company,
        }),
      })
        .then((response) => response.json())
        .then((dataObj) => {
          console.log(dataObj);
          renderCompanyCards();
        })
        .catch((err) => console.log(err));
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
              Reviewed Companies
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
                <Button
                  variant='contained'
                  onClick={() => setSearch(search ? false : true)}>
                  Search Existing Companies
                </Button>
                <br />
                {search ? (
                  <Stack spacing={2}>
                    <Select
                      value=''
                      onChange={(e) => handleRoute(e.target.value)}
                      onBlur={(e) => handleRoute(e.target.value)}>
                      {cards.map((company) => (
                        <MenuItem
                          key={company.id}
                          value={`/dashboard/${company.name}/${company.id}`}>
                          {company.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </Stack>
                ) : null}
              </Box>
              <Box
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}>
                <Button variant='outlined' onClick={promptBox}>
                  Add Company To Dashboard
                </Button>
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
