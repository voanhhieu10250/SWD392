import React, { useState } from 'react'
import { useLocation } from 'react-router'

export default function topCreator() {
  const [selectedArtwork, setSelectedArtwork] = useState('')
  const [selectedLicense, setSelectedLicense] = useState('')
  const { topcreator } = useLocation()
  const queryParams = new URLSearchParams(topcreator)
  const topcreatorQuery = queryParams.get('query') || ''
  console.log(topcreatorQuery)
  const handleOptionChangeArtwork = (event: any) => {
    setSelectedArtwork(event.target.value)
  }

  const handleOptionChangeLicense = (event: any) => {
    setSelectedLicense(event.target.value)
  }
  return (
    <div className='container flex mx-auto mt-6'>
      <div className='w-3/4 bg-gray-100'>
        
        <div className='flex flex-wrap m-3 bg-white'>
          <div className='w-1/3 p-2'>
            <img src='/logo.png' alt='Image 1' className='w-full h-auto' />
          </div>
         <div className='w-1/3 p-2'>
            <img src='https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vecteezy.com%2Fvector-art%2F5005837-user-icon-in-trendy-flat-style-isolated-on-grey-background-user-symbol-for-your-web-site-design-logo-app-ui-vector-illustration-eps10&psig=AOvVaw3A1I2Aums9vkj3QQdmygOB&ust=1710470709431000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCNDrhIre8oQDFQAAAAAdAAAAABAb' 
            alt='Image 1' className='w-full h-auto' />
          </div>
          <div className='w-1/3 p-2'>
            <img src='https://www.google.com/url?sa=i&url=https%3A%2F%2Fstock.adobe.com%2Fde%2Fimages%2Fdefault-avatar-profile-vector-user-profile%2F339459697&psig=AOvVaw3A1I2Aums9vkj3QQdmygOB&ust=1710470709431000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCNDrhIre8oQDFQAAAAAdAAAAABAk' 
            alt='Image 1' className='w-full h-auto' />
          </div>
          <div className='w-1/3 p-2'>
            <img
              src='https://www.google.com/url?sa=i&url=https%3A%2F%2Fstock.adobe.com%2Fde%2Fimages%2Fdefault-avatar-profile-icon-vector-social-media-user-photo%2F349497933&psig=AOvVaw3A1I2Aums9vkj3QQdmygOB&ust=1710470709431000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCNDrhIre8oQDFQAAAAAdAAAAABAs'
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
