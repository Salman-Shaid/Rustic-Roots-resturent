import { createBrowserRouter } from "react-router-dom";
import MainLayouts from "../layouts/MainLayouts";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";

import NotFound from "../Pages/NotFound/NotFoundPage";
import FoodDetails from "../Pages/FoodDetails";
import Purchase from "../Pages/Purchase";
import PrivateRoute from "./PrivateRoute";
import MyOrder from "../Pages/MyOrder/MyOrder";
import AddFood from "../Pages/AddFood/AddFood";
import AllFoods from "../Pages/AllFoods/AllFoods";
import Gallery from "../Pages/Gallery/Gallery";
import MyFoods from "../Pages/MyFoods/MyFoods";
import UpdateFood from "../Pages/UpdateFood/UpdateFood";
const Router = createBrowserRouter(
  [
    {
      path: "/",
      element: <MainLayouts />,
      children: [
        { path: "/", element: <Home /> },
        {
          path: "/addFood",
          element: <PrivateRoute> <AddFood /> </PrivateRoute>,
        },
        {
          path: "/allFoods",
          element: <AllFoods />,
        },
        {
          path: "/gallery",
          element: <Gallery />,
        },
        {
          path: "/foods/:id",
          element: <FoodDetails />,
          loader: ({ params }) =>
            fetch(`https://rustic-roots-server.vercel.app/foods/${params.id}`),
        },
        {
          path: "/myFoods",
          element: <PrivateRoute> <MyFoods /> </PrivateRoute>,
        },
        {
          path: "/update/:foodId",
          element: <PrivateRoute> <UpdateFood /> </PrivateRoute>,
        },
        {
          path: "/purchase/:id",
          element: <PrivateRoute> <Purchase /> </PrivateRoute>,
        },
        {
          path: "/myOrders",
          element: <PrivateRoute> <MyOrder /> </PrivateRoute>,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true, // Enable v7 splat path behavior
      v7_startTransition: true,   // Enable state updates with startTransition
    },
  }
);

export default Router;


