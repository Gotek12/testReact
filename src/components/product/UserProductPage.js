import React, { useEffect, useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ProductService from "../../services/product";
import { useHistory } from "react-router-dom";
import AppContext from "../../common/store/AppContext";

const useStyles = makeStyles({
  root: {
    minWidth: 395,
  },
  media: {
    height: 240,
  },
});

const UserProductPage = () => {
  const classes = useStyles();
  const history = useHistory();
  const myContext = useContext(AppContext);

  const [products, setProducts] = useState();

  useEffect(() => {
    ProductService.getProducts().then(
      (response) => {
        setProducts(response);
      },

      (error) => {
        console.log(error);
      }
    );
  }, []);

  const cartHandle = (id) => {
    history.push(`product/${id}`);
  };

  const addtoCartHandle = (id, data) => {
    myContext.addCartElement(id, data);
  };

  return (
    <div className="outer">
      <div className="product_to_buy">
        {products
          ? products.data.map((el, index) => {
              return (
                <Card className={classes.root} key={index}>
                  <CardActionArea>
                    <CardMedia
                      onClick={() => cartHandle(el.id)}
                      className={classes.media}
                      image="https://source.unsplash.com/featured/"
                      title="Product"
                    />

                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {el.name}
                      </Typography>
                      <Typography gutterBottom variant="h6" component="h2">
                        {el.description}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        cena: {el.price}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button
                      size="large"
                      color="primary"
                      onClick={() => addtoCartHandle(el.id, el)}
                    >
                      Add to cart
                    </Button>
                  </CardActions>
                </Card>
              );
            })
          : ""}
      </div>
    </div>
  );
};

export default UserProductPage;
