import { Box, Modal, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Avatar, AvatarImage } from '~/components/ui/avatar'
import CameraAltIcon from '@mui/icons-material/CameraAlt'
import { User } from '~/types/User'
import axios from 'axios'

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
  const [openEdit, setOpenEdit] = React.useState(false)
  const handleOpenEdit = () => {
    setOpenEdit(true)
  }
  const handleCloseEdit = () => {
    setOpenEdit(false)
  }
  const [name, setName] = useState(user.userName)
  const [about, setAbout] = useState(user.about)
  const [imageSrc, setImageSrc] = useState(`${user.bannerImg}`)
  const [imageAvatarSrc, setImageAvatarSrc] = useState(`${user.avatar}`)
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
      .post('YOUR_BACKEND_URL', formData, {
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
          <div className='-mt-8'>
            <a className='rounded-2xl flex items-center justify-center w-28 py-4 bg-white ' onClick={handleOpenEdit}>
              <h1 className='font-medium'>Edit</h1>
            </a>
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
                      <div className=' flex items-center pl-1 font-bold'>{user.userName}</div>
                    </div>
                    {/* edit about */}
                    <div>
                      <h2 className='font-semibold text-slate-400 text-medium'>Edit About</h2>
                      <input
                        type='text'
                        id='editAbout'
                        className='w-full py-2 px-3 text-lg h-10 rounded-lg mt-2 focus:border-x-gray-400'
                        value={about}
                        onChange={(e) => setName(e.target.value)}
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
          </div>
          <div className='pt-4 font-bold text-3xl text-white'>{user.userName}</div>
          <div className='pt-3 text-xl text-white'>{user.about}</div>
        </div>
      </div>
    </div>
  )
}
