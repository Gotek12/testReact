import axios from "axios";

class CategoryService {
  getCategories() {
    return axios.get("categories");
  }

  getCategoryById(id) {
    return axios.get(`category/${id}`);
  }

  addCategory(information) {
    return axios.post("category", {
      name: information.name,
      description: information.description,
    });
  }

  updateCategory(information) {
    return axios.post(`category_update`, {
      id: information.id,
      name: information.name,
      description: information.description,
    });
  }

  deleteCategory(id) {
    return axios.delete(`category/${id}`);
  }
}

export default new CategoryService();
