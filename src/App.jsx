import './App.css';
import React from 'react';
import Body1 from './components/Body1';
import Auth from './components/auth.jsx';
import Manager from './components/manager.jsx';
import Item from './components/Item_page.jsx';
import Employee from './components/employee.jsx';
import Signup from './components/Signup.jsx';
import Bag_r from './router/bag_r';
import Chinese_r from './router/Chinese_r';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Orderplace from './components/Orderplace';
import Customer_history from './components/customers_orders_history.jsx';
import Wallet from './components/add_money.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Body1 />
  },
  {
    path: "/employee",
    element: <Employee />
  },
  {
    path: "/manager",
    element: <Manager />
  },

  {
    path: "/wallet",
    element: <Wallet />
  },
  {
    path: "/login",
    element: <Auth />
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/items",
    element: <Item />
  },
  {
    path: "/bag",
    element: <Bag_r />
  },
  {
    path: "/chineese",
    element: <Chinese_r dish="Chinese" />
  },
  {
    path: "/drinks",
    element: <Chinese_r  dish="drinks"/>
  },
  {
    path: "/desserts",
    element: <Chinese_r  dish="desserts"/>
  },
  {
    path: "/local",
    element: <Chinese_r  dish="local"/>
  },
  {
    path: "/pasta",
    element: <Chinese_r dish="pasta" />
  },
  {
    path: "/order",
    element: <Orderplace />
  },
  {
    path: "/customer_history",
    element:<Customer_history />
  }

]);

function App() 
{
  return <RouterProvider router={router}/>;
}

export default App;
