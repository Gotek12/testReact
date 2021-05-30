import { useEffect, useState } from "react";
import CategoryService from "../../services/category";
import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
} from "@material-ui/core";
import FolderIcon from "@material-ui/icons/Folder";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";

const Categories = () => {
  const [categories, setCategories] = useState();
  const [state, setState] = useState({
    name: "",
    description: "",
  });

  const handleChange = (prop) => (event) => {
    setState({ ...state, [prop]: event.target.value });
  };

  const getData = () => {
    CategoryService.getCategories().then(
      (response) => {
        setCategories(response);
      },

      (error) => {
        console.log(error);
      }
    );
  };

  const deleteHandle = (id) => {
    CategoryService.deleteCategory(id).then(
      () => {
        window.location.reload();
      },

      (error) => {
        console.log(error);
      }
    );
  };

  const addHandle = () => {
    CategoryService.addCategory(state).then(
      () => {
        setState({
          name: "",
          description: "",
        });
        window.location.reload();
      },

      (error) => {
        console.log(error);
      }
    );
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="outer">
      <div className="inner3">
        <List>
          {categories
            ? categories.data.map((el, index) => {
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
              style={{ marginRight: "10px" }}
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
          </ListItem>
          <ListItem>
            <ListItemText primary="Add category" />
            <ListItemSecondaryAction>
              <IconButton aria-label="add">
                <AddIcon onClick={() => addHandle()} />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </div>
    </div>
  );
};

export default Categories;
