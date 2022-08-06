import React from 'react';
import { Container } from '@mui/material';
// import { ThemeProvider } from '@mui/material/styles';
// import theme from './styles';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

const App = () => (
  <GoogleOAuthProvider clientId=
    <BrowserRouter>
      {/* <ThemeProvider theme={theme}> */}
      <Container sx={{ bgcolor: "secondary.main" }} maxWidth="lg">
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/auth" exact element={<Auth />} />
        </Routes>
      </Container>
      {/* </ThemeProvider> */}
    </BrowserRouter>
  </GoogleOAuthProvider>
);

export default App;
