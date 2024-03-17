import { Outlet } from 'react-router'

function AdminApp() {
  return (
    <div className='bg-background font-sans antialiased'>
      <Outlet />
    </div>
  )
}

export default AdminApp
