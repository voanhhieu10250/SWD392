import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import Home from './pages/Home'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />
      }
      // {
      //   path: 'dashboard',
      //   element: <Dashboard />
      // },
      // {
      //   path: 'detail/:studentId',
      //   element: <Detail />
      // },
      // {
      //   path: 'detail/:studentId/edit',
      //   element: <Edit />
      // },
      // {
      //   path: 'add',
      //   element: <Add />
      // }
    ]
  }
])
