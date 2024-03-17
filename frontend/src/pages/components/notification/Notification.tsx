import React from 'react'
import { useLocation } from 'react-router-dom'

export default function Notification() {
  const location = useLocation()
  const { paymentSuccess, paymentId, token, PayerID } = location.state || {}
  console.log(token)
  return (
    <div className='bg-gray-100 '>
      <div className='bg-white p-6  md:mx-auto'>
        {paymentSuccess ? (
          <>
            <svg viewBox='0 0 24 24' className='text-green-600 w-16 h-16 mx-auto my-6'>
              <path fill='none' d='M0 0h24v24H0z' />
              <path
                fill='#008000'
                d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.46 7.88l-5.57 5.56c-.39.39-1.02.39-1.41 0l-2.48-2.48a.996.996 0 1 1 1.41-1.41l1.77 1.77 4.95-4.95a.996.996 0 1 1 1.41 1.41z'
              />
            </svg>

            <div className='text-center'>
              <h3 className='md:text-2xl text-base text-gray-900 font-semibold text-center'>Payment Done!</h3>
              <p className='text-gray-600 my-2'>Thank you for completing your secure online payment.</p>

              <p>Have a great day!</p>
              <div className='py-10 text-center'>
                <a href='/payment' className='px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3'>
                  GO BACK
                </a>
              </div>
            </div>
          </>
        ) : (
          <>
            <svg viewBox='0 0 24 24' className='text-red-600 w-16 h-16 mx-auto my-6'>
              {/* SVG path for failure icon */}
            </svg>
            <div className='text-center'>
              <h3 className='md:text-2xl text-base text-gray-900 font-semibold text-center'>Payment Failed!</h3>
              <p className='text-gray-600 my-2'>Please try your payment again.</p>
              <div className='py-10 text-center'>
                <a href='/payment' className='px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3'>
                  TRY AGAIN
                </a>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
