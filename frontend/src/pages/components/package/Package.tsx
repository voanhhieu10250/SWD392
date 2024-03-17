import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '~/hooks/useAuth'
import axiosInstance from '~/utils/axios'

export default function Package() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const handleCheckout = async (packageName: string) => {
    // Xác định dữ liệu order dựa trên gói được chọn
    const orderData =
      packageName === 'creator'
        ? {
            description: 'Creator',
            total: 200.0,
            currency: 'USD',
            intent: 'sale',
            method: 'paypal',
            cancelUrl: import.meta.env.VITE_APP_URL + '/cancel',
            successUrl: import.meta.env.VITE_APP_URL + '/success'
          }
        : {
            description: 'Audience Premium',
            total: 100.0,
            currency: 'USD',
            intent: 'sale',
            method: 'paypal',
            cancelUrl: import.meta.env.VITE_APP_URL + '/cancel',
            successUrl: import.meta.env.VITE_APP_URL + '/success'
          }

    try {
      const response = await axiosInstance.post('/paypal/pay', orderData, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      console.log('Checkout success:', response.data)
      if (response.data.success) {
        window.location.href = response.data.data
      } else {
        navigate('/notification', { state: { paymentSuccess: false } })
      }
    } catch (error) {
      console.error('Checkout error:', error)
      navigate('/notification', { state: { paymentSuccess: false } })
    }
  }
  // fetch('URL_API_BE/checkout', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify(orderData)
  // })
  //   .then((response) => response.json())
  //   .then((data) => {
  //     console.log('Success:', data)
  //     if (data.success) {
  //       window.location.href = data.paymentUrl
  //     } else {
  //       navigate('/notification', { state: { paymentSuccess: false } })
  //     }
  //   })
  //   .catch((error) => {
  //     console.error('Error:', error)
  //     navigate('/notification', { state: { paymentSuccess: false } })
  //   })

  return (
    <div className=''>
      <div>
        <h2 className='text-3xl font-bold tracki text-center mt-12 sm:text-5xl '>Package</h2>
        <p className='max-w-3xl mx-auto mt-4 text-xl text-center '>
          Get started on our free plan and upgrade when you are ready.
        </p>
      </div>
      <div className='mt-24 container space-y-12 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-8'>
        {user?.isPremiumAudience ? (
          <div className='relative p-8 bg-gray-300  rounded-2xl shadow-sm flex flex-col border-gray-600 border-4'>
            <div className='flex-1'>
              <h3 className='text-xl font-semibold '>For Audience</h3>
              <p className='mt-4 flex items-baseline '>
                <span className='text-5xl font-extrabold tracking-tight'>$12</span>
              </p>
              <p className='mt-6 '>You just want to discover</p>
              <ul role='list' className='mt-6 space-y-6'>
                <li className='flex'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    stroke-width='2'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    className='flex-shrink-0 w-6 h-6 text-emerald-500'
                    aria-hidden='true'
                  >
                    <polyline points='20 6 9 17 4 12'></polyline>
                  </svg>
                  <span className='ml-3 '>10 Credits</span>
                </li>
                <li className='flex'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    stroke-width='2'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    className='flex-shrink-0 w-6 h-6 text-emerald-500'
                    aria-hidden='true'
                  >
                    <polyline points='20 6 9 17 4 12'></polyline>
                  </svg>
                  <span className='ml-3 '>Generate video (2 credits)</span>
                </li>
                <li className='flex'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    stroke-width='2'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    className='flex-shrink-0 w-6 h-6 text-emerald-500'
                    aria-hidden='true'
                  >
                    <polyline points='20 6 9 17 4 12'></polyline>
                  </svg>
                  <span className='ml-3 '>Quizz (1 credits) </span>
                </li>
              </ul>
            </div>
            <a
              className='bg-gray-500 text-white hover:bg-emerald-100 mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium'
              href='/auth/login'
            >
              Buyed
            </a>
            <div className='absolute inset-0   flex items-center justify-center  rounded-2xl'>
              <img src='/sold.png' alt='Sold' className='w-44 h-44' />
            </div>
          </div>
        ) : (
          <div className='relative p-8  border border-gray-200 rounded-2xl shadow-sm flex flex-col hover:border-emerald-600 hover:border-4'>
            <div className='flex-1'>
              <h3 className='text-xl font-semibold '>For Audience</h3>
              <p className='mt-4 flex items-baseline '>
                <span className='text-5xl font-extrabold tracking-tight'>$12</span>
              </p>
              <p className='mt-6 '>You just want to discover</p>
              <ul role='list' className='mt-6 space-y-6'>
                <li className='flex'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    stroke-width='2'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    className='flex-shrink-0 w-6 h-6 text-emerald-500'
                    aria-hidden='true'
                  >
                    <polyline points='20 6 9 17 4 12'></polyline>
                  </svg>
                  <span className='ml-3 '>10 Credits</span>
                </li>
                <li className='flex'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    stroke-width='2'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    className='flex-shrink-0 w-6 h-6 text-emerald-500'
                    aria-hidden='true'
                  >
                    <polyline points='20 6 9 17 4 12'></polyline>
                  </svg>
                  <span className='ml-3 '>Generate video (2 credits)</span>
                </li>
                <li className='flex'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    stroke-width='2'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    className='flex-shrink-0 w-6 h-6 text-emerald-500'
                    aria-hidden='true'
                  >
                    <polyline points='20 6 9 17 4 12'></polyline>
                  </svg>
                  <span className='ml-3 '>Quizz (1 credits) </span>
                </li>
              </ul>
            </div>
            <button
              className='bg-emerald-500 text-white hover:bg-emerald-600 mt-8 py-3 px-6 border border-transparent rounded-md text-center font-medium'
              onClick={() => handleCheckout('audience')}
            >
              Buy Audiance Premium
            </button>
          </div>
        )}

        {/* Card Creator */}
        {user?.isCreator ? (
          <div className='relative p-8 bg-gray-300  rounded-2xl shadow-sm flex flex-col border-gray-600 border-4'>
            <div className='flex-1'>
              <h3 className='text-xl font-semibold '>For Creator</h3>
              <p className='mt-4 flex items-baseline '>
                <span className='text-5xl font-extrabold tracking-tight'>$120</span>
              </p>
              <p className='mt-6 '>You want to learn and have a personal assistant</p>
              <ul role='list' className='mt-6 space-y-6'>
                <li className='flex'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    stroke-width='2'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    className='flex-shrink-0 w-6 h-6 text-emerald-500'
                    aria-hidden='true'
                  >
                    <polyline points='20 6 9 17 4 12'></polyline>
                  </svg>
                  <span className='ml-3 '>30 credits</span>
                </li>
                <li className='flex'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    stroke-width='2'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    className='flex-shrink-0 w-6 h-6 text-emerald-500'
                    aria-hidden='true'
                  >
                    <polyline points='20 6 9 17 4 12'></polyline>
                  </svg>
                  <span className='ml-3 '>Powered by GPT-4 (more accurate)</span>
                </li>
                <li className='flex'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    stroke-width='2'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    className='flex-shrink-0 w-6 h-6 text-emerald-500'
                    aria-hidden='true'
                  >
                    <polyline points='20 6 9 17 4 12'></polyline>
                  </svg>
                  <span className='ml-3 '>Generate video (2 credits)</span>
                </li>
                <li className='flex'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    stroke-width='2'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    className='flex-shrink-0 w-6 h-6 text-emerald-500'
                    aria-hidden='true'
                  >
                    <polyline points='20 6 9 17 4 12'></polyline>
                  </svg>
                  <span className='ml-3 '>Quizz (1 credits) </span>
                </li>
                <li className='flex'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    stroke-width='2'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    className='flex-shrink-0 w-6 h-6 text-emerald-500'
                    aria-hidden='true'
                  >
                    <polyline points='20 6 9 17 4 12'></polyline>
                  </svg>
                  <span className='ml-3 '>Analytics on the quizz</span>
                </li>
              </ul>
            </div>
            <a
              className='bg-gray-500 text-white hover:bg-emerald-100 mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium'
              href='/auth/login'
            >
              Buyed
            </a>
            <div className='absolute inset-0   flex items-center justify-center  rounded-2xl'>
              <img src='/sold.png' alt='Sold' className='w-44 h-44' />
            </div>
          </div>
        ) : (
          <div className='relative p-8  border border-gray-200 rounded-2xl shadow-sm flex flex-col hover:border-emerald-600 hover:border-4 '>
            <div className='flex-1'>
              <h3 className='text-xl font-semibold '>For Creator</h3>
              <p className='mt-4 flex items-baseline '>
                <span className='text-5xl font-extrabold tracking-tight'>$120</span>
              </p>
              <p className='mt-6 '>You want to learn and have a personal assistant</p>
              <ul role='list' className='mt-6 space-y-6'>
                <li className='flex'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    stroke-width='2'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    className='flex-shrink-0 w-6 h-6 text-emerald-500'
                    aria-hidden='true'
                  >
                    <polyline points='20 6 9 17 4 12'></polyline>
                  </svg>
                  <span className='ml-3 '>30 credits</span>
                </li>
                <li className='flex'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    stroke-width='2'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    className='flex-shrink-0 w-6 h-6 text-emerald-500'
                    aria-hidden='true'
                  >
                    <polyline points='20 6 9 17 4 12'></polyline>
                  </svg>
                  <span className='ml-3 '>Powered by GPT-4 (more accurate)</span>
                </li>
                <li className='flex'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    stroke-width='2'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    className='flex-shrink-0 w-6 h-6 text-emerald-500'
                    aria-hidden='true'
                  >
                    <polyline points='20 6 9 17 4 12'></polyline>
                  </svg>
                  <span className='ml-3 '>Generate video (2 credits)</span>
                </li>
                <li className='flex'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    stroke-width='2'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    className='flex-shrink-0 w-6 h-6 text-emerald-500'
                    aria-hidden='true'
                  >
                    <polyline points='20 6 9 17 4 12'></polyline>
                  </svg>
                  <span className='ml-3 '>Quizz (1 credits) </span>
                </li>
                <li className='flex'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    stroke-width='2'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    className='flex-shrink-0 w-6 h-6 text-emerald-500'
                    aria-hidden='true'
                  >
                    <polyline points='20 6 9 17 4 12'></polyline>
                  </svg>
                  <span className='ml-3 '>Analytics on the quizz</span>
                </li>
              </ul>
            </div>
            <button
              className='bg-emerald-500 text-white hover:bg-emerald-600 mt-8 py-3 px-6 border border-transparent rounded-md text-center font-medium'
              onClick={() => handleCheckout('creator')}
            >
              Buy Creator Package
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
