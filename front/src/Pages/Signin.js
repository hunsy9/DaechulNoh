import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme();

export default function SignIn() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const loginData = {
      email: data.get('email'),
      password: data.get('password'),
    };

    const raw = JSON.stringify(loginData);

    const requestOptions = {
      method: 'POST',
      body: raw,
      redirect: 'follow'
    };

    fetch("http://ndc.koreacentral.cloudapp.azure.com:5555/api/user/login", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
            
          <Typography component="h1" variant="h5" sx={{
              color: "#0a0a0a", 
              fontFamily: 'Inter',
              fontWeight: 'bold',
              fontSize: '35px', 
              marginBottom: '30px',
              marginTop: '30px',
              }}>
            {/* fontFamily: Inter */}
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              sx = {{
                marginBottom: '15px',
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              sx = {{
                marginBottom: '20px',
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              
              sx={{ mt: 3, mb: 2,  
                fontFamily: 'sans-serif',
                fontWeight: 'bold',
                fontSize: '16px', 
                textTransform: 'none',
                backgroundColor: '#3d3d3d'
                }}
            >
              Login
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/" variant="body2" 
                sx={{
                  color: "#0a0a0a", 
                  fontFamily: 'Inter',
                  }}>
                  Back to Home
                </Link>
              </Grid>

            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}