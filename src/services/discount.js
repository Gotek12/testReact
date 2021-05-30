import axios from "axios";

class DiscountService {
  getDiscounts() {
    return axios.get("discounts");
  }

  getDiscountById(id) {
    return axios.get(`discount/${id}`);
  }

  addDiscount(information) {
    return axios.post("discount", {
      name: information.name,
      discountPercentage: information.discountPercentage,
      expire: information.expire,
      productId: information.productId,
    });
  }

  updateDiscount(information) {
    return axios.post(`discount_update`, {
      id: information.id,
      name: information.name,
      discountPercentage: information.discountPercentage,
      expire: information.expire,
      productId: information.productId,
    });
  }

  deleteDiscount(id) {
    return axios.delete(`discount/${id}`);
  }
}

export default new DiscountService();
