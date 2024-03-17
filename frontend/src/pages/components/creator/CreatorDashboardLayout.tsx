import { NavLink } from 'react-router-dom'
import { Outlet, useNavigate } from 'react-router'
import useAuth from '~/hooks/useAuth'
import { cn } from '~/lib/utils'

export default function CreatorDashboardLayout() {
  const navigate = useNavigate()
  const { logout } = useAuth()

  return (
    <div className='flex flex-1'>
      <div className='flex flex-1'>
        <aside id='cta-button-sidebar' className='w-64 h-full' aria-label='Sidebar'>
          {/* Side Bar */}
          <div className='h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800'>
            <ul className='space-y-2 font-medium'>
              <li>
                <NavLink
                  to='/creator/dashboard'
                  end
                  className={({ isActive }) =>
                    cn(
                      'flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ',
                      {
                        'bg-gray-100 dark:bg-gray-700': isActive
                      }
                    )
                  }
                >
                  <svg
                    className='w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='currentColor'
                    viewBox='0 0 22 21'
                  >
                    <path d='M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z' />
                    <path d='M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z' />
                  </svg>
                  <span className='ms-3'>Dashboard</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/creator/dashboard/preorder-orders'
                  className={({ isActive }) =>
                    cn(
                      'flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ',
                      {
                        'bg-gray-100 dark:bg-gray-700': isActive
                      }
                    )
                  }
                >
                  <svg
                    className='flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='currentColor'
                    viewBox='0 0 18 18'
                  >
                    <path d='M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z' />
                  </svg>
                  <span className='flex-1 ms-3 whitespace-nowrap'>Your Pre-Order</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/creator/dashboard/preorder-offers'
                  className={({ isActive }) =>
                    cn(
                      'flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ',
                      {
                        'bg-gray-100 dark:bg-gray-700': isActive
                      }
                    )
                  }
                >
                  <svg
                    className='flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='currentColor'
                    viewBox='0 0 18 18'
                  >
                    <path d='M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z' />
                  </svg>
                  <span className='flex-1 ms-3 whitespace-nowrap'>Your Offers</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/creator/dashboard/purchase'
                  className={({ isActive }) =>
                    cn(
                      'flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ',
                      {
                        'bg-gray-100 dark:bg-gray-700': isActive
                      }
                    )
                  }
                >
                  <svg
                    className='flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path d='m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z' />
                  </svg>
                  <span className='flex-1 ms-3 whitespace-nowrap'>Purchase History</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/creator/dashboard/resell'
                  className={({ isActive }) =>
                    cn(
                      'flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ',
                      {
                        'bg-gray-100 dark:bg-gray-700': isActive
                      }
                    )
                  }
                >
                  <svg
                    className='flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='currentColor'
                    viewBox='0 0 20 18'
                  >
                    <path d='M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z' />
                  </svg>
                  <span className='flex-1 ms-3 whitespace-nowrap'>Resell Transaction</span>
                </NavLink>
              </li>

              <li>
                <button
                  type='button'
                  className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'
                  onClick={() => {
                    logout()
                    navigate('/login', { replace: true })
                  }}
                >
                  <svg
                    className='flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 18 16'
                  >
                    <path
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3'
                    />
                  </svg>
                  <span className='flex-1 ms-3 whitespace-nowrap'>Log out</span>
                </button>
              </li>
            </ul>
          </div>
        </aside>

        <div className='p-4 flex-1 overflow-y-auto'>
          {/* Content */}
          <div className='p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 bg-background'>
            <div className='flex items-center justify-center rounded'>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
