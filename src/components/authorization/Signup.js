import "./Auth.css";
import Form from "react-bootstrap/Form";
import {
  TextField,
  Button,
  InputAdornment,
  IconButton,
  FilledInput,
  FormControl,
  InputLabel,
  Grid,
  Typography,
  Box,
  FormHelperText,
} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { useState } from "react";
import AuthService from "../../services/auth";

export default function Signup() {
  const [errors, setErrors] = useState();
  const [values, setStates] = useState({
    password: "",
    email: "",
    message: "",
    firstName: "",
    lastName: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setStates({ ...values, [prop]: event.target.value });

    switch (prop) {
      case "firstName": {
        console.log("aa");
        nameValidator(event.target.value, "firstName");
        break;
      }

      case "lastName": {
        nameValidator(event.target.value, "lastName");
        break;
      }

      case "email": {
        emailValidator(event.target.value);
        break;
      }

      case "password": {
        passwordValidator(event.target.value);
        break;
      }

      default:
        break;
    }
  };

  const emailValidator = (email) => {
    const regexp =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    setErrors({
      ...errors,
      email: "",
    });

    let errorMessage = "";
    if (email.length === 0) {
      errorMessage = "Email jest wymagany";
    } else if (!regexp.test(email.toLowerCase())) {
      errorMessage = "Niepoprawny email";
    }

    setErrors({
      ...errors,
      email: errorMessage,
    });
  };

  const passwordValidator = (password) => {
    const regexp =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+,.\\;':"-]).{8,}$/;
    let errorMessage = "";
    setErrors({
      ...errors,
      password: "",
    });
    if (password.length === 0) {
      errorMessage = "Hasło jest wymagane";
    } else if (!regexp.test(password)) {
      errorMessage = "Hasło nie jest bezpieczne";
    }

    setErrors({
      ...errors,
      password: errorMessage,
    });
  };

  const nameValidator = (name, val) => {
    setErrors({
      ...errors,
      [val]: "",
    });
    if (name.length === 0) {
      let message = "";
      if (val === "firstName") {
        message = "imienia";
      } else {
        message = "nazwiska";
      }
      setErrors({
        ...errors,
        [val]: `Brak ${message}`,
      });
    }
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowPassword = () => {
    setStates({ ...values, showPassword: !values.showPassword });
  };

  const handleRegistration = (e) => {
    e.preventDefault();
    setStates({
      ...values,
      message: "",
    });

    AuthService.signUp(
      values.email,
      values.firstName,
      values.lastName,
      values.password
    ).then(
      () => {
        window.location.reload();
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setStates({
          ...values,
          message: resMessage,
        });
      }
    );
  };

  return (
    <div className="outer">
      <div className="inner inner2">
        <Form onSubmit={handleRegistration}>
          <Grid container direction="column" alignItems="center">
            <Typography variant="h4" className="first-input">
              Utwórz konto
            </Typography>
            <TextField
              error={Boolean(errors?.firstName)}
              helperText={errors?.firstName}
              className="first-input"
              type="text"
              label="Imię"
              placeholder="Imię"
              margin="normal"
              variant="filled"
              name="firstName"
              onChange={handleChange("firstName")}
              value={values.firstName}
              fullWidth
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
              value={values.lastName}
              error={Boolean(errors?.lastName)}
              helperText={errors?.lastName}
              fullWidth
            />
            <TextField
              className="first-input"
              type="text"
              label="Email"
              placeholder="Email"
              margin="normal"
              variant="filled"
              onChange={handleChange("email")}
              error={Boolean(errors?.email)}
              helperText={errors?.email}
              value={values.email}
              fullWidth
            />
            <FormControl
              variant="filled"
              margin="normal"
              size="medium"
              fullWidth
            >
              <InputLabel
                htmlFor="standard-adornment-password"
                style={{ color: errors?.password ? "red" : "gray" }}
              >
                Password
              </InputLabel>
              <FilledInput
                id="password"
                type={values.showPassword ? "text" : "password"}
                placeholder="Password"
                value={values.password}
                name="password"
                onChange={handleChange("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText
                style={{ color: errors?.password !== "" ? "red" : "gray" }}
                id="component-error-text"
              >
                {errors?.password}
              </FormHelperText>
            </FormControl>
            <Box style={{ minHeight: "3vh" }} margin="normal">
              {values.message && (
                <div className="wrong-input">{values.message}</div>
              )}
            </Box>
            <Button
              variant="contained"
              type="submit"
              color="primary"
              size="large"
              style={{ minHeight: "50px" }}
              fullWidth
              disabled={Boolean(
                errors?.password ||
                  errors?.firstName ||
                  errors?.email ||
                  errors?.lastName
              )}
            >
              <span className="btn-login-txt">Zarejestruj się</span>
            </Button>
          </Grid>
        </Form>
      </div>

      <footer>
        <Typography className="copyR">Sklepik &copy; 2021</Typography>
      </footer>
    </div>
  );
}
