import * as React from 'react';
import { useParams } from 'react-router-dom'
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


export default function CompanyDisplay() {

  // const location = useLocation();
  const [cards, setCards] = React.useState([]);
  const theme = createTheme();

  // const { companyId } = location.state
  // const companyId = {companyId}
  const { companyId, companyName } = useParams();
  React.useEffect(() => {
    fetch(`/api/companies/${companyId}`)
      .then((response) => response.json())
      .then((dataObj) => {
        let compArr = dataObj.posts;
        setCards(dataObj.posts);
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
          <Container maxWidth='sm'>
            <Typography
              component='h1'
              variant='h2'
              align='center'
              color='text.primary'
              gutterBottom>
              {companyName} review
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
                <Grid item key={i + 1} xs={16}>
                  <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <Typography
                      variant='h5'
                      align='center'
                      color='text.secondary'
                      paragraph>
                      {card.title}
                    </Typography>
                    <Table size="large">
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
                        <TableRow>
                          <TableCell>{card.timePosted}</TableCell>
                          <TableCell>{card.author}</TableCell>
                          <TableCell>{card.levelName}-level {card.positionName}</TableCell>
                          <TableCell>{card.salaryRange}</TableCell>
                          <TableCell>{card.locationName}</TableCell>
                          <TableCell align="right">UPVOTES(?)</TableCell>
                        </TableRow>
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
    </ThemeProvider >
  );
}