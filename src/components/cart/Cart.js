import React, { useEffect, useState } from "react";
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
import AddIcon from "@material-ui/icons/Add";
import UserService from "../../services/user";
import UserAddressService from "../../services/userAddress";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import SummaryService from "../../services/summary";

const Cart = () => {
  const [user, setUser] = useState({
    id: "",
    email: "",
    firstName: "",
    lastName: "",
  });
  const myContext = useContext(AppContext);
  const [cena, setCena] = useState();
  const [state, setState] = useState({
    price: "",
    data: "",
  });
  const [sum, setSum] = useState({
    can: false,
  });

  const priceFunction = () => {
    let cen = 0;
    myContext.cartElement.products.forEach((el) => {
      cen += el.data.price * el.nr;
    });
    setCena({ price: cen });
    setState({ price: cen, data: myContext.cartElement.products });
  };

  useEffect(() => {
    priceFunction();
  }, []);

  const buyHandle = () => {
    setSum({ can: true });
  };

  const increaseHandle = (id) => {
    myContext.increase(id);
    priceFunction();
  };

  const decreaseHandle = (id) => {
    myContext.decrease(id);
    priceFunction();
  };

  const handleBuy = () => {
    SummaryService.addSummary(user.id, state.price).then(
      () => {
        window.location.href = "/";
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const getUser = () => {
    if (document.cookie.split("; ").find((row) => row.startsWith("email="))) {
      return document.cookie
        .split("; ")
        .find((row) => row.startsWith("email="))
        .split("=")[1];
    }
  };

  useEffect(() => {
    UserService.getUserByEmail(getUser()).then(
      (response) => {
        UserAddressService.getuserAddressById(response.data.id).then(
          (response2) => {
            setUser({
              ...user,
              id: response.data.id,
              email: response.data.email,
              firstName:
                response.data.firstName === "-" ? "" : response.data.firstName,
              lastName:
                response.data.lastName === "-" ? "" : response.data.lastName,
            });
          },
          (error) => {
            console.log("error");
          }
        );
      },

      (error) => {
        console.log("Error load data " + error);
      }
    );
  }, []);

  return (
    <div className="outer">
      <div className="inner3">
        {sum.can ? (
          //  todo new component summary
          <div>
            <Typography variant="h4" className="tx">
              Podsumowanie zakupu
            </Typography>
            <Typography style={{ marginTop: "30px" }}>
              Imie i Nazwisko: {user.firstName} {user.lastName}
            </Typography>
            <Typography style={{ marginBottom: "20px" }}>
              Email: {user.email}
            </Typography>

            <h4>Produkty:</h4>
            {myContext.cartElement.products
              ? myContext.cartElement.products.map((el, index) => {
                  return (
                    <Typography>
                      {el.data.name} x {el.nr}
                    </Typography>
                  );
                })
              : ""}

            <h5 style={{ marginTop: "10px" }}>Cena:</h5>
            <Typography style={{ paddingBottom: "30px" }}>
              {state.price} zł
            </Typography>

            <Button
              onClick={handleBuy}
              variant="contained"
              color="secondary"
              size="large"
              style={{ minHeight: "50px" }}
              fullWidth
              to="/"
              component={Link}
            >
              Kupuję
            </Button>
          </div>
        ) : (
          <div>
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
                          secondary={`${el.nr}`}
                        />
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
                  <IconButton aria-label="add" onClick={() => buyHandle()}>
                    <CreditCardIcon />
                  </IconButton>
                </ListItemAvatar>
                <ListItemSecondaryAction>
                  <ListItemText secondary={`cena: ${cena ? cena.price : 0}`} />
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
