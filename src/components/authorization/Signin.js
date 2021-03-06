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
  Box,
  Typography,
  FormHelperText,
} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { useState } from "react";
import AuthService from "../../services/auth";
import {
  GithubLoginButton,
  GoogleLoginButton,
} from "react-social-login-buttons";
import { createButton } from "react-social-login-buttons";

const config = {
  text: "Log in with GitLab",
  icon: "gitlab",
  iconFormat: (name) => `fa fa-${name}`,
  style: { background: "#FF8C00" },
  activeStyle: { background: "#FFA500" },
};

const GitLabLoginButton = createButton(config);

export default function Signin() {
  const [errors, setErrors] = useState();
  const [state, setState] = useState({
    password: "",
    showPassword: false,
    email: "",
    message: "",
    errorEmail: "",
    errorPassword: "",
  });

  const handleChange = (prop) => (event) => {
    setState({ ...state, [prop]: event.target.value });
    switch (prop) {
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

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowPassword = () => {
    setState({ ...state, showPassword: !state.showPassword });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setState({
      ...state,
      message: "",
    });

    AuthService.signIn(state.email, state.password).then(
      () => {
        window.location.href = "/";
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        if (Boolean(resMessage)) {
          setState({
            ...state,
            message: "B????dne dane",
          });
        }
      }
    );
  };

  const emailValidator = (email) => {
    const regexp =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    setErrors({
      ...errors,
      errorEmail: "",
    });

    let errorMessage = "";
    if (email.length === 0) {
      errorMessage = "Email jest wymagany";
    } else if (!regexp.test(email.toLowerCase())) {
      errorMessage = "Niepoprawny email";
    }

    setErrors({
      ...errors,
      errorEmail: errorMessage,
    });
  };

  const passwordValidator = (password) => {
    setErrors({
      ...errors,
      errorPassword: "",
    });
    if (password.length === 0) {
      setErrors({
        ...errors,
        errorPassword: "Has??o jest wymagane",
      });
    }
  };

  const oauthLogin = (url) => {
    window.location.assign("https://sklep-backend.azurewebsites.net" + url);
    // window.location.assign("http://localhost:9000" + url);
  };

  return (
    <div className="outer">
      <div className="inner">
        <Form onSubmit={handleLogin}>
          <Grid container direction="column" alignItems="center">
            <Typography variant="h4" className="first-input">
              Zaloguj si??
            </Typography>
            <TextField
              error={Boolean(errors?.errorEmail)}
              helperText={errors?.errorEmail}
              className="first-input"
              type="text"
              label="Email"
              placeholder="Email"
              margin="normal"
              variant="filled"
              name="email"
              onChange={handleChange("email")}
              value={state.email}
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
                error={Boolean(errors?.errorPassword)}
              >
                Password
              </InputLabel>
              <FilledInput
                id="password"
                type={state.showPassword ? "text" : "password"}
                placeholder="Password"
                value={state.password}
                name="password"
                onChange={handleChange("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {state.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                error={Boolean(errors?.errorPassword)}
              />
              <FormHelperText
                style={{ color: errors?.errorPassword !== "" ? "red" : "gray" }}
                id="component-error-text"
              >
                {errors?.errorPassword}
              </FormHelperText>
            </FormControl>
            <Box style={{ minHeight: "4vh" }} margin="normal">
              {state.message && (
                <div className="wrong-input">{state.message}</div>
              )}
            </Box>
            <Button
              variant="contained"
              type="submit"
              color="primary"
              size="large"
              style={{ minHeight: "50px" }}
              disabled={Boolean(errors?.errorEmail || errors?.errorPassword)}
              fullWidth
            >
              <span className="btn-login-txt">Zaloguj si??</span>
            </Button>
          </Grid>
        </Form>
        <GoogleLoginButton
          onClick={() => oauthLogin("/authenticate/google")}
          style={{ marginTop: "20px" }}
        />
        <GithubLoginButton onClick={() => oauthLogin("/authenticate/github")} />
        <GitLabLoginButton onClick={() => oauthLogin("/authenticate/gitlab")} />
      </div>
      <footer>
        <Typography className="copyR">Sklepik &copy; 2021</Typography>
      </footer>
    </div>
  );
}
