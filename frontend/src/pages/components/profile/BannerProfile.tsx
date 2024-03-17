import CameraAltIcon from '@mui/icons-material/CameraAlt'
import { Box, Modal, Typography } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { User } from '~/types/User'

const colors = ['gray', 'red', 'orange', 'green', 'lightblue', 'blue', 'purple', 'pink', 'black']
interface Props {
  user: User
}

export default function BannerProfile({ user }: Props) {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 712,
    maxWidth: 712,
    height: 712,
    dislay: 'flex',
    justifyContent: 'center',
    overflowY: 'scroll',
    bgcolor: '#fff',
    border: '2px solid #000',
    boxShadow: 24,
    pb: 3,
    px: 3
  }
  const style2 = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 572,
    maxWidth: 712,
    height: 712,
    dislay: 'flex',
    flexDirection: 'column',
    backgroundColor: '#1b1e21',
    justifyContent: 'center',

    border: '2px solid #000',
    boxShadow: 24
  }
  const [openEdit, setOpenEdit] = React.useState(false)
  const [openPreOrder, setOpenPreOrder] = React.useState(false)

  const handleOpenEdit = () => {
    setOpenEdit(true)
  }
  const handleCloseEdit = () => {
    setOpenEdit(false)
  }
  const handleOpenEditOrder = () => {
    setOpenPreOrder(true)
  }
  const handleCloseEditOrder = () => {
    setOpenPreOrder(false)
  }
  const [name, setName] = useState(user.username)
  const [about, setAbout] = useState(user.about)
  const [imageSrc, setImageSrc] = useState(user.bannerImg)
  const [imageAvatarSrc, setImageAvatarSrc] = useState(user.avatar)
  const [selectedColor, setSelectedColor] = useState(user.backgroundColor || 'gray')
  const handleFileChange = (event: any) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setImageSrc(reader.result)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleFileAvatarChange = (event: any) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setImageAvatarSrc(reader.result)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = () => {
    const formData = new FormData()
    formData.append('bannerImg', imageSrc)
    formData.append('avatar', imageAvatarSrc)
    formData.append('backgroundColor', selectedColor)
    formData.append('name', name)
    formData.append('about', about)
    console.log('formData', formData)
    axios
      .put('http://13.250.106.122/users', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((response) => {})
      .catch((error) => {})
    setOpenEdit(false)
  }
  return (
    <div>
      <div className='w-full object-fill h-80'>
        <img
          src='https://png.pngtree.com/thumb_back/fh260/back_pic/00/02/44/5056179b42b174f.jpg'
          className='object-cover w-full h-full'
          alt=''
        />
      </div>

      <div className={`flex ${user.backgroundColor ? user.backgroundColor : 'bg-red-200'} h-36`}>
        <div className='w-1/4 '>
          <div className='float-right -top-20 relative w-40 h-40'>
            <div className='absolute top-0 -left-5 h-full w-full  '>
              <img src={user.avatar} alt='' className=' rounded-3xl boder-white border-8  w-40 h-40' />
            </div>
          </div>
        </div>
        <div className='w-3/4 pl-11'>
          <div className='-mt-8 flex gap-2'>
            <a className='rounded-2xl flex items-center justify-center w-28 py-4 bg-white ' onClick={handleOpenEdit}>
              <h1 className='font-medium'>Edit</h1>
            </a>
            {/* {user.role === 'Creator' && ( */}
            <a
              className='rounded-2xl flex items-center justify-center w-28 py-4 bg-white '
              onClick={handleOpenEditOrder}
            >
              <h1 className='font-medium'>Pre-Order</h1>
            </a>
            {/* )} */}
            <Modal
              open={openEdit}
              onClose={handleCloseEdit}
              aria-labelledby='modal-modal-title'
              aria-describedby='modal-modal-description'
            >
              <Box sx={style}>
                <Typography
                  id='modal-modal-title'
                  className='py-3 font-bold  bg-white bg-opacity-95  flex items-center   pl-4 z-50'
                >
                  <h1 className='font-bold text-2xl text-black'> Edit Profile</h1>
                </Typography>
                <Typography id='modal-modal-description' sx={{ mx: 2 }}>
                  <div className='grid grid-cols-1 mb-2'>
                    {/* edit banner */}
                    <div style={{ position: 'relative' }} className='h-64'>
                      <img
                        src={imageSrc}
                        alt=''
                        style={{ width: '100%', borderRadius: '10px', height: '100%', objectFit: 'cover' }}
                      />
                      <input
                        type='file'
                        id='fileBanner'
                        style={{
                          opacity: 0,
                          position: 'absolute',
                          right: 0,
                          top: 0,
                          cursor: 'pointer'
                        }}
                        onChange={handleFileChange}
                      />
                      <label htmlFor='fileBanner' className='absolute right-3 bottom-3'>
                        <span
                          className='bg-white rounded-full p-2 '
                          style={{ boxShadow: '0 0 15px 10px rgba(0,0,0,.05' }}
                        >
                          <CameraAltIcon />
                        </span>
                      </label>
                    </div>
                    {/* edit avatar */}
                    <div className='flex mt-6 ml-2 my-4 '>
                      <div className='w-24 h-24 p-2' style={{ position: 'relative' }}>
                        <img
                          src={imageAvatarSrc}
                          alt=''
                          style={{ width: '100%', borderRadius: '100px', height: '100%', objectFit: 'cover' }}
                        />
                        <input
                          type='file'
                          id='fileAvatar'
                          style={{
                            opacity: 0,
                            position: 'absolute',
                            right: 0,
                            top: 0,
                            cursor: 'pointer'
                          }}
                          onChange={handleFileAvatarChange}
                        />
                        <label htmlFor='fileAvatar' className='absolute -right-2 -bottom-1'>
                          <span
                            className='bg-white rounded-full p-2 '
                            style={{ boxShadow: '0 0 15px 10px rgba(0,0,0,.05' }}
                          >
                            <CameraAltIcon />
                          </span>
                        </label>
                      </div>
                      <div className=' flex items-center pl-1 font-bold'>{user.username}</div>
                    </div>
                    {/* edit about */}
                    <div>
                      <h2 className='font-semibold text-slate-400 text-medium'>Edit About</h2>
                      <input
                        type='text'
                        id='editAbout'
                        className='w-full py-2 px-3 text-lg h-10 rounded-lg mt-2 focus:border-x-gray-400'
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                        style={{ border: '1px solid #cfcfcf' }}
                      />
                    </div>
                    {/* edit color */}
                    <div className='flex flex-col mt-5 '>
                      <h2 className='text-medium mb-4 text-slate-400 font-semibold'>Profile Theme</h2>
                      <div className='grid grid-cols-7 gap-x-0 gap-y-3 w-3/4 '>
                        {colors.map((color, index) => (
                          <div
                            key={index}
                            className={`w-7 h-7 rounded-full cursor-pointer  ${selectedColor === color ? `${color}` : ''}`}
                            style={{
                              backgroundColor: selectedColor === color ? color : 'white',
                              border: `0.2em solid ${color}`,
                              paddingTop: '0.5em',
                              boxShadow: selectedColor === color ? 'inset 0 0 0 0.2em #fff' : ''
                            }}
                            onClick={() => setSelectedColor(color)}
                          />
                        ))}
                      </div>
                    </div>
                    {/* edit name */}
                    <div className='mt-4'>
                      <h2 className='font-semibold text-slate-400 text-medium'>Edit Name</h2>
                      <input
                        type='text'
                        id='editName'
                        className='w-full py-2 px-3 text-lg h-10 rounded-lg mt-2 focus:border-x-gray-400'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{ border: '1px solid #cfcfcf' }}
                      />
                    </div>
                    <div className=' flex justify-center mt-5'>
                      <button
                        className='px-8 py-2 bg-red-400 rounded-3xl text-white font-semibold'
                        onClick={handleSave}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </Typography>
              </Box>
            </Modal>
            <Modal
              open={openPreOrder}
              onClose={handleCloseEditOrder}
              aria-labelledby='modal-modal-title'
              aria-describedby='modal-modal-description'
            >
              <Box sx={style2}>
                <div className='relative w-full h-full'>
                  <Typography
                    id='modal-modal-title'
                    className='py-7 font-bold   flex items-center   pl-4 z-50  border-b-2 border-gray-500'
                  >
                    <h1 className='font-bold text-2xl text-white px-7'> Make an art pre-order</h1>
                  </Typography>
                  <Typography id='modal-modal-description' sx={{ mx: 2 }}>
                    <div className='grid grid-cols-1 mb-2 relative px-7'>
                      <div className='pt-3'>
                        <label htmlFor='price' className='block text-lg font-medium leading-6 text-white'>
                          Your Offer
                        </label>
                        <div className='relative mt-2 rounded-md shadow-sm'>
                          <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
                            <span className='text-gray-500 sm:text-sm'>$</span>
                          </div>
                          <input
                            type='text'
                            name='price'
                            id='price'
                            className='block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-white ring-1 ring-inset ring-gray-600 placeholder:text-gray-600  focus:ring-inset sm:text-sm sm:leading-6 bg-gray-950 '
                            placeholder='0.00'
                          />
                          <div className='absolute inset-y-0 text-gray-500 right-2 flex justify-center items-center'>
                            USD
                          </div>
                        </div>
                        <label htmlFor='price' className='block text-xs font-medium leading-6 text-gray-500 pt-2'>
                          You will only be charged if the seller accepts your offer
                        </label>
                      </div>
                      <div className='pt-4'>
                        <label
                          htmlFor='message'
                          className='block mb-2 text-lg font-medium text-white dark:text-white pb-2'
                        >
                          Add note (optional)
                        </label>
                        <textarea
                          id='message'
                          className='block p-2.5 w-full h-28 text-sm text-white bg-gray-950 rounded-lg border border-gray-600  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                          placeholder='Leave a note for the creator'
                        ></textarea>
                      </div>
                    </div>
                  </Typography>

                  <div className='flex w-full justify-end absolute bottom-0 border-t-2 border-gray-500'>
                    <button className='bg-gray-400 opacity-50 py-2 px-4 text-center my-5 mr-7 font-medium'>
                      Go to Checkout
                    </button>
                  </div>
                </div>
              </Box>
            </Modal>
          </div>
          <div className='pt-4 font-bold text-3xl text-white'>{user.username}</div>
          <div className='pt-3 text-xl text-white'>{user.about}</div>
        </div>
      </div>
    </div>
  )
}
