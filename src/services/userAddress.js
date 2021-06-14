import axios from "axios";

class UserAddressService {
  getUserAddresses() {
    return axios.get("usersAddresses");
  }

  getuserAddressById(id) {
    return axios.get(`userAddresses/${id}`);
  }

  addUserAddress(information) {
    return axios.post("userAddres", {
      userId: information.id,
      city: information.city,
      postalCode: information.postalCode,
      country: information.country,
      telephone: information.telephone,
      mobile: information.mobile,
      addressLine: information.addressLine,
    });
  }

  updateUserAddress(information) {
    return axios.post(`userAddres_update`, {
      id: information.addId,
      userId: information.id,
      city: information.city,
      postalCode: information.postalCode,
      country: information.country,
      telephone: information.telephone,
      mobile: information.mobile,
      addressLine: information.addressLine,
    });
  }

  deleteUserAddress(id) {
    return axios.delete(`userAddres/${id}`);
  }
}

export default new UserAddressService();
