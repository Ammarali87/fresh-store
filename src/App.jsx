import React , { useContext, useNavigate, useState } from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider, useParams } from 'react-router-dom';
import Layout from './component/Layout';
import Home from './component/Home';
import Login from './component/Login';
import Register from './component/Register';
import Order from './component/Order';
import Products from './component/Products';
import ProtectedRoute from './component/ProtectedRoute';
 import MycontextProvider from './Mycontex/Mycontext';
 import AuthorProvider from './Mycontex/Authorcontext';
import AuthProtected from './component/AuthProtected';
import Loading from './component/Loading';
import Deetails from './component/Deetails';
import Cart from './component/Cart';
import Address from './component/Address';
import {QueryClient , QueryClientProvider} from "react-query"
import { ReactQueryDevtools} from "react-query/devtools"

// import ErrorPage from './ErrorPage'
const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: "login", element: <AuthProtected><Login/></AuthProtected> },
      { path: "register", element: <AuthProtected><Register /></AuthProtected> },
      { path: "allorders", element: <ProtectedRoute> <Order /></ProtectedRoute> },
      { path:"address/:cartId", element: <ProtectedRoute> <Address /></ProtectedRoute> },
      { path: "loading", element: <ProtectedRoute> <Loading /></ProtectedRoute> },
      { path: "cart", element: <ProtectedRoute> <Cart /></ProtectedRoute> },
      { path: "products", element: <ProtectedRoute> <Products /></ProtectedRoute> },
      { path: "deetails/:id", element:  <ProtectedRoute> <Deetails /></ProtectedRoute> },
    ],
  },
  // { path: "*", element: <ErrorPage /> },

]);

function App() {
  let queryClient = new QueryClient()

  return (
   <QueryClientProvider client={queryClient}>
    <MycontextProvider>
      <AuthorProvider>
   <RouterProvider router = {router}>
    </RouterProvider>
  </AuthorProvider>
    </MycontextProvider>
    <ReactQueryDevtools position="top-right" />
   </QueryClientProvider>
);
}
{/* </RouterProvider> */}

export default App;
