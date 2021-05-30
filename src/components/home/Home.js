import React from "react";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

const Home = () => {
  // todo remove after setting authorization

  return (
    <div className="outer">
      <div className="inner3">
        <Typography variant="h4" className="tx">
          Admin
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          style={{ minHeight: "50px" }}
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
          style={{ minHeight: "50px" }}
          fullWidth
          to="/categories"
          component={Link}
        >
          Categories
        </Button>

        <Typography variant="h4" className="tx">
          User
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          style={{ minHeight: "50px" }}
          fullWidth
          to="/tobuy"
          component={Link}
        >
          Buy
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="large"
          style={{ minHeight: "50px" }}
          fullWidth
          to="/cart"
          component={Link}
        >
          Cart
        </Button>
      </div>
    </div>
  );
};

export default Home;
