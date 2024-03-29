import { ModeToggle } from './ModeToggle'
import { Link } from 'react-router-dom'
import SearchBox from './SearchBox'
import useAuth from '~/hooks/useAuth'
import OptionsDropdown from './OptionsDropdown'

const TopNav = () => {
  const { isAuthenticated, user } = useAuth()

  // console.log(isAuthenticated)

  return (
    <div className='sticky top-0 flex justify-between px-[calc(1%+10px)] py-4 shadow-md bg-background z-50'>
      <div className='grid place-content-center'>
        <Link to='/' className='text-2xl font-semibold tracking-tight'>
          Artwork
        </Link>
      </div>
      <div className='grid place-content-center'>
        <SearchBox />
      </div>
      <div className='flex items-center gap-x-2'>
        {isAuthenticated ? (
          <OptionsDropdown username={user?.username || ''} userId={user?.id || 0} />
        ) : (
          <>
            <Link to='/login' className='text-sm font-semibold'>
              Login
            </Link>
            <Link to='/register' className='text-sm font-semibold'>
              Register
            </Link>
          </>
        )}
        <ModeToggle />
      </div>
    </div>
  )
}

export default TopNav
