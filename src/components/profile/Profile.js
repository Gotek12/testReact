import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import UserService from "../../services/user";
import {
  Avatar,
  Button,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
} from "@material-ui/core";
import Form from "react-bootstrap/Form";
import UserAddressService from "../../services/userAddress";
import SummaryService from "../../services/summary";
import FolderIcon from "@material-ui/icons/Folder";

const Profile = () => {
  const [user, setUser] = useState({
    id: "",
    email: "",
    firstName: "",
    lastName: "",
    city: "",
    postalCode: "",
    country: "",
    telephone: "",
    mobile: "",
    addressLine: "----",
    loginInfo: "",
    role: "",
    exist: false,
    addId: "",
  });

  const [summaryOrders, setSummaryOrders] = useState({});

  const handleUpdate = (e) => {
    e.preventDefault();

    UserService.updateUser(user).then(
      () => {
        console.log("update user");
      },
      (error) => {
        console.log("error update");
      }
    );

    if (user.addId) {
      console.log("exist..................");
      UserAddressService.updateUserAddress(user).then(
        () => {
          console.log("");
        },
        (error) => {
          console.log("error update address");
        }
      );
    } else {
      console.log("nie..................");
      UserAddressService.addUserAddress(user).then(
        () => {
          console.log("");
        },
        (error) => {
          console.log("error add address");
        }
      );
    }
  };

  const handleChange = (prop) => (event) => {
    setUser({ ...user, [prop]: event.target.value });
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
        SummaryService.getSummary(response.data.id).then(
          (response) => {
            setSummaryOrders({
              arr: response,
            });
            console.log(response);
          },
          (error) => {
            console.log(error);
          }
        );

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
              role: response.data.role,
              loginInfo: response.data.loginInfo,
              city: response2.data.city,
              postalCode: response2.data.postalCode,
              country: response2.data.country,
              telephone: response2.data.telephone,
              mobile: response2.data.mobile,
              addId: response2.data.id,
              addressLine: "not included",
            });
          },
          (error) => {
            setUser({
              ...user,
              id: response.data.id,
              email: response.data.email,
              firstName:
                response.data.firstName === "-" ? "" : response.data.firstName,
              lastName:
                response.data.lastName === "-" ? "" : response.data.lastName,
              role: response.data.role,
              loginInfo: response.data.loginInfo,
            });
          }
        );
      },

      (error) => {
        console.log("Error load data " + error);
      }
    );
  }, []);

  const format_time = (s) => {
    return new Date(s).toLocaleString();
  };

  return (
    <div className="outer">
      <div className="inner3">
        <Typography gutterBottom variant="h4" component="h2">
          Mój profil
        </Typography>
        {user.email ? (
          <div>
            <Typography gutterBottom>Email: {user.email}</Typography>
            <Form onSubmit={handleUpdate}>
              <Grid container direction="column" alignItems="center">
                <TextField
                  className="first-input"
                  type="text"
                  label="Imię"
                  placeholder="Imię"
                  margin="normal"
                  variant="filled"
                  name="firstName"
                  onChange={handleChange("firstName")}
                  value={user.firstName}
                  fullWidth
                  required
                />
                <TextField
                  className="first-input"
                  type="text"
                  label="Nazwisko"
                  placeholder="Nazwisko"
                  margin="normal"
                  variant="filled"
                  name="lastName"
                  onChange={handleChange("lastName")}
                  value={user.lastName}
                  fullWidth
                  required
                />

                <TextField
                  className="first-input"
                  type="text"
                  label="Miasto"
                  placeholder="Miasto"
                  margin="normal"
                  variant="filled"
                  name="city"
                  onChange={handleChange("city")}
                  value={user.city}
                  fullWidth
                  required
                />

                <TextField
                  className="first-input"
                  type="text"
                  label="Kod pocztowy"
                  placeholder="Kod pocztowy"
                  margin="normal"
                  variant="filled"
                  name="postalCode"
                  onChange={handleChange("postalCode")}
                  value={user.postalCode}
                  fullWidth
                  required
                />

                <TextField
                  className="first-input"
                  type="text"
                  label="Adres"
                  placeholder="Adres"
                  margin="normal"
                  variant="filled"
                  name="country"
                  onChange={handleChange("country")}
                  value={user.country}
                  fullWidth
                  required
                />

                <TextField
                  className="first-input"
                  type="text"
                  label="Telefon domowy"
                  placeholder="Telefon domowy"
                  margin="normal"
                  variant="filled"
                  name="telephone"
                  onChange={handleChange("telephone")}
                  value={user.telephone}
                  fullWidth
                  required
                />

                <TextField
                  className="first-input"
                  type="text"
                  label="Telefon Komórkowy"
                  placeholder="Telefon konmórkowy"
                  margin="normal"
                  variant="filled"
                  name="mobile"
                  onChange={handleChange("mobile")}
                  value={user.mobile}
                  fullWidth
                  required
                />

                <Button
                  variant="contained"
                  type="submit"
                  color="primary"
                  size="large"
                  style={{ minHeight: "50px" }}
                  fullWidth
                >
                  <span className="btn-login-txt">Update</span>
                </Button>
              </Grid>
            </Form>
          </div>
        ) : (
          <div>Edytuj</div>
        )}

        <div style={{ paddingTop: "20px" }}>
          <Typography gutterBottom variant="h4" component="h2">
            Historia zamówień
          </Typography>
          <List>
            {summaryOrders.arr
              ? summaryOrders.arr.data.map((el, index) => {
                  return (
                    <ListItem key={index}>
                      <ListItemAvatar>
                        <Avatar>
                          <FolderIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={`${format_time(el.createdAt)}`}
                        secondary={`Cena: ${el.price}`}
                      />
                    </ListItem>
                  );
                })
              : ""}
          </List>
        </div>
      </div>
    </div>
  );
};

export default Profile;
