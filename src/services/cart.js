import axios from "axios";

class CartService {
  getCarts() {
    return axios.get("https://sklep-backend.azurewebsites.net/api/carts");
  }

  getCartById(id) {
    return axios.get(`https://sklep-backend.azurewebsites.net/api/carts/${id}`);
  }

  addCart(information) {
    return axios.post("https://sklep-backend.azurewebsites.net/api/cart", {
      userId: information.userId,
    });
  }

  updateCart(information) {
    return axios.post(
      `https://sklep-backend.azurewebsites.net/api/cart_update`,
      {
        id: information.id,
        userId: information.userId,
      }
    );
  }

  deleteCart(id) {
    return axios.delete(
      `https://sklep-backend.azurewebsites.net/api/cart/${id}`
    );
  }
}

export default new CartService();
