import React, { useState } from 'react'
import { useLocation } from 'react-router'
import { Avatar, AvatarImage } from '~/components/ui/avatar'
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload'
import DownloadIcon from '@mui/icons-material/Download'
import PersonIcon from '@mui/icons-material/Person'
import axios from 'axios'
import { useQuery } from 'react-query'
import { TopCreator } from '~/types/User'
import { Button, IconButton } from '@material-tailwind/react'
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'

const fetchTopCreator = async () => {
  const res = await axios.get('https://65f44405f54db27bc02139ca.mockapi.io/creatorTop/user')
  return res.data
}

export default function TopCreator() {
  const [selectedSorting, setSelectedSorting] = useState('')

  const { topcreator } = useLocation()
  const queryParams = new URLSearchParams(topcreator)
  const topcreatorQuery = queryParams.get('query') || ''

  const handleOptionSort = (event: any) => {
    setSelectedSorting(event.target.value)
  }

  const { data, isLoading, error } = useQuery('topcreator', fetchTopCreator)

  const [active, setActive] = useState(1)
  const itemsPerPage = 12

  const getItemProps = (index: number) =>
    ({
      variant: active === index ? 'filled' : 'text',
      color: 'gray',
      onClick: () => setActive(index)
    }) as any

  const next = () => {
    if (active * itemsPerPage < data.length) {
      setActive(active + 1)
    }
  }

  const prev = () => {
    if (active > 1) {
      setActive(active - 1)
    }
  }

  const getPageItems = () => {
    if (!data || !Array.isArray(data)) return []
    const startIndex = (active - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const sortedData = selectedSorting ? [...data].sort((a, b) => b[selectedSorting] - a[selectedSorting]) : data
    return sortedData.slice(startIndex, endIndex)
  }

  return (
    <div className='container flex mx-auto mt-6'>
      <div className='w-3/4'>
        <div className='grid grid-cols-3 gap-3 bg-white'>
          {getPageItems().map((item: TopCreator, index: number) => (
            <div key={index} className='hover:border-red-100 border-2'>
              <div className='flex items-center'>
                <div className='w-2/6'>
                  <Avatar className='w-16 h-16 ml-4 my-4'>
                    <AvatarImage src={item.avatar} className='object-cover' />
                  </Avatar>
                </div>
                <div className='w-3/6'>{item.name}</div>
                <div className='w-1/6 font-bold'>#{index + 1}</div>
              </div>
              <div className='flex justify-around text-center pb-4 pt-3'>
                <div>
                  <DriveFolderUploadIcon />
                  <label>{item.uploadFile}</label>
                </div>
                <div>
                  <DownloadIcon />
                  <label>{item.download}</label>
                </div>
                <div>
                  <PersonIcon />
                  <label>{item.followers}</label>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className='flex justify-center mt-8'>
          <Button variant='text' className='flex items-center gap-2' onClick={prev} disabled={active === 1}>
            <ArrowLeftIcon strokeWidth={2} className='h-4 w-4' /> Previous
          </Button>
          <div className='flex items-center gap-2'>
            {Array.from({ length: Math.ceil(data && data.length / itemsPerPage) }, (_, index) => index + 1).map(
              (pageNumber) => (
                <IconButton key={pageNumber} {...getItemProps(pageNumber)}>
                  {pageNumber}
                </IconButton>
              )
            )}
          </div>
          <button
            className='flex items-center gap-2 pl-6'
            onClick={next}
            disabled={active * itemsPerPage >= (data && data.length)}
          >
            Next
            <ArrowRightIcon strokeWidth={2} className='h-4 w-4' />
          </button>
        </div>
      </div>

      <div className='w-1/4 p-4 ml-4 h-56 bg-white shadow-md'>
        <h2 className='text-lg font-bold mb-4 px-4'>Sort</h2>
        <div>
          <div className='flex justify-between px-4'>
            <label>By Artwork Uploaded</label>
            <input
              className='w-7 accent-red-500'
              type='radio'
              value='uploadFile'
              checked={selectedSorting === 'uploadFile'}
              onChange={handleOptionSort}
            />
          </div>
          <div className='flex justify-between px-4 pt-2'>
            <label>By Dowloads</label>
            <input
              className='w-7 accent-red-500'
              type='radio'
              value='download'
              checked={selectedSorting === 'download'}
              onChange={handleOptionSort}
            />
          </div>
          <div className='flex justify-between px-4 pt-2'>
            <label>By Follower</label>
            <input
              className='w-7 accent-red-500'
              type='radio'
              value='followers'
              checked={selectedSorting === 'followers'}
              onChange={handleOptionSort}
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
