import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
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
import Modal from './Modal';
import ReviewEntry from './ReviewEntry';
import ErrorBoundary from './ErrorBoundary';

function CompanyDisplay() {
  interface ReviewBasics {
    id: number;
    title: string;
    timePosted: string;
    author: string;
    levelName: string;
    positionName: string;
    salaryRange: string;
    locationName: string;
    userId?: number;
    companyId?: number | undefined;
  }

  const { companyId, companyName } = useParams();
  const storage = sessionStorage.getItem(`${companyId}` + 'Cache')
  const cache = useState(storage ? JSON.parse(storage) : []);
  const [cachedData, setCachedData] = useState(storage ? true : false);
  const [cards, setCards] = useState<Array<ReviewBasics>>([]);
  const [modal, showModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('cache:', cache[0]);
    if (cachedData) {
      setCards(cache[0]);
      setLoading(false);
    } else renderReviews();
  }, []);

  async function renderReviews() {
    try {
      const response = await fetch(`/api/companies/${companyId}`);
      const dataObj: Record<string, ReviewBasics[]> = await response.json();
      let reviewsArr = dataObj.posts;
      sessionStorage.setItem(
        `${companyId}` + 'Cache',
        JSON.stringify(reviewsArr)
      );
      setCachedData(true);
      setCards(reviewsArr);
      setLoading(false);
      console.log('fetched Arr:', reviewsArr);
    } catch (err) {
      console.log(err);
    }
  }

  function toggleModal() {
    showModal(!modal ? true : false);
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
              {companyName} Reviews
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction='row'
              spacing={2}
              justifyContent='center'>
              <Link to={'/dashboard'} style={{ textDecoration: 'none' }}>
                <Button variant='outlined'>Back To Dashboard</Button>
              </Link>
              <Button variant='contained' onClick={toggleModal}>
                Add New Review
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
                    <Table size='medium'>
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
          Please add more reviews to strengthen our network
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

// export default CompanyDisplay;

// Example of nested HIGHER ORDER COMPONENTS
export default function CompanyDisplayWithErrorBoundary() {
  return (
    <ErrorBoundary>
      <CompanyDisplay />
    </ErrorBoundary>
  );
}

// /** Example of creating the component with classes **/
// function preventDefault(event) {
//   event.preventDefault();
// }

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
