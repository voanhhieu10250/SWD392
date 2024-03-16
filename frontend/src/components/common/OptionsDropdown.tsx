import useAuth from '~/hooks/useAuth'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Link } from 'react-router-dom'
import { Button } from '../ui/button'

const OptionsDropdown = ({ username, userId }: { username: string; userId: number | string }) => {
  const { logout } = useAuth()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' className='text-sm font-semibold'>
          {username}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem>
          <Link to={'/profile/' + userId} className='w-full'>
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to='/creator/dashboard' className='w-full'>
            Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <button type='button' className='w-full text-start' onClick={logout}>
            Logout
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default OptionsDropdown
