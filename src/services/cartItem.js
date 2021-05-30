import axios from "axios";

class CartItemService {
  getCartItems() {
    return axios.get("cartsItems");
  }

  getCartItemById(id) {
    return axios.get(`cartsItems/${id}`);
  }

  addCartItem(information) {
    return axios.post("cartItem", {
      quantity: information.quantity,
      productId: information.productId,
      cardId: information.cardId,
    });
  }

  updateCartItem(information) {
    return axios.post(`cartItem_update`, {
      id: information.id,
      quantity: information.quantity,
      productId: information.productId,
      cardId: information.cardId,
    });
  }

  deleteCartItem(id) {
    return axios.delete(`cartItem/${id}`);
  }
}

export default new CartItemService();
