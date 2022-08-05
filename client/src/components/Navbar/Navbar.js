import React from 'react';
import { AppBar, Typography, Avatar, Toolbar, Button } from '@mui/material';
import { Link } from 'react-router-dom';


const Navbar = () => {

    const user = null;

    return (
        <AppBar sx={{ bgcolor: "primary.main" }} position="static" color="inherit">
            <div>
            <Typography component={Link} to="/" variant="h2" align="center">Onion Recipes</Typography>
            </div>
            <Toolbar>
                {user ? (
                    <div>
                        <Avatar alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                        <Typography variant="h6">{user.result.name}</Typography>
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