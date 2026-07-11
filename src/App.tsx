import './App.css'
import Landing from './pages/Landing'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing/>
  },
  {
    path: "/signup",
    element: <Signup/>
  },
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '/dashboard',
    element: <Dashboard/>
  },
])


function App() {
  

  return (
    <RouterProvider router={router}>
    </RouterProvider>
  )
}

export default App
