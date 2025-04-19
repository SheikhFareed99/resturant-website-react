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
import EmployeePage from './components/employee.jsx';
import Inventary from  './components/inventary.jsx';
import Ingredientinven from './components/ingredientinven.jsx'
import Add_ingredient from './components/add_ingre.jsx';
import DailySalesReport from './components/DailySalesReport.jsx';
import UpdateSalary from './components/updatesalary.jsx';
import OrdersPage from './components/ordersPage.jsx';
import MonthlyReportPage from './components/MonthlyReportPage.jsx';
import Vendor from './components/vendor.jsx';
const router = createBrowserRouter([
  {
    path: "/OrdersPage",
    element: <OrdersPage />
  },
  {
    path: "/Vendor",
    element: <Vendor />
  },
  {
    path: "/MonthlyReportPage",
    element: <MonthlyReportPage />
  },
  {
    path: "/",
    element: <Auth />
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
    path: "/home",
    element: <Body1 />
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
  }, {
    path: "/inventary",
    element: <Inventary />
  },
    {
    path: "/ingredientinven",
    element: <Ingredientinven />
  },
  {
    path: "/add_ingredient",
    element: <Add_ingredient />
  },
  {
    path: "/DailySalesReport",
    element: <DailySalesReport />
  },
  {
    path: "/updatesalary",
    element: <UpdateSalary />
  },
  {
    path: "/employee",
    element: <EmployeePage />
  }

]);

function App() 
{
  return <RouterProvider router={router}/>;
}

export default App;
