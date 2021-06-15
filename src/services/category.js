import axios from "axios";

class CategoryService {
  getCategories() {
    return axios.get("https://sklep-backend.azurewebsites.net/api/categories");
  }

  getCategoryById(id) {
    return axios.get(`https://sklep-backend.azurewebsites.net/api/category/${id}`);
  }

  addCategory(information) {
    return axios.post("https://sklep-backend.azurewebsites.net/api/category", {
      name: information.name,
      description: information.description,
    });
  }

  updateCategory(information) {
    return axios.post(`https://sklep-backend.azurewebsites.net/api/category_update`, {
      id: information.id,
      name: information.name,
      description: information.description,
    });
  }

  deleteCategory(id) {
    return axios.delete(`https://sklep-backend.azurewebsites.net/api/category/${id}`);
  }
}

export default new CategoryService();
