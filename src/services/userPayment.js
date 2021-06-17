import axios from "axios";

class UserPaymentService {
  getUserPayments() {
    return axios.get(
      "https://sklep-backend.azurewebsites.net/api/usersPayments"
    );
  }

  getUserPaymentById(id) {
    return axios.get(
      `https://sklep-backend.azurewebsites.net/api/usersPayment/${id}`
    );
  }

  addUserPayment(information) {
    return axios.post(
      "https://sklep-backend.azurewebsites.net/api/usersPayment",
      {
        userId: information.userId,
        paymentType: information.paymentType,
        provider: information.provider,
        accountNumber: information.accountNumber,
        expiry: information.expiry,
      }
    );
  }

  updateUserPayment(information) {
    return axios.post(
      `https://sklep-backend.azurewebsites.net/api/usersPayment_update`,
      {
        id: information.id,
        userId: information.userId,
        paymentType: information.paymentType,
        provider: information.provider,
        accountNumber: information.accountNumber,
        expiry: information.expiry,
      }
    );
  }

  deleteUserPayment(id) {
    return axios.delete(
      `https://sklep-backend.azurewebsites.net/api/usersPayment/${id}`
    );
  }
}

export default new UserPaymentService();
