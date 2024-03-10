import { useLocation, Outlet } from 'react-router-dom';
// @mui
import { Box, Link, Container, Typography, Stack } from '@mui/material';
// components
//
import Header from '../../pages/components/header';

// ----------------------------------------------------------------------

export default function MainLayout() {
  
  return (
    <>
      <Header />
      <Outlet />

    </>
  );
}
