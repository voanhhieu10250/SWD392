import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import Home from './pages/Home'
import Search from './pages/components/search'
import Dashboard from './pages/Dashboard/Dashboard'
import AdminApp from './AdminApp'

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
      }
      // {
      //   path: 'detail/:studentId/edit',
      //   element: <Edit />
      // },
      // {
      //   path: 'add',
      //   element: <Add />
      // }
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
  }
])
