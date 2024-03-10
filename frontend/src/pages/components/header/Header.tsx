import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Header() {
  const location = useLocation()
  const [headerUrl, setHeaderUrl] = useState<boolean>(false)

  useEffect(() => {
    setHeaderUrl(location.pathname === '/')
  }, [location])
  return (
    <div>
      {headerUrl ? (
        <header
          className='bg-white shadow-md'
          style={{
            backgroundImage:
              "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://fps.cdnpk.net/home/cover/image-7.jpg?w=1400')"
          }}
        >
          <div className='container mx-auto px-6 py-3'>
            <div className='flex items-center justify-between'>
              {/* Phần Logo */}
              <div className='flex-2'>
                <img src='/logo.png' alt='logo' className='h-16 w-28 inline-block' />
              </div>
              {/* Phần Menu */}
              <div className='flex-6 hiddene md:flex md:items-center'>
                <nav className='flex space-x-4'>
                  <a href='#' className='py-2 px-4  text-white border-b-4 border-blue-500 font-semibold'>
                    Digital Arts
                  </a>
                  <a href='#' className='py-2 px-4  text-white font-semibold'>
                    Physical Arts
                  </a>
                  <a href='#' className='py-2 px-4  text-white font-semibold'>
                    Top Creator
                  </a>
                  {/* Thêm nhiều mục điều hướng hơn nếu cần */}
                </nav>
              </div>
              {/* Phần Đăng nhập và Đăng ký */}
              <div className='flex-2 '>
                <div className='flex w-full '>
                  <a href='/login' className='py-2 mr-4  px-6 text-white font-semibold'>
                    Log in
                  </a>
                  <button className=' mr-4 px-6 bg-blue-500 items-center text-white font-semibold rounded-lg shadow-md hover:bg-blue-700'>
                    Sign up
                  </button>
                </div>
              </div>
            </div>
            <div className='banner text-center'>
              <div className=' text-white mt-12'>
                <h1 className='text-4xl  font-semibold '>Create great designs, faster.</h1>
                <h3 className='text-xl mt-2'>
                  High-quality photos, videos, vectors, PSD, AI images, icons... to go from ideas to outstanding designs
                </h3>
              </div>

              <form className='mb-16 bg-white mx-80 mt-8 '>
                <div className='relative mb-4 flex w-full flex-wrap items-stretch p-2'>
                  <input
                    type='search'
                    className='relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary'
                    placeholder='Search'
                    aria-label='Search'
                    aria-describedby='button-addon1'
                  />

                  <Link
                    to='/search'
                    className='relative z-[2] flex items-center rounded-r  bg-blue-500 px-6 py-2.5 text-xs font-medium uppercase leading-tightshadow-md transition duration-150 ease-in-out  hover:shadow-lg  focus:shadow-lg focus:outline-none focus:ring-0  active:shadow-lg'
                    type='button'
                    id='button-addon1'
                  >
                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' className='h-5 w-5'>
                      <path
                        fillRule='evenodd'
                        d='M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </header>
      ) : (
        <header className=' shadow-md'>
          <div className='container mx-auto px-6 py-1'>
            <div className='grid grid-cols-8 items-center '>
              {/* Phần Logo */}
              <div className='col-span-1'>
                <img src='/logo.png' alt='logo' className='h-16 w-28 inline-block' />
              </div>

              <form className='col-span-5 bg-gray-200  hidden md:flex md:items-center rounded-md '>
                <div className='relative  flex w-full  flex-wrap items-stretch p-2'>
                  <input
                    type='search'
                    className='relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary'
                    placeholder='Search'
                    aria-label='Search'
                    aria-describedby='button-addon1'
                  />

                  <Link
                    to='/search'
                    className='relative z-[2] flex items-center rounded-r  bg-blue-500  px-6 py-2.5 text-xs font-medium uppercase leading-tightshadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0  active:shadow-lg'
                    type='button'
                    id='button-addon1'
                  >
                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' className='h-5 w-5'>
                      <path
                        fillRule='evenodd'
                        d='M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </Link>
                </div>
              </form>

              {/* Phần Đăng nhập và Đăng ký */}
              <div className='col-span-2 '>
                <div className='flex justify-center '>
                  <a href='#' className='py-2 mr-4 px-6  font-semibold'>
                    Log in
                  </a>
                  <button className=' mr-4 px-6 bg-blue-500 items-center text-white font-semibold rounded-lg shadow-md hover:bg-blue-700'>
                    Sign up
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>
      )}
    </div>
  )
}
