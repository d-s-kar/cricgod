
import React from "react";
import { AppBar, IconButton, Button, Toolbar, Typography } from "@material-ui/core"
import MenuIcon from "@material-ui/icons/Menu"



const Navbar = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <MenuIcon />Menu
                </IconButton>
                <Typography variant="h6" style={{flex:1}}>
                   Check Live Score
                </Typography>
                <Button color="inherit" >Login</Button>
            </Toolbar>
        </AppBar>

    )
}

export default Navbar