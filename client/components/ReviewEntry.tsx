import React, { useState, Fragment } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
// import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
// import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
import Basics from './ReviewBasics';
// import PaymentForm from './PaymentForm';
// import Review from './Review';

const steps: string[] = [
  'Basic Information',
  'Review Specifics',
  'Complete Review',
];

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return <Basics description={steps[0]} />;
    // case 1:
    //   return <PaymentForm />;
    // case 2:
    //   return <Review />;
    default:
      throw new Error('Unknown step');
  }
}

// const theme = createTheme();

// export default function ReviewModal( { exitModal }: {exitModal: () => void }) {
export default function ReviewModal(props: Record<string, () => void>) {
  const { exitModal } = props;
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <Fragment>
      {/* <ThemeProvider theme={theme}> */}
      <CssBaseline />
      {/* <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Company name
          </Typography>
        </Toolbar>
      </AppBar> */}
      <Container component='main' maxWidth='sm'>
        <Paper
          variant='outlined'
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component='h1' variant='h4' align='center'>
            Review Details
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {/* <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order
                  confirmation, and will send you an update when your order has
                  shipped.
                </Typography>
              </React.Fragment>
            ) : ( */}
          <React.Fragment>
            {getStepContent(activeStep)}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              {activeStep !== 0 && (
                <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                  Back
                </Button>
              )}
              <Button
                variant='contained'
                onClick={exitModal}
                sx={{ mt: 3, ml: 1 }}>
                No Review
              </Button>
              <Button
                variant='contained'
                onClick={handleNext}
                sx={{ mt: 3, ml: 1 }}>
                {activeStep === steps.length - 1 ? 'Submit Review' : 'Next'}
              </Button>
            </Box>
          </React.Fragment>
          {/* )}
          </React.Fragment> */}
        </Paper>
      </Container>
      {/* </ThemeProvider> */}
    </Fragment>
  );
}
