import React, { Component, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
import { FamilyRestroomOutlined } from '@mui/icons-material';
import Modal from './Modal';
import ReviewEntry from './ReviewEntry';
import ErrorBoundary from './ErrorBoundary';
// import { Portal } from '@mui/material';

function CompanyDisplay() {
  const [cards, setCards] = useState([]);
  const [modal, showModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const { companyId, companyName } = useParams();
  const theme = createTheme();
  // const modalRoot = document.getElementById('modal');
  // console.log(modalRoot);

  useEffect(() => {
    fetch(`/api/companies/${companyId}`)
      .then((response) => response.json())
      .then((dataObj) => {
        let compArr = dataObj.posts;
        setCards(dataObj.posts);
        setLoading(false);
        console.log(compArr);
      })
      .catch((err) => console.log(err));
  }, []);

  function toggleModal() {
    console.log('showModal:', modal);
    showModal(!modal ? true : false);
  }

  function preventDefault(event) {
    event.preventDefault();
  }

  // class CompanyDisplay extends Component {
  //   constructor() {
  //     super();
  //     this.state = {
  //       loading: true,
  //       cards: [],
  //       showModal: false,
  //     };
  //   }

  //   async componentDidMount() {
  //     const { companyId, companyName } = useParams();
  //     const res = await fetch(`/api/companies/${companyId}`);
  //     const dataObj = await res.json();
  //     this.setState({
  //       loading: false,
  //       cards: dataObj.posts,
  //     });
  //   }

  //   toggleModal = () =>
  //     this.setState({ showModal: !this.state.showModal ? true : false });

  //   render() {
  //     const theme = createTheme();
  //     const { cards } = this.state;

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
          <Container maxWidth='sm'>
            <Typography
              component='h1'
              variant='h2'
              align='center'
              color='text.primary'
              gutterBottom>
              {companyName} Reviews
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction='row'
              spacing={2}
              justifyContent='center'>
              <Button variant='contained' onClick={toggleModal}>
                Add New Review
              </Button>
              {/* <Button variant='outlined'>Secondary action</Button> */}
            </Stack>
          </Container>
        </Box>
        {/* End hero unit */}
        <Container sx={{ py: 8 }} maxWidth='md'>
          {loading ? (
            <Box>
              <Typography component='h1' variant='h4' align='center'>
                Loading...
              </Typography>
            </Box>
          ) : (
            <Grid container spacing={4}>
              {cards.map((card) => (
                <Grid item key={card.id} xs={16}>
                  <Paper
                    sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <Typography
                      variant='h5'
                      align='center'
                      color='text.secondary'
                      paragraph>
                      Review Title: {card.title}
                    </Typography>
                    <Table size='large'>
                      <TableHead>
                        <TableRow>
                          <TableCell>Date</TableCell>
                          <TableCell>Name</TableCell>
                          <TableCell>Position</TableCell>
                          <TableCell>Salary Range</TableCell>
                          <TableCell>Job Location</TableCell>
                          <TableCell align='right'>Upvotes</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell>{card.timePosted.slice(0, 10)}</TableCell>
                          <TableCell>{card.author}</TableCell>
                          <TableCell>
                            {card.levelName}-level {card.positionName}
                          </TableCell>
                          <TableCell>{card.salaryRange}</TableCell>
                          <TableCell>{card.locationName}</TableCell>
                          <TableCell align='right'>👍 6 👎</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                    <Link
                      color='primary'
                      href='#'
                      onClick={preventDefault}
                      sx={{ mt: 3 }}>
                      See more details
                    </Link>
                  </Paper>
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
        {/* <Copyright /> */}
      </Box>
      {/* End footer */}
      {modal ? (
        // <Portal container={modalRoot}>
        <Modal>
          <ReviewEntry exitModal={toggleModal} />
        </Modal>
      ) : null}
      {/* </Portal> */}
      {/* </ThemeProvider> */}
    </div>
  );
}

// export default CompanyDisplay;

// Example of nested HIGHER ORDER COMPONENTS
export default function CompanyDisplayWithErrorBoundary() {
  return (
    <ErrorBoundary>
      <CompanyDisplay />
    </ErrorBoundary>
  );
}
