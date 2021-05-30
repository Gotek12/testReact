import axios from "axios";

class ProductService {
  getProducts() {
    return axios.get("products");
  }

  //todo fix endpoints
  getProductById(id) {
    return axios.get(`${id}`);
  }

  getProductById2(id) {
    return axios.get(`product/${id}`);
  }

  addProduct(information) {
    console.log(information);
    return axios.post("product", {
      name: information.name,
      description: information.description,
      categoryId: information.categoryId,
      price: Number(information.price),
      weight: Number(information.weight),
      height: Number(information.height),
      width: Number(information.width),
    });
  }

  updateProduct(information) {
    return axios.post(`product_update`, {
      id: information.id,
      name: information.name,
      description: information.description,
      categoryId: information.categoryId,
      price: information.price,
      weight: information.weight,
      height: information.height,
      width: information.width,
    });
  }

  deleteProduct(id) {
    return axios.delete(`product/${id}`, {});
  }
}

export default new ProductService();
