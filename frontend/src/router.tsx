import { createBrowserRouter } from 'react-router-dom'
import AdminApp from './AdminApp'
import App from './App'

import Dashboard from './pages/Dashboard/Dashboard'

import UserList from './pages/Dashboard/UserList'
import ErrorPage from './pages/ErrorPage'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Profile from './pages/Profile'
import Search from './pages/Search'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import StaffDashboard from './pages/components/Staffdashboard/StaffDashboard'
import CreatorDashboardLayout from './pages/components/creator'
import Notification from './pages/components/notification'
import Package from './pages/components/package'
import TopCreator from './pages/components/top_creator'
import UploadArt from './pages/components/upload/UploadArt'
import ArtDetail from './pages/ArtDetail'
import PhysicalArtPage from './pages/components/details/PhysicalArtPage'
import CreatorDashboard from './components/CreatorDashboard/CreatorDashboard'
import HistoryBuyPackage from './pages/components/creator/HistoryBuyPackage'
import TransactionHistory from './pages/components/creator/HistoryPhysicalArt'
import PreOrder from './pages/PreOrder'
import SuccessPage from './pages/components/notification/SuccesPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
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
      },
      {
        path: 'payment',
        element: <Package />
      },
      {
        path: 'notification',
        element: <Notification />
      },
      {
        path: 'register',
        element: <Register />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'profile/:userId',
        element: <Profile />
      },
      {
        path: 'packages',
        element: <Package />
      },
      {
        path: 'success',
        element: <SuccessPage />
      },
      {
        path: 'top-creators',
        element: <TopCreator />
      },
      {
        path: 'art/upload',
        element: <UploadArt />
      },
      {
        path: 'art/:artId',
        element: <ArtDetail />
      },
      {
        path: 'art2/:artId',
        // element: <DigitalArtPage />
        element: <PhysicalArtPage />
      },
      {
        path: 'notification',
        element: <Notification />
      },
      {
        path: 'creator/dashboard',
        element: <CreatorDashboardLayout />,
        children: [
          {
            index: true,
            element: <CreatorDashboard />
          },
          {
            path: 'preorder-offers',
            element: <PreOrderOffer />
          },
          {
            path: 'preorder-orders',
            element: <PreOrder />
          },
          {
            path: 'purchase',
            element: <HistoryBuyPackage />
          },
          {
            path: 'resell',
            element: <TransactionHistory />
          }
        ]
      },
      {
        path: '*',
        element: <NotFound />
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
      },
      {
        path: 'users',
        element: <UserList />
      },
      
      {
        path: 'reports',
        element: <ReportList />
      },
      {
        path: 'artworks',
        element: <ArtWorkList />
      },
      {
        path: 'staff-dashboard',
        element: <StaffDashboard />
      }
      
    ]
  }
])
