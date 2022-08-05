import React, { useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Input from './Input';


const Auth = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);

    const handleSubmit = () => {

    };

    const handleChange = () => {

    };

    const handleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup );
        handleShowPassword(false);
    }

    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={3}>
                <Avatar>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5"> {isSignup ? "Sign Up" : "Sign In"} </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {isSignup && (
                            <React.Fragment>
                                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                <Input name="lastName" label="Last Name" handleChange={handleChange} />
                            </React.Fragment>
                        )}
                        <Input name="email" label=" Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                        {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
                        
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary">
                        {isSignup ? "Sign Up" : "Sign In"}
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignup ? "Already have an account? Please sign in." : "Don't have an account? Please sign up."}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth;