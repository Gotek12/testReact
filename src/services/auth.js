import axios from "axios";

class AuthService {
  async signIn(email, password) {
    return axios
      .post("https://sklep-backend.azurewebsites.net/api/signIn", {
        email,
        password,
      })
      .then((response) => {
        document.cookie = `role=${response.data.role}; path=/`;
        document.cookie = `email=${response.data.email}; path=/`;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  signUp(email, firstName, lastName, password) {
    //"http://localhost:9000/api/signUp"
    return axios.post("https://sklep-backend.azurewebsites.net/api/signUp", {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
    });
  }
}

export default new AuthService();
