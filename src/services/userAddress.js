import axios from "axios";

class UserAddressService {
  getUserAddresses() {
    return axios.get(
      "https://sklep-backend.azurewebsites.net/api/usersAddresses"
    );
  }

  getuserAddressById(id) {
    return axios.get(
      `https://sklep-backend.azurewebsites.net/api/userAddresses/${id}`
    );
  }

  addUserAddress(information) {
    return axios.post(
      "https://sklep-backend.azurewebsites.net/api/userAddres",
      {
        userId: information.id,
        city: information.city,
        postalCode: information.postalCode,
        country: information.country,
        telephone: information.telephone,
        mobile: information.mobile,
        addressLine: information.addressLine,
      }
    );
  }

  updateUserAddress(information) {
    return axios.post(
      `https://sklep-backend.azurewebsites.net/api/userAddres_update`,
      {
        id: information.addId,
        userId: information.id,
        city: information.city,
        postalCode: information.postalCode,
        country: information.country,
        telephone: information.telephone,
        mobile: information.mobile,
        addressLine: information.addressLine,
      }
    );
  }

  deleteUserAddress(id) {
    return axios.delete(
      `https://sklep-backend.azurewebsites.net/api/userAddres/${id}`
    );
  }
}

export default new UserAddressService();
