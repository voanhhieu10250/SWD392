import { FC, ComponentType } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
import Login from '../pages/auth/Login';
import MainLayout from '~/layouts/main';
import Main from '~/pages/components/main';
import Search from '../pages/components/search/Search'

const Router = () => {
  return useRoutes([

    // main layouut
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { element: <Main />, index: true },
        
      ],
    },
    { path: 'login', element: <Login /> },
    { path: 'search', element: <Search /> },
    { path: '*', element: <Navigate to="/404" replace /> },

  ]
  );
};

export default Router;
