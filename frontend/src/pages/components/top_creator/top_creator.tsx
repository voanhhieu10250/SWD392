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
         <div className='w-1/3 p-2 h-48' >
            <img src='https://photo.znews.vn/w660/Uploaded/qhj_yvobvhfwbv/2018_07_18/Nguyen_Huy_Binh1.jpg' 
            alt='Image 1' className='w-full h-auto' />
            <div className="img-title flex justify-center mt-2">
              <span className="title">
                Lý Hiếu Duy
              </span>
            </div>
          </div>
          <div className='w-1/3 p-2 h-48' >
            <img src='https://photo.znews.vn/w660/Uploaded/qhj_yvobvhfwbv/2018_07_18/Nguyen_Huy_Binh1.jpg' 
            alt='Image 1' className='w-full h-auto' />
            <div className="img-title flex justify-center mt-2">
              <span className="title">
                Lý Duy
              </span>
            </div>
          </div>
          <div className='w-1/3 p-2 ' >
            <img
              src='https://photo.znews.vn/w660/Uploaded/qhj_yvobvhfwbv/2018_07_18/Nguyen_Huy_Binh1.jpg'
              alt='Image 1'
              className='w-full h-auto'
            />
            <div className="img-title flex justify-center mt-2">
              <span className="title">
                Hiếu Duy
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className='w-1/4 p-4 bg-white shadow-md '>
        <h2 className='text-lg font-bold mb-4 px-4 '>Sort</h2>
        <div>
          <div className='flex justify-between px-4  '>
            <label>By Artwork Uploaded</label>
            <input
              className='w-7 accent-red-500'
              type='radio'
              value='artworkTitle'
              checked={selectedArtwork === 'artworkTitle'}
              onChange={handleOptionChangeArtwork}
            />
          </div>
          <div className='flex justify-between px-4 pt-2'>
            <label>By Dowloads</label>
            <input
              className='w-7 accent-red-500'
              type='radio'
              value='artworkCaption'
              checked={selectedArtwork === 'artworkCaption'}
              onChange={handleOptionChangeArtwork}
            />
          </div>
          <div className='flex justify-between px-4 pt-2'>
            <label>By Follower</label>
            <input
              className='w-7 accent-red-500'
              type='radio'
              value='artworkTags'
              checked={selectedArtwork === 'artworkTags'}
              onChange={handleOptionChangeArtwork}
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
