import "./App.css";
import { Route, Switch } from "react-router-dom";
import Signin from "./components/authorization/Signin";
import Signup from "./components/authorization/Signup";
import Home from "./components/home/Home";
import NavMenu from "./common/nav/NavMenu";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Products from "./components/product/Products";
import AddProduct from "./components/product/AddProduct";
import Categories from "./components/categories/Categories";
import ProductCart from "./components/product/ProductCart";
import UserProductPage from "./components/product/UserProductPage";
import Cart from "./components/cart/Cart";
import AppContext from "./common/store/AppContext";
import React, { useState } from "react";

function App() {
    const [cartElement, setCartElement] = useState({
        products: [],
    });
    const addCartElement = (id, dataEl) => {
        if (cartElement.products.length === 0) {
            const neEl = {
                id: id,
                nr: 1,
                data: dataEl,
            };
            const el = [...cartElement.products, neEl];
            setCartElement({ products: el });
        }

        let add = false;
        for (const idElement of cartElement.products) {
            if (idElement.id === id) {
                ++idElement.nr;
                add = false;
                break;
            }
            add = true;
        }

        if (add) {
            const neEl = {
                id: id,
                nr: 1,
                data: dataEl,
            };
            const el = [...cartElement.products, neEl];
            setCartElement({ products: el });
        }
    };

    const increase = (id) => {
        cartElement.products.forEach((el) => {
            if (el.id === id) {
                ++el.nr;
            }
        });
    };

    const decrease = (id) => {
        cartElement.products.forEach((el) => {
            if (el.id === id) {
                --el.nr;
            }
            if (el.nr === 0) {
                const el = [...cartElement.products];
                let index = el.findIndex(function(o) {
                    return o.id === id;
                });
                if (index !== -1) el.splice(index, 1);
                setCartElement({ products: el });
            }
        });
    };

    const userSettings = {
        cartElement: cartElement,
        addCartElement,
        increase,
        decrease,
    };

    return ( <
            AppContext.Provider value = { userSettings } >
            <
            NavMenu / >
            <
            Switch >
            <
            Route path = "/signin"
            exact component = { Signin }
            /> <
            Route path = "/signup"
            exact component = { Signup }
            /> <
            Route path = "/products"
            exact component = { Products }
            /> <
            Route path = "/addproduct"
            exact component = { AddProduct }
            /> <
            Route path = "/categories"
            exact component = { Categories }
            /> <
            Route path = "/product/:id"
            exact component = { ProductCart }
            /> <
            Route path = "/tobuy"
            exact component = { UserProductPage }
            /> <
            Route path = "/cart"
            exact component = { Cart }
            /> { / * < Route path = "/admin"
            exact component = { Admin }
            />*/
        } <
        Route path = "/"
    exact component = { Home }
    /> < /
    Switch > <
        /AppContext.Provider>
);
}

export default App;