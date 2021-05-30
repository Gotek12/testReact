import axios from "axios";

class OrderService {
  getOrders() {
    return axios.get("orders");
  }

  getOrderById(id) {
    return axios.get(`order/${id}`);
  }

  addOrder(information) {
    return axios.post("order", {
      userId: information.userId,
      status: information.name,
      items: information.name,
      tax: information.tax,
      price: information.price,
      shipping: information.shipping,
      payed: false,
      realized: false,
    });
  }

  updateOrder(information) {
    return axios.post(`order_update`, {
      id: information.id,
      userId: information.userId,
      status: information.name,
      items: information.name,
      tax: information.tax,
      price: information.price,
      shipping: information.shipping,
      payed: information.payed,
      realized: information.realized,
    });
  }

  deleteOrder(id) {
    return axios.delete(`order/${id}`);
  }
}

export default new OrderService();
