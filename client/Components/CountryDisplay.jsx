import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  AppBar,
  Button,
  CssBaseline,
  Grid,
  Stack,
  Box,
  Toolbar,
  Typography,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import Modal from './H.O.Components/Modal';
import ReviewEntry from './ReviewEntry';
import ErrorBoundary from './H.O.Components/ErrorBoundary';

function CountryDisplay() {
  const { countryInfoArr, country, capital, properties } = useSelector(
    (store) => store.geo
  );
  console.log(countryInfoArr);
  const dispatch = useDispatch();
  const [modal, showModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(false);
  }, []);

  async function renderReviews() {
    try {
      setLoading(false);
      console.log('fetched Arr:');
    } catch (err) {
      console.log(err);
    }
  }

  function toggleModal() {
    showModal(!modal);
  }
  console.log('showModal:', modal);

  return (
    <div>
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
              {country} Experiences
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction='row'
              spacing={2}
              justifyContent='center'>
              <Button variant='outlined' onClick={() => navigate('/')}>
                Back To Map
              </Button>
              <Button variant='contained' onClick={toggleModal}>
                Add Experience
              </Button>
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
              {countryInfoArr.map((expInfo) => (
                <Grid item key={expInfo.id} xs={16}>
                  <Paper
                    sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <Typography
                      variant='h5'
                      align='center'
                      color='text.secondary'
                      paragraph>
                      {expInfo.city}
                    </Typography>
                    <Table size='medium'>
                      <TableHead>
                        <TableRow>
                          <TableCell>Date</TableCell>
                          <TableCell>First Name</TableCell>
                          <TableCell>Last Name</TableCell>
                          <TableCell align='right'>Upvotes</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell>{expInfo.date}</TableCell>
                          <TableCell>{expInfo.firstName}</TableCell>
                          <TableCell>{expInfo.lastName}</TableCell>
                          <TableCell align='right'>👍 6 👎</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                    {/* <Link
                      color='primary'
                      href='#'
                      onClick={preventDefault}
                      sx={{ mt: 3 }}>
                      See more details
                    </Link> */}
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
          Thanks for sharing all your great experiences
        </Typography>
        {/* <Copyright /> */}
      </Box>
      {/* End footer */}
      {modal ? (
        <Modal>
          <ReviewEntry exitModal={toggleModal} />
        </Modal>
      ) : null}
    </div>
  );
}

// Example of nested HIGHER ORDER COMPONENTS
export default function CompanyDisplayWithErrorBoundary() {
  return (
    <ErrorBoundary>
      <CountryDisplay />
    </ErrorBoundary>
  );
}
