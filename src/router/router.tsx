import { createBrowserRouter } from "react-router-dom"

import App from "../App"
import { Login } from "../pages/login/Login"

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
        element: <p></p>,
        children: [
          { index: true, element: <p></p> },
          {
            path: "category/:id",
            element: <p></p>,
          },
          {
            path: "variants",
            element: <p></p>,
          },
          {
            path: "subcategories/:id",
            element: <p></p>,
          },
        ],
      },
      { path: "product/:id", element: <p></p> },
      { path: "editing/:id", element: <p></p> },
    ],
  },
])
