import React, { useEffect, useState } from "react";
import { Typography } from "@material-ui/core";
import { Link, useLocation } from "react-router-dom";
import Button from "@material-ui/core/Button";
import "./Home.scss";
import MenuItem from "../../common/HomeMenuItem/MenuItem";

const Home = () => {
  const [user, setUser] = useState({});
  const [logged, setLogged] = useState({});
  let location = useLocation();

  const getUser = () => {
    if (document.cookie.split("; ").find((row) => row.startsWith("email="))) {
      return document.cookie
        .split("; ")
        .find((row) => row.startsWith("email="))
        .split("=")[1];
    }
  };

  const getAdmin = () => {
    if (
      document.cookie.split("; ").find((row) => row.startsWith("role=ADMIN"))
    ) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    setLogged({});
    const query = new URLSearchParams(location.search);
    const paramEmail = query.get("email");
    const paramAuth = query.get("authenticator");
    if (paramEmail) {
      document.cookie = `role=USER; path=/`;
      document.cookie = `email=${paramEmail}; path=/`;
      document.cookie = `oAuth=true; path=/`;
      document.cookie = `authenticator=${decodeURIComponent(
        paramAuth
      ).replaceAll(" ", "+")}; path=/`;
      window.location.href = "/";
    }

    setLogged({ name: getUser() });
    setUser({ admin: getAdmin() });
  }, []);

  return (
    <div>
      {user.admin ? (
        <div className="outer">
          <div className="inner3">
            <Typography variant="h4" className="tx">
              Administration
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              style={{ minHeight: "70px", marginTop: "20px" }}
              fullWidth
              to="/products"
              component={Link}
            >
              Products
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="large"
              style={{ minHeight: "70px", marginTop: "20px" }}
              fullWidth
              to="/categories"
              component={Link}
            >
              Categories
            </Button>
          </div>
        </div>
      ) : (
        <div className="homepage">
          <div className="directory-menu">
            <MenuItem
              key="0"
              title="Sklep"
              image="https://www.kare-design.com/wp-content/uploads/2015/08/2.jpg"
              size="large"
              linkUrl="/tobuy"
            />
            <MenuItem
              key="1"
              title="Mój profil"
              image="https://ergostore.pl/wp-content/uploads/2018/11/levis_2.jpg"
              size="large"
              linkUrl={logged.name ? "/profile" : "/signin"}
            />
          </div>
        </div>
      )}

      <footer>
        <Typography className="copyR">Sklepik &copy; 2021</Typography>
      </footer>
    </div>
  );
};

export default Home;
