import { createBrowserRouter } from "react-router-dom"

import App from "../App"
import { AllProducts } from "../pages/all-products/AllProducts"
import { Catalog } from "../pages/catalog/Catalog"
import { CreateProductPage } from "../pages/create-product/CreateProductPage"
import { Login } from "../pages/login/Login"
import { ProductPage } from "../pages/product/ProductPage"
import { Products } from "../pages/products/Products"
import { Subcategories } from "../pages/subcategories/Subcategories"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "catalog",
        element: <Catalog />,
        children: [
          { index: true, element: <AllProducts /> },
          {
            path: "category/:id",
            element: <Products />,
          },
          {
            path: "subcategories/:id",
            element: <Subcategories />,
          },
        ],
      },
      { path: "product/:id", element: <ProductPage /> },
      { path: "editing", element: <CreateProductPage /> },
      { path: "editing/:id", element: <p></p> },
    ],
  },
])
