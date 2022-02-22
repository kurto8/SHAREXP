import * as React from 'react';
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
// import Link from '@mui/material/Link';
import { Link } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';


export default function Dashboard() {
  // let cards = [
  //   { id: 15, name: 'REI', logo: 'https://logo.clearbit.com/rei.com' },
  //   {
  //     id: 21,
  //     name: 'Jollibee',
  //     logo: 'https://logo.clearbit.com/jollibeefoods.com',
  //   },
  //   {
  //     id: 22,
  //     name: 'sweetgreen',
  //     logo: 'https://logo.clearbit.com/sweetgreen.com',
  //   },
  //   {
  //     id: 23,
  //     name: 'Atlassian',
  //     logo: 'https://logo.clearbit.com/atlassian.com',
  //   },
  //   { id: 24, name: 'Vans', logo: 'https://logo.clearbit.com/vans.com' },
  // ];

  const [cards, setCards] = React.useState([]);
  const theme = createTheme();

  function renderCards() {
    fetch('/api/companies')
      .then((response) => response.json())
      .then((dataObj) => {
        let compArr = dataObj.companies;
        setCards(dataObj.companies);
        console.log(compArr);
        console.log(cards);
      })
      .catch((err) => console.log(err));
  }

  React.useEffect(() => {
    renderCards();
    // fetch('/api/companies')
    //   .then((response) => response.json())
    //   .then((dataObj) => {
    //     let compArr = dataObj.companies;
    //     setCards(dataObj.companies);
    //     console.log(compArr);
    //     console.log(cards);
    //   })
    //   .catch((err) => console.log(err));
  }, []);

  function promptBox() {
    let text;
    let company = prompt("Please enter new company name:", "");
    if (company !== null || company !== "") {
      text = "Please enter a valid Company name.";
      fetch('/api/companies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: company
        })
      })
        .then((response) => response.json())
        .then((dataObj) => {
          console.log(dataObj);
          renderCards();
          // console.log(compArr);
          // console.log(cards);
        }).catch((err) => console.log(err));
    } 
    // else {
    //   text = company + "has been added to the database";
    // }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position='relative'>
        <Toolbar>
          <Typography variant='h6' color='inherit' noWrap>
            SHAREXP - LA COHORT 47
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
              {/* <Button variant='contained'>Main call to action</Button> */}
              <Button variant='outlined' onClick={promptBox}>Add Company To Dashboard</Button>
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth='md'>
          {/* End hero unit */}
          <Grid className='companies' container spacing={4}>
            {!cards && <>Still Loading.....</>}
            {cards &&
              cards.map((card, i) => (
                <Grid item key={i + 1} xs={12} sm={6} md={4} >
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
                      // image='https://source.unsplash.com/random'
                      image={card.logo}
                    // alt='random'
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant='h5' component='h2'>
                        {/* Heading */}
                        {card.name}
                      </Typography>
                      {/* <Typography>
                        This is a media card. You can use this section to
                        describe the content.
                      </Typography> */}
                    </CardContent>
                    <CardActions>
                      <Link to={`/dashboard/${card.name}/${card.id}`}>
                      {/* <Link to={`/companies/${card.name}`}> */}
                        <Button size='small'>SEE REVIEWS</Button>
                        {/* <Button size='small'>Edit</Button> */}
                      </Link>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
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
        {/* <Copyright /> */}
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}

