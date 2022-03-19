import React, { FormEvent, Fragment, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authenticate } from './Auth&Log';
import { UserContext } from './Auth&Log';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

export default function Login() {
  // const [loggedIn, setLoggedIn] = useContext(false);
  const { user, logIn } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    // console.log('username:', data.get('email'), 'password:', data.get('password'))
    try {
      const resData = await authenticate(
        formData.get('email'),
        formData.get('password')
      );
      console.log(resData.cookie)
      if (typeof resData.userId === 'number') {
        logIn(`${resData.userId}`);
        handleRoute('/dashboard');
        // setContext(data.userId)
      } else prompt(resData.userId + '\n' + 'Please try again');
    } catch (err) {
      console.log('error:', err);
    }
  };

  function handleRoute(link: string) {
    navigate(link);
  }

  return (
    <Fragment>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            SHAREXP
          </Typography>
          <Box
            component='form'
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}>
            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              autoFocus
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              id='password'
              autoComplete='current-password'
              type='password'
            />
            <FormControlLabel
              control={<Checkbox value='remember' color='primary' />}
              label='Remember me'
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 4 }}>
              Sign In
            </Button>

            <br />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}>
              Don't have an account?...
            </Box>
            <hr style={{ width: '67%' }} />
            <Link
              to={'/signup'}
              style={{ textDecoration: 'none', marginTop: 0 }}>
              <Button
                // type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 1, mb: 2 }}>
                Sign Up Here
              </Button>
            </Link>
          </Box>
        </Box>
      </Container>
    </Fragment>
  );
}
