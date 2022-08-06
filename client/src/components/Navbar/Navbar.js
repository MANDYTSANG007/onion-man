import React, { useState, useEffect } from 'react';
import { AppBar, Typography, Avatar, Toolbar, Button } from '@mui/material';
import { Link } from 'react-router-dom';



const Navbar = () => {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    console.log(user);

    useEffect(() => {
        const credential = user?.credential;
        
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, []);

    return (
        <AppBar sx={{ bgcolor: "primary.main" }} position="static" color="inherit">
            <div>
            <Typography component={Link} to="/" variant="h2" align="center">Onion Recipes</Typography>
            </div>
            <Toolbar>
                {user ? (
                    <div>
                        <Avatar alt={user.userObject.name} src={user.userObject.imageUrl}>{user.userObject.name.charAt(0)}</Avatar>
                        <Typography variant="h6">{user.userObject.name}</Typography>
                        <Button variant="contained" color="secondary">Logout</Button>
                    </div>
                ): (
                    <Button component={Link} to="/auth" variant="contained" color="primary">Signin</Button>
                )}
            </Toolbar>
        </AppBar>
    )
};

export default Navbar;