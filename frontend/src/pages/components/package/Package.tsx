
export default function Package() {
  return (
    <div className=''>
      <div>
        <h2 className='text-3xl font-bold tracki text-center mt-12 sm:text-5xl '>Package</h2>
        <p className='max-w-3xl mx-auto mt-4 text-xl text-center '>
          Get started on our free plan and upgrade when you are ready.
        </p>
      </div>
      <div className='mt-24 container space-y-12 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-8'>
        {/* <div className='relative p-8  border border-gray-200 rounded-2xl shadow-sm flex flex-col hover:border-emerald-600 hover:border-4'>
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
            className='bg-emerald-500 text-white hover:bg-emerald-100 mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium'
            href='/auth/login'
          >
            Go to checkout
          </a>
        </div> */}

        {/* Trang thái card đã mua  */}
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

        {/* Card Creator */}
        <div className='relative p-8  border border-gray-200 rounded-2xl shadow-sm flex flex-col hover:border-emerald-600 hover:border-4 '>
          <div className='flex-1'>
            <h3 className='text-xl font-semibold '>For Creator</h3>
            {/* <p className='absolute top-0 py-1.5 px-4 bg-emerald-500 text-white rounded-full text-xs font-semibold uppercase tracking-wide  transform -translate-y-1/2'>
              Most popular
            </p> */}
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
            className='bg-emerald-500 text-white  hover:bg-emerald-600 mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium'
            href='/notification'
          >
            Go to checkout
          </a>
        </div>
      </div>
    </div>
  )
}
