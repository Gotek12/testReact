import axios from "axios";

class DiscountService {
  getDiscounts() {
    return axios.get("https://sklep-backend.azurewebsites.net/api/discounts");
  }

  getDiscountById(id) {
    return axios.get(
      `https://sklep-backend.azurewebsites.net/api/discount/${id}`
    );
  }

  addDiscount(information) {
    return axios.post("https://sklep-backend.azurewebsites.net/api/discount", {
      name: information.name,
      discountPercentage: information.discountPercentage,
      expire: information.expire,
      productId: information.productId,
    });
  }

  updateDiscount(information) {
    return axios.post(
      `https://sklep-backend.azurewebsites.net/api/discount_update`,
      {
        id: information.id,
        name: information.name,
        discountPercentage: information.discountPercentage,
        expire: information.expire,
        productId: information.productId,
      }
    );
  }

  deleteDiscount(id) {
    return axios.delete(
      `https://sklep-backend.azurewebsites.net/api/discount/${id}`
    );
  }
}

export default new DiscountService();
