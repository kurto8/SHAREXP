import React, { useState, Fragment } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
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
      <CssBaseline />
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
          <Fragment>
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
          </Fragment>
        </Paper>
      </Container>
    </Fragment>
  );
}
