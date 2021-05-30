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

  updateUser(information) {
    return axios.post(`user_update`, {
      id: information.id,
      firstName: information.firstName,
      email: information.email,
      password: information.password,
      lastLogin: new Date(),
    });
  }

  deleteUser(id) {
    return axios.delete(`user/${id}`);
  }
}

export default new UserService();
