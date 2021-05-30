import axios from "axios";

class UserPaymentService {
  getUserPayments() {
    return axios.get("usersPayments");
  }

  getUserPaymentById(id) {
    return axios.get(`usersPayment/${id}`);
  }

  addUserPayment(information) {
    return axios.post("usersPayment", {
      userId: information.userId,
      paymentType: information.paymentType,
      provider: information.provider,
      accountNumber: information.accountNumber,
      expiry: information.expiry,
    });
  }

  updateUserPayment(information) {
    return axios.post(`usersPayment_update`, {
      id: information.id,
      userId: information.userId,
      paymentType: information.paymentType,
      provider: information.provider,
      accountNumber: information.accountNumber,
      expiry: information.expiry,
    });
  }

  deleteUserPayment(id) {
    return axios.delete(`usersPayment/${id}`);
  }
}

export default new UserPaymentService();
