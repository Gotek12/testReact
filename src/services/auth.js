import axios from "axios";

class AuthService {
  async signIn(email, password) {
    return axios
      .post("signIn", {
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
    return axios.post("signUp", {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
    });
  }
}

export default new AuthService();
