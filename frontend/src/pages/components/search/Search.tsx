import React, { useState } from 'react'

export default function Search() {
  const [selectedArtwork, setSelectedArtwork] = useState('')
  const [selectedLicense, setSelectedLicense] = useState('')

  const handleOptionChangeArtwork = (event: any) => {
    setSelectedArtwork(event.target.value)
  }

  const handleOptionChangeLicense = (event: any) => {
    setSelectedLicense(event.target.value)
  }
  return (
    <div className='container flex mx-auto mt-6'>
      <div className='w-3/4 bg-gray-100'>
        <h1 className='bg-white m-2 px-3 py-5 text-xl rounded-lg'>Showing results for ''</h1>

        <div className='flex flex-wrap m-3 bg-white'>
          <div className='w-1/3 p-2'>
            <img src='/logo.png' alt='Image 1' className='w-full h-auto' />
          </div>
          <div className='w-1/3 p-2'>
            <img src='https://loremflickr.com/640/480' alt='Image 1' className='w-full h-auto' />
          </div>
          <div className='w-1/3 p-2'>
            <img src='https://loremflickr.com/640/480/fashion' alt='Image 1' className='w-full h-auto' />
          </div>
          <div className='w-1/3 p-2'>
            <img
              src='https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/07/hinh-dep.jpg'
              alt='Image 1'
              className='w-full h-auto'
            />
          </div>
        </div>
      </div>

      <div className='w-1/4 p-4 bg-white shadow-md '>
        <h2 className='text-lg font-bold mb-4 px-4 '>Filter</h2>
        <div>
          <h3 className='font-semibold mb-2 px-4'>Artwork</h3>
          <div className='flex justify-between px-4  '>
            <label>By Title</label>
            <input
              className='w-7 accent-red-500'
              type='radio'
              value='artworkTitle'
              checked={selectedArtwork === 'artworkTitle'}
              onChange={handleOptionChangeArtwork}
            />
          </div>
          <div className='flex justify-between px-4 pt-2'>
            <label>By Caption</label>
            <input
              className='w-7 accent-red-500'
              type='radio'
              value='artworkCaption'
              checked={selectedArtwork === 'artworkCaption'}
              onChange={handleOptionChangeArtwork}
            />
          </div>
          <div className='flex justify-between px-4 pt-2'>
            <label>By Tags</label>
            <input
              className='w-7 accent-red-500'
              type='radio'
              value='artworkTags'
              checked={selectedArtwork === 'artworkTags'}
              onChange={handleOptionChangeArtwork}
            />
          </div>
        </div>
        <div>
          <h3 className='font-semibold my-2 px-4'>License</h3>
          <div className='flex justify-between px-4 '>
            <label>Free</label>
            <input
              className='w-7 accent-red-500'
              type='radio'
              value='free'
              checked={selectedLicense === 'free'}
              onChange={handleOptionChangeLicense}
            />
          </div>
          <div className='flex justify-between px-4 pt-2'>
            <label>Premium</label>
            <input
              className='w-7 accent-red-500'
              type='radio'
              value='premium'
              checked={selectedLicense === 'premium'}
              onChange={handleOptionChangeLicense}
            />
          </div>
        </div>
        <div className='text-center'>
          <button className='mt-4 bg-red-500 text-white px-4 py-2 rounded-3xl'>Apply</button>
        </div>
      </div>
    </div>
  )
}
