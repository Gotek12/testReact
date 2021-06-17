import axios from "axios";

class ProductsReviewService {
  getProductsReviews() {
    return axios.get(
      "https://sklep-backend.azurewebsites.net/api/productsReviews"
    );
  }

  getProductsReviewById(id) {
    return axios.get(
      `https://sklep-backend.azurewebsites.net/api/productReviews/${id}`
    );
  }

  addProductsReview(information) {
    return axios.post(
      "https://sklep-backend.azurewebsites.net/api/productReview",
      {
        productId: information.productId,
        date: information.date,
        description: information.description,
        userId: information.userId,
      }
    );
  }

  updateProductsReview(information) {
    return axios.post(
      `https://sklep-backend.azurewebsites.net/api/productReview_update`,
      {
        id: information.id,
        productId: information.productId,
        date: information.date,
        description: information.description,
        userId: information.userId,
      }
    );
  }

  deleteProductsReview(id) {
    return axios.delete(`productReview/${id}`);
  }
}

export default new ProductsReviewService();
