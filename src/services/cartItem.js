import axios from "axios";

class CartItemService {
  getCartItems() {
    return axios.get("https://sklep-backend.azurewebsites.net/api/cartsItems");
  }

  getCartItemById(id) {
    return axios.get(
      `https://sklep-backend.azurewebsites.net/api/cartsItems/${id}`
    );
  }

  addCartItem(information) {
    return axios.post("https://sklep-backend.azurewebsites.net/api/cartItem", {
      quantity: information.quantity,
      productId: information.productId,
      cardId: information.cardId,
    });
  }

  updateCartItem(information) {
    return axios.post(
      `https://sklep-backend.azurewebsites.net/api/cartItem_update`,
      {
        id: information.id,
        quantity: information.quantity,
        productId: information.productId,
        cardId: information.cardId,
      }
    );
  }

  deleteCartItem(id) {
    return axios.delete(
      `https://sklep-backend.azurewebsites.net/api/cartItem/${id}`
    );
  }
}

export default new CartItemService();
