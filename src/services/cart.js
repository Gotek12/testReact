import axios from "axios";

class CartService {
  getCarts() {
    return axios.get("carts");
  }

  getCartById(id) {
    return axios.get(`carts/${id}`);
  }

  addCart(information) {
    return axios.post("cart", {
      userId: information.userId,
    });
  }

  updateCart(information) {
    return axios.post(`cart_update`, {
      id: information.id,
      userId: information.userId,
    });
  }

  deleteCart(id) {
    return axios.delete(`cart/${id}`);
  }
}

export default new CartService();
