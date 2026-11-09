import React from "react";
import { createBrowserRouter } from "react-router";
import Root from "../Pages/Root/Root";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home";
import Apps from "../Pages/Apps/Apps";
import Login from "../Pages/Login/Login";
import AppDetails from "../Pages/Apps/AppDetails";
import MyProfile from "../Pages/MyProfile/MyProfile"


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
           path:"myprofile",
           Component:MyProfile
        },
        {
          path:"login",
          Component:Login
        },
        {
        path: "/apps/:id",
        element: <AppDetails />,
        },
        
         
      ]
  },
]);