import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import store from "./store/store.js";
import { Provider } from "react-redux";
import App from "../src/App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import AllPosts from "./pages/AllPosts.jsx";
import AddPost from "./pages/AddPost.jsx";
import EditPost from "./pages/EditPost.jsx";
import Post from "./pages/Post.jsx";
import NotFound from "./pages/NotFound.jsx";
import Protected from "./components/AuthLayout.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login",
        element: (
          <Protected authentication={false}>
            <Login />
          </Protected>
        ),
      },
      {
        path: "signup",
        element: (
          <Protected authentication={false}>
            <Signup />
          </Protected>
        ),
      },
      {
        path: "all-posts",
        element: (
          <Protected authentication>
            <AllPosts />
          </Protected>
        ),
      },
      {
        path: "add-post",
        element: (
          <Protected>
            <AddPost />
          </Protected>
        ),
      },
      {
        path: "edit-post/:slug",
        element: (
          <Protected>
            <EditPost />
          </Protected>
        ),
      },
      {
        path: "post/:slug",
        element: (
          <Protected>
            <Post />
          </Protected>
        ),
      },
      {
        path: "*",
        element: (
          <Protected>
            <NotFound />
          </Protected>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
