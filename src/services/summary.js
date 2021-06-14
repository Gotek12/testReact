import axios from "axios";

class SummaryService {
  getSummary(userId) {
    return axios.get(`getOrders/${userId}`);
  }

  addSummary(userId, price) {
    return axios.post("addOrder", {
      userId: userId,
      createdAt: new Date(),
      price: price,
    });
  }
}

export default new SummaryService();
