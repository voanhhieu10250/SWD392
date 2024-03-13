import { Navigate, useRoutes } from 'react-router-dom'
import Login from '../pages/auth/Login'
import MainLayout from '~/layouts/main'
import Main from '~/pages/components/main'
import Search from '../pages/components/search/Search'
import ProfileUser from '~/pages/components/profile'
import Package from '~/pages/components/package'
import Notification from '~/pages/components/notification'

const Router = () => {
  return useRoutes([
    // main layouut
    {
      path: '/',
      element: <MainLayout />,
      children: [{ element: <Main />, index: true }]
    },
    { path: 'login', element: <Login /> },
    { path: 'search', element: <Search /> },
    { path: 'profile/:userId', element: <ProfileUser /> },
    { path: 'package', element: <Package /> },
    { path: 'notification', element: <Notification /> },
    { path: '*', element: <Navigate to='/404' replace /> }
  ])
}

export default Router
