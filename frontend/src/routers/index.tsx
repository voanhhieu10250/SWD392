import { Navigate, useRoutes } from 'react-router-dom'
import MainLayout from '~/layouts/main'
import Main from '~/pages/components/main'
import ProfileUser from '~/pages/components/profile'
import Login from '../pages/auth/Login'
import Search from '../pages/components/search/Search'

import Notification from '~/pages/components/notification'
import Package from '~/pages/components/package'

import DigitalArtPage from '~/pages/components/details/DigitalArtPage.tsx'
import PhysicalArtPage from '~/pages/components/details/PhysicalArtPage.tsx'

import TopCreator from '~/pages/components/top_creator'

import Register from '~/pages/auth/Register'

import UploadArt from '~/pages/components/upload/UploadArt.tsx'

import Dashboard from '~/pages/Dashboard/Dashboard'

import CreatorDashboardLayout from '~/pages/components/creator/CreatorDashboardLayout'

import CreatorList from '~/pages/Dashboard/CreatorList'
import StaffList from '~/pages/Dashboard/StaffList'
import UserList from '~/pages/Dashboard/UserList'
import StaffDashboard from '~/pages/components/Staffdashboard/StaffDashboard'


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
    { path: 'upload-art', element: <UploadArt /> },

    { path: 'top_creator', element: <TopCreator /> },

    // { path: 'dashboard', element: <Dashboard/> },
    { path: 'creator_dashboard', element: <CreatorDashboardLayout /> }

    { path: 'dashboard', element: <Dashboard/> },
    { path: 'userlist', element: <UserList/> },
    { path: 'stafflist', element: <StaffList/> },
    { path: 'creatorlist', element: <CreatorList/> },
    { path: 'staffdashboard', element: <StaffDashboard/> },
    
  ])
}

export default Router
