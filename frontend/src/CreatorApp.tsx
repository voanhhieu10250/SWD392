import { Outlet } from 'react-router'

function CreatorApp() {
  return (
    <div className='bg-background font-sans antialiased'>
      <Outlet />
    </div>
  )
}

export default CreatorApp
