import axios from "axios";

class UserService {
  getUsers() {
    return axios.get("users");
  }

  getUserById(id) {
    return axios.get(`user/${id}`);
  }

  addUser(information) {
    return axios.post("user", {
      firstName: information.firstName,
      email: information.email,
      password: information.password,
      registeredA: new Date(),
      lastLogin: new Date(),
    });
  }

  deleteUser(id) {
    return axios.delete(`user/${id}`);
  }

  getUserByEmail(email) {
    return axios.get(`getUsert/${email}`);
  }

  updateUser(information) {
    return axios.post(`userUpdate`, {
      id: information.id,
      loginInfo: information.loginInfo,
      email: information.email,
      role: information.role,
      firstName: information.firstName,
      lastName: information.lastName,
    });
  }
}

export default new UserService();
