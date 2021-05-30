import {
  Button,
  Grid,
  TextField,
  Typography,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
} from "@material-ui/core";
import CategoriesService from "../../services/category";

import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import ProductService from "../../services/product";

const AddProduct = () => {
  const [state, setState] = useState({
    name: "",
    description: "",
    categoryId: "",
    price: "",
    weight: "",
    height: "",
    width: "",
  });

  const handleAdd = (e) => {
    e.preventDefault();

    ProductService.addProduct(state).then(
      () => {
        window.location = "/products";
      },

      (error) => {
        console.log(error);
      }
    );
  };

  const [categories, setCategories] = useState();
  useEffect(() => {
    CategoriesService.getCategories().then(
      (response) => {
        setCategories(response);
      },

      (error) => {
        console.log(error);
      }
    );
  }, []);

  const handleChange = (prop) => (event) => {
    setState({ ...state, [prop]: event.target.value });
  };

  return (
    <div className="outer">
      <div className="inner4">
        <Form onSubmit={handleAdd}>
          <Grid container direction="column" alignItems="center">
            <Typography variant="h4" className="first-input">
              Dodaj produkt
            </Typography>
            <TextField
              className="first-input"
              type="text"
              label="Nazwa"
              placeholder="Nazwa"
              margin="normal"
              variant="filled"
              name="name"
              onChange={handleChange("name")}
              value={state.name}
              fullWidth
              required
            />
            <TextField
              type="text"
              label="Description"
              multiline
              placeholder="Description"
              margin="normal"
              variant="filled"
              name="description"
              onChange={handleChange("description")}
              value={state.description}
              fullWidth
              required
            />

            <FormControl fullWidth variant="filled" margin="normal" required>
              <InputLabel>Category</InputLabel>
              <Select
                value={state.categoryId}
                onChange={handleChange("categoryId")}
              >
                {categories
                  ? categories.data.map((el, index) => {
                      return (
                        <MenuItem key={index} value={el.id}>
                          {el.name}
                        </MenuItem>
                      );
                    })
                  : ""}
              </Select>
            </FormControl>

            <TextField
              required
              type="number"
              label="Price"
              placeholder="Price"
              margin="normal"
              variant="filled"
              name="price"
              onChange={handleChange("price")}
              value={state.price}
              fullWidth
            />
            <TextField
              required
              type="text"
              label="Weight"
              placeholder="Weight"
              margin="normal"
              variant="filled"
              name="description"
              onChange={handleChange("weight")}
              value={state.weight}
              fullWidth
            />
            <TextField
              required
              type="text"
              label="Height"
              placeholder="Height"
              margin="normal"
              variant="filled"
              name="description"
              onChange={handleChange("height")}
              value={state.height}
              fullWidth
            />
            <TextField
              required
              type="text"
              label="Width"
              placeholder="Width"
              margin="normal"
              variant="filled"
              name="description"
              onChange={handleChange("width")}
              value={state.width}
              fullWidth
            />

            <Button
              variant="contained"
              type="submit"
              color="primary"
              size="large"
              style={{ minHeight: "50px" }}
              fullWidth
            >
              <span className="btn-login-txt">Add</span>
            </Button>
          </Grid>
        </Form>
      </div>
    </div>
  );
};

export default AddProduct;
