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
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { createTheme, ThemeProvider } from '@mui/material/styles';


export default function REI() {
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

  React.useEffect(() => {
    fetch('/api/companies')
      .then((response) => response.json())
      .then((dataObj) => {
        let compArr = dataObj.companies;
        setCards(dataObj.companies);
        console.log(compArr);
        console.log(cards);
      })
      .catch((err) => console.log(err));
  }, []);

  function preventDefault(event) {
    event.preventDefault();
  }

  return (
    <ThemeProvider theme={theme}>
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
          <Container maxWidth='sm'>
            <Typography
              component='h1'
              variant='h2'
              align='center'
              color='text.primary'
              gutterBottom>
              "Company" review
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction='row'
              spacing={2}
              justifyContent='center'>
              <Button variant='contained'>Add New Review</Button>
              {/* <Button variant='outlined'>Secondary action</Button> */}
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth='md'>
          {/* End hero unit */}
          <Grid container spacing={4}>
            {!cards && <>Still Loading.....</>}
            {cards &&
              cards.map((card, i) => (
                <Grid item key={i + 1} xs={12}>
                  <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <Typography
                      variant='h5'
                      align='center'
                      color='text.secondary'
                      paragraph>
                      Title of Review
                    </Typography>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Date</TableCell>
                          <TableCell>Name</TableCell>
                          <TableCell>Position</TableCell>
                          <TableCell>Salary Range</TableCell>
                          <TableCell>Job Location</TableCell>
                          <TableCell align="right">UPVOTES(?)</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        Insert Stuff Here
                      </TableBody>
                    </Table>
                    <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
                      See more details
                    </Link>
                  </Paper>
                </Grid>
              ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component='footer'>
        <Typography variant='h6' align='center' gutterBottom>
          Footer
        </Typography>
        <Typography
          variant='subtitle1'
          align='center'
          color='text.secondary'
          component='p'>
          Something here to give the footer a purpose!
        </Typography>
        {/* <Copyright /> */}
      </Box>
      {/* End footer */}
    </ThemeProvider >
  );
}