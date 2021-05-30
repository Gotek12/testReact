import React, { useEffect, useState } from "react";
import ProductService from "../../services/product";
import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from "@material-ui/core";
import FolderIcon from "@material-ui/icons/Folder";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import { useContext } from "react";
import AppContext from "../../common/store/AppContext";
import RemoveIcon from "@material-ui/icons/Remove";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";

const Cart = () => {
  const myContext = useContext(AppContext);
  const [cena, setCena] = useState();

  const priceFunction = () => {
    let cena = 0;
    myContext.cartElement.products.map((el) => {
      cena += el.data.price * el.nr;
    });
    setCena({ price: cena });
  };

  useEffect(() => {
    priceFunction();
  }, []);

  const buyHandle = () => {
    console.log("buy");
    window.location = "/";
  };

  const increaseHandle = (id) => {
    myContext.increase(id);
    priceFunction();
  };

  const decreaseHandle = (id) => {
    myContext.decrease(id);
    priceFunction();
  };

  return (
    <div className="outer">
      <div className="inner3">
        <Typography variant="h4" className="tx">
          Koszyk
        </Typography>
        <List>
          {myContext.cartElement.products
            ? myContext.cartElement.products.map((el, index) => {
                return (
                  <ListItem key={index}>
                    <ListItemAvatar>
                      <Avatar>
                        <FolderIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={`${el.data.name}`}
                      // secondary={`${el.data.description}`}
                      secondary={`${el.nr}`}
                    />
                    {/*<ListItemSecondaryAction>*/}
                    {/*  <ListItemText*/}
                    {/*    secondary={`cena: ${el.data.price * el.nr}`}*/}
                    {/*  />*/}
                    {/*</ListItemSecondaryAction>*/}
                    <ListItemSecondaryAction>
                      <IconButton
                        aria-label="edit"
                        onClick={() => increaseHandle(el.id)}
                      >
                        <AddIcon />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        onClick={() => decreaseHandle(el.id)}
                      >
                        <RemoveIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                );
              })
            : ""}
          <ListItem>
            <ListItemAvatar>
              <IconButton aria-label="add">
                <CreditCardIcon onClick={() => buyHandle()} />
              </IconButton>
            </ListItemAvatar>
            <ListItemSecondaryAction>
              <ListItemText secondary={`cena: ${cena ? cena.price : 0}`} />
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </div>
    </div>
  );
};

export default Cart;
