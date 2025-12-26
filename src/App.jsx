import { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/login';
import Register from './Pages/Register';
import DefaultRoute from './Guards/DefaultRoute';
import UserLayout from './Layout/UserLayout';
import AdminLayout from './Layout/AdminLayout';
import UserDashboard from './pages/UserLayout/Dashboard';
import AdminDashboard from './Pages/AdminLayout/Dashboard';
import MyBooking from './pages/UserLayout/MyBooking';
import UserEvent from './Pages/UserLayout/Event';
import AdminEvent from './Pages/AdminLayout/Event';
import Profile from './Pages/UserLayout/Profile';
import Booking from './Pages/AdminLayout/Booking';
import AuthGuard from './Guards/AuthGuard';
//import MyBooking from './pages/UserLayout/MyBooking';

function App() {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <AuthGuard requiredAuth={false}><Login /></AuthGuard>
    },
     {
      path: "/register",
      element: <AuthGuard requiredAuth={false}><Register /></AuthGuard>
    },
    {
      path:"/",
      element: <DefaultRoute />
    },

    // User Routes
    {
      path:"user",
      element:<AuthGuard  requiredAuth={true} allowedRoles={["USER"]}><UserLayout/></AuthGuard > ,
      children: [
        {path: "dashboard", element: <UserDashboard />},
        {path:"my-booking",element:<MyBooking/>},
        {path: "event", element: <UserEvent />},
        {path: "profile", element: <Profile/> }
      ]
    },

    // admin routes
    {
      path:"admin",
      element:<AuthGuard requiredAuth={true} allowedRoles={["ADMIN"]}><AdminLayout/></AuthGuard >,
    
      children: [
        {path: "dashboard", element: <AdminDashboard/>},
        {path: "bookings", element: <Booking />},
        {path: "event", element: <AdminEvent />},
      ]
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App
