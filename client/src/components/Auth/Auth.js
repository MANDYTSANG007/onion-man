import React, { useState, useEffect } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container, Toolbar } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Input from './Input';
import { GoogleLogin } from '@react-oauth/google';
import Icon from './icon';
import { useDispatch } from 'react-redux';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { signin, signup } from '../../actions/auth';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const Auth = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const [isSignup, setIsSignup] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isSignup) {
            dispatch(signup(formData, navigate))
        } else {
            dispatch(signin(formData, navigate))
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
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
            dispatch({ type: "AUTH", data: { userObject, credential } });
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        /* global google*/
        google.accounts.id.initialize({
            client_id: "680465063701-rjpjhcpgjusrrpfm50q6penv5b0bdpvh.apps.googleusercontent.com",
            callback: handleCallbackResponse
        });
        google.accounts.id.prompt();
    });

    const googleError = (error) => {
        console.log(error);
        console.log("Google sign in was unsuccessful. Try again later.")
    };

    return (
        <Container align="center" component="main" maxWidth="xs">
            <Paper elevation={3}>
                <Toolbar sx={{ justifyContent: "center" }}>
                    <Avatar >
                        <LockOutlinedIcon />
                    </Avatar>
                </Toolbar>
                <Typography variant="h5" > {isSignup ? "Sign Up" : "Sign In"} </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid sx={{ padding: 2 }} container spacing={1}>
                        {isSignup && (
                            <React.Fragment>
                                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                            </React.Fragment>
                        )}
                        <Input name="email" label=" Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                        {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
                    </Grid>

                    <Button sx={{ mt: 1 }} type="submit" fullWidth variant="contained" color="primary">
                        {isSignup ? "Sign Up" : "Sign In"}
                    </Button>
                    <div style={{ padding: 10, justifyContent: "center", display: "flex" }}>
                        <GoogleLogin
                            render={(renderProps) => (
                                <Button color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">Google Sign In</Button>
                            )}
                            onSuccess={(response) => handleCallbackResponse(response)}
                            onError={googleError}
                            cookiePolicy="single_host_origin"

                        />
                    </div>
                    <Grid sx={{ justifyContent: "center" }} container justify="flex-end">
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