import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard/Dashboard'
import AdminApp from './AdminApp'
import Search from './pages/Search'
import CreatorApp from './CreatorApp'
import DashboardCreator from './pages/components/creator'

import UploadArt from './pages/components/upload/UploadArt'

import Register from './pages/auth/Register'
import Login from './pages/auth/Login'


export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'search',
        element: <Search />
      },
      {

        path: 'upload',
        element: <UploadArt />

        path: 'register',
        element: <Register />
      },
      {
        path: 'login',
        element: <Login />

      }
    ]
  },
  {
    path: 'admin',
    element: <AdminApp />,
    children: [
      {
        path: 'dashboard',
        element: <Dashboard />
      }
    ]
  },
  {
    path: 'creator',
    element: <CreatorApp />,
    children: [
      {
        path: 'dashboard',
        element: <DashboardCreator />
      }
    ]
  }
])
