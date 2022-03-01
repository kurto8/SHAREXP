import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
// import { createTheme, ThemeProvider } from '@mui/material/styles';

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [cards, setCards] = useState([]);
  // const theme = createTheme();

  function renderCards() {
    fetch('/api/companies')
      .then((response) => response.json())
      .then((dataObj) => {
        let compArr = dataObj.companies;
        setCards(compArr);
        setLoading(false);
        console.log(compArr);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    renderCards();
  }, []);

  function promptBox() {
    let text;
    let company = prompt('Please enter new company name:', '');
    if (company !== null && company !== undefined && company !== '') {
      // if (company) {
      text = 'Please enter a valid Company name.';
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
    // else {
    //   text = company + "has been added to the database";
    // }
  }

  return (
    <div>
      {/* <ThemeProvider theme={theme}> */}
      <CssBaseline />
      <AppBar position='relative'>
        <Toolbar>
          <Typography variant='h6' color='inherit' noWrap>
            SHAREXP
          </Typography>
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
              spacing={2}
              justifyContent='center'>
              {/* <Button variant='outlined'>Main call to action</Button> */}
              <Button variant='contained' onClick={promptBox}>
                Add Company To Dashboard
              </Button>
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth='md'>
          {/* End hero unit */}
          <Grid className='companies' container spacing={4}>
            {loading ? (
              <Grid
                sx={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                }}>
                <h1>Loading...</h1>
              </Grid>
            ) : (
              cards.map((card) => (
                <Grid item key={card.id} xs={12} sm={6} md={4}>
                  <Card
                    id={card.id}
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                    }}>
                    <CardMedia
                      component='img'
                      sx={{
                        justifyContent: 'space-around',
                        16: 9,
                        // pt: '56.25%',
                      }}
                      image={card.logo}
                      // alt='random'
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant='h5' component='h2'>
                        {/* Heading */}
                        {card.name}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Link
                        to={`/dashboard/${card.name}/${card.id}`}
                        style={{ textDecoration: 'none' }}>
                        <Button size='small'>SEE REVIEWS</Button>
                      </Link>
                    </CardActions>
                  </Card>
                </Grid>
              ))
            )}
          </Grid>
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
      {/* </ThemeProvider> */}
    </div>
  );
}
