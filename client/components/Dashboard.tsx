import React, { Fragment, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './Auth&Log';
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
// import CompanyDisplayWithErrorBoundary from './CompanyDisplay';

interface CompanyCardInfo {
  id: number;
  logo: string;
  name: string;
}

let cache: CompanyCardInfo[] = [];

export default function Dashboard() {
  const { user, logOut } = useContext(UserContext);
  const [cards, setCards] = useState<Array<CompanyCardInfo>>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(false);
  const [add, setAdd] = useState(false);
  const [company, setCompany] = useState({});
  const [inputCompany, setInputCompany] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    renderCards();
  }, []);

  function renderCards() {
    // if (!cache[0]) {
    fetch('/api/companies')
      .then((response) => response.json())
      .then((dataObj: Record<string, CompanyCardInfo[]>) => {
        // console.log(dataObj)
        let compArr = dataObj.companies;
        setCards(compArr);
        setLoading(false);
        // cache = compArr;
        // console.log(cache);
      })
      .catch((err) => console.log(err));
    // } else setCards(cache);
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
          renderCards();
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

  // function handleSelect() {
  //   setCompany(cards[0]);
  //   setInputCompany( `${cards[0].name}/${cards[0].id}`);
  //   handleCompanySelect(`${cards[0].name}/${cards[0].id}`)
  // }

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
                    {/* <Autocomplete
                      // id="links"
                      value={company}
                      inputValue={inputCompany}
                      onChange={(event, newValue) => {
                        setCompany(newValue);
                      }}
                      onInputChange={(event, newInput) => {
                        setInputCompany(newInput);
                      }}
                      options={cards}
                      getOptionLabel={(option) => option.name}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          // {...input}
                          label='Search here....'
                        />
                      )}
                      onClick={handleSelect}
                      onKeyUp={(e) => {
                        if (e.key === "Enter") handleSelect
                      }}
                    /> */}
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
                {/* <br />
                {add ? (
                  <TextField
                    value={company}
                    label='Enter new company name:'
                    onChange={(e) => {
                      // if (/^[a-z0-9\s]+$/i.test(e.target.value)) setCompany(e.target.value)
                      if (e.target.value[-1] !== "Enter") setCompany(e.target.value)
                    }}
                    onKeyUp={(e) => {
                      if (e.key === 'Enter') promptBox(company)
                    }}
                    ></TextField>
                 ) : null}  */}
              </Box>
            </Stack>
          </Container>
        </Box>
        {/* End hero unit */}
        <Container sx={{ py: 8 }} maxWidth='lg'>
          {loading ? (
            <Box>
              <Typography component='h1' variant='h4' align='center'>
                Loading...
              </Typography>
            </Box>
          ) : (
            <Grid
              className='companies'
              container
              spacing={4}
              id='cardsContainer'>
              {cards.map((card) => (
                <Grid item key={card.id} xs={6} sm={4} md={3} lg={2}>
                  <Card
                    id={`${card.id}`}
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                    }}>
                    <Box
                      sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                      }}>
                      <CardMedia
                        component='img'
                        sx={{
                          justifyContent: 'space-around',
                          // 16: 9,
                        }}
                        image={card.logo}
                        // alt='random'
                      />
                    </Box>
                    <CardContent sx={{ flexGrow: 1, py: 0 }}>
                      <Typography variant='h5' component='h2'>
                        {/* Heading */}
                        {card.name}
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ py: 0, pl: '6%' }}>
                      <Button
                        sx={{ py: 0 }}
                        size='small'
                        onClick={() =>
                          handleRoute(`/dashboard/${card.name}/${card.id}`)
                        }>
                        SEE REVIEWS
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
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
