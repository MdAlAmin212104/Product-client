import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Root/>,
      children : [
        { 
            path: "/", 
            element: <h1>Home</h1> 
        },
      ]
    },
  ]);