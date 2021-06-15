import axios from "axios";

class SummaryService {
  getSummary(userId) {
    return axios.get(`https://sklep-backend.azurewebsites.net/api/getOrders/${userId}`);
  }

  addSummary(userId, price) {
    return axios.post("https://sklep-backend.azurewebsites.net/api/addOrder", {
      userId: userId,
      createdAt: new Date(),
      price: price,
    });
  }
}

export default new SummaryService();
