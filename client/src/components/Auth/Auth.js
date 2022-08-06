import React, { useState, useEffect } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Input from './Input';
import { GoogleLogin } from '@react-oauth/google';
import Icon from './icon';
import { useDispatch } from 'react-redux';
import jwt_decode from 'jwt-decode';


const Auth = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const dispatch = useDispatch();

    const handleSubmit = () => {

    };

    const handleChange = () => {

    };

    const handleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    // Switch form feature for sign up and sign in
    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
        handleShowPassword(false);
    }

    const handleCallbackResponse = async (response) => {
        const userObject = jwt_decode(response.credential);
        const credential = response.credential;
        console.log(userObject);
        try {
            dispatch({ type: "AUTH", data: {userObject, credential}});

        } catch(error) {
            console.log(error);
        }
    };

    useEffect(() => {
        /* global google*/
        google.accounts.id.initialize({
            client_id: 
            callback: handleCallbackResponse
        });
        google.accounts.id.prompt();
    }, []);

    const googleError = (error) => {
        console.log(error);
        console.log("Google sign in was unsuccessful. Try again later.")
    };

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

                    <GoogleLogin
                        render={(renderProps) => (
                            <Button color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">Google Sign In</Button>
                        )}
                        onSuccess={(response) => handleCallbackResponse(response)}
                        onError={googleError}
                        cookiePolicy="single_host_origin"
                    />

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