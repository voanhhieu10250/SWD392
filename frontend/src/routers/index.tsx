import { Navigate, useRoutes } from 'react-router-dom'
import Login from '../pages/auth/Login'
import MainLayout from '~/layouts/main'
import Main from '~/pages/components/main'
import Search from '../pages/components/search/Search'
import ProfileUser from '~/pages/components/profile'

import Package from '~/pages/components/package'
import Notification from '~/pages/components/notification'

import DigitalArtPage from '~/pages/components/details/DigitalArtPage.tsx'
import PhysicalArtPage from '~/pages/components/details/PhysicalArtPage.tsx'

import TopCreator from '~/pages/components/top_creator'
import Register from '~/pages/auth/Register'

const Router = () => {
  return useRoutes([
    // main layouut
    {
      path: '/',
      element: <MainLayout />,
      children: [{ element: <Main />, index: true }]
    },
    { path: 'login', element: <Login /> },
    { path: 'register', element: <Register /> },

    { path: 'search', element: <Search /> },
    { path: 'profile/:userId', element: <ProfileUser /> },

    { path: 'package', element: <Package /> },
    { path: 'notification', element: <Notification /> },
    { path: '*', element: <Navigate to='/404' replace /> },

    { path: 'digital-art', element: <DigitalArtPage /> },
    { path: 'physical-art', element: <PhysicalArtPage /> },

    { path: 'top_creator', element: <TopCreator /> }
  ])
}

export default Router
