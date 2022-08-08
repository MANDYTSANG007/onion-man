import React, { useState, useEffect } from 'react';
import { AppBar, Typography, Avatar, Toolbar, Button } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';


const Navbar = () => {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const credential = user?.credential;
        
        if(credential) {
            const decodedCredential = decode(credential);
            if(decodedCredential.exp * 1000 < new Date().getTime()) logout();
        }
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        navigate('/');
        setUser(null);
    };

    return (
        <AppBar sx={{ bgcolor: "primary.main" }} position="static" color="inherit">
            <div>
            <Typography component={Link} to="/" variant="h2" align="center">Onion Recipes</Typography>
            </div>
            <Toolbar>
                {user ? (
                    <div>
                        <Avatar alt={user.userObject.name} src={user.userObject.picture}>{user.userObject.name}</Avatar>
                        <Typography variant="h6">{user.userObject.name}</Typography>
                        <Button variant="contained" color="secondary" onClick={logout}>Logout</Button>
                    </div>
                ): (
                    <Button component={Link} to="/auth" variant="contained" color="primary">Sign On</Button>
                )}
            </Toolbar>
        </AppBar>
    )
};

export default Navbar;