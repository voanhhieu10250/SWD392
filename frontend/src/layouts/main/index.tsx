import { Outlet } from 'react-router-dom'
// @mui
// components
//
import Header from '../../pages/components/header'

// ----------------------------------------------------------------------

export default function MainLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}
