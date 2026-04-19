import { Children, Component, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from "react-router";
import AuthProvider from './Context/AuthProvider.jsx';
import MainLayout from './Layouts/MainLayout.jsx';
import Home from './Components/Home/Home.jsx';
import AllProducts from './Components/AllProducts/AllProducts.jsx';
import Register from './Components/Register/Register.jsx';
import ProductDetails from './Components/ProductDetails/ProductDetails.jsx';
import MyBids from './Components/MyBids/MyBids.jsx';
import PrivateRoute from './Components/Route/PrivateRoute.jsx';
import CreateAProduct from './Components/CreateAProduct/CreateAProduct.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: "allProducts",
        Component: AllProducts
      },
      {
        path: "/register",
        Component: Register
      },
      {
        path: '/myProducts',

        element: <PrivateRoute>
          MyProducts
        </PrivateRoute>
      },
      {
        path: "/productDetails/:id",
        loader: ({ params }) => fetch(`http://localhost:5000/products/${params.id}`),
        element: <PrivateRoute><ProductDetails></ProductDetails> </PrivateRoute>
      },
      {
        path: '/myBids',
        element: (
          <PrivateRoute>
            <MyBids />
          </PrivateRoute>
        )
      },
      {
        path: '/createAProduct',
        element: <PrivateRoute><CreateAProduct></CreateAProduct></PrivateRoute>
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
)
