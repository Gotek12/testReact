import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import ProductService from "../../services/product";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    minWidth: 845,
  },
  media: {
    height: 640,
  },
});

const ProductCart = () => {
  const { id } = useParams();
  const classes = useStyles();

  const [product, setProducts] = useState();
  useEffect(() => {
    ProductService.getProductById(id).then(
      (response) => {
        setProducts(response);
      },

      (error) => {
        console.log(error);
      }
    );
  }, []);

  return (
    <div className="outer">
      {console.log(product ? product : "")}
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image="https://cdn.pixabay.com/photo/2020/05/26/09/32/product-5222398_960_720.jpg"
            title="Product"
          />

          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {product ? product.data.name : ""}
            </Typography>
            <Typography gutterBottom variant="h6" component="h2">
              {product ? product.data.description : ""}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              cena: {product ? product.data.price : ""}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {product && product.data.weight
                ? product.data.weight +
                  "x" +
                  product.data.height +
                  "x" +
                  product.data.width
                : ""}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="large" color="primary">
            Add to cart
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default ProductCart;
