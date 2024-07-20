import React from 'react'
import Navbar from './components/Navbar'
import Homepage from './pages/Homepage'
import SinglePost from './pages/SinglePost'
import Profile from './pages/Profile'
import Fans from './pages/Fans'
import { Navigate, Outlet, Route, RouterProvider, Routes, createBrowserRouter } from 'react-router-dom'
import Login from './pages/Login'
import Footer from './components/Footer'
import { useSelector } from 'react-redux'

const App = () => {

  const user = useSelector((state)=>state.user.currentUser)
  console.log(user)

  const Layout = () =>{
    return (
      <>
      <Navbar />
      <Outlet />
      <Footer />
      </>
    )
  }

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path:'/',
          element:user ? <Homepage /> : <Navigate to={'/login'} />
        },
        {
          path:'/fans/:id',
          element:user ? <Fans /> : <Navigate to={'/login'} />
        },
        {
          path: 'post/:id',
          element:user ? <SinglePost /> : <Navigate to={'/login'} />
        },
        {
          path:'profile/:id',
          element:user ? <Profile /> : <Navigate to={'/login'} />
        }
      ]
    },
    {
      path: '/login',
      element:!user ? <Login /> : <Navigate to={'/'} />
    }
  ])
  return <RouterProvider router={router} />
}

export default App
