import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const NavMenu = () => {
  const classes = useStyles();
  const [user, setUser] = useState({});

  const getUser = () => {
    if (document.cookie.split("; ").find((row) => row.startsWith("email="))) {
      return document.cookie
        .split("; ")
        .find((row) => row.startsWith("email="))
        .split("=")[1];
    }
  };

  const logoutHandle = () => {
    setUser({});
    console.log("clear");
    let allCookies = document.cookie.split(";");
    for (let i = 0; i < allCookies.length; i++)
      document.cookie =
        allCookies[i] + "=;expires=" + new Date(0).toUTCString();
    window.location = "/";
  };

  useEffect(() => {
    setUser({ name: getUser() });
  }, []);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            className={classes.title}
            component={Link}
            to="/"
            style={{ textDecoration: "none", color: "currentcolor" }}
          >
            Sklepik
          </Typography>
          {user.name ? (
            <Typography style={{ marginRight: "20px" }}>{user.name}</Typography>
          ) : (
            <Link to="/signin">
              <Button variant="outline-light" style={{ marginRight: "20px" }}>
                Zaloguj się
              </Button>
            </Link>
          )}
          {user.name ? (
            <div>
              <Link
                style={{
                  textDecoration: "none",
                  color: "white",
                  marginRight: "20px",
                }}
                to="/cart"
              >
                <ShoppingBasketIcon fontSize="large" />
              </Link>
              <Link to="/">
                <Button variant="outline-light" onClick={logoutHandle}>
                  Wyloguj się
                </Button>
              </Link>
            </div>
          ) : (
            <Link to="/signup">
              <Button variant="outline-light">Zarejestruj się</Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavMenu;
