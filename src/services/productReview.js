import axios from "axios";

class ProductsReviewService {
  getProductsReviews() {
    return axios.get("productsReviews");
  }

  getProductsReviewById(id) {
    return axios.get(`productReviews/${id}`);
  }

  addProductsReview(information) {
    return axios.post("productReview", {
      productId: information.productId,
      date: information.date,
      description: information.description,
      userId: information.userId,
    });
  }

  updateProductsReview(information) {
    return axios.post(`productReview_update`, {
      id: information.id,
      productId: information.productId,
      date: information.date,
      description: information.description,
      userId: information.userId,
    });
  }

  deleteProductsReview(id) {
    return axios.delete(`productReview/${id}`);
  }
}

export default new ProductsReviewService();
