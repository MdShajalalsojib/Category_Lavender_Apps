import React from "react";
import { createBrowserRouter } from "react-router";
import Root from "../Pages/Root/Root";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home";
import Apps from "../Pages/Apps/Apps";
import MyProfile from "../Pages/MyProfile/MyProfile";
import Login from "../Pages/Login/Login";


export const router = createBrowserRouter([
  {
    path: "/",
      Component: Root,
      errorElement:<ErrorPage></ErrorPage>,
      children: [
        {
            index: true,
            path:"/",
            Component:Home
        },
        {
          path:"apps",
          Component:Apps
        },
        {
          path:"MyProfile",
          Component:MyProfile
        },
        {
          path:"login",
          Component:Login
        }
      ]
  },
]);