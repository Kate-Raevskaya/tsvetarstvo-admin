import { createBrowserRouter } from "react-router-dom"

import App from "../App"
import { AllProducts } from "../pages/all-products/AllProducts"
import { Catalog } from "../pages/catalog/Catalog"
import { Login } from "../pages/login/Login"
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
      { path: "product/:id", element: <p></p> },
      { path: "editing/:id", element: <p></p> },
    ],
  },
])
