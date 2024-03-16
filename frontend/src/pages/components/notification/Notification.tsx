import React from 'react'
import { useLocation } from 'react-router-dom' // Import useLocation hook

export default function Notification() {
  const location = useLocation()
  const { paymentSuccess } = location.state || { paymentSuccess: false } // Default to false if no state is passed

  return (
    <div className='bg-gray-100 '>
      <div className='bg-white p-6  md:mx-auto'>
        {paymentSuccess ? (
          <>
            {/* Success message */}
            <svg viewBox='0 0 24 24' className='text-green-600 w-16 h-16 mx-auto my-6'>
              {/* SVG path for success icon */}
            </svg>
            <div className='text-center'>
              <h3 className='md:text-2xl text-base text-gray-900 font-semibold text-center'>Payment Done!</h3>
              <p className='text-gray-600 my-2'>Thank you for completing your secure online payment.</p>
              <p>Have a great day!</p>
              <div className='py-10 text-center'>
                <a href='/package' className='px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3'>
                  GO BACK
                </a>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Failure message */}
            <svg viewBox='0 0 24 24' className='text-red-600 w-16 h-16 mx-auto my-6'>
              {/* SVG path for failure icon */}
            </svg>
            <div className='text-center'>
              <h3 className='md:text-2xl text-base text-gray-900 font-semibold text-center'>Payment Failed!</h3>
              <p className='text-gray-600 my-2'>Please try your payment again.</p>
              <div className='py-10 text-center'>
                <a href='/package' className='px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3'>
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
