import axios from "axios";

class AuthService {
  async signIn(email, password) {
    return axios
      .post("signin", {
        email,
        password,
      })
      .then((response) => {
        if (response.headers.authorization && response.headers.userinfo) {
          localStorage.setItem("user", JSON.stringify(response.headers));
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  signUp(email, firstName, lastName, password) {
    return axios.post("signup", {
      email,
      firstName,
      lastName,
      password,
    });
  }
}

export default new AuthService();
