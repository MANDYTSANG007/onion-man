import React, { useEffect }from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@mui/material';
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import { ThemeProvider } from '@mui/material/styles';
import theme from './styles';
import { useDispatch } from 'react-redux';
import { getPosts } from './actions/posts';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
    <Container sx={{bgcolor:"secondary.main" }} maxWidth="lg">
      <AppBar sx={{bgcolor:"primary.main" }} position="static" color="inherit">
        <Typography variant="h2" align="center">Onion Recipes</Typography>
      </AppBar>
      <Grow in>
        <Container>
          <Grid container justify="space-between" alignItems="stretch" spacing="3">
            <Grid item xs={12} sm={7}>
              <Posts />
            </Grid>
            <Grid item xs={12} sm={7}>
              <Form />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
    </ThemeProvider>
  );
}

export default App;
