import React, {useEffect} from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

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

  useEffect(() => {
    console.log("load")
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
          <Link to="/signin">
            <Button variant="outline-light" style={{ marginRight: "20px" }}>
              Zaloguj się
            </Button>
          </Link>
          <Link to="/signup">
            <Button variant="outline-light" to="/signup">
              Zarejestruj się
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavMenu;
