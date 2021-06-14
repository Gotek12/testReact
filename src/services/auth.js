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
    console.log("proxy")
    return axios.post("signUp", {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
    });
  }

signUp2(email, firstName, lastName, password) {
  console.log("proxy2")
  return axios.post("https://sklep-backend.azurewebsites.net/api/signUp", {
    email: email,
    password: password,
    firstName: firstName,
    lastName: lastName,
  });
}

}

export default new AuthService();
