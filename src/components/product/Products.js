import { useEffect, useState } from "react";
import ProductService from "../../services/product";
import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import FolderIcon from "@material-ui/icons/Folder";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import "./Product.css";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState();

  const getData = () => {
    ProductService.getProducts().then(
      (response) => {
        setProducts(response);
      },

      (error) => {
        console.log(error);
      }
    );
  };

  const deleteHandle = (id) => {
    ProductService.deleteProduct(id).then(
      () => {
        window.location.reload();
      },

      (error) => {
        console.log(error);
      }
    );
  };

  const editHandle = (id) => {};

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="outer">
      <div className="inner3">
        {console.log(products ? products.data : "")}
        <List>
          {products
            ? products.data.map((el, index) => {
                return (
                  <ListItem key={index}>
                    <ListItemAvatar>
                      <Avatar>
                        <FolderIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={`${el.name}`}
                      secondary={`${el.description}`}
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        aria-label="edit"
                        onClick={() => editHandle(el.id)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        onClick={() => deleteHandle(el.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                );
              })
            : ""}

          <ListItem>
            <ListItemText primary="Add product" />
            <ListItemSecondaryAction>
              <IconButton aria-label="add" component={Link} to="addproduct">
                <AddIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </div>
    </div>
  );
};

export default Products;
