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

        if (credential) {
            const decodedCredential = decode(credential);
            if (decodedCredential.exp * 1000 < new Date().getTime()) logout();
        }
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        navigate('/');
        setUser(null);
    };

    return (
        <div>
            <AppBar sx={{ flexGrow: 1, bgcolor: "primary.main" }} position="static" color="inherit">
                <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                    <div>
                        <Typography component={Link} to="/" variant="h3" sx={{ flex: 1, textDecoration: "none", ml: 5 }}>Onion Man</Typography>
                    </div>
                    
                        {user ? (
                            <Toolbar>
                                <Avatar sx={{mr: 1}} alt={user.userObject.name} src={user.userObject.picture}>{user.userObject.name}</Avatar>
                                <Typography variant="h6">{user.userObject.name}</Typography>
                                <Button variant="contained" color="secondary" sx={{ml: 5}} onClick={logout}>Logout</Button>
                            </Toolbar>
                        ) : (
                            <Button component={Link} to="/auth" variant="contained" color="primary" sx={{ display: "flex" }}>Sign On</Button>
                        )}
                   
                </Toolbar>
            </AppBar>
        </div>
    )
};

export default Navbar;