import React from 'react';
import { Container } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from './styles';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Container sx={{ bgcolor: "secondary.main" }} maxWidth="lg">
          <Navbar />
          <Routes>
            <Route path="/" exact component={Home} />
            <Route path="/auth" exact  />
          </Routes>
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
