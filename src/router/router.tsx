import {createBrowserRouter} from "react-router-dom";
import App from "../App";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true, element: <></>
            },
            {
                path: "catalog",
                element: <></>,
                children: [
                    { index: true, element: <></> },
                    {
                        path: "category/:id",
                        element: <></>,
                    },
                    {
                        path: "variants",
                        element: <></>,
                    },
                    {
                        path: "subcategories/:id",
                        element: <></>,
                    },
                ],
            },
            { path: "product/:id", element: <></> },
            { path: "editing/:id", element: <></> },
        ]
    }
])