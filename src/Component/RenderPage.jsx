import React from 'react'
import { createBrowserRouter, RouterProvider, Outlet }from 'react-router-dom'
import LoginPage from './LoginPage'
import Form from './Form'


const router= createBrowserRouter([
    { path:'/login', element:<LoginPage/>},
    { path:'/', element:<Form/>},

    
  
])
export default function RenderPage() {
   
  return (
    <RouterProvider router={router}>
    <Outlet />
  </RouterProvider>
  )
}