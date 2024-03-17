import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard/Dashboard'
import AdminApp from './AdminApp'
import Search from './pages/Search'
import CreatorApp from './CreatorApp'
import DashboardCreator from './pages/components/creator'
import Register from './pages/auth/Register'
import Login from './pages/auth/Login'
import Profile from './pages/Profile'
import ErrorPage from './pages/ErrorPage'
import NotFound from './pages/NotFound'
import Package from './pages/components/package'
import TopCreator from './pages/components/top_creator'
import Notification from './pages/components/notification'
import UserList from './pages/Dashboard/UserList'
import StaffList from './pages/Dashboard/StaffList'
import CreatorList from './pages/Dashboard/CreatorList'
import StaffDashboard from './pages/components/Staffdashboard/StaffDashboard'
import UploadArt from './pages/components/upload/UploadArt'
import DigitalArtPage from './pages/components/details/DigitalArtPage'
import PhysicalArtPage from './pages/components/details/PhysicalArtPage'
import ArtDetail from './pages/ArtDetail'
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
        path: 'staffs',
        element: <StaffList />
      },
      {
        path: 'creators',
        element: <CreatorList />
      },
      {
        path: 'staff-dashboard',
        element: <StaffDashboard />
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
