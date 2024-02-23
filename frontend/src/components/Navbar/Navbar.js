import React, {useEffect, useState} from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { AppBar, Avatar, Toolbar, Typography, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';


import recipes from '../../images/recipes.png';
import useStyles from './styles';


const Navbar = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    const classes = useStyles();
    
    const logout = () => {
        dispatch ({ type: 'LOGOUT' });
        history.push('/');
        setUser(null);
    };

    useEffect(() => {

        setUser(JSON.parse(localStorage.getItem('profile')));       
    }, [location]);

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
            <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">Recipes</Typography>
            <img className={classes.image} src={recipes} alt="recipes" height="60" />
            </div>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                        <Typography className='classes.userName' variant="h6">{user.result.name}</Typography>
                        <Button varient="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                    </div>
                ) : (
                    <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                )}
                </Toolbar>
        </AppBar>
    );
};

export default Navbar;